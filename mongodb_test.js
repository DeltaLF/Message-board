var MongoClient=require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/mymondb"
MongoClient.connect(url, function(err, db) {
    console.log("Connected successfully to server");
  
    /*
    // 插入新的資料
    insertDocuments(db, function() {
      db.close();
    });*/
    findDocuments(db,function(){
        console.log("first find doc")
    })
    removeDocument(db,function(){
        console.log("finish removing")
    })
    updateDocument(db,function(){
        console.log("finish updating")
    })
    findDocuments(db,function(){
        db.close()
    })

  });
  var removeDocument = function(db,callback){
      console.log("remove");
      var db = db.db();
      var collection = db.collection('documents');
      collection.deleteOne({a:2},function(err,result){
          console.log("remove the documebt with the field a equal to 2");
          callback(result);
      })
  }
  var updateDocument = function(db,callback){
      console.log("laal")
      var db = db.db();
      var collection = db.collection('documents');
      collection.updateOne({a:3},{$set:{cc:1},function(err,result){
          console.log("update the document with the field a equal = 1");
          console.log(result)
          callback(result);
      }})
  }
  var findDocuments = function(db,callback){
      //var db = db.db()
      var collection = db.db().collection('documents');
      collection.find({}).toArray(function(err,result){
          if (err) throw err;
          console.log(result)
          callback()
      })
  } 
  var insertDocuments = function(db, callback) {
    var db = db.db('mymondb');
    //console.log(db.version())
    var collection = db.collection('documents');  // table name
    // 寫入資料
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      // callback 回傳結果
      console.log("Inserted 3 documents into the collection");
      callback(err, result);
    });
  }


/*
MongoClient.connect(url,function(err,db){
    console.log("connect to server")
    var db = db.db('mymondb');
    var collec = db.collection("table1")
    collec.insertOne({lala:"wu"})
})

var express = require('express');
var app = express();
app.get('/',function(req,res){
MongoClient.connect("mongodb://localhost:27017/mymondb",function(err,db){
 
   if(err) throw err;
   //Write databse Insert/Update/Query code here..
   var db = db.db('mymondb');
   console.log(db.collection)
   console.log(typeof db.collection)

   //db.collection.insertOne({hey:"hi"})
   var collec = db.collection("table1")
   collec.insertOne({lala:"wu"})
   collec.insertOne({lala1:"wu1"})
   collec.insertOne({lala2:"wu2"})
   collec.find().toArray(function(err,docs){
      console.log("wulala")
      console.log(docs)
      console.log(docs[0]);
      console.log(docs[0].lala1)
   })
   collec.remove({lala:"wu"},function(err,numberOfRemovedDocs){
      console.log(numberOfRemovedDocs);
   })
   /* 
   db.collection('Persons',function(err,collection){
    collection.insert({ id:1, firstName:'Steve', lastName:'Jobs' });
    collection.insert({ id:2, firstName:'Bill', lastName:'Gates' });
    collection.insert({ id:3, firstName:'James', lastName:'Bond' });
 
    collection.count(function(err,count){
        if(err) throw err;
        console.log('Total Rows:'+count);
    });
  });
  
});

*/