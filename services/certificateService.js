const certificateModel = require('../models/certificateModel');

module.exports = {
  getAllCertificates: () => certificateModel.getAllCertificates(),
  getCertificateById: (id) => certificateModel.getCertificateById(id),
  createCertificate: (certificateData) => {
    // Add validation if needed
    return certificateModel.addCertificate(certificateData);
  },
  deleteCertificate: (id) => certificateModel.deleteCertificate(id)
};