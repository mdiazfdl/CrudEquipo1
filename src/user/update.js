const {v4} = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.update = async (event) => {
    console.log("Inicio de la función update");
    try {
        console.log("Obteniendo id del pathParameters y parseando el cuerpo del evento");
        const {id} = event.pathParameters;
        const {username, password} = JSON.parse(event.body);
        console.log(`Buscando usuario con id: ${id}`);
        const user = await dynamodb.get({TableName, Key: {id}}).promise()
        if (Object.keys(user).length === 0) {
            console.log("Usuario no encontrado");
            return {statusCode: 404, body: JSON.stringify({message: 'El usuario no fue encontrado'})}
        } else {
            console.log("Usuario encontrado, procediendo a actualizar");
            const newUser = await dynamodb.update({
                TableName, Key: {id},
                UpdateExpression: "set username = :username, password = :password",
                ExpressionAttributeValues: {":username": username, ":password": password,}, ReturnValues: "ALL_NEW",
            }).promise();
            console.log("Usuario actualizado exitosamente");
            return {statusCode: 200, body: JSON.stringify(newUser),};
        }
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
        return {statusCode: 500, body: JSON.stringify({message: 'Error al actualizar el usuario'})};
    }
};
