const {v4} = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.create = async (event) => {
    console.log("Inicio de la función create");
    try {
        console.log("Parseando el cuerpo del evento");
        const {username, password} = JSON.parse(event.body);
        const id = v4();
        console.log(`Creando usuario con id: ${id}, username: ${username}`);
        await dynamodb.put({TableName, Item: {id, username, password}}).promise()
        console.log("Usuario creado exitosamente");
        return {statusCode: 200, body: JSON.stringify({id, username, password})};
    } catch (error) {
        console.error("Error al crear el usuario", error);
        return {statusCode: 500, body: JSON.stringify({message: 'Error al crear el usuario'})};
    }
};
