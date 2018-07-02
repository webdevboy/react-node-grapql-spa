import Promise from 'bluebird';
import mime from 'mime-types';
import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { MediaLibrary, MediaTranslation, MediaReference } from '../models';
import MediaType from '../types/MediaType';
import S3FolderType from '../types/S3FolderType';
import MediaTranslationType from '../types/MediaTranslationType';
import MediaReferenceType from '../types/MediaReferenceType';
import S3FileType from '../types/S3FileType';
import OutputRemove from '../types/utils/OutputRemove';

function getFileName(key) {
  const split = key.split('/');
  const filename = split[split.length - 1];
  if (filename.length) {
    return filename;
  }
  return split[split.length - 2];
}

function getPath(key) {
  const split = key.split('/');
  return `${split.splice(0, split.length - 1).join('/')}/`;
}

const newMedia = {
  type: new List(S3FileType),
  description: 'submits a new asset to media center',
  args: {
    files: {
      type: new List(new NonNull(GraphQLJSON)),
    },
  },
  resolve({ s3, bucket }, { files }) {
    return new Promise(async (resolve, reject) => {
      try {
      
        const src = 'https://s3-eu-west-1.amazonaws.com/';
        const srcPrefix = src + bucket + '/';
        const originalPrefix = srcPrefix + 'original/';
        const thumbnailsPrefix = srcPrefix + 'thumbnails/';

        const newFiles = await Promise.all(files.map(async file => {

          let S3File, newFile;
          const isImageRegex = new RegExp(/^image\//i);
          
          if (file.base64) {
            console.log('============ Creating/Duplicating from Base64 Image =============');
            const buf = new Buffer(file.base64.replace(/^data:image\/\w+;base64,/, ""),'base64');

            await s3.upload({
              Bucket: bucket,
              Key: file.key,
              Body: buf,
              ContentType: file.mimetype,
              ACL: 'public-read',
              ContentEncoding: 'base64'
            }).promise();
            S3File = await s3.headObject({
              Bucket: bucket,
              Key: file.key,
            }).promise();

            const args = {
              src: file.key ? srcPrefix + file.key : srcPrefix + file.response.body.key,
              original: originalPrefix + file.name,
              key: file.key || file.meta.key,
              filename: file.name || file.meta.name,
              mimetype: S3File.ContentType || file.meta.type,
              size: S3File.ContentLength || file.size || 0,
              thumbnail: isImageRegex.test(S3File.ContentType) ? `${thumbnailsPrefix}${file.key || file.meta.key}` : null,
            };

            newFile = await MediaLibrary.model.findOrCreate({
              limit: 1,
              defaults: args,
              where: {
                id: file.id,
              }
            })
              .then(res => {
                if (!res[0].isNewRecord) {
                  return res[0].updateAttributes(args);
                }
                return res[0];
              });
          } else {
            console.log('============ Creating With Uppy =============');
            
            S3File = await s3.headObject({
              Bucket: bucket,
              Key: file.meta.key,
            }).promise();

            newFile = await MediaLibrary.model.create({
              src: srcPrefix + file.response.body.key,
              original: originalPrefix + (file.name),
              key: file.meta.key,
              filename: file.meta.name,
              mimetype: file.meta.type,
              size: S3File.ContentLength || file.size,
              thumbnail: isImageRegex.test(S3File.ContentType) ? `${thumbnailsPrefix}${file.key || file.meta.key}` : null,
            });
          }

          return {
            ...S3File,
            Key: file.key || file.meta.key,
            Size: S3File.ContentLength,
            media: newFile,
          };
        }));

        resolve(newFiles);
      } catch (e) {
        reject(e);
      }
    });
  }
};

const updateFile = {
  type: new List(S3FileType),
  description: 'updates filename',
  args: {
    id: {
      type: ID,
    },
    name: {
      type: StringType,
    },
    file: {
      type: GraphQLJSON,
    },
  },
  resolve({ s3, bucket }, { id, name, file }) {
    return new Promise(async (resolve, reject) => {
      try {
        const media = await MediaLibrary.model.findById(id);

        if (!media && file.base64) media = MediaLibrary.model.build();

        if (media) {
          let temp = media.key.split('/');
          temp.pop();
          temp.push(name)
          const newKey = temp.join('/');

          if (file) {
            console.log('============ Creating/Duplicating from Base64 Image =============');
            const buf = new Buffer(file.base64.replace(/^data:image\/\w+;base64,/, ""),'base64');

            await s3.deleteObject({
              Bucket: bucket, 
              Key: file.key
            }).promise();

            await s3.upload({
              Bucket: bucket,
              Key: file.key,
              Body: buf,
              ContentType: file.mimetype,
              ACL: 'public-read',
              ContentEncoding: 'base64'
            }).promise();
          } else {
            // updating file name
            const result1 = await s3.copyObject({
              Bucket: bucket, 
              CopySource: `${bucket}/${media.key}`, 
              Key: newKey,
              ACL: 'public-read',
            }).promise();
            const result2 = await s3.deleteObject({
              Bucket: bucket, 
              Key: media.key
            }).promise();
          }
          

          const S3File = await s3.headObject({
            Bucket: bucket,
            Key: newKey,
          }).promise();
          
          const src = 'https://s3-eu-west-1.amazonaws.com/';
          const srcPrefix = src + bucket + '/';
          const originalPrefix = srcPrefix + 'original/';
          const thumbnailsPrefix = srcPrefix + 'thumbnails/';

          media.filename = name;
          media.key = newKey;
          media.src = srcPrefix + newKey;
          media.original = originalPrefix + name;
          media.thumbnail = thumbnailsPrefix + newKey;
          media.mimetype = S3File.ContentType;

          await media.save();

          resolve([{
            ...S3File,
            Key: newKey,
            Size: S3File.ContentLength,
            media,
          }]);
        } else {
          reject(new Error('No file exists'));
        }
      } catch(e) {
        reject(e);
      }
    });
  }
};

const createS3Folder = {
  type: S3FolderType,
  description: 'creates a new folder on s3',
  args: {
    folderName: {
      type: new NonNull(StringType),
    },
    currentFolder: {
      type: StringType,
    },
  },
  resolve({ s3, bucket }, args) {
    return new Promise(async (resolve, reject) => {
      try {
        let key = '';
        if (args.currentFolder) {
          key = args.currentFolder + args.folderName;
        } else {
          key = args.folderName;
        }

        const params = {
          Bucket: bucket,
          Key: key,
          ACL: 'public-read',
          Body: 'I\'m Obligated to provide this field',
        };
        s3.upload(params, (err, data) => {
          if (err) reject(err);
          resolve({
            name: getFileName(data.Key),
            path: getPath(data.Key),
          });
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
};

const deleteS3Folder = {
  type: S3FolderType,
  description: 'deletes existing folder on s3',
  args: {
    folderName: {
      type: new NonNull(StringType),
    },
    currentFolder: {
      type: StringType,
    },
  },
  resolve({ s3, bucket }, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          Bucket: bucketName,
        };

        if (args.currentFolder) {
          Bucket.Prefix = `${args.currentFolder}/`;
        } else {
          Bucket.Prefix = `${args.folderName}/`;
        }
      
        s3.listObjects(params, (err, data) => {
          if (err) return reject(err);
      
          if (data.Contents.length == 0) resolve();
      
          params = { Bucket: bucketName };
          params.Delete = { Objects:[] };
      
          data.Contents.forEach((content) => {
            params.Delete.Objects.push({ Key: content.Key });
          });
      
          s3.deleteObjects(params, (err, data) => {
            if (err) return reject(err);
            if (data.Contents.length == 1000) emptyBucket(bucketName,callback);
            else resolve();
          });
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
};

const updateOrCreateMediaTranslation = {
  type: MediaTranslationType,
  description: 'updates media translation',
  args: {
    media_id: {
      type: new NonNull(ID),
    },
    language_id: {
      type: new NonNull(ID),
    },
    alt: {
      type: StringType,
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const mediaTranslation = await MediaTranslation.model.findOrCreate({
          limit: 1,
          defaults: args,
          where: {
            $and: {
              media_id: args.media_id,
              language_id: args.language_id,
            },
          },
        }).then(res => {
          if (!res[0].isNewRecord) {
            return res[0].update({
              alt: args.alt,
            }, {
              fields: ['alt'],
            });
          }
          return res[0];
        });
        resolve(mediaTranslation);
      } catch (e) {
        reject(e);
      }
    });
  },
};

const updateOrCreateMediaReference = {
  type: MediaReferenceType,
  description: 'updates media reference',
  args: {
    media_id: {
      type: StringType,
    },
    media_library_id: {
      type: ID,
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        const mediaReference = await MediaReference.model.findOrCreate({
          limit: 1,
          where: {
            media_id: args.media_id,
          },
          defaults: args,
        }).then(res => {
          if (!res[0].isNewRecord) {
            return res[0].update({
              media_library_id: args.media_library_id,
            }, {
              fields: ['media_library_id'],
            })
          }
          return res[0];
        });
        resolve(mediaReference)
      } catch(e) {
        reject(e);
      }
    });
  }
};

const updateOrCreateListMediaReference = {
  type: new List(MediaReferenceType),
  description: 'updates list media reference',
  args: {
    media_id: {
      type: StringType,
    },
    ids: {
      type: new List(ID),
    },
  },
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        const rowsMedia = await MediaReference.model.destroy({ where: { media_id: args.media_id }});
        let mediaReference = [];
        await Promise.all(
          args.ids.map( async id => {
            const newMedia = await MediaReference.model.create({ media_id: args.media_id, media_library_id: id });
            mediaReference.push(newMedia);
          })
        );
        resolve(mediaReference)
      } catch(e) {
        reject(e);
      }
    });
  }
};


const removeMedia = {
  type: OutputRemove,
  description: 'Removes an asset from media center',
  args: {
    keys: {
      type: new List(new NonNull(StringType)),
    },
  },
  resolve({ s3, bucket }, { keys }) {
    return new Promise(async (resolve, reject) => {
      try {
			
        const S3DeletedFiles = await s3.deleteObjects({
          Bucket: bucket,
          Delete: {
            Objects: keys.map(key => ({ Key: key }))
          },
        }).promise();

        const deletedRows = await MediaLibrary.model.destroy({
          where: {
            key: {
              $in: S3DeletedFiles.Deleted.map(deleted => deleted.Key),
            },
          },
        });

        return resolve({
          keys: keys,
          rows: deletedRows
        });

      } catch (e) {
        reject(e);
      }
    });
  }
};

export default {
  newMedia,
  createS3Folder,
  updateOrCreateMediaTranslation,
  updateOrCreateMediaReference,
  removeMedia,
  updateFile,
  updateOrCreateListMediaReference,
  // removeS3Folder
};

/*
export const fileUpload = {
  type: new List(MediaType),
  description: 'submits a new asset to media center',
  args: {
    files: {
      type: new List(new NonNull(FileType)),
    },
  },
  async resolve({}, { files }) {

    console.log('======= => FILES =>');
    console.log(files);
    return new Promise( async (resolve, reject) => {
      try {
        const newFiles = await Promise.all(files.map(async file => {
          const newFile = await Media.create({
            src: file.location,
            thumbnail: thumbnailPath+file.key,
            key: file.key,
            filename: file.originalname,
            alias: file.originalname,
            extension: mime.extension(file.mimetype),
            size: file.size
          });

          // const newTranslation = await MediaTranslation.create();
          // await newTranslation.setMediaTranslation(newFile);
          return newFile;
        }));
        resolve(newFiles);
      } catch (e) {
        reject(e);
      }
    });
  }
};

export const updateMedia = {
  type: MediaType,
  description: 'updates media',
  args: {
    id: {
      type: ID
    },
    reference:{
      type: StringType
    },
  }, 
  resolve(_, args) {
    return new Promise( async (resolve, reject) => {
      try {
        const media = await Media.findOne({where: { id: args.id}}).then(res => {
          res.references.push(args.reference)
          res.update({references: res.references}, {fields: ['references']});
          return res;
        });
        resolve(media)
      } catch(e) {
        reject(e);
      }
      
    });
  }
}
*/
