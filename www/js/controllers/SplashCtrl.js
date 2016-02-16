app.controller('SplashCtrl', function ($scope, $stateParams, $timeout, $state, ionicMaterialInk) {
    console.log(">> SplashCtrl - ... ");
    
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
        move(splashNextBox).ease('in-out').y(-485).duration('0.5s').end();
        //move('.signInMsg').rotate(360).end();
    };          
    
    $scope.hideSplashBox = function() {
        var splashNextBox = document.getElementById('splash-next-box');        
        move(splashNextBox).ease('in-out').y(485).duration('0.5s').end(
            function(){
                console.log(">>> showLogin ... ");
                var loginBox = document.getElementById('login-box');
                move(loginBox).ease('in-out').y(-485).duration('0.5s').end();
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