/* The server side of app */

var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var Base64 = require('js-base64').Base64;

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json()); 
var bcrypt = require('bcrypt');
const saltRounds = 10;
var SHA256 = require("crypto-js/sha256");

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = "mongodb://appadmin:mcqlwzj0301ml@ds161001.mlab.com:61001/geia_app_db"; 
//var DB_CONN_STR = "mongodb://geia2017:Gr33nfutur3@ds119250.mlab.com:19250/geia2017";

/* import api function */
var getOrgsInfo = require('./api/getOrgsInfo');
var showUser = require('./api/showUser');
var loginData = require('./api/loginData');
var registerData = require('./api/registerData');
var editUserData = require('./api/editUserData');
var scannerData = require('./api/scannerData');
var getPoints = require('./api/getPoints');

/* 
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.route('/user')
  .get(function (req, res) {
  res.send('Hello, get The first app backend!');
})
  .post(function (req, res) {
  res.send('Hello, post The first app backend!');
});

app.get('/org/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.send('regular')
})

// handler for the /user/:id path, which renders a special page
app.get('/org/:id', function (req, res, next) {
  console.log("request type, URL, id:", req.method, req.originalUrl, req.params.id);
  res.send('special');
})

app.get('/about.text/a', function (req, res, next) {
    console.log('res will be sent by next func');
    next();
}, function (req, res){
   res.send('Hello, next about', Date.now());
});

app.get('/user', function (req, res) {
  console.log("/ab*cd GET require");
  var username = req.body.username;
  var password = req.body.password;
  res.send('Got a PUT request at /user');
});

*/

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var queryStr = {"profile.name": 'Gery zhang'}
var dataMongo = {};
var nameMongo = "test1";

MongoClient.connect(DB_CONN_STR, function(err, db) {

    if(!err) {
        console.log("Connecting successfully!");

        //dataMongo =  db.collection('user');

        setData(db, function(result) {
            //console.log("setData result:",result);
            if(result != ""){
                console.log("find the result!");
            }
            console.log("Server side finish");
            dataMongo = result; 
            nameMongo = "test2";
            //db.close(); 
        });     
        console.log("Connecting dataMongo!");

        //register: Create a new user

        app.post('/users', function(req, res) {

            console.log('post............');
            console.log('get register from frontend:', req.body); 
            console.log('json: '+JSON.stringify(data));

            registerData(db, req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.phone, function(result){
              if(result != null){
                console.log("register successfully!");
                res.send({"registerstate":true});
              }else{
                console.log('cannot register it');
                //res.send(JSON.stringify(data));
              }
            }); 
            console.log('json: '+JSON.stringify(data));
        });

        //Edit user account

        app.post('/users/edit', function(req, res) {

            console.log('post............');
            console.log('get register from frontend:', req.body); 
            console.log('json: '+JSON.stringify(data));

            editUserData(db, req.body.oldemail, req.body.firstname, req.body.lastname, req.body.email, 
                         req.body.password, req.body.phone, function(result){
              if(result != null){
                console.log("edit successfully!");
                res.send({"editstate":true});
              }else{
                console.log('cannot register it');
                //res.send(JSON.stringify(data));
              }
            }); 
            console.log('json: '+JSON.stringify(data));
        });

        //login: Authenticate and retrieve the access and refresh tokens in exchange of email/password  

        app.post('/users/auth', function(req, res) {

            console.log('post............');
            console.log('get name from frontend:', req.body.email); 
            console.log('get password from frontend pw:', req.body.password);
            console.log('get password from frontend phone:', req.body.mphone);

            loginData(db, req.body.email, req.body.password, req.body.mphone, function(result){
                console.log("callback result: ",result);
              if(result == 1){
                console.log("find the result!");
                res.send({"verifystate":1});
              }else if(result == 2){
                console.log('cannot find user email');
                res.send({"verifystate":2});
              }else{
                console.log('password not match');
                res.send({"verifystate":3});
              }
            }); 
            console.log('json: '+JSON.stringify(data));   
        });

        //Authenticate and retrieve the access token in exchange of the refresh token.

        app.post('/users/auth/refresh', function(req, res) {
            console.log('post............');
            console.log('get register from frontend:', req.body); 
            console.log('json: '+JSON.stringify(data));
            res.end(JSON.stringify(data));
        });

       //Log out, revoke access by destroying the user tokens

        app.post('/users/auth/revoke', function(req, res) {
            console.log('post............');
            console.log('get register from frontend:', req.body); 
            console.log('json: '+JSON.stringify(data));
            res.end(JSON.stringify(data));
        });

        //qr code, scanner and send code to database
       
        app.post('/scanner', function(req, res) {

            console.log('post............');
            console.log('post data:', req.body); 

            scannerData(db, req.body.qr, req.body.user, function(result){
            if(result > 0){
                console.log("find the result!: ", result);
                res.send({"verifystate":result});
            }else{
                console.log('cannot find it');
                res.send({"verifystate":0});
              }
            }); 
            //console.log('json: '+JSON.stringify(data));   
        });

        //Profile: show user info

        app.post('/users/info', function(req, res) {

            console.log('post............');
            console.log('get name from frontend:', req.body.email); 

            showUser(db, req.body.email, function(result){
              if(result != null){
                console.log("find the result!");
                res.send(result);
              }else{
                console.log('cannot find it');
                res.send(JSON.stringify(data));
              }
            }); 
            console.log('json: '+JSON.stringify(data));   
        });

       // for test

        app.get('/orgs', function(req, res) {
            console.log('get..........');
            console.log('get query: ', req.query);
            if (res != null) {
                getOrgsInfo(db, function(result){
                    console.log("get orgs callback: ", result);
                    res.send(result);
                });            
            }else{
                console.log('json: '+JSON.stringify(data));
                res.end(JSON.stringify(data));
            }
        });

        // for get user points

        app.post('/scanner/points', function(req, res) {

            console.log('post............');
            console.log('post data:', req.body); 

            getPoints(db, req.body.user, function(result){
            if(result != ''){
                console.log("find the result!");
                res.send({"points":result});
            }else{
                console.log('cannot find it');
                res.send({"points":result});
              }
            }); 
            console.log('json: '+JSON.stringify(data));   
        });

   }else{
        console.log('Error1:' + err);
    }
});

var data = { "name": nameMongo, "age": "19" };

app.listen(8085, function () {
  console.log('Example app listening on port 3000!');
});

// func for test

var setData = function(db, callback) {

   //connect site
    var collectionUser = db.collection('users');
    var collectionOrgs = db.collection('organisations');
    var collectionQr = db.collection('qr');

   //define data
    var data = [
        {"firstName":"Gery","lastName":"Zhang"},{"firstName":"Casey","lastName":"Dell"}
    ];
    var whereStr = {"profile.name": 'Gery zhang'};
    var whereNam = {"name": 'Panda food'};
    var updateStr = {$set: {"town": 'Queenstown'}};
   //insert data
  /* 
   collectionUser.count(whereStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        } 
        callback(result);
   });
  
*/
   collectionUser.findOne(whereStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        //console.log("address",result[0].emails[0].address);
        //console.log("is is id",result);
        callback(result);  
        //callback(result[0].emails[0].address); 
   });
   
    testStr = {"ar.qr": "http://www.championk3SktoEidicwoRXhA"};
    collectionQr.findOne(testStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }else{
                updateStrQr = {$inc: {"ar.$.count": 1}};
                /*
                collectionQr.update(testStr, updateStrQr, function(err, result) {
                if(err)
                {
                    console.log('Error:'+ err);
                    return;
                }
                console.log("org count in qr collection updated");
            });
            */
            callback(result);
        }
        //console.log("address",result[0].emails[0].address);
        console.log("is is id",result);
        callback(result);  
        //callback(result[0].emails[0].address); 
   });


    collectionOrgs.find({}).toArray(function(err, result) {
        console.log("first org id:", result[0]._id);
        //console.log("first org id 2 :", result[0]);
        //console.log("first org id 3 :", result);
        //callback(result);
    });

 /*
   var queryStr = {"emails.address": 'percy.z@outlook.com', "profile.phone": '0221866247'};  
    collectionUser.count(queryStr, function(err, result) {
        if(err)
        {
            console.log('Error2:'+ err);
        } 
        console.log('result',result);
        //callback(result);
    });

    collectionUser.find(whereStr).toArray(function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        } 
        console.log("emailsssssss");
        console.log("emails");
        //console.log("address",result[0].emails[0].address);
        //console.log("is is id",result[0].emails[0].address);
        callback(result); 
        //callback(result[0].emails[0].address); 
   });
    collectionOrgs.insert({
        "name": 'Bird food',
        "town": 'Dunedin',
        "Region": 'Otago'
    });

   collectionOrgs.update(whereNam, updateStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
    */
}