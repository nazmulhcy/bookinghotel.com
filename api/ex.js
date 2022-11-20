import express from "express";
var app = express();
var PORT = 3000;

app.get("/", (req, res) => {
  res.send("Akas Request Called");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
