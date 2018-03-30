const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/data', (req, res) => {
  console.log(req.body);

  let sensorType = req.body.sensor;
  let response = {
    status: 500,
    error: null
  }

  switch(sensorType) {
    case 'dht':
      console.log('dht sensor detected');
      response = {
        status: 200,
        error: null
      }
      break;
    default:
      console.log(`Unknown sensor type: ${sensorType}`);
  }

  res.send(`${JSON.stringify(response)}`);

});

app.listen(port, () => console.log(`listening on port ${port}`))