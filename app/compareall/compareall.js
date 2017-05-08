'use strict';

angular.module('myApp.compareall', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compareall', {
    templateUrl: 'compareall/compareall.html',
    controller: 'CompareAllCtrl'
  });
}])

.controller('CompareAllCtrl', ['$scope', '$rootScope', '$location', '$sce', 'similarityService', 'documentService',  
function($scope, $rootScope, $location, $sce, similarityService, documentService) {
  $rootScope.currentPage = 'compareall';
  $scope.similarity = {coefficient: -1};
  $scope.document = {};
  $scope.texts = {};

  this.$onInit = function() {
    var documentId = $location.search().document;
    $scope.compare(documentId);
  }

  $scope.compare = function(documentId) {
    similarityService.shingleAll(documentId).then(function(data) {
      $scope.similarity = data;
      console.log(data);
      for (var i = 0; i < $scope.similarity.similarities.length; i++) {
        $scope.getText($scope.similarity.similarities[i].documentId);
      }
      $scope.getDocument(documentId);
    });
  }

  $scope.getDocument = function(documentId) {
    documentService.getByIdWithText(documentId).then(function(data) {
      data.text = $scope.highlight(data.text, $scope.similarity.ranges);
      $scope.document = data;
    });
  }

  $scope.getText = function(documentId) {
    documentService.getByIdWithText(documentId).then(function(data) {
      $scope.texts[documentId] = $scope.highlight(data.text, $scope.similarity.docRanges[documentId]);
    });
  }

    $scope.highlight = function(text, ranges) {
    if (ranges.length === 0) {
      return text;
    }
    
    var plain = [];
    var highlighted = [];

    for (var i = 0, j = 0, r = 0; r < ranges.length; j++) {
      plain[j] = text.substring(i, ranges[r].start);
      i = ranges[r++].end;
    }

    for (var i = 0; i < ranges.length; i++) {
      highlighted[i] = '<i style="background-color:#ddf0bc;">' + text.substring(ranges[i].start, ranges[i].end) + '</i>';
    }

    var result = '';
    for (var i = 0; i < plain.length && i < highlighted.length; i++) {
      if (i < plain.length) {
        result += plain[i];        
      }
      if (i < highlighted.length) {
        result += highlighted[i];
      }
    }
    return $sce.trustAsHtml(result);
  }
  
}]);
