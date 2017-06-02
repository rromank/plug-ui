'use strict';

angular.module('myApp.documents', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/documents', {
    templateUrl: 'documents/documents.html',
    controller: 'DocumentsCtrl'
  });
}])

.controller('DocumentsCtrl', ['$scope', '$rootScope', '$location', 'documentService',  function($scope, $rootScope, $location, documentService) {
  $rootScope.currentPage = 'documents';

  $scope.documents = [];
  $scope.selected = 0;
  $scope.selectedDocuments = new Set();

  this.$onInit = function() {
    documentService.getAll().then(function(data) {
      $scope.documents = data;
    });
  }

  $scope.selectDocument = function(documentId) {
    if (!$scope.selectedDocuments.has(documentId)) {
        $scope.selectedDocuments.add(documentId);
    } else {
      $scope.selectedDocuments.delete(documentId);
    }
  }

  $scope.isDisabled = function(documentId) {
    return !$scope.selectedDocuments.has(documentId) && $scope.selectedDocuments.size >= 2;
  }

  $scope.isCompareDisabled = function() {
    return $scope.selectedDocuments.size < 2;
  }

  $scope.compare = function() {
    let array = Array.from($scope.selectedDocuments);
    console.log('compare ' + array[0] + ' with ' + array[1]);
    $location.path('/compare').search({document1: array[0], document2: array[1]});
  }

  $scope.selectDocumentFoRemove = function(document) {
    $scope.deleteDocument = document;
  }

  $scope.delete = function(documentId) {
    documentService.deleteById(documentId).then(function(data) {
      $scope.documents.forEach(function(document, index, object) {
        if (document.id === documentId) {
          object.splice(index, 1);
        }
      });
    });
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

}]);