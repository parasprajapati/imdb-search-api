var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  url = 'https://www.imdb.com/find?q=avatar&s=tt&ref_=fn_al_tt_mr';
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(html);
      let result_list = $('.findList').children().first().children();
      result_list.each(function(i, elem) {
        console.log(elem.children().first().text());
      });
    }
  })
  res.send('Check your console!');

});

module.exports = router;
