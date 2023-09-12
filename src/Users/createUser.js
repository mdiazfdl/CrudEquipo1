const { v4 } = require('uuid')
const AWS = require('aws-sdk');

// Configura AWS SDK para usar DynamoDB Local
AWS.config.update({
    region: "eu-est-01",
    endpoint: "http://localhost:8000"
});

const createUser = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {username, password} = JSON.parse(event.body);
    const createdAt = new Date();
    const id = v4();

    const newUser ={
        id,
        username,
        password,
        createdAt
    }

    await dynamodb.put({
        TableName: 'userTable',
        Item: newUser
    }).promise()

    return{
        statusCode: 200,
        body: JSON.stringify(newUser)
    };
};
module.exports = {
    createUser,
};