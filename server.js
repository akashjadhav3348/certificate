const app = require('./app');
const config = require('./config/config');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const certPath = path.join(dataDir, 'certificates.json');
if (!fs.existsSync(certPath)) {
  fs.writeFileSync(certPath, JSON.stringify([], null, 2));
}

app.listen(config.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${config.PORT}`);
  console.log(`📘 Swagger UI at https://localhost:${config.PORT}${config.API_DOCS_PATH}`);
});
