'use strict';

angular.module('myApp.upload', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload', {
    templateUrl: 'upload/upload.html',
    controller: 'UploadCtrl'
  });
}])

.controller('UploadCtrl', ['$scope', '$rootScope', '$location', 'documentService',  function($scope, $rootScope, $location, documentService) {
  $rootScope.currentPage = 'upload';

  $scope.documents = [];
  $scope.selected = 0;
  $scope.selectedDocuments = new Set();

  this.$onInit = function() {
    setupFileinput();
  }

  $scope.compareall = function(documentId) {
    $location.path('/compareall').search({document: documentId});
  }

  $scope.showModal = function (visible) {
    console.log('show modal');
    var errorModal = $('.error-modal');
    console.log(errorModal);
    errorModal.modal("show");
  }

  function setupFileinput() {
    $("#input-id").fileinput({
      uploadUrl: 'http://localhost:8082/document',
      showPreview:false,
      uploadAsync: true,
      maxFileCount: 1,
      allowedFileExtensions: ['docx']
    }).on('fileuploaded', function(event, data, id, index) {
      console.log(data.response);
      var documentId = data.response.message;
      if (data.response.type === 'ERROR') {
        $scope.showModal();
      } else {
        documentService.getAll().then(function(data) {
          $location.path('/compareall').search({document: documentId});
        });
      }
    });

  }

}]);