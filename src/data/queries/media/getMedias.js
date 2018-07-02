import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BoolType
} from 'graphql';
import _ from 'lodash';
import S3FilesType from '../../types/S3FilesType';

import { MediaLibrary, MediaTranslation, Language } from '../../models';
// import MediaType from '../../types/MediaType';

export default {
  type: S3FilesType,
  args: {
    order: {
      type: StringType,
    },
    mimetype: {
      type: StringType,
    },
    path: {
      type: StringType,
    },
    folder: {
      type: StringType
    },
    get_all: {
      type: BoolType
    }
  },
  resolve({ s3, bucket }, { order = 'DESC', mimetype, path = '', folder, get_all = false }) {
    try {
      const params = {
        Bucket: bucket,
        Prefix: folder,
        Delimiter: "/",
        MaxKeys: 2147483647, // Maximum allowed by S3 API
      };
      const prefix = _.trimStart(_.trimEnd(path, "/") + "/", "/");
      let result = [];

      function s3ListCheckTruncated(data) {
        result = result.concat(
          _.map(data.CommonPrefixes, ({ Prefix }) => {
            const name = Prefix.split('/');
            const foldername = name[name.length - 2];
            return {
              path: Prefix,
              name: foldername,
            };
          }),
        );

        if (data.IsTruncated) {
          return s3
            .listObjectsV2({
              ...params,
              Prefix: prefix,
              ContinuationToken: data.NextContinuationToken,
            })
            .promise()
            .then(s3ListCheckTruncated);
        }

        return result;
      }

      async function getFiles(folders) {
        let where = { };

        if (mimetype) {
          where.mimetype = {
            $iLike: `${mimetype}%`
          };
          where.key = {
            $iLike: `${path}%`
          };
        } else {
          where.$or = [
            {mimetype: { $iLike: "%image%" }},
            {mimetype: { $iLike: "%video%" }},
            {mimetype: { $iLike: "%pdf%" }},
          ];
          where.$and = {
            key: { $iLike: `${path}%` }
          };
        }

        if (get_all) delete where.key;
        let medias = await MediaLibrary.model.findAll({
          where,
          order: [['created_at', order]],
          include: [
            {
              model: MediaTranslation.model,
              as: 'translations',
              // required: true,
              include: {
                model: Language.model,
                as: 'language',
              },
            },
          ],
        });

        const parentSlashCount = path.split('/').length - 1;
        medias = medias.filter(media => {
          return media.key.split('/').length === parentSlashCount + 1
        });

        return {
          medias,
          folders
        }
      }

      return s3.listObjectsV2({
        ...params,
        Prefix: prefix,
        StartAfter: prefix, // removes the folder name from listing
      })
        .promise()
        .then(s3ListCheckTruncated)
        .then(getFiles);


    } catch (e) {
      console.error(e);
      return e;
    }
  },
};

// export const getSingleMediaByReference = {
//   type: MediaType,
//   args: {
//     media_id: {
//       type: new NonNull(StringType)
//     }
//   },
//   async resolve(_, args) {

//     try {
//       const reference = await MediaReference.findOne({ where: { media_id: args.media_id } });

//       if (reference && reference.media_center_id) {
//         return Media.findOne({where: {id: reference.media_center_id}});
//       }

//     } catch (e) {
//       console.error(e);
//       return e;
//     }

//   }
// }