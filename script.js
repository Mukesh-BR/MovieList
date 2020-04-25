angular.module('MovieApp', ['ngAnimate','ui.bootstrap'])
        .controller("MovieAppCtrl",
            [
                
                '$http', '$scope',
                function($http, $scope) {
                    $scope.filteredTodos = []
                    ,$scope.currentPage = 1
                    ,$scope.numPerPage = 2
                    ,$scope.maxSize = 3,
                    $scope.totalItems=5,
                    $scope.numberOfPages=0;

                    $scope.makeTodos = function() {
                      $scope.todos = [];
                      for(i=0;i<$scope.MovieData.Search.length;i++) {
                        $scope.todos.push($scope.MovieData.Search[i]);
                      }
                      
                    };
  
                    $scope.$watch('currentPage + numPerPage + numberOfPages', function() {
                        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;
                        
                        $scope.filteredTodos = $scope.todos.slice(begin, end);
                        console.log($scope.filteredTodos); 
                    });

                    $scope.$watch('MovieData', function() {
                        $scope.numberOfPages=Math.ceil($scope.MovieData.Search.length / $scope.itemsPerPage); 
                        $scope.totalItems=$scope.MovieData.Search.length;
                        console.log($scope.MovieData.Search);
                        console.log(this.paging);
                    });

                    $scope.MovieData = [];
                    $scope.Search = null;
                    $scope.itemsPerPage=3;
                    $scope.GetMoviesData = function() {
                        try {
                            $http({
                                url: 'http://www.omdbapi.com/?apikey=81d3b711&s='+$scope.Search,
                                method: "GET",
                            }).then(
                                function(payload) {
                                    $scope.MovieData = payload.data;
                                    $scope.makeTodos()
                                },
                                function(){
								alert("Something is wrong. Please try again.");
								});
                        } catch (error) {
                            alert("Exception occured while fetching movie data.");
                        }
                    }
                }
            ]);
        angular.element(function() {
            angular.bootstrap(document, ['MovieApp']);
        });