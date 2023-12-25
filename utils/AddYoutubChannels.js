// Import necessary libraries
const axios = require("axios");
const fs = require("fs");
const csv = require("csv-parser");

// Read the CSV file
const filePath = "./data/TemporaryData/temp/youtubChannels.csv";
const teachers = [];

try {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      try {
        teachers.push({
          title: row["Teacher Name"],
          subTitle: row["Youtube Channel Username"],
          type: "youtube",
          subject: row["Subject"],
          tags: row["Tags"], // Assuming tags are separated by commas in the CSV
          description: row["Description"],
          image: row["Youtube Channel Username"] + ".png",
          link: row["Link to the channel"],
          //   followers: parseInt(row['Followers']) // Assuming Followers are integers in the CSV
        });
      } catch (err) {
        console.log(err);
      }
    })
    .on("end", () => {
      // Once all data is read from the CSV

      try {
        // Replace this with your API endpoint
        const apiUrl = "http://localhost:3000/api/ressources";

        // Example payload structure (modify as needed based on your API requirements)
        const payload = {
          resources: teachers,
        };

        // Make a POST request using Axios
        teachers.forEach((teacher) => {
          teacher.tags = teacher.tags.replace("/", ",");
          teacher.tags = teacher.tags.replace("#", ",");
          axios
            .post(apiUrl, teacher)
            .then((response) => {
              console.log("Resource addition successful:", response.data);
            })
            .catch((error) => {
              console.error("Error adding resources:", error);
            });
        });
      } catch (err) {
        console.log(err);
      }
    });
} catch (err) {
  console.log(err);
}
