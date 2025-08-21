const fs = require("fs");
const data = require("./transformSearch.js");

fs.writeFile("transform_output_7.json", JSON.stringify(data), (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("Successfully saved");
  }
});
