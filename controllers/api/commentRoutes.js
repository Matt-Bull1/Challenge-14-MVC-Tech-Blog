const router = require('express').Router();
const { Comment } = require('../../models');

router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll();

    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id);

    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/:post_id', async (req, res) => {
  try {
    const createComment = await Comment.create({
      post_id: req.params.post_id,
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(createComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/comments/:id', async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [
              {
                  model: User,
                  attributes: ['username'],
              },
              {
                  model: Comment,
                  include: [
                      {
                          model: User,
                          attributes: ['username'],
                      },
                  ],
              },
          ],
      });

      const post = postData.get({ plain: true });

      res.render("comments", {
          ...post,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      res.status(500).json(err);
      console.log(err);
  }
})

module.exports = router;