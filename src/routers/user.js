const express = require("express");
const User = require("../models/users");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  //user creation endpoint

  const user = new User(req.body);
  // console.log(req.body)
  try {
    await user.save();

    const responseMessage = {
      code: 200,
      status: "success",
      data: [
        {
          key: user._id,
        },
      ],
    };

    res.status(201).send(responseMessage);
  } catch (error) {
    // console.log(error)

    res.status(400).send(error);
  }
});

router.post("/signin", async (req, res) => {
  //user signin
  try {
    //    console.log("user login")

    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //console.log(user)
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
