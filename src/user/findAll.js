const ddbDocClient = require("../../dynamodb").ddbDocClient;
const {GetCommand, ScanCommand} = require("@aws-sdk/lib-dynamodb");
const TableName = "userTable"

module.exports.findAll = async (event) => {
    console.log("Inicio de la función findAll");
    try {
        console.log("Obteniendo todos los usuarios");
        const {Items} = await ddbDocClient().send(new ScanCommand({TableName,}));
        console.log(`Usuarios obtenidos: ${Items.length}`);
        return {statusCode: 200, body: JSON.stringify(Items, null, 2),};
    } catch (error) {
        console.error("Error al obtener todos los usuarios", error);
        return {statusCode: 500, body: JSON.stringify({message: 'Error al obtener todos los usuarios'})};
    }
};
