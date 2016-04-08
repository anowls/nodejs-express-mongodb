var express = require('express');
var router = express.Router();

var mongo = require('../routes/conn/mongo')
var mysql = require('../routes/conn/mysql')

/* GET home page. */

router.get('/', function(request, response, next) {
    //var selectSql = 'select * from pic_type where type_id=?';
    //mysql.query(selectSql, [5], function (err, res) {
    //    if (err)
    //        console.log('getUserbyUsername err:' + err);
    //});
    response.render('index');
});

router.route("/add").post(function(request ,response){
    var effect = request.body.effect
    var practice = request.body.practice
    var content = request.body.content
    var experience = request.body.experience

    mongo.open(function(error,db){
        if(error) throw error ;

        db.collection("knowledgePoint",{safe:true},function(err,collection){
            if(err) throw err;
            //address:{ "$ref": "section", "$id": "56e64e218c11b93c20639a38", "$db": "philosophy"},
            //collection.insert({effect:effect,practice:pratice,content:content,experience:experience},{safe:true},function(e,result){
            //    if(e) throw e;
            //    console.log('jia',result);
            //});
        });
    });

    response.render('success',{message:'ok'})

})

module.exports = router;
