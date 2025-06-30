const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/certificates.json');

function readData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
  getAllCertificates: () => readData(),

  getCertificateById: (id) => readData().find(cert => cert.certificateNo === id),

  addCertificate: (certificate) => {
    const certificates = readData();
    certificates.push(certificate);
    writeData(certificates);
    return certificate;
  },

  deleteCertificate: (id) => {
    const certificates = readData();
    const index = certificates.findIndex(cert => cert.certificateNo === id);
    if (index !== -1) {
      const deleted = certificates.splice(index, 1);
      writeData(certificates);
      return deleted[0];
    }
    return null;
  },

  updateCertificate: (id, updatedData) => {
    const certificates = readData();
    const index = certificates.findIndex(cert => cert.certificateNo === id);
    if (index !== -1) {
      certificates[index] = { ...certificates[index], ...updatedData };
      writeData(certificates);
      return certificates[index];
    }
    return null;
  },

  findCertificateByStudentName: (studentName) => {
    const certificates = readData();
    return certificates.find(cert =>
      cert.studentName.toLowerCase() === studentName.toLowerCase()
    );
  }
};
