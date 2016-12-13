var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/movie/';

function featured(req, res) {
  var id = Math.floor(Math.random() * 20,000) + 20;
  var options = {
    url: rootURL + id +  '?' +'api_key=' + process.env.TMDB_API_KEY,
    };//options is the request we are sending aka api url
  console.log(options)
  request(options, function(err, response, body) {
    console.log('javascript here', JSON.parse(body).backdrop_path);
    var movieImage = JSON.parse(body).backdrop_path;
    res.json(JSON.parse(body))// body is the response being sent back; body being sent back as string, then JSON.parse parses it into a javascript object, then sent as JSON syntax
  });
}

module.exports = {
  featured: featured
}
