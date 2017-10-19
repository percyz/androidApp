// func for scanning the qr code

module.exports = function scannerData(db, qrcode, user, callback){

    var collectionUser = db.collection('users');
    var collectionQr = db.collection('qr');
    console.log("qrcode url: ", qrcode);

    //find relative collectio in qr

    whereStr = {"ar.qr": qrcode}; 
    collectionQr.findOne(whereStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }else{

            // result is an object in rq collection

            console.log("result id: ", result);

            // update qr collection

            //whereNamQr = {"ar.orgname": result.ar[0].orgname};
            if(result == null){
                // cannot find qr code
                callback('0');

            }else{
                console.log("result.ar.orgname", result.ar[0].orgname); 
                updateStrQr = {$inc: {"ar.$.count": 1}};
                collectionQr.update(whereStr, updateStrQr, function(err, result) {
                    if(err)
                    {
                        console.log('Error:'+ err);
                        return;
                    }
                    //console.log('result of qr update:', result);
                    //
                });
                //callback(result);
                // check org is champ/valid/qrcode

                switchStr = result.ar[0].status;
                //console.log("result.ar.status", result.ar[0].status);
                addPoints = 0;
                switch (switchStr){
                    case 'champ': 
                        addPoints = 50;
                        break;
                    case 'valid': 
                        addPoints = 10;
                        break;
                    case 'self': 
                        addPoints = 1;
                        break;
                };
                console.log("addPoints:", addPoints);
                callback(addPoints);

                // update user collection

                //whereNamUser = {"_id": user};
                whereNamUser = {"emails.address": user};
                collectionUser.findOne(whereNamUser, function(err, result){

                    // result is relative user

                    if(err)
                    {
                        console.log('Error:'+ err);
                    }else{
                        //console.log('find user without qr points:', result);
                        //console.log(" result.profile.points",  result.profile.points);
                        if(result != null){
                            if(result.profile.points == null){
                                updateStr =  {$set: {"profile.points": addPoints}};
                                collectionUser.update(whereNamUser, updateStr, function(err, result) {
                                    if(err)
                                    {
                                        console.log('Error:'+ err);
                                        return;
                                    }
                            });
                            }else{
                                updateStr = {$inc: {"profile.points": addPoints}};
                                collectionUser.update(whereNamUser, updateStr, function(err, result) {
                                    if(err)
                                    {
                                        console.log('Error:'+ err);
                                        return;
                                    }
                                    //console.log('result 5:', result); 
                                    //callback(result);
                                });
                            }
                        }else{
                            console.log("cannot find user");
                        }
                    }
                    //callback(result.profile.points);
                });
                //callback(result); 
            }
        }
   });
};
