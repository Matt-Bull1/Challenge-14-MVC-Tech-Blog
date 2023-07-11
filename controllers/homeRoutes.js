const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
      if (req.session.logged_in) {
          res.redirect('/dashboard');
          return;
      }
      res.render("login")
  } catch {
      res.status(500).json(err);
      console.log(err);
  }
})

router.get('/sign-up', async (req, res) => {
  try {
      if (req.session.logged_in) {
          res.redirect('/dashboard');
          return;
      }
      res.render("signup")
  } catch {
      res.status(500).json(err);
      console.log(err);
  }
})

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render("create-post", {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/update-post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('update-post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
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
      });
  } catch (err) {
      res.status(500).json(err);
      console.log(err);
  }
})


module.exports = router;
