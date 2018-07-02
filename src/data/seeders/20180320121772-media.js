import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import AWS from 'aws-sdk';
import { MediaLibrary, MediaTranslation, Language } from '../models';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const aws = {
  bucket: process.env.CF_ENDPOINT || 'lnjt-staging',
  keys: {
    accessKeyId: process.env.AWS_ACCESS_KEY || 'AKIAJEIH3LA6MCLG5YGQ',
    secretAccessKey: process.env.AWS_SECRET_KEY || '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',
    region: process.env.AWS_REGION || 'eu-west-1',
  },
  cloudFront: {
    endpoint: process.env.AWS_CF_ENDPOINT || 'd2senxzasulqn5.cloudfront.net',
  },
};

const filename = path.basename(__filename);

const DESCRIPTION = `Auto generated by seed name: ${filename}`;
const AWS_PATH = `https://s3-${aws.keys.region}.amazonaws.com/${aws.bucket}/`;
const THUMBNAILS_PREFIX = 'thumbnails/';
const ORIGINAL_PREFIX = 'original/';

AWS.config.setPromisesDependency(Promise);

export default {
  up: async () => {

    const en = await Language.findOne({ where: { locale: 'en', enabled: true } });

    const files = [
      '../seeders-media/img1.jpg',
      '../seeders-media/img2.jpg',
      '../seeders-media/img3.jpg',
      '../seeders-media/img4.jpg',
      '../seeders-media/img5.jpg',
    ];

    const s3 = new AWS.S3(aws.keys); // AMAZON AWS S3 INSTANCE

    const images = await Promise.map(files, async (file) => {
      const imagePath = path.resolve(__dirname, file); // get path from source
      const fileName = path.basename(imagePath); // get base filename
      const image = fs.readFileSync(imagePath);
      const Key = `public/seeders/${fileName}`;
      let info;

      try {

        info = await s3.getObject({
          Bucket: aws.bucket,
          Key,
        }).promise();

      } catch(e) {

        console.error(e);

        await s3.putObject({
          Bucket: aws.bucket,
          Key,
          Body: image,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }).promise();

        info = await s3.getObject({
          Bucket: aws.bucket,
          Key,
        }).promise();

      }

      return {
        ...info,
        Key,
        fileName,
      };
      
    });


    await Promise.map(images, async(img) => {
      
      const media = await MediaLibrary.create({
        src: AWS_PATH + img.Key,
        original: AWS_PATH + ORIGINAL_PREFIX + img.Key,
        key: img.Key,
        filename: img.fileName,
        mimetype: img.ContentType,
        size: img.ContentLength,
        thumbnail: AWS_PATH + THUMBNAILS_PREFIX + img.Key,      
      });


      await MediaTranslation.create({
        alt: `Seeder file name: ${img.Key.filename}`,
        language_id: en.id,
        media_id: media.id,
      });
      
      // await media.setTranslation(alt)

    });

    // await Promise.each(medias, async (media) => {
    //   await media.addTranslation({
    //     language_id: en.id,
    //     media_id: media.id,
    //     alt: ,
    //     // title: media.filename,
    //   });
    // });
  },

  down: async () => {
    await MediaLibrary.truncate({ cascade: true });
    await MediaTranslation.truncate({ cascade: true });
  }
};