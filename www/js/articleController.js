
app.controller("articleController", function($scope, $ionicModal, $http, $state, authentication, SERVER){

    $scope.articles = [];
    $scope.currentusername = authentication.currentUser().name;

    $http.get(SERVER.url + "/articles",{
        headers: {
          Authorization:"Bearer "+ authentication.getToken()
        }
      }).success(function(data){
          $scope.articles = data;
    });

    // $scope.detail = function(article) {
    //     $state.go("article-detail",{ articleid : article._id });                
    // };

    // $ionicModal.fromTemplateUrl('templates/addArticle.html', {
    //     scope: $scope,
    //     animation: 'slide-in-up'
    // }).then(function(modal) {
    //     $scope.modal = modal;
    // });
    // $scope.openModal = function() {
    //     $scope.modal.show();
    // };
    // $scope.closeModal = function() {
    //     $scope.modal.hide();
    // };
    // // Cleanup the modal when we're done with it!
    // $scope.$on('$destroy', function() {
    //     $scope.modal.remove();
    // });
    // // Execute action on hide modal
    // $scope.$on('modal.hidden', function() {
    //     // Execute action
    // });
    // // Execute action on remove modal
    // $scope.$on('modal.removed', function() {
    //     // Execute action
    // });

    $ionicModal.fromTemplateUrl('templates/user.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
        authentication.logout();
        $state.go("login");
    };
    $scope.logout = function() {
        $scope.modal.hide();
        authentication.logout();
        $state.go("login");
    };
});