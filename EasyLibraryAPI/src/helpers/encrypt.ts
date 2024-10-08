import bcrypt from 'bcrypt';

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function compare(userInputPassword, storedHashedPassword,authenticated) {
  bcrypt.compare(
    userInputPassword,
    storedHashedPassword,
    async (err, out) => {
      if (err) {
        // Handle error
        console.error("Error comparing passwords:", err);
        authenticated(false);
        return;
      }
      if (out) {
        // Passwords match, authentication successful
        console.log("Passwords match! User authenticated.");
        authenticated(true);
        return;
      } else {
        // Passwords don't match, authentication failed
        console.log("Passwords do not match! Authentication failed.");
        authenticated(false);
        return;
      }
    }
  );
}

export { compare, hashPassword };
