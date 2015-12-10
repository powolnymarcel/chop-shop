'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('twitter', {
    failureRedirect: '/inscription',
    session: false
  }))

  .get('/callback', passport.authenticate('twitter', {
    failureRedirect: '/inscription',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
