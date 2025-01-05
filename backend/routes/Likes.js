const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id; // UserId already passed in the validateToken middleware

  const found = await Likes.findOne({
    where: { PostID: PostId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ Liked: true });
  } else {
    await Likes.destroy({
      where: {
        PostId: PostId,
        UserId: UserId,
      },
    });
    res.json({ Liked: false });
  }
});

module.exports = router;
