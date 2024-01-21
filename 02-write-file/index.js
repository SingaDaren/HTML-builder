const { stdin, stdout, exit } = process;
const fs = require('fs');
const path = require('path');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Enter your text:\n');
stdin.on('data', (data) => {
  data.toString().trim() === 'exit' ? exit() : stream.write(data);
});

process.on('SIGINT', () => {
  exit();
});
process.on('exit', () => stdout.write("That's it! Have a nice day! C:"));
