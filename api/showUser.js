// func for show user info

module.exports = function showUser(db, email, callback) {

    var collectionUser = db.collection('users');
    console.log("emails:", email);
    var whereStr = {"emails.address": email};

       collectionUser.findOne(whereStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        //console.log("address",result[0].emails[0].address);
        console.log("is is id",result);
        if(result != null){
            callback(result);  
        }else{
            console.log("can not get the user info");
        }

        //callback(result[0].emails[0].address); 
   });
}