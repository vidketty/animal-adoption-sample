const Animal = require('./../models/animal');

module.exports = function (req, res) {
  Animal.findOneAndUpdate({
    _id: req.params.id
  }, {
      $set: { avatar: '/images/' + req.file.filename }
    }, (err, animal) => {
      res.json(animal);
    });
}