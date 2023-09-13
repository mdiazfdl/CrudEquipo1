const {v4} = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.create = async (event) => {
    try {
        const {username, password} = JSON.parse(event.body);
        const id = v4();
        await dynamodb.put({TableName, Item: {id, username, password}}).promise()
        return {statusCode: 200, body: JSON.stringify({id, username, password})};
    } catch (error) {
        console.error(error);
        return {statusCode: 500, body: JSON.stringify({msg: 'Error al crear el usuario'})};
    }
};