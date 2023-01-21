const express = require('express')
const app = express();
const bodyParser = require("body-parser");

const port = 3000

// disini import file wa.js dari folder router, sebelumnya harus di export dari wa.js *router file()
const router = require("./routers/wa")

// disini body parser agar bisa menggunakan method POST (untuk pengetesan via Postman)
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})