/*jshint esversion: 6 */
process.env.PORT = 3030;

const expect = require('chai').expect;
const server = require('../server');

const request = require('supertest')(server);
// const seed = require("../seeds/states_cities").seed;
const knex = require('../db/knex');
