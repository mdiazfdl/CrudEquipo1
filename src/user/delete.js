const {v4} = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.delete = async (event) => {
    console.log("Inicio de la función delete");
    try {
        console.log("Obteniendo id del pathParameters");
        const {id} = event.pathParameters;
        console.log(`Buscando usuario con id: ${id}`);
        const user = await dynamodb.get({TableName, Key: {id}}).promise()
        if (Object.keys(user).length === 0) {
            console.log("Usuario no encontrado");
            return {statusCode: 404, body: JSON.stringify({message: 'El usuario no fue encontrado'})}
        } else {
            console.log("Usuario encontrado, procediendo a eliminar");
            await dynamodb.delete({TableName, Key: {id}}).promise();
            console.log("Usuario eliminado exitosamente");
            return {statusCode: 200, body: JSON.stringify({message: 'Usuario eliminado con éxito'}),};
        }
    } catch (error) {
        console.error("Error al eliminar el usuario", error);
        return {statusCode: 500, body: JSON.stringify({message: 'Error al eliminar el usuario'})};
    }
};
