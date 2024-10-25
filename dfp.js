const fs = require("fs");

function parseFile(indata, outdata, delimiter = ';') {
    // Check if the input file exists, if it doesn't return -1
    if (!fs.existsSync(indata)) {
        return -1;
    }
    // Clear the output file or create it if it doesn't exist
    fs.writeFileSync(outdata, '');
    // Read the input file content
    const inputContent = fs.readFileSync(indata, 'utf8');
    const lines = inputContent.split('\n');
    // Skip the first line (header) and filter out empty lines
    const records = lines.slice(1) // Skip the header
                         .filter(line => line.trim() !== "") // Remove empty lines
                         .map(line => {
                             const parts = line.split(delimiter);
                             if (parts.length < 2) return null; // Ensure there are at least two parts
                             const sentiment = parts[1].trim();
                             const review = parts[0].trim().slice(0, 20); // Get review trimmed to 20 characters
                             return `${sentiment}${delimiter}${review}`;
                         })
                         .filter(Boolean); // Remove null values
    // Write all records to the output file in one go
    if (records.length > 0) {
        fs.writeFileSync(outdata, records.join('\n') + '\n');
    }
    return records.length; // Return the number of records written
}

// Leave this code here for the automated tests
module.exports = {
    parseFile,
};