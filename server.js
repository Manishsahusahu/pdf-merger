const express = require("express");
const path = require("path");
const multer = require("multer");
const { mergePdf } = require("./mergePdfs");
const upload = multer({ dest: "uploads/" });

const app = express();
app.use("/static", express.static("public"));
const port = 3000;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async function (req, res, next) {
  console.log(req.files);

  let resultPdf = await mergePdf(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );

  res.redirect(`http://localhost:3000/static/${resultPdf}.pdf`);
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
