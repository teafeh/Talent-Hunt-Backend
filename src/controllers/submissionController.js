const generateSubmissionId = require("../utils/generateSubmissionId");
const validateSubmission = require("../utils/validateSubmission");
const { appendSubmissionRow } = require("../services/googleSheetsService");

async function createSubmission(req, res, next) {
  try {
    const validation = validateSubmission(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: validation.errors,
      });
    }

    const submissionId = generateSubmissionId();

    const {
      mode,
      ideaTitle,
      idea,
      audience,
      problem,
      howItWorks,
      interests = [],
      spark = [],
      contact,
    } = req.body;

    const rowData = [
      new Date().toISOString(),
      submissionId,
      mode,
      ideaTitle,
      idea,
      audience,
      problem,
      howItWorks,
      interests.join(", "),
      spark.join(", "),
      contact.fullName,
      contact.schoolClass,
      contact.email,
      contact.phone,
      "submitted",
      "",
      "",
      "",
    ];

    await appendSubmissionRow(rowData);

    return res.status(201).json({
      success: true,
      message: "Submission saved successfully.",
      submissionId,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSubmission,
};
