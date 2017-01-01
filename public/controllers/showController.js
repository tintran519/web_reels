(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('ShowController', ShowController);

    ShowController.$inject = ["movieService", "$http", "$sce", "$state", "userDataService", "authToken"]

    function ShowController(movieService, $http, $sce, $state, userDataService, authToken) {
      var vm = this;

      //Function to parse youtube link
      vm.parseTrailer = parseTrailer;

      //Selected movie info
      vm.SelectedMovie = movieService.SelectedMovie;
      vm.MovieId = movieService.SelectedMovie.id;
      vm.MovieCategory = movieService.SelectedMovieType;
      vm.MediaCategory = movieService.SelectedCategory;
      vm.GenreId = movieService.SelectedGenre;

      vm.token = authToken.getToken();
      vm.watchList;

      //Array that stores movie
      vm.movieInfo = [];

      //Related Reels
      vm.relatedInfo;
      vm.callToRelatedSelected = callToRelatedSelected;

      //Functions to run when page loads to display movies
      getMovieInfo();
      getRelatedInfo();

      getWatchList();
      //Add & remove movie to/from watchlist
      vm.addToWatchList = addToWatchList;
      vm.removeReelFromWatchList = removeReelFromWatchList;

      console.log('selected movie', movieService.SelectedMovie)

      //boolean to check if reel is in watchlist
      vm.alreadyInWatchList;

      //close add to watchlist modal
      vm.closeModal = closeModal;

      function getMovieInfo() {
        console.log(`/${vm.MediaCategory}?${vm.MovieCategory}[movieId]=${vm.MovieId}`)
        $http.get(`/${vm.MediaCategory}?${vm.MovieCategory}[movieId]=${vm.MovieId}`)
          .then(function(res) {
            console.log('here is the movie info',res);
            vm.movieInfo = res.data;
          }, function(err) {
            console.error('error')
          })
      }

      function getRelatedInfo() {
        console.log(vm.GenreId)
        $http.get(`/${vm.MediaCategory}?related[genreId]=${vm.GenreId}`)
          .then(function(res) {
            console.log('related info', res);
            vm.relatedInfo = res.data.results;
            console.log(vm.relatedInfo);
          }, function(err) {
            console.error('error')
          })
      }

      function callToRelatedSelected(category, movie, type, genre){
        movieService.SelectedMovie = movie;
        movieService.SelectedMovieType = type;
        movieService.SelectedCategory = category;
        movieService.SelectedGenre = genre;
        $state.go('showPage',{},{reload:true})
      }

      function addToWatchList(){
        var id = userDataService.user._id;
        $http.post('/users/' + id + '/watchlist', {
          id: vm.MovieId,
          media: vm.MediaCategory
        }).then(function(){
          $state.go('showPage',{},{reload:true})
        });
      }

      function removeReelFromWatchList(){
        var id = userDataService.user._id;
        $http.put('/users/' + id + '/watchlist' + '?token=' + vm.token, {
          id: vm.MovieId,
          media: vm.MediaCategory
        }).then(function(){
          $state.go('showPage',{},{reload:true})
        })
      }

      function getWatchList(){
        var id = userDataService.user._id;
        $http.get('/users/' + id + '?token=' + vm.token)
        .then(function(res){
          console.log('user info', res);
          vm.watchList = res.data.watchlist;
          console.log('watchList', vm.watchList);
          checkReel(vm.MovieId,vm.MediaCategory);
          console.log('checker', vm.alreadyInWatchList);
        }, function(err) {
          console.error('error attaining user info',err);
        })
      }

      function checkReel(reelId,reelMedia){
        var found = vm.watchList.some(function (el){
          return el.id === reelId && el.media === reelMedia;
          })
        vm.alreadyInWatchList = found;
      }

      function closeModal(){
        $('#confirmModal').modal('hide');
      }

      function parseTrailer(link){
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + link);
      }
    }
})();
