const router = require("express").Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    !user && res.status(404).json({ message: "User not found", status: false });
    const validatePassword = req.body.password == user.password;
    !validatePassword &&
      res.status(400).json({ message: "wrong password", status: false });

    res.status(200).json({ ...user, message: "user found", status: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/reqister", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const data = await user.save();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
