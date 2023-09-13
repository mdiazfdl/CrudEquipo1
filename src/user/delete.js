const { v4 } = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.delete = async (event) => {
    const { id } = event.pathParameters;

    await dynamodb.delete({TableName, Key: { id }}).promise();

    return {statusCode: 200, body: JSON.stringify({ message: 'Deleted'}),};
};
