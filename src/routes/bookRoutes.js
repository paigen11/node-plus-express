const express = require('express');
const bookRouter = express.Router();
const mongodb = require('mongodb').MongoClient; //remember sudo mongod to run mongodb locally
const ObjectId = require('mongodb').ObjectID;

const router = function(nav){

    bookRouter.route('/')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                mongodb.connect(url, function(err, db) {
                   var collection = db.collection('books');
                   collection.find({}).toArray(
                       function(err, results) {
                           res.render('bookListView', {
                               title: 'Books',
                               nav: nav,
                               books:results
                           });
                       }
                   );
                });
            });
        });

    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');

                collection.findOne({_id:id},
                    function(err, results) {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            books: results
                        });
                    }
                );
            });
        });


    return bookRouter;
}

module.exports = router;