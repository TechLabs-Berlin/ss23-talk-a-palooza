const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.info(
    `Server running on port ${config.PORT}, google cloud provider is available with id ${config.GOOGLE_CLIENT_ID} and secret key ${config.GOOGLE_CLIENT_SECRET}`
  );
});
