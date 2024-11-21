const fs = require("fs");
const path = require("path");

// This is the base directory where you want to start the search.
const baseDir = "./"; // Change this to the path where your source code is located.

// The output file where all content will be stored.
const outputFile = "combined_content.txt"; // This file will store all content.

function writeContentToFile(filePath, content) {
  // Create or append content to the output file.
  const contentWithComment = `// Path: ${filePath}\n${content}\n\n`;
  fs.appendFileSync(outputFile, contentWithComment, "utf8");
}

function readDirectoryRecursive(directoryPath) {
  const filesAndDirs = fs.readdirSync(directoryPath);

  filesAndDirs.forEach((fileOrDir) => {
    const fullPath = path.join(directoryPath, fileOrDir);

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      // If it's a directory, call the function recursively to read its content.
      readDirectoryRecursive(fullPath);
    } else if (stats.isFile()) {
      // If it's a file, read the content and append it to the output file.
      const content = fs.readFileSync(fullPath, "utf8");
      writeContentToFile(fullPath, content);
    }
  });
}

// Start reading from the base directory.
if (fs.existsSync(baseDir)) {
  fs.writeFileSync(outputFile, "", "utf8"); // Clear the output file before starting.
  readDirectoryRecursive(baseDir);
  console.log(`All content has been written to ${outputFile}`);
} else {
  console.error("The specified base directory does not exist!");
}
