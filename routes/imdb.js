var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET titles search result. */
router.get('/title/search', function(req, res, next) {
  var results = [];
  url = 'https://www.imdb.com/find?q=' + req.query.search_query + '&s=tt&ref_=fn_al_tt_mr';
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(html);
      let result_list = $('.findList').children().first().children();
      result_list.each(function(i, elem) {
        var pre_title_id = $(this).children().last().children().first().attr('href');
        var post_title_id = pre_title_id.split("?");
        results[i] = {
          name: $(this).children().last().text(),
          title_id: post_title_id[0],
          image: $(this).children().first().children().first().children().first().attr('src'),
        };
      });
      res.send(results);
    }
  })
});

/* GET info about a specific title. */
router.get('/title/get', function(req, res, next) {
  var results = {
    title: '',
    rating: '',
    length: '',
    genres: '',
    type: '',
    year: '',
  };
  url = 'https://www.imdb.com' + req.query.title_id;
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(html);
      let basic_info = $('.title_wrapper').children();
      results.title = basic_info.first().text();
      var subtext = basic_info.last().text().replace(/\s+/g, "").split("|");
      results.rating = subtext[0];
      results.length = subtext[1];
      results.genres = subtext[2].split(",");
      results.type = subtext[3].split("(")[0];
      results.year = subtext[3].split("(")[1].slice(0,-1);
      res.send(results);
    }
  })
});

module.exports = router;
