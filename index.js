var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var app = express()

const mongoose = require('mongoose');
const { stringify } = require("querystring");
const { log } = require("console");
const connectionString = 'mongodb+srv://matevos-g:Matos1984@crud.ydeqrqw.mongodb.net/sample_mflix';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB!');

    try {
        const allMovies = await mongoose.connection.db.collection('movies').find().toArray(); // .insertMany(newMovies);

        console.log('All Movies:', allMovies);
    } catch (error) {
        console.error('Error retrieving movies:', error);
    } finally {
        mongoose.connection.close();
    }
}) 



// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, './public/form.html'))
// })``
// app.post("/addInfo", function (req, res) {
//     const Name = req.body.Name
//     const Password = req.body.Password
//     console.log(Name, Password, "ME");
// })
// app.get("/*", function (req, res) {
//     res.send("<h1>The Page You Are Looking For Is Unavailable (Error 404)</h1>")
// })

// app.listen(3000, function () {
//     console.log("Running In 3000");
// })