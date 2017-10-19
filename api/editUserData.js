// func for edit user info

module.exports = function editUserData(db, oldemail, firstname, lastname, email, password, phone, callback){

    var collectionUser = db.collection('users');

        bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB. 
            console.log("hashed password: ", hash);
            //var queryStr = {"emails[0].address": name, "services.password.bcrypt": hash}; 
            //$2a$10$ZXXrl77Gvs7Qu3wn2QL3fOZNsikJzjgmnmKPPKi7fSXzXa3.lyrDe 
            
            blankSpace = " ";
            var fullname = firstname.concat(blankSpace, lastname); 
            var whereStr = {"emails.address": oldemail};
            var updateStr = {$set: {"profile.phone": fullname, "profile.phone": phone, "emails.0.address": email, 
                                    "services.password.bcrypt": hash}};
            console.log('queryStr is !!!:', updateStr); 
            collectionUser.update(whereStr, updateStr, function(err, result) {
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