const bcrypt = require("bcrypt");

// Plaintext passwords to hash
const passwords = ["password1", "password2"];

// Function to hash passwords
async function hashPasswords(passwords) {
  const hashedPasswords = await Promise.all(
    passwords.map(async (password) => {
      const hash = await bcrypt.hash(password, 10); // Hash with salt rounds
      return hash;
    })
  );

  console.log("Hashed Passwords:", hashedPasswords);
}

hashPasswords(passwords);
