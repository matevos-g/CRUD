var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var app = express()
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const connectionString = 'mongodb+srv://matevos-g:Matos1984@crud.ydeqrqw.mongodb.net/Tumo_products';
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(express.static('public'))

app.get("/data/products", function (req, res) {
    
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            const theater = await mongoose.connection.db.collection('products').find().toArray();
            res.render('../public/products.ejs',{
                info: theater
            })
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mongoose.connection.close();
        }
        
    })    
})

app.get("/", function (req, res){
    res.render('../public/form.ejs')
})

app.get("/update/:id", function (req, res) {
    var id = req.params.id;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let theater = await mongoose.connection.db.collection('products').findOne({_id: new ObjectId(id)});
            res.render('../public/update.ejs', {
                obj: theater
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.post("/updateData", function (req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const des = req.body.description;
    const uuid = req.body.uuid;
    const id = req.body.id;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            let result = await mongoose.connection.db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: { name: name, price: price, description: des, uuid: uuid } }
            );

            res.redirect("/data/products")
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            mongoose.connection.close();
        }
    });
});

app.post("/addInfo", function (req, res) {
    const Name = req.body.name;
    const Price = req.body.price;
    const Desc = req.body.desc;
    const Uuid = req.body.uuid;
    console.log(Name,Price,Desc,Uuid);
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try {
            const theater = await mongoose.connection.db.collection('products').insertOne({
                name: Name,
                price: Price,
                desc: Desc,
                uuid: Uuid,
            });
            res.redirect('/')
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mongoose.connection.close();
        }
        
    })
})

app.get("/delete/:id", function (req, res) {
    var id = req.params.id;
       mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
       const db = mongoose.connection;
       db.on('error', console.error.bind(console, 'Connection error:'));
       db.once('open', async () => {
           try {
               let result = await mongoose.connection.db.collection('products').deleteOne({_id: new ObjectId(id)});
               res.redirect('/data/products')
           } catch (error) {
               console.error('Error retrieving movies:', error);
           } finally {
               mongoose.connection.close();
           }
       })
   });

app.get("/*", function (req, res) {
    res.send("<h1>The Page You Are Looking For Is Unavailable (Error 404)</h1>")
})

app.listen(3000, function () {
    console.log("Running In 3000");
})