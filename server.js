const app = require('./app');
const config = require('./config/config');

// Initialize data directory
const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize certificates.json if it doesn't exist
const certsPath = path.join(dataDir, 'certificates.json');
if (!fs.existsSync(certsPath)) {
  fs.writeFileSync(certsPath, JSON.stringify([], null, 2));
}

// Start server
app.listen(config.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${config.PORT}`);
  console.log(`📘 Swagger UI at http://localhost:${config.PORT}${config.API_DOCS_PATH}`);
});