app.controller('SplashCtrl', function ($scope, $stateParams, $timeout, $state, ionicMaterialInk) {
    console.log(">> SplashCtrl - ... ");
    
    var isIPad = ionic.Platform.isIPad();  
    var yHeight = 485;
    console.log(">>> Screen Height:" + window.screen.height);
    if(isIPad){
        console.log(">>> Set iPad height");
        var splashImg = document.getElementById('splashImg');
        splashImg.height = window.screen.height;        
        var splashMsg = document.getElementById('splashMsg');
        splashMsg.style["margin-top"] = "-780px"; 
        var yHeight = 645;
    }
    
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    

    $scope.doLogin = function(){
        console.log(">> SplashCtrl - doLogin() ... ");        
        console.log(">> loginCtrl - $scope.user:" + $scope.user);
        $state.transitionTo("app.main");                            
    }
    
    $scope.doShowLogin = function(){
        console.log(">> SplashCtrl - doShowLogin() ... ");   
        $scope.hideSplashBox();
    }

    $scope.moveSplashBox = function() {
        var splashNextBox = document.getElementById('splash-next-box');
        move(splashNextBox).ease('in-out').y(-yHeight).duration('0.5s').end();
        //move('.signInMsg').rotate(360).end();
    };          
    
    $scope.hideSplashBox = function() {
        var splashNextBox = document.getElementById('splash-next-box');        
        move(splashNextBox).ease('in-out').y(yHeight).duration('0.5s').end(
            function(){
                console.log(">>> showLogin ... ");
                var loginBox = document.getElementById('login-box');
                move(loginBox).ease('in-out').y(-yHeight).duration('0.5s').end();
            }
        );
        //move(loginBox).ease('in-out').y(-385).duration('0.5s').end
    };
    
    
    $timeout(function(){        
        //fix android bug where render splash screen incorrect. 
        var splashNextBox = document.getElementById('splash-next-box'); 
        var loginBox = document.getElementById('login-box');
        splashNextBox.style.display = 'block';
        loginBox.style.display = 'block'        
    }, 500);
        
    $timeout(function(){        
        $scope.moveSplashBox();
    }, 3000);
    
});