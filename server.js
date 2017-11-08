const app = require('./src/app');

const port = process.env.PORT || '3000';

/* eslint-disable no-console */
app.listen(port, () => {
  console.error(`Listening on port ${port}`);
});

app.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
/* eslint-enable no-console */
