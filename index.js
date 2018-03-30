const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/data', (req, res) => {
  const AWS = require('aws-sdk');

  let docClient = new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://localhost:8000',
    region: 'us-west-2'
  });

  console.log(req.body);

  let sensorType = req.body.sensor;

  switch(sensorType) {
    case 'dht':
      console.log('dht sensor detected');

      let params = {
        TableName: 'mariah-telemetry',
        Item: {
          sensor_id: 'dht',
          time: req.body.time,
          humidity: req.body.humidity
        }
      }

      docClient.put(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          res.send({
            status: 500,
            error: err
          });
        }
        else {
          console.log(data);
          res.send({
            status: 200,
            error: null
          });
        }
      })

      break;
    default:
      let err = `Unknown sensor type: ${sensorType}`;
      res.send({
        status: 500,
        error: err
      });
  }

});

app.listen(port, () => console.log(`listening on port ${port}`))