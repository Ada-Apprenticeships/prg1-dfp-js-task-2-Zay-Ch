const fs = require("fs");

function parseFile(indata, outdata, delimiter = ';') {
    // Step 1: Check if the input file exists
    if (!fs.existsSync(indata)) {
        return -1; // Return -1 if the file does not exist
    }

    // Step 2: Clear the output file (create or overwrite)
    fs.writeFileSync(outdata, ''); // This will create the file if it doesn't exist, or clear it if it does

    // Step 3: Read the input file in UTF-8 encoding
    const inputContent = fs.readFileSync(indata, 'utf8');
    
    // Step 4: Split the input into lines
    const lines = inputContent.split('\n');
    let recordCount = 0; // Initialize a counter for records written

    // Step 5: Process each line
    for (let i = 0; i < lines.length; i++) { // Start from 0, will handle header later
        let line = lines[i];
        if (line.trim() === "") continue; // Skip empty lines

        // Step 6: Handle header row
        if (i === 0) {
            continue; // Ignore the header row
        }

        // Step 7: Split the line using the specified delimiter
        const parts = line.split(delimiter);
        if (parts.length < 2) continue; // Ensure there are at least two parts

        const sentiment = parts[1].trim(); // Get sentiment
        const review = parts[0].trim().slice(0, 20); // Get review trimmed to 20 characters

        // Step 8: Write the transformed data to the output file
        // Use the specified delimiter for output
        fs.appendFileSync(outdata, `${sentiment}${delimiter}${review}\n`); // Append each transformed line
        recordCount++; // Increment the record count
    }

    // Step 9: Return the total number of records written
    return recordCount;
}

// Leave this code here for the automated tests
module.exports = {
    parseFile,
};