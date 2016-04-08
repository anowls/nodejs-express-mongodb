var express = require('express');
var router = express.Router();

var mongo = require('../routes/conn/mongo')

/* GET users listing. */

router.get('/', function(req, res, next) {

    mongo.open(function(error,db){
        console.log(objectId)
        if(error) throw error
        db.collection('knowledgePoint',{safe: true},function(err,collection){
            if(err) throw err
            collection.find().limit(2).toArray(function(e,results){
                if(e) throw e
                res.render('users',{results:results})
            })
        })
    })

});

module.exports = router;
