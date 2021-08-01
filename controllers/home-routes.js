const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// get all posts from homepage
router.get('/', (req, res) => {
    // console.log()
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIns
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// find one from homepage by id
router.get('/', (req, res) => {
    // console.log()
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIns
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// for login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
