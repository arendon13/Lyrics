const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const cors = require('cors');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

router(app);

if (process.env.NODE_ENV === 'production') {
    //Express to serve up production assets
    app.use(express.static('lyrics/build'));
    //Expess will serve up index.html file
    //if route is not recognized
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'lyrics', 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
