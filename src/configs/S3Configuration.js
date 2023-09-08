const AWS = require('aws-sdk');

function S3Configuration() {
    AWS.config.update({
        accessKeyId: 'AKIAQ4ELPGT7UYVJS7XZ',
        secretAccessKey: '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',
        region: 'eu-north-1',
    });
}


export default S3Configuration;