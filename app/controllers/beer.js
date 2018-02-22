'use strict';

// Load required packages
let Beer = require('../models/beer');

// Create endpoint /api/beers for POSTS
exports.postBeers = function(req, res) {
    // Create a new instance of the Beer model
    let beer = new Beer();

    // Set the beer properties that came from the POST data
    beer.name       = req.body.name;
    beer.type       = req.body.type;
    beer.quantity   = req.body.quantity;
    beer.userId     = req.user._id;

    // Save the beer and check for errors
    beer.save(function(err) {
        if (err)
            return res.send(err);

        res.json({ message: 'Beer added to the locker!', data: beer });
    });
};

exports.getBeers = function() {
  return new Promise((resolve, reject)=>{
    return Beer.find((err, beers) => {
      if (err) return reject(err);
      return resolve(beers);
    });
  });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function(req, res) {
    // Use the Beer model to find a specific beer
    Beer.findById({ userId: req.user._id, _id: req.params.beer_id }, req.params.beer_id, function(err, beer) {
        if (err)
            return res.send(err);

        res.json(beer);
    });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = function(req, res) {
    // Use the Beer model to find a specific beer
    Beer.update({ userId: req.user._id, _id: req.params.beer_id }, { quantity: req.body.quantity }, function(err, num, raw) {
        if (err)
            res.send(err);

        res.json({ message: num + ' updated' });
    });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Beer.remove({ userId: req.user._id, _id: req.params.beer_id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Beer removed from the locker!' });
    });
};
