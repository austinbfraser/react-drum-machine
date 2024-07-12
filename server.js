const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

// const router = express.Router();

// middleware to set headers to allow CORS
const setHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  next();
};

app.use('/kits', setHeaders, express.static(path.join(__dirname, './kits')));

// statically serve everything in the build folder on the route '/build'
app.use(express.static(path.join(__dirname, './build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, './build', 'index.html'));
});

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('errorObj.log: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
