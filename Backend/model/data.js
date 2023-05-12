const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: "String",
  },
  Email: {
    type: "String",
    unique: true,
  },
  MobileNo: {
    type: "Number",
  },
  DateofBirth: {
    type: "String",
  },
  WordExperience: {
    type: "String",
  },
  ResumeTitle: {
    type: "String",
  },
  CurrentLocation: {
    type: "String",
  },
  PostalAddress: {
    type: "String",
  },
  CurrentDesignation: {
    type: "String",
  },
});

module.exports = mongoose.model("data", dataSchema);
