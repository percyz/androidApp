// func for login

var bcrypt = require('bcrypt');
const saltRounds = 10;
var SHA256 = require("crypto-js/sha256"); 

module.exports = function loginData(db, email, myPlaintextPassword, mphone, callback){

    var collectionUser = db.collection('users');

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB. 
            console.log("plaintext password: ", myPlaintextPassword);
            console.log("hashed password: ", hash);
            
            //var queryStr = {"emails.address": email, "services.password.bcrypt": hash}; 
            //$2a$10$ZXXrl77Gvs7Qu3wn2QL3fOZNsikJzjgmnmKPPKi7fSXzXa3.lyrDe  
            //var queryStr = {"emails.address": email, "profile.phone": mphone};   
            var queryStr = {"emails.address": email}; 
            console.log('queryStr is !!!:', queryStr);      

            collectionUser.findOne(queryStr, function(err, result) {
                    if(err)
                    {
                        console.log('Username unavailable:'+ err);
                        return;
                    }else if(result != null){
                        console.log("myPlaintextPassword password: ", myPlaintextPassword);
                        console.log("hashed: ", result.services.password.bcrypt);
                      
                        bcrypt.compare(myPlaintextPassword, result.services.password.bcrypt, function(err, res) {
                            console.log("conpare result: ", res); 
                            if(res){
                                callback("1"); 
                            }else{
                                callback("3"); 
                            }
                            
                        });                
                        console.log("id result is the : ", result);

                        if(result.services.resume.appLoginToken == null){
                            console.log("insert app login token");
                            var tokenStr = email + Math.random(1,100);            
                            tokenStr = Base64.encode(idstr);
                            queryStr =  {
                                          "services.resume.appLoginToken.date": Date(),
                                          "services.resume.appLoginToken.base64Token": tokenStr
                                        };
                            collectionUser.insert(queryStr, function(err, result) {
                            if(err)
                                {
                                    console.log('Error:'+ err);
                                    return;
                                }
                            });
                        }else{
                            console.log("already have token");
                        }
                    }else{
                        console.log("cannot find it");
                        callback("2")
                    }
            });
        });
    });
};