const Donut = require('../models/donut');

// TODO - DELETE, used for destroy route
const knex = require('../db/knex');


const index = (req, res, next) => {
  Donut.all()
    .then(donuts => res.status(200).render('donuts/index', {donuts}))
    .catch(err => next(err));
};

const create = (req, res, next) => {
  if (req.body.name && req.body.topping && parseInt(req.body.price)) {
    let newDonut = {
      name: req.body.name,
      topping: req.body.topping,
      price: parseInt(req.body.price)
    };
    Donut.create(newDonut)
    .then((donut) => res.redirect(`/donuts/${donut[0].id}`))
    .catch(err => next(err));
  } else {
    res.status(200).render('donuts/new', {error: 'Please be sure to fill out all required fields'});
  }
}

const createPage = (req, res, next) => {
  res.status(200).render('donuts/new', {error: null});
}

const showPage = (req, res, next) => {
  Donut.findById(req.params.id)
    .then(donut => res.status(200).render('donuts/show', {donut}))
    .catch(err => next(err));
}

const edit = (req, res, next) => {
  Donut.edit(req.params.id, req.body)
    .then(() => res.status(204).redirect(`/donuts/${req.params.id}`))
    .catch(err => next(err));
}

const editPage = (req, res, next) => {
  Donut.findById(req.params.id)
    .then(donut => res.status(200).render('donuts/edit', {donut}))
    .catch(err => next(err));
}

const destroy = (req, res, next) => {
  // TODO - update to use employees controller, delete require knex at top of file
  knex('employees')
    .where({favorite_donut: req.params.id})
    .update({favorite_donut: null})
    .then(() => {
      Donut.destroy(req.params.id)
        .then(() => res.status(201).redirect('/donuts'))
        .catch(err => next(err));
    });
}

const json = (req, res, next) => {
  Donut.allJson()
    .then(donuts => res.status(200).json(donuts))
    .catch(err => next(err));
}

module.exports = {
  index, create, createPage, showPage, edit, editPage, destroy, json
};
