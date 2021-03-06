var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/proj_messageboard'
var db = null;

var fs = require('fs');
var FILENAME = 'data.json'

var DB = {
    connect : function(cb){
    MongoClient.connect(url,function(err,mongodb){
        console.log("connect to server");
        db = mongodb;
        cb(err)
    })
    },
    addPost: function(post, cb){ 
        var collection = db.db().collection('documents'); 
        collection.insert(post,function(err,res){
            if (err) throw err;
            console.log(res);
            cb(err,res);
        })
    },
    deletePost: function(id,cb){            // id:string posts[i].id:num
        var collection = db.db().collection('documents');
        collection.deleteOne({_id: ObjectId(id)},function(err,obj){
            if (err) throw err;
            console.log(obj);
            cb(err,obj)
        });
    },
    getPosts: function(cb){
        var collection = db.db().collection('documents');
        collection.find({}).toArray(function(err,docs){
            cb(err,docs);
        })
    }
}
module.exports = DB;