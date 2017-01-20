angular.module('articles',[])

.factory('articles',function(authentication, SERVER){
   var articles = [];

   $http.get(SERVER.url + "/articles",{
        headers: {
          Authorization:"Bearer "+ authentication.getToken()
        }
      }).success(function(data){
          articles = data;
    });

    return articles;
    
});