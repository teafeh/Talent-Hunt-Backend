function isEmpty(value) {
  return !value || String(value).trim() === "";
}

function validateSubmission(body) {
  const errors = [];

  if (isEmpty(body.mode)) {
    errors.push("Mode is required.");
  }

  if (isEmpty(body.ideaTitle)) {
    errors.push("Idea title is required.");
  }

  if (isEmpty(body.idea)) {
    errors.push("Idea is required.");
  }

  if (isEmpty(body.audience)) {
    errors.push("Audience is required.");
  }

  if (isEmpty(body.problem)) {
    errors.push("Problem is required.");
  }

  if (isEmpty(body.howItWorks)) {
    errors.push("How it works is required.");
  }

  if (!body.contact || typeof body.contact !== "object") {
    errors.push("Contact details are required.");
  } else {
    if (isEmpty(body.contact.fullName)) {
      errors.push("Full name is required.");
    }

    if (isEmpty(body.contact.schoolClass)) {
      errors.push("School/Class is required.");
    }

    if (isEmpty(body.contact.email)) {
      errors.push("Email is required.");
    }

    if (isEmpty(body.contact.phone)) {
      errors.push("Phone number is required.");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = validateSubmission;
