const userModel = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
//functions to handle different requests
//Get Users
exports.getUsers = async (req, res) => {
  await userModel
    .find()
    .then((users) => {
      res.json({
        message: `${users.length} user(s) in the database`,
        data: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

//create user
exports.createAUser = async (req, res) => {
  const email = req.body.email;
  await userModel
    .find({ email: email })
    .then((user) => {
      if (Object.keys(user).length !== 0) {
        res.status(404).json({
          message: `There is a user already registered with that email ${req.params.id}`,
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              reject("Error encrypting the password");
            } else {
              req.body.password = hash;
              const user = new userModel(req.body);
              user
                .save()
                .then((newUser) => {
                  res.json({
                    message:
                      "The user Was successfully created and stored in the databaase",
                    data: newUser,
                  });
                })
                .catch((err) => {
                  res.status(500).json({ message: err });
                });
            }
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
};

//POST LOGIN
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.find({ email });
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (user.length > 0 && isMatch) {
      const currentUser = {
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        phoneNumbers: user[0].phoneNumbers,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
        cartItems: user[0].cartItems,
      };
      res.send(currentUser);
    } else {
      return res.status(500).json({ message: "User unable to login" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//GET ONE user
exports.getAUser = (req, res) => {
  userModel
    .findById(req.params.id)
    .then((user) => {
      if (Object.keys(user).length === 0) {
        res.json({
          message: `User with the id ${req.params.id}`,
          data: user,
        });
      } else {
        res.status(404).json({
          message: `There is no user in our database with the id ${req.params.id}`,
        });
      }
    })

    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

exports.updateAUser = async (req, res) => {
  userModel.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumbers: req.body.phoneNumbers,
        cartItems: req.body.cartItems,
      },
    },
    { new: true },
    (err, user) => {
      if ((user = null)) {
        res.json({
          message: `User with the id ${req.params.id} not found` + err,
        });
      } else {
        res.json({
          message: `User with the id ${req.params.id} updated`,
        });
      }
    }
  );
};

exports.updateAUserCart = async (req, res) => {
  const { cartItems } = req.body;
  userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      cartItems: cartItems,
    },
    { new: true },
    (err, user) => {
      if (user === null) {
        res.json({
          message: `User with the id ${req.params.id} not found` + err,
        });
      } else {
        res.json({
          message: `User with the id ${req.params.id} updated`,
        });
      }
    }
  );
};

exports.deleteAUser = (req, res) => {
  userModel
    .findById(req.params.id)
    .then((user) => {
      user
        .remove()
        .then((delUser) => {
          res.json({
            message: `User  ${req.params.id} deleted` + delUser,
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
