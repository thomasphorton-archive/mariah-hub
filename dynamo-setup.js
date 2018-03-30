const AWS = require('aws-sdk');

let dynamodb = new AWS.DynamoDB({
  endpoint: 'http://localhost:8000',
  region: 'us-west-2'
});

let params = {
  AttributeDefinitions: [
    {
      AttributeName: 'sensor_id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'time',
      AttributeType: 'N'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'sensor_id',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'time',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 'mariah-telemetry'
}

dynamodb.createTable(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});