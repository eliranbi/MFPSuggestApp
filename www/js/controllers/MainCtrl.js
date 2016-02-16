app.controller('MainCtrl', function ($scope, $stateParams, $state, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    console.log(">>> in MainCtrl ...");    
    $scope.doSuggest = function(){
        console.log(">>> in MainCtrl - doSuggest ...");    
        $state.transitionTo("app.suggest");                            
    };
    
    $scope.doExplore = function(){
        console.log(">>> in MainCtrl - doExplore ...");    
        $state.transitionTo("app.explore");                            
    };
    
    $scope.doProfile = function(){
        console.log(">>> in MainCtrl - doProfile ..."); 
        $state.transitionTo("app.profile");                            
    };
    
    
});