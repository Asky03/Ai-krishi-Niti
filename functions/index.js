/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
require("dotenv").config();
const axios = require("axios");

exports.getCropSuggestions = onRequest((req, res) => {
  cors(req, res, async () => {
    logger.info("Received crop suggestion request");

    const { location, soil, season } = req.body;

    const prompt = `Suggest the best crops for a small Indian farmer based on:
    - Location: ${location}
    - Soil: ${soil}
    - Season: ${season}`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const suggestion = response.data.candidates[0].content.parts[0].text;
      res.status(200).send({ suggestion });
    } catch (err) {
      logger.error("Error generating suggestion", err);
      res.status(500).send({ error: err.toString() });
    }
  });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
