const certificateModel = require('../models/certificateModel');

module.exports = {
  getAllCertificates: () => certificateModel.getAllCertificates(),

  getCertificateById: (id) => certificateModel.getCertificateById(id),

  createCertificate: (certificateData) => {
    // Optional: Add additional validation logic here
    return certificateModel.addCertificate(certificateData);
  },

  deleteCertificate: (id) => certificateModel.deleteCertificate(id),

  updateCertificate: (id, updatedData) => {
    return certificateModel.updateCertificate(id, updatedData);
  },

  findCertificateByStudentName: (studentName) => {
    return certificateModel.findCertificateByStudentName(studentName);
  }
};
