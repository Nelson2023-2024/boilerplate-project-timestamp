// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Helper function to check if date is invalid
const isInvalidDate = (date) => date.toString() === "Invalid Date";

// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // If no date is provided, use the current date
  if (!date) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
  }

  let parsedDate = new Date(date);

  // If date string is invalid, try to parse as Unix timestamp
  if (isInvalidDate(parsedDate)) {
    parsedDate = new Date(parseInt(date));
  }

  // If still invalid, return error
  if (isInvalidDate(parsedDate)) {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid date in both Unix and UTC formats
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Your app is listening on port http://localhost:" + listener.address().port
  );
});
