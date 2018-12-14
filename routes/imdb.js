var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET titles search result. */
router.get('/search/title', function(req, res, next) {
  var results = [];
  url = 'https://www.imdb.com/find?q=' + req.param('search_query') + '&s=tt&ref_=fn_al_tt_mr';
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(html);
      let result_list = $('.findList').children().first().children();
      result_list.each(function(i, elem) {
        results[i] = {
          name: $(this).children().last().text(),
          title_id: $(this).children().last().children().first().attr('href'),
          image: $(this).children().first().children().first().children().first().attr('src'),
        };
      });
      res.send(results);
    }
  })
});

/* GET info about a specific title. */
router.get('/get/title', function(req, res, next) {
  var results = {
    title: '',
    rating: ''
  };
  url = 'https://www.imdb.com' + req.param('title_id');
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(html);
      let basic_info = $('.title_wrapper').children();
      results.title = basic_info.first().text();
      results.rating = basic_info.last().text();
      res.send(results);
    }
  })
});

module.exports = router;
