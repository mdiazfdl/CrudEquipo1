const {v4} = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.findById = async (event) => {
    try {
        const {id} = event.pathParameters;
        const user = await dynamodb.get({TableName, Key: {id}}).promise()
        if (Object.keys(user).length === 0) {
            return {statusCode: 404, body: JSON.stringify({message: 'El usuario no fue encontrado'})}
        } else {
            return user.Item
        }
    } catch (error) {
        console.error(error);
        return {statusCode: 500, body: JSON.stringify({msg: 'Error al obtener el usuario'})};
    }
}
