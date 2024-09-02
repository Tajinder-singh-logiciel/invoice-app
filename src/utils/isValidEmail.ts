function isValidEmail(email: string) {
  const emailPattern = /^[a-zA-Z0-9._%+-^]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the email matches the pattern
  if (!emailPattern.test(email)) {
    return false;
  }

  // Check the length of the email (you can adjust the min and max length as needed)
  const minEmailLength = 5;
  const maxEmailLength = 320; // The maximum length for email addresses according to the SMTP standard

  if (email.length < minEmailLength || email.length > maxEmailLength) {
    return false;
  }
  // If the email passes both checks, it's considered valid
  return true;
}

export default isValidEmail;
