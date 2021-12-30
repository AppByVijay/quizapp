const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const connectionString = 'mongodb://127.0.0.1:27017';

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());


app.get('/login', (req, res)=>{
    mongoClient.connect(connectionString, function(err, clientObject){
        if(!err){
            const dbo = clientObject.db('quizdb');
            dbo.collection('users').find({}).toArray(function(err, documents){
                if(!err){
                    res.send(documents);
                }
            })
        }
    });
});


app.post('/register', (req, res)=>{
    mongoClient.connect(connectionString, function(err, clientObject){
        if(!err){
            const dbo = clientObject.db('quizdb');
            var data = {
                Name: req.body.Name,
                Email: req.body.Email,
                Password: req.body.Password
            }
            dbo.collection('users').insertOne(data, function(err, result){
                if(!err) {
                    console.log('Record Inserted');
                }
            })  
        }
    });
});


app.listen(5000);
console.log(`Server Listening : http://127.0.0.1:5000`);