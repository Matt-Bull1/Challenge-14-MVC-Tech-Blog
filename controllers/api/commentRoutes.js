const router = require('express').Router();
const { Comment } = require('../../models');

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
  

module.exports = router;