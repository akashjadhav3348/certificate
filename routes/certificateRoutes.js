const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

/**
 * @swagger
 * tags:
 *   name: Certificates
 *   description: Certificate management
 */

/**
 * @swagger
 * /api/certificates:
 *   get:
 *     summary: Get all certificates
 *     tags: [Certificates]
 *     responses:
 *       200:
 *         description: A list of certificates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 */
router.get('/', certificateController.getAllCertificates);

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
 */
router.post('/', certificateController.createCertificate);

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
 *         description: Certificate number
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificate not found
 */
router.get('/:id', certificateController.getCertificateById);

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
 *         description: Certificate number
 *         schema:
 *           type: string
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
router.put('/:id', certificateController.updateCertificate);

/**
 * @swagger
 * /api/certificates/{id}:
 *   delete:
 *     summary: Delete a certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Certificate number
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate deleted successfully
 *       404:
 *         description: Certificate not found
 */
router.delete('/:id', certificateController.deleteCertificate);

module.exports = router;
