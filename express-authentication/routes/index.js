const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { findOne } = require("../src/database/database-service");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST Register. */
router.post("/register", function (req, res, next) {
  console.log(`User: ${req.body.user}`);
  console.log(`Password: ${req.body.pwd}`);
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      registerOne(request.body.username, hashedPassword);
      res.status(201).send();
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

/* POST Login. */
router.post("/auth", function (req, res, next) {
  console.log(`User: ${req.body.user}`);
  console.log(`Password: ${req.body.pwd}`);
  findOne(req.body.user).then((user) => {
    bcrypt
      .compare(request.body.pwd, user.password)
      .then((passwordCheck) => {
        // check if password matches
        if (!passwordCheck) {
          return response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        }
        //   create JWT token
        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

        //   return success response
        response.status(200).send({
          message: "Login Successful",
          username: user.username,
          token,
        });
      })
      .catch((error) => {
        response.status(400).send({
          message: "Passwords does not match",
          error,
        });
      });
  });
});

module.exports = router;
