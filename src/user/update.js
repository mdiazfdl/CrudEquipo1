const {v4} = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.update = async (event) => {
    try {
        const {id} = event.pathParameters;
        const {username, password} = JSON.parse(event.body);

        const user = await dynamodb.get({TableName, Key: {id}}).promise()
        if (Object.keys(user).length === 0) {
            return {statusCode: 404, body: JSON.stringify({message: 'El usuario no fue encontrado'})}
        } else {
            const newUser = await dynamodb.update({
                TableName, Key: {id},
                UpdateExpression: "set username = :username, password = :password",
                ExpressionAttributeValues: {":username": username, ":password": password,}, ReturnValues: "ALL_NEW",
            }).promise();
            return {statusCode: 200, body: JSON.stringify(newUser),};
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({msg: 'Error al actualizar el usuario'})
        };
    }
};
