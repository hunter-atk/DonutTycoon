const Donut = require('../models/donut');

const index = (req, res, next) => {
  Donut.all()
    .then(donuts => res.status(200).render('donuts/index', {donuts}))
    .catch(err => next(err));
};


module.exports = {
  index
};
