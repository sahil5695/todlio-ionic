var app = angular.module('controllers',['authentication']);

app.controller("loginController", function($scope,$http,authentication,SERVER,$state){

  if(authentication.isLoggedIn()){
    $state.go('article');
  }

  $scope.credentials = {  
    name:"",
    username :"",
    email:"",
    password:""
  };

  $scope.signingUp = function(){
    $scope.credentials.name = $scope.fullName;
    $scope.credentials.username = $scope.userNameSignup;
    $scope.credentials.email = $scope.email;

    if($scope.passwordSignup == $scope.confirmPassword && $scope.confirmPassword.length >= 8){
      $scope.credentials.password = $scope.confirmPassword;
    } 

    $http.post(SERVER.url + "/register",$scope.credentials).success(function(data){
      authentication.saveToken(data.token);
    }).then(function(){
      $state.go('article');
    });

    $scope.credentials = {  
      name:"",
      username :"",
      email:"",
      password:""
    };

  };

  $scope.logCreds = {
    username : "",
    password : ""
  };

  $scope.logingIn = function(){
    $scope.logCreds.username = $scope.userNameLogin;
    $scope.loading = true;
    $scope.logCreds.password = $scope.passwordLogin;

    // authentication.saveToken({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1O…2MzB9.XuTKrxkE6qUBef_AyF0-5Uk43NMCT1L4GwP7hvp3f3U"});
    // $state.go('article');
    $http.post(SERVER.url + "/login",$scope.logCreds).success(function(data){
      authentication.saveToken(data.token);
      $scope.loading = false;   
      $scope.success = true;
      $scope.logindeta = data;
      $state.go('article');
    });

    $scope.logCreds = {
      username : "",
      password:""
    };

  };


});