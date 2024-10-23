const fs = require("fs"); // Importing fs to allow us to use it.
const readline = require('readline-sync'); // Import readline-sync for synchronous input

// Function to read in file contents
function readInFile(filename) {
  if (!fs.existsSync(filename)) {
    return []; // Return empty array if file does not exist
  }
  const data = fs.readFileSync(filename, "utf-8");
  return data.split(';').filter(line => line.trim() !== "");
}

const indata = datafile.csv
// Specify the input file path
const inputFilePath = './datafile.csv';
// Read the input file in UTF-8 encoding
const inputContent = fs.readFileSync(inputFilePath, 'utf8');
// Specify the output file path
const outputFilePath = './outputfile.csv';
// Clear the output file (create or overwrite)
fs.writeFileSync(outputFilePath, ''); // This will create the file if it doesn't exist, or clear it if it does


function parseFile (indata, outdata, delimiter = ';') {
  if (indata fs.existsSync) {
    console.log("File Exists");
  } else {
      console.log("-1");
      return -1;
  }
}


  



// Leave this code here for the automated tests
module.exports = {
  parseFile,
}