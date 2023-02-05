const burgerModel = require("../models/burgerModel.js");
//functions to handle different requests
//Get Users
exports.getBurgers = async (req, res) => {
  await burgerModel
    .find()
    .then((brgs) => {
      res.json({
        message: `${brgs.length} burger(s) in the database`,
        data: brgs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

//create burger
exports.createABurger = (req, res) => {
  const brg = new burgerModel(req.body);
  brg
    .save()
    .then((newBurger) => {
      res.json({
        message:
          "The burger Was successfully created and stored in the databaase",
        data: newBurger,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

//GET ONE user
exports.getABurger = (req, res) => {
  burgerModel
    .findById(req.params.id)
    .then((brg) => {
      if (brg) {
        res.json({
          message: `Burger with the id ${req.params.id}`,
          data: brg,
        });
      } else {
        res.status(404).json({
          message: `There is no burger in our database with the id ${req.params.id}`,
        });
      }
    })

    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.updateABurger = async (req, res) => {
  burgerModel.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        name: req.body.name,
        type: req.body.type,
        prices: req.body.prices,
        description: req.body.description,
        category: req.body.category,
        bestSeller: req.body.bestSeller,
        image: req.body.image,
      },
    },
    { new: true },
    (err, brg) => {
      if ((brg = null)) {
        res.json({
          message: `Burger with the id ${req.params.id} not found` + err,
        });
      } else {
        res.json({
          message: `Burger with the id ${req.params.id} updated`,
        });
      }
    }
  );
};

exports.deleteABurger = (req, res) => {
  burgerModel
    .findById(req.params.id)
    .then((brg) => {
      brg
        .remove()
        .then((delBrg) => {
          res.json({
            message: `Burger  ${req.params.id} deleted` + delBrg,
          });
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
