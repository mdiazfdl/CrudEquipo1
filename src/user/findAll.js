const ddbDocClient = require("../../dynamodb").ddbDocClient;
const { GetCommand,ScanCommand } = require("@aws-sdk/lib-dynamodb");
const TableName = "userTable"

module.exports.findAll = async (event) => {
    const { Items } = await ddbDocClient().send(new ScanCommand({ TableName, }));
    return { statusCode: 200, body: JSON.stringify(Items, null, 2), };
};
