const { v4 } = require('uuid')
const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01", endpoint: "http://localhost:8000"});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable"

module.exports.findById = async (event) =>{
    const { id } = event.pathParameters;

    const user =  await dynamodb.get({TableName,Key:{id}}).promise()

    if (Object.keys(user).length === 0){
        return {statusCode: 500,body: JSON.stringify({message:'El usuario no fue encontrado'})}
    }else{
        return user.Item
    }

}