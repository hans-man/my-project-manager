const { Command } = require('commander');
const buildUserCommand = require('./commands/user');

// Create the main program
const program = new Command();

program
  .name('pm-tool')
  .description('A simple file-based project management CLI tool')
  .version('1.0.0');

// Add commands from other files
program.addCommand(buildUserCommand());

// Parse the arguments from the command line
program.parse(process.argv);
