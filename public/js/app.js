angular.module('app', [])
  .controller('MainCtrl', function($scope, $http){
    var self = $scope;

    self.movies = [];
    self.movie = {};
    self.error = '';

    self.getMovies = function(){
      $http.get('/api/movies').then(function(res){
        self.movies = res.data;
      })
    }

    self.create = function(){
      $http.post('/api/movies', self.movie).then(function(res){
        self.movies.push(res.data);
        self.movie = '';
        self.error = '';
      }, function(err){
        self.error = err.data.status;
      });
    }

    self.getMovies();
  });
