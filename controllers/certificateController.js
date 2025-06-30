const certificateService = require('../services/certificateService');

let currentCertificateNo = 29001;

/**
 * @swagger
 * tags:
 *   name: Certificates
 *   description: Certificate management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       required:
 *         - studentName
 *         - courseName
 *       properties:
 *         certificateNo:
 *           type: string
 *           readOnly: true
 *           example: "29001"
 *         studentName:
 *           type: string
 *           example: "Akash Jadhav"
 *         courseName:
 *           type: string
 *           example: ".NET Full Stack"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2025-06-30"
 */

/**
 * @swagger
 * /api/certificates:
 *   get:
 *     summary: Get all certificates
 *     tags: [Certificates]
 *     responses:
 *       200:
 *         description: List of certificates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 */
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await certificateService.getAllCertificates();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/certificates:
 *   post:
 *     summary: Create a new certificate
 *     tags: [Certificates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       201:
 *         description: Certificate created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Certificate already exists
 */
const createCertificate = async (req, res) => {
  try {
    const { studentName, courseName, startDate, endDate } = req.body;

    if (!studentName || !courseName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingCertificate = await certificateService.findCertificateByStudentName(studentName);
    if (existingCertificate) {
      return res.status(409).json({ message: "Certificate already exists for this student" });
    }

    const certificateNo = String(currentCertificateNo++);

    const certificate = await certificateService.createCertificate({
      certificateNo,
      studentName,
      courseName,
      startDate,
      endDate,
    });

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/certificates/{id}:
 *   delete:
 *     summary: Delete a certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Certificate ID
 *     responses:
 *       200:
 *         description: Certificate deleted
 *       404:
 *         description: Certificate not found
 */
const deleteCertificate = async (req, res) => {
  try {
    const deleted = await certificateService.deleteCertificate(req.params.id);
    if (deleted) {
      res.json({ message: 'Certificate deleted successfully' });
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/certificates/{id}:
 *   put:
 *     summary: Update a certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Certificate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       200:
 *         description: Certificate updated successfully
 *       404:
 *         description: Certificate not found
 */
const updateCertificate = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updated = await certificateService.updateCertificate(id, updatedData);

    if (updated) {
      res.json({ message: 'Certificate updated successfully' });
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCertificates,
  createCertificate,
  deleteCertificate,
  updateCertificate,
};
/**
 * @swagger
 * /api/certificates/{id}:
 *   get:
 *     summary: Get a certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Certificate ID
 *     responses:
 *       200:
 *         description: Certificate details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificate not found
 */