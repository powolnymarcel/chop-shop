'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/inscription',
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/inscription',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
