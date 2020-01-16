const fs = require('fs');
const request = require('request');

let args = process.argv;
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(args[2], (error, response, body) => {
  if (error) {
    return console.log('error: ', error);
  }
  if (!fs.existsSync(args[3])) {
    return console.log("ERROR: Invalid file path");
  } else if (fs.existsSync(args[3]) && args[2]) {
    rl.question("The file already exists, overwrite Y/N?", (answer) => {
      if (answer === "Y") {
        writing(body, args[3]);
      } else if (answer === "N") {
        console.log("Cannot write file");
      }
    });
  } else {
    writing(body, args[3]);

  }
});

const writing = function(file, path) {
  fs.writeFile(path, file, (err) =>{
    const stats = fs.statSync(path);
    const fileSizeInBytes = stats["size"];
    if (err) throw err;
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${path}`);
  });
};

