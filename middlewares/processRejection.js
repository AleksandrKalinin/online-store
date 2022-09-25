export function processRejection(req, res, next) {
  process
    .on('unhandledRejection', (fail, err) => {
      console.error(fail, 'Unhandled Rejection at Promise', err);
    })
    .on('uncaughtException', err => {
      console.error(err, 'Uncaught Exception thrown');
      process.exit(1);
    });
  next();  
}
