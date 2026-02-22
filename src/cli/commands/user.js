const { Command } = require('commander');
const { addUser } = require('../../core/userService');

function buildUserCommand() {
  const userCommand = new Command('user')
    .description('Manage users in the system');

  userCommand
    .command('add <name>')
    .description('Add a new user')
    .option('-e, --email <email>', 'User\'s email address')
    .option('-t, --team <team>', 'User\'s team')
    .action((name, options) => {
      try {
        console.log(`Attempting to add user: ${name}`);
        const userDetails = {
          email: options.email,
          team: options.team,
        };
        // Filter out undefined properties
        const cleanDetails = Object.fromEntries(
          Object.entries(userDetails).filter(([_, v]) => v != null)
        );
        addUser(name, cleanDetails);
        console.log(`Successfully added user '${name}'.`);
      } catch (error) {
        console.error(`Error adding user: ${error.message}`);
      }
    });

  return userCommand;
}

module.exports = buildUserCommand;
