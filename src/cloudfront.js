const AWS = require('aws-sdk');

function prefixPaths(files) {
  return new Promise((resolve) => {
    const updatedFiles = [];
    files.forEach((file) => {
      updatedFiles.push(`/${file}`);

      if (updatedFiles.length === files.length) {
        resolve(updatedFiles);
      }
    });
  });
}

function invalidateDistribution(distId, files) {
  return new Promise((resolve, reject) => {
    prefixPaths(files).then((prefixedFiles) => {
      const cloudfront = new AWS.CloudFront({ apiVersion: '2018-06-18' });

      const params = {
        DistributionId: distId,
        InvalidationBatch: {
          CallerReference: new Date().getTime().toString(),
          Paths: {
            Quantity: files.length,
            Items: prefixedFiles,
          },
        },
      };

      cloudfront.createInvalidation(params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(`Invalidation with ID ${data.Invalidation.Id} has started for ${files.length} changed files!`);
      });
    });
  });
}

module.exports.invalidateDistribution = invalidateDistribution;
