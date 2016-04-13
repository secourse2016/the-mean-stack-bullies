var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var db = require('../db.js');




before(function(done) {
    db.init(function(err, db) {
        if (err) return done(err);
        else done();
    });
});

// testing of database seeding and connection 