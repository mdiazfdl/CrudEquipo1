const {v4} = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.findById = async (event) => {
    console.log("Inicio de la función findById");
    try {
        console.log("Obteniendo id del pathParameters");
        const {id} = event.pathParameters;
        console.log(`Buscando usuario con id: ${id}`);
        const user = await dynamodb.get({TableName, Key: {id}}).promise()
        if (Object.keys(user).length === 0) {
            console.log("Usuario no encontrado");
            return {statusCode: 404, body: JSON.stringify({message: 'El usuario no fue encontrado'})}
        } else {
            console.log("Usuario encontrado");
            return user.Item
        }
    } catch (error) {
        console.error("Error al obtener el usuario", error);
        return {statusCode: 500, body: JSON.stringify({message: 'Error al obtener el usuario'})};
    }
}
