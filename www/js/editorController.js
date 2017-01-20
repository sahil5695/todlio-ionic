
app.controller("editorController", function($scope, $http, $stateParams,authentication, SERVER){
    var articless = [];
    var articleid = $stateParams.articleid;
    
    $http.get(SERVER.url + "/articles",{
        headers: {
          Authorization:"Bearer "+ authentication.getToken()
        }
      }).success(function(data){
        articless = data;
        for (var i = 0; i < articless.length; i++) {
            if (articless[i]._id === articleid) {
                $scope.artTitle = articless[i].title;
                $scope.artNote = articless[i].note;                
            } 
        }
    });

});