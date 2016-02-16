app.controller('SuggestCtrl', function ($scope, $stateParams, $state, ionicMaterialInk, $http) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    console.log(">>> in SuggestCtrl ...");
    $scope.idea = {
      title:"",
      description:"",
      tags:"",  
      image:"material1.jpg"    
    };
    $scope.doSubmit = function(){
        console.log(">>> in SuggestCtrl - doSubmit ...");    
        console.log($scope.idea);
        http://deloitteloopback.mybluemix.net/api/Ideas
        
        //var data = $scope.idea;
        var dt = new Date();
        var data = {
            "title" : $scope.idea.title,
            "description" : $scope.idea.description,
            "score": 0,
            "contact":"Eliran Ben Ishay",
            "tags" : $scope.idea.tags
        }
        //data.score = 0;        
        //data.contact = "Eliran Ben Ishay";
        console.log(">>data : " + data);
        var url = 'http://deloitteloopback.mybluemix.net/api/Ideas';
        
        var req = {
            method: 'POST',
            url: 'http://deloitteloopback.mybluemix.net/api/Ideas',
            headers: {                
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            data: { 
                'title' : $scope.idea.title,
                'description' : $scope.idea.description,
                'score' : 0,
                'contact' : "Eliran Ben Ishay",
                'tags' : $scope.idea.tags,
				'img': "material2.jpg"
            }
        }
        
        $http(req).then(function(response){
                            console.log(">> post response():" + response.data);
                            return;
                        });
        
        /*
        $http.post(url, data ).then(
                        function(response){
                            console.log(">> post response():" + response.data);
                            return;
                        });
        */
        $state.transitionTo("app.main");    
    };    
    
});