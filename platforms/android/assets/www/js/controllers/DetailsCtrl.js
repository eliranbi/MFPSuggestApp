app.controller('DetailsCtrl', function ($scope, $stateParams, $state, ionicMaterialInk, ideaDetails, $ionicLoading, $http, ideaId) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    console.log(">>> in Details ..." + ideaDetails);
    $scope.idea = {};
    $ionicLoading.show({
		template: '<ion-spinner icon="ios"></ion-spinner>'
    });
    activate();
    
    function activate(){
        var url = 'http://deloitteloopback.mybluemix.net/api/Ideas/' + ideaId;
        $http.get(url).then(
                        function(response){
                            console.log(">> getIdeas():" + response.data);
                            $scope.idea = response.data;
                            $ionicLoading.hide();
                            return $scope.idea;
                        });
    }
    
    /*
    $scope.idea = {
        "id": "82",
        "title": "Webinar for our Tax clients",
        "description": "Set up a webinar series focused on the Common Reporting Standard. CRS is critical for our top tier clients and we could really get great attendance",
        "score": 145,
        "contact": "Giulio W. Ebcast",
        "img": "material4.jpg"  
    };
    */
    $scope.doVote = function(){
        console.log(">>> in Details - doVote ...");    
        console.log($scope.idea);
        var data = $scope.idea;
        data.score = data.score+1;
        console.log(">>data : " + data);
        var url = 'http://deloitteloopback.mybluemix.net/api/Ideas/' + $scope.idea.id;
        $http.put(url, data ).then(
                        function(response){
                            console.log(">> put response():" + response.data);
                            return;
                        });
        
        $state.transitionTo("app.explore");    
    };        
    $scope.doBack = function(){
        console.log(">>> in Details - doBack ...");    
        console.log($scope.idea);
        $state.transitionTo("app.explore");    
    };        
});