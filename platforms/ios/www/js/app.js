// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',        
    })

    .state('app.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/lists.html',
                controller: 'ListsCtrl'
            }
        }
    })

    .state('app.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('app.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })
    
    .state('app.splash', {
        url: '/splash',
        views: {
            'menuContent': {
                templateUrl: 'templates/splash.html',
                controller: 'SplashCtrl'
            }
        }
    })
    
    .state('app.main', {
        url: '/main',
        views: {
            'menuContent': {
                templateUrl: 'templates/main.html',
                controller: 'MainCtrl'
            }
        }
    })
    
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html'
            }
        }
    })
    
    .state('app.suggest', {
        url: '/suggest',
        views: {
            'menuContent': {
                templateUrl: 'templates/suggest.html',
                controller: 'SuggestCtrl'
            }
        }
    })
    
    .state('app.explore', {
        url: '/explore',
        views: {
            'menuContent': {
                templateUrl: 'templates/explore.html',
                controller: 'ExploreCtrl',
                resolve:{
                    ideas: function(SuggestService){
                        return SuggestService.getIdeasList();
                    }
                }
            }           
        }
    })
    
    .state('app.details', {            
        url: '/details/:ideaId',            
        views: {
            'menuContent': {
                templateUrl: 'templates/details.html',
                controller: 'DetailsCtrl',
                resolve:{  
                    ideaId: function($stateParams){
                        console.log(">> id == " + $stateParams.ideaId);
                        return $stateParams.ideaId;    
                    },
                    ideaDetails:  function($stateParams, SuggestDetailsService){                   return SuggestDetailsService.getIdeaDetails($stateParams.ideaId);       
                    }                    
                }
            }
        }
    })                                

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/splash');
});

    //appliction services for employee and employee details.
    app.factory("SuggestService", function($http){
        console.log( ">> in SuggestService ...");  
        var ideas = []; 
        /*
        var resourceRequest = new WLResourceRequest(            
            "http://0.0.0.0:3000/api/employees", WLResourceRequest.GET
        );
        */
        return {            
            getIdeasList: function(){
                /*
                return resourceRequest.send().then(function(response){
                    ideas = response.responseJSON;
                    return ideas;
                }, function(response){
                    console.log("error:" + response);
                    return null;
                });
                */ 
                $http.get('http://deloitteloopback.mybluemix.net/api/Ideas').then(
                        function(response){
                            console.log(">> getIdeasList():" + response.data);
                            ideas = response.data;
                            return ideas;
                        });
            },            
            getIdea: function(index){
                return ideas[index];
            },
            getIdeasById: function(id){
                var _idea;
                angular.forEach(ideas, function(idea) {
                    console.log(">> getIdeasById :" + id + " ==  " + idea._id );
                    if(idea._id == id){ _idea = idea; }   
                });
                return _idea;                
            }
        };            
    });               
    
    app.factory("SuggestDetailsService", function($http){
        console.log( ">> in SuggestDetailsService ..."); 
        return {            
            getIdeaDetails: function(ideaId){
                //using path param.
                var url = 'http://deloitteloopback.mybluemix.net/api/Ideas/' + ideaId;
                $http.get(url).then(
                        function(response){
                            console.log(">> getIdeaDetails():" + response.data);
                            return response.data;                            
                        });
            
            }};                
        /*
        return {            
            getIdeaDetails: function(ideaId){
                //using path param.
        
                var resourceRequest = new WLResourceRequest(            
                    "/adapters/EmployeeServices/services/details/" + ideaId, WLResourceRequest.GET
                );      
                return resourceRequest.send().then(function(response){                    
                    return response.responseJSON.details;
                }, function(response){
                    console.log("error:" + response);
                    return null;
                });                
            }};       
        */
    });
	
    //Adding MobileFirst code.
    var Messages = {
      // Add here your messages for the default language.
      // Generate a similar file with a language suffix containing the translated messages.
      // key1 : message1,
    };

    var wlInitOptions = {
        // Options to initialize with the WL.Client object.
        // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
    };

    // Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
    function wlCommonInit(){
        // Common initialization code goes here
      console.log('>> MobileFirst Client SDK Initilized ...');
      angular.element(document).ready(function() {
        mfpMagicPreviewSetup();
        angular.bootstrap(document.body, ['ibmApp']);
      });
    }

    function mfpMagicPreviewSetup(){
      //nothing to see here :-), just some magic to make ionic work with mfp preview, similar to ionic serve --lab
      if(typeof WL !== 'undefined' && WL.StaticAppProps && WL.StaticAppProps.ENVIRONMENT === 'preview'){
        //running mfp preview (MBS or browser)
        if(WL.StaticAppProps.PREVIEW_ENVIRONMENT === 'android'){
          document.body.classList.add('platform-android');
          ionic.Platform.setPlatform("android");
        } else { //then ios
          document.body.classList.add('platform-ios');
          ionic.Platform.setPlatform("ios");
        }
        } 
    }

    // Useful for ionic serve when MFP Client SDK is not present and wlCommonInit doesn't get called automatically
    var serveTimeout = 1500;
    window.setTimeout(function(){
      if(typeof WL === 'undefined'){
          console.log('>> MFP Client SDK timeout, running Web App ...');
          angular.bootstrap(document.body, ['ibmApp']);
      }
    }, serveTimeout);
