var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/movie/';

function movies (req, res) {
  console.log(req.query)
  // res.json(req.query)
  // if (req.query.featured)
  //   featured()
  // else if (req.query.topMovies)
  switch(Object.keys(req.query)[0]) {
    case 'featured':
      featured(req, res);
      break;
    case 'topRated':
      topRated(req, res);
      break;
    case 'popular':
      popular(req, res);
      break;
    case 'recommended':
      recommended(req, res);
      break;
  }
}

function featured(req, res) {
  var id = Math.floor(Math.random() * 20000) + 20;
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

function topRated(req, res) {
  console.log('lookie here', req.query);
  if (req.query.topRated.movieId === undefined) {
    var options = {
      url: rootURL + 'top_rated?' + 'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=1',
    };
    request(options, function(err, response, body) {
      console.log('JS object here', JSON.parse(body).backdrop_path);
      res.json(JSON.parse(body))
    });
  } else {
    var options = {
      url: rootURL + req.query.topRated.movieId + '?api_key=' + process.env.TMDB_API_KEY + '&append_to_response=videos,credits',
    };
    console.log('here is my options', options)
    request(options, function(err, response, body) {
      console.log('Top Rated req query JS Object here', JSON.parse(body))
      res.json(JSON.parse(body))
    });
  }
}

function popular(req, res) {
  var options = {
    url: rootURL + 'popular?' + 'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=1',
  };
  console.log('top rated options', options)
  request(options, function(err, response, body) {
    console.log('JS object here', JSON.parse(body).backdrop_path);
    res.json(JSON.parse(body))
  });
}

function recommended(req, res) {
  var id = Math.floor(Math.random() * 20000) + 20;
  var options = {
    url: rootURL + id +  '/recommendations?' +'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=1',
    };//options is the request we are sending aka api url
  console.log(options)
  request(options, function(err, response, body) {
    console.log('javascript here', JSON.parse(body).backdrop_path);
    res.json(JSON.parse(body))
    // body is the response being sent back; body being sent back as string, then JSON.parse parses it into a javascript object, then sent as JSON syntax
  });
}


module.exports = {
  // featured: featured,
  // topRated: topRated,
  // popular: popular,
  // recommended: recommended,
  movies:movies
}
