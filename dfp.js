const fs = require("fs");

function parseFile(indata, outdata, delimiter = ';') {
    if (!fs.existsSync(indata)) return -1; // Checks if the input file exists then return -1 if the file does not exist

    clearOutputFile(outdata); // Clear or create the output file

    const inputContent = fs.readFileSync(indata, 'utf8'); // Read the input file in UTF-8 encoding
    const lines = inputContent.split('\n'); // Split the input into lines
    
    let recordCount = 0; // Initialize a counter for records written

    // Process each line, starting from the second line to skip the header
    lines.slice(1).forEach(line => {
        if (line.trim()) { // Skip empty lines
            const transformedLine = transformLine(line, delimiter);
            if (transformedLine) {
                fs.appendFileSync(outdata, transformLine + '\n'); //Append the transformed line
                recordCount++; // Increment the record count
            }
        }
    });

    return recordCount; // Return the total number of records written
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