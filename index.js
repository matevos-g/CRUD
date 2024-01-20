var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, './public/form.html'))
})
app.post("/addInfo", function (req, res) {
    const Name = req.body.Name
    const Password = req.body.Password
    console.log(Name, Password);
})
app.get("/*", function (req, res) {
    res.send("<h1>The Page You Are Looking For Is Unavailable (Error 404)</h1>")
})

app.listen(3000, function () {
    console.log("Running In 3000");
})