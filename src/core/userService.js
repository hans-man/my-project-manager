const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const usersDir = path.join(__dirname, '..', '..', 'data', 'people');

/**
 * Ensures the directory for storing user files exists.
 */
function ensureUsersDirExists() {
  if (!fs.existsSync(usersDir)) {
    fs.mkdirSync(usersDir, { recursive: true });
  }
}

/**
 * Adds a new user by creating a markdown file with frontmatter.
 * @param {string} userName - The name of the user, used for the filename.
 * @param {object} details - An object with user details (e.g., email, team).
 * @returns {string} The path to the newly created file.
 */
function addUser(userName, details = {}) {
  ensureUsersDirExists();

  if (!userName || typeof userName !== 'string' || userName.trim() === '') {
    throw new Error('A valid user name must be provided.');
  }

  const safeUserName = userName.trim().replace(/\s+/g, '-');
  const filePath = path.join(usersDir, `${safeUserName}.md`);

  if (fs.existsSync(filePath)) {
    throw new Error(`User file '${safeUserName}.md' already exists.`);
  }

  const userData = {
    name: userName.trim(),
    createdAt: new Date().toISOString(),
    ...details,
  };

  const fileContent = matter.stringify('', userData);

  fs.writeFileSync(filePath, fileContent);
  console.log(`User file created at: ${filePath}`);
  return filePath;
}

module.exports = {
  addUser,
  usersDir,
};
