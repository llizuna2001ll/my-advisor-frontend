const AWS = require('aws-sdk');

function S3Configuration() {
    AWS.config.update({
        accessKeyId: '***********************************',
        secretAccessKey: '******************************',
        region: 'eu-north-1',
    });
}


export default S3Configuration;
