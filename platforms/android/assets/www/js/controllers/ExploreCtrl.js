app.controller('ExploreCtrl', function ($scope, $stateParams, $state, ionicMaterialInk, ideas, $http, $ionicLoading) {    
    ionicMaterialInk.displayEffect();
    console.log(">>> in ExploreCtrl ...:" + ideas);
    var vm = this;
    $scope.ideas = [];    
    $ionicLoading.show({
      template: '<ion-spinner icon="ios"></ion-spinner>'
    });
    activate();
    
    function activate(){
        $http.get('http://deloitteloopback.mybluemix.net/api/Ideas').then(
                        function(response){
                            console.log(">> getIdeasList():" + response.data);
                            $scope.ideas = response.data;
                            $ionicLoading.hide();
                            return $scope.ideas;
                        });
    }
    
    $scope.doSubmit = function(){
        console.log(">>> in ExploreCtrl - doSuggest ...");    
        console.log($scope.idea);
        $state.transitionTo("app.main");    
    };    
    
});