// func for login

var bcrypt = require('bcrypt');
var SHA256 = require("crypto-js/sha256"); 
var Base64 = require('js-base64').Base64;

module.exports = function authToken(db, email, loginToken, callback){

    var collectionUser = db.collection('users');

    var queryStr = {"emails.address": email}; 
    console.log('queryStr is !!!:', queryStr);      

    collectionUser.findOne(queryStr, function(err, result) {
            if(err)
            {
                console.log('Username unavailable:'+ err);
                return;
            }else if(result != null){                
                console.log("id result is the : ", result);

                if(result.services.resume.appLoginToken == null){
                    console.log("insert app login token");
                    var tokenStr = email + Math.random(1,100);            
                    tokenStr = Base64.encode(idstr);
                    queryStr =  {
                                    "services.resume.appLoginToken.date": Date(),
                                    "services.resume.appLoginToken.base64Token": "123456"
                                };
                    collectionUser.insert(queryStr, function(err, result) {
                    if(err)
                        {
                            console.log('Error:'+ err);
                            return;
                        }
                    });
                    callback("0");
                }else{
                    console.log("already have token");
                    if(result.services.resume.appLoginToken == loginToken){
                        callback("1");
                    }else{
                        callback("2");
                    }
                }
            }else{
                console.log("cannot find it");
                callback("2")
            }
    });
};