var request = require('request');
const rootURL = 'https://api.themoviedb.org/3/movie/';
const rootURLtv = 'https://api.themoviedb.org/3/tv/';
const rootURLsearch = 'https://api.themoviedb.org/3/search/multi?';
const rootURLrelatedMovie = 'https://api.themoviedb.org/3/discover/movie?';
const rootURLrelatedtv = 'https://api.themoviedb.org/3/discover/tv?';

function movies (req, res) {
  console.log(req.query)

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
    case 'related':
      relatedMovies(req, res);
      break;
  }
}

function tv (req, res) {

  switch(Object.keys(req.query)[0]) {
    case 'popular':
      tvPopular(req, res);
      break;
    case 'related':
      relatedTv(req, res);
      break;
  }
}


function featured(req, res) {
  if (req.query.featured.movieId === undefined) {

    var id = Math.floor(Math.random() * 20000) + 20;
    var options = {
      url: rootURL + id +  '?api_key=' + process.env.TMDB_API_KEY + '&append_to_response=videos,credits',
      };//options is the request we are sending aka api url
    request(options, function(err, response, body) {
      var movieImage = JSON.parse(body).backdrop_path;
      res.json(JSON.parse(body))// body is the response being sent back; body being sent back as string, then JSON.parse parses it into a javascript object, then sent as JSON syntax
    });
  } else {
    var options = {
      url: rootURL + req.query.featured.movieId + '?api_key=' + process.env.TMDB_API_KEY + '&append_to_response=videos,credits',
    };
    // console.log('here is my options', options)
    request(options, function(err, response, body) {
      res.json(JSON.parse(body))
    });
  }
}

function topRated(req, res) {
  if (req.query.topRated.movieId === undefined) {
    var id = Math.floor(Math.random() * 224) + 1;
    var options = {
      url: rootURL + 'top_rated?' + 'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=' + id,
    };
    request(options, function(err, response, body) {
      // console.log('JS object here', JSON.parse(body).backdrop_path);
      res.json(JSON.parse(body))
    });
  } else {
    var options = {
      url: rootURL + req.query.topRated.movieId + '?api_key=' + process.env.TMDB_API_KEY + '&append_to_response=videos,credits',
    };
    // console.log('here is my options', options)
    request(options, function(err, response, body) {
      // console.log('Top Rated req query JS Object here', JSON.parse(body))
      res.json(JSON.parse(body))
    });
  }
}

function popular(req, res) {
  if (req.query.popular.movieId === undefined) {
    var id = Math.floor(Math.random() * 978) + 1;
    var options = {
      url: rootURL + 'popular?' + 'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=' + id,
    };
    request(options, function(err, response, body) {
      res.json(JSON.parse(body))
    });
  } else {
    var options = {
      url: rootURL + req.query.popular.movieId + '?api_key=' + process.env.TMDB_API_KEY + '&append_to_response=videos,credits',
    };
    console.log('jkljjljlkjl',options)
    request(options, function(err, response, body) {
      console.log('lsjfls', body)
      res.json(JSON.parse(body))
    });
  }
}

function recommended(req, res) {
  if (req.query.recommended.movieId === undefined) {

    var id = Math.floor(Math.random() * 20000) + 20;
    var options = {
      url: rootURL + id +  '/recommendations?' +'api_key=' + process.env.TMDB_API_KEY + '&append_to_response=videos,credits',
      };//options is the request we are sending aka api url
    // console.log(options)
    request(options, function(err, response, body) {
      // console.log('javascript here', JSON.parse(body).backdrop_path);
      res.json(JSON.parse(body))
      // body is the response being sent back; body being sent back as string, then JSON.parse parses it into a javascript object, then sent as JSON syntax
    });
  } else {
    var options = {
      url: rootURL + req.query.recommended.movieId + '?api_key=' + process.env.TMDB_API_KEY + '&append_to_response=videos,credits',
    };
    request(options, function(err, response, body) {
      res.json(JSON.parse(body))
    });
  }
}

function tvPopular(req,res) {
  if (req.query.popular.movieId === undefined) {
    var id = Math.floor(Math.random() * 1001) + 1;
    var options = {
      url: rootURLtv + 'popular?' + 'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&page=' + id,
    };
      request(options, function(err, response, body) {
        res.json(JSON.parse(body))
      });
    } else {
    var options = {
      url: rootURLtv + req.query.popular.movieId + '?api_key=' + process.env.TMDB_API_KEY + '&append_to_response=videos,credits',
    };
    request(options, function(err, response, body) {
      res.json(JSON.parse(body))
      });
    }
  }

//Search function for queries
function search (req, res) {
  var options = {
    url: rootURLsearch + 'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&query=' + req.query.q,
  };
    console.log(options)
    request(options, function(err, response, body) {
      res.json(JSON.parse(body))
    });
}

function relatedMovies (req,res) {
  var id = Math.floor(Math.random() * 100) + 10;
  var options = {
    url: rootURLrelatedMovie + 'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + id + '&with_genres=' + req.query.related.genreId,
  };
    console.log(options)
    request(options, function(err, response, body) {
      res.json(JSON.parse(body))
    });
}

function relatedTv (req,res) {
  var id = Math.floor(Math.random() * 100) + 10;
  var options = {
    url: rootURLrelatedtv + 'api_key=' + process.env.TMDB_API_KEY + '&language=en-US&sort_by=popularity.desc&page=' + id + '&timezone=America/New_York&with_genres=' + req.query.related.genreId + '&include_null_first_air_dates=false',
      };
    console.log(options)
    request(options, function(err, response, body) {
      res.json(JSON.parse(body))
    });
}

module.exports = {
  movies:movies,
  tv:tv,
  search: search
}
