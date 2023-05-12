const express = require("express");
const router = express.Router();
const data = require("../model/data");
const multer = require("multer");
const xlsx = require("xlsx");
const async = require("async");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("excelFile"), (req, res) => {
  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const candidateData = xlsx.utils.sheet_to_json(worksheet);

  async.eachSeries(
    candidateData,
    async (candidate) => {
      const existingCandidate = await data.findOne({
        Email: candidate["Email"],
      });
      if (existingCandidate) {
        console.log(
          `Skipping duplicate candidate with email: ${candidate["Email"]}`
        );
        return res.status(404);
      }

      try {
        await data.create({
          name: candidate["Name of the Candidate"],
          Email: candidate["Email"],
          MobileNo: candidate["Mobile No."],
          DateofBirth: candidate["Date of Birth"],
          WordExperience: candidate["Work Experience"],
          ResumeTitle: candidate["Resume Title"],
          CurrentLocation: candidate["Current Location"],
          PostalAddress: candidate["Postal Address"],
          CurrentDesignation: candidate["Current Designation"],
        });
      } catch (err) {
        return res.status(500).send("Error Occured");
      }
    },
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error Occurred");
      } else {
        return res.status(200).send("Data added successfully");
      }
    }
  );
});

module.exports = router;
