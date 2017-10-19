// func for get user points

module.exports = function getPoints(db, email, callback) {

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
            console.log("the points : ", result.profile.points);
            if(result.profile.points != null){              
                var userPionts =  result.profile.points.toString();
                callback(userPionts);  
            }else{
                callback('0'); 
            }
        }else{
            console.log("can not get the points");
        }

        //callback(result[0].emails[0].address); 
   });
}