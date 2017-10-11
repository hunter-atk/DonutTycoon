/*jshint esversion: 6 */
process.env.PORT = 3030;
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const server = require('../server');

const request = require('supertest')(server);
const knex = require('../db/knex');

// MOCKS for testing TODO - remove these based on migrations and seeds
const SHOPS = [
  {id: 1, name: "Jim Freeze", city: 'Cleveland'},
  {id: 2, name: 'Krunchy Kreme', city: 'Denver'}
];
const SHOP = {id: 3, name: "Crunkin Cronuts", city: 'New York'};


// TODO - update to beforeEach with rollback, migrate, and seed
// runs after each test in this block
// afterEach(function() {
//   knex('shops').del().then(() => null);
// });
before(function(done) {
  knex('shops').del().then(() => {
    done();
  });
});

describe("GET /shops", function() {
  before(function(){
    knex('shops').del().then(() => null);
    knex('shops').insert(SHOPS).then(() => null);
  });
  it('should display all shop names', function(done) {
    request.get('/shops')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Jim Freeze');
      expect(res.text).to.contain('Krunchy Kreme');
      done();
    });
  });
});

describe("GET /shops/:id", function() {
  before(function(){
    knex('shops').del().then(() => null);
    knex('shops').insert(SHOP).then(() => null);
  });
  it('should display info for selected shop', function(done) {
    request.get('/shops/3')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Crunkin Cronuts');
      expect(res.text).to.contain('New York');
      done();
    });
  });
});

describe("GET /shops/:id/edit", function() {
  before(function(){
    knex('shops').del().then(() => null);
    knex('shops').insert(SHOP).then(() => null);
  });
  it('should display edit form with current values', function(done) {
    request.get('/shops/3/edit')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Name:');
      expect(res.text).to.contain('Crunkin Cronuts');
      expect(res.text).to.contain('City:');
      expect(res.text).to.contain('New York');
      done();
    });
  });
});

describe("PATCH /shops/:id", function() {
  before(function(){
    knex('shops').del().then(() => null);
    knex('shops').insert(SHOP).then(() => null);
  });

  it('should redirect to shops/:id', function(done) {
    request.patch('/shops/3')
    .send({ name: 'Shrunkin Shronuts', city: 'Hotlanta'})
    .expect('Content-Type', /text\/plain/)  // based on redirect
    .expect(302)
    .expect('Location', '/shops/3')  // redirect to the show page for edited shop
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  // needed to check the content AFTER redirect, looking at the results on the show page
  it('shops/:id should include the updates that were made', function(done) {
    request.get('/shops/3')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Shrunkin Shronuts');
      expect(res.text).to.contain('Hotlanta');
      done();
    });
  });
});

describe("GET /shops/new", function() {
  it('should contain the text "create"', function(done) {
    request.get('/shops/new')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Name:');
      expect(res.text).to.contain('City:');
      expect(res.text).to.contain('Create a New Shop');
      done();
    });
  });
});

describe("POST /shops", function() {
  before(function(){
    knex('shops').del().then(() => null);
  });

  it('should create a new entry in the database', function(done) {
    request.post('/shops')
    .send({name: 'Spudnuts', city: 'Berea'})
    .end(function(err, res) {
      if (err) throw err;
      knex('shops')
        .where({
          name: 'Spudnuts'
        })
        .first()
        .then((shop) => {
          expect(shop.name).to.equal('Spudnuts');
          expect(shop.city).to.equal('Berea');
          done();
        });
    });
  });

  it('should redirect to shops/', function(done) {
    request.post('/shops')
    .send({name: 'Giant Eagle', city: 'Strongsville'})
    .expect('Content-Type', /text\/plain/)
    .expect(302)
    .expect('Location', '/shops')
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it('should display shops with the newly created shop', function(done) {
    request.get('/shops')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.contain('Spudnuts');
      expect(res.text).to.contain('Strongsville');
      done();
    });
  });
});

describe("DELETE /shops/:id", function() {
  before(function(){
    knex('shops').del().then(() => null);
    knex('shops').insert(SHOPS).then(() => null);
  });

  it('should delete entry from shops table', function(done) {
    request.delete('/shops/1')
    .end(function(err, res) {
      if (err) throw err;
      knex('shops')
        .where({id: 1})
        .first()
        .then((shop) => {
          expect(shop).to.be.undefined;
          done();
        });
    });
  });

  it('should redirect to shops/', function(done) {
    request.delete('/shops/2')
    .expect('Content-Type', /text\/plain/)
    .expect(302)
    .expect('Location', '/shops')
    .end(function(err, res) {
      if (err) throw err;
      done();
    });
  });

  it('should display all shops but not the deleted item', function(done) {
    request.get('/shops')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.text).to.not.contain('Jim Freeze');
      expect(res.text).to.not.contain('Denver');
      done();
    });
  });
});
