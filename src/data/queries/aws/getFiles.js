import Promise from 'bluebird';
import _ from 'lodash';
import {
  GraphQLString as StringType,
} from "graphql";
import S3FilesType from '../../types/S3FilesType';

export default {
  type: S3FilesType,
  name: "GetS3Files",
  args: {
    path: {
      type: StringType,
    },
  },
  resolve({ s3 }, args, { aws }) {
    try {
      // console.log('AWS', aws);
      const params = {
        Bucket: aws.bucket,
        Prefix: args.folder,
        Delimiter: "/",
        MaxKeys: 2147483647, // Maximum allowed by S3 API
      };
      return new Promise(async (resolve, reject) => {
        const prefix = _.trimStart(_.trimEnd(args.path, "/") + "/", "/");
        const result = { files: [], folders: [] };

        function s3ListCheckTruncated(data) {
          result.files = result.files.concat(_.map(data.Contents, (file) => file));
          result.folders = result.folders.concat(
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

          resolve(result);
        }

        s3.listObjectsV2({
          ...params,
          Prefix: prefix,
          StartAfter: prefix, // removes the folder name from listing
        })
          .promise()
          .then(s3ListCheckTruncated);
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
