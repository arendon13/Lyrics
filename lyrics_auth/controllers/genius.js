const config = require('../auth_keys');
var Genius = require("node-genius");
const keys = require('../auth_keys')
var geniusClient = new Genius(config.geniusAPI);
var scraperjs = require('scraperjs');

exports.song = function(req, res, next){
  var songid = req.headers.songid;

  geniusClient.getSong(songid, function (error, song) {
    if (error)
      console.error("Whops. Something went wrong:", error);
    else
      console.log("Hoorah. Here is the song: ", song);
      res.send(song);
  });
}

exports.search = function(req, res, next){
  var term = req.headers.term;

  geniusClient.search(term, function (error, results) {
    if (error)
      console.error("Whops. Something went wrong:", error);
    else
      console.log("Hoorah. Here is the song: ", results);
      res.send(results);
  });
}

exports.lyrics = function(req, res, next){
  var songurl = req.headers.songurl;

  scraperjs.StaticScraper.create(songurl)
    .scrape(function($) {
        return $("p").map(function() {
            return $(this).text();
        }).get();
    })
    .then(function(news) {
        // console.log(news);
        res.send(news);
    })
}

