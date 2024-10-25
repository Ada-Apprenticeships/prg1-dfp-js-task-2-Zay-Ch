const fs = require("fs");

function parseFile(indata, outdata, delimiter = ';') {
    // Check if the input file exists, if it doesn't return -1
    if (!fs.existsSync(indata)) {
        return -1;
    }

    fs.writeFileSync(outdata, ''); // This will create the file if it doesn't exist, or clear it if it does
    const inputContent = fs.readFileSync(indata, 'utf8');
    const lines = inputContent.split('\n');
    let recordCount = 0; // recordCount initializes a counter for the records written
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.trim() === "") continue; // Skip empty lines
        if (i === 0) continue; // Ignore the header row

        const parts = line.split(delimiter); // Split the line using the specified delimiter
        if (parts.length < 2) continue; // Ensure there are at least two parts

        const sentiment = parts[1].trim();
        const review = parts[0].trim().slice(0, 20); // Get review trimmed to 20 characters

        fs.appendFileSync(outdata, `${sentiment}${delimiter}${review}\n`); // Append each transformed line
        recordCount++; // Increment the record count
    }
    return recordCount;
}

// Leave this code here for the automated tests
module.exports = {
    parseFile,
};
