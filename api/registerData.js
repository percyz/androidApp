// func for register

var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function registerData(db, firstname, lastname, email, password, phone, callback){

    var collectionUser = db.collection('users');

        bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB. 
            console.log("hashed password: ", hash);
            //var queryStr = {"emails[0].address": name, "services.password.bcrypt": hash};
            //$2a$10$ZXXrl77Gvs7Qu3wn2QL3fOZNsikJzjgmnmKPPKi7fSXzXa3.lyrDe
            blankSpace = " ";
            var fullname = firstname.concat(blankSpace, lastname);
            var idstr = email + Math.random(1,100);            
            idstr = Base64.encode(idstr);
            var queryStr = { "_id":idstr, "createdAt": Date(), "profile": {"name": fullname, "phone": phone, "organisation":[], "points":"", 
                             "date": Date.now()}, "emails":[{"address":email, "verified":false}], "services":{"password":{"bcrypt":hash}}};
            console.log('queryStr is !!!:', queryStr); 
            collectionUser.insert(queryStr, function(err, result) {
                if(err) 
                {
                    console.log('Error2:'+ err);
                }
                console.log('register result:', result);
                callback(result);
            });
        /*otherPlaintextPassword = "123321"
            bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
                console.log("conpare result: ", res); 
            });
        */
        });
};


