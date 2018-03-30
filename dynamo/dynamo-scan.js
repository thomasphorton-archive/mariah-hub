const AWS = require('aws-sdk');

let docClient = new AWS.DynamoDB.DocumentClient({
  endpoint: 'http://localhost:8000',
  region: 'us-west-2'
});

let params = {
  TableName: 'mariah-telemetry',
  FilterExpression: 'sensor_id = :sensor_id',
  ExpressionAttributeValues: {':sensor_id': 'dht'}
}

docClient.scan(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});