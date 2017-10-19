// func for get organisations info to leaderboard page.

module.exports = function getOrgsInfo(db, callback) { 
    var collectionOrgs = db.collection('organisations');
    console.log("get orgs working:");

    collectionOrgs.find({}).toArray(function(err, result) {
        console.log("first org id 2 :", result[0]._id);
        callback(result);
    });
}