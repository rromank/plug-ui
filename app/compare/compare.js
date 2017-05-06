'use strict';

angular.module('myApp.compare', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compare', {
    templateUrl: 'compare/compare.html',
    controller: 'CompareCtrl'
  });
}])

.controller('CompareCtrl', ['$scope', '$rootScope', '$location', '$sce', 'similarityService', 'documentService',  
function($scope, $rootScope, $location, $sce, similarityService, documentService) {
  $rootScope.currentPage = 'compare';
  $scope.similarity;
  $scope.document1;
  $scope.document2;

  $scope.text1;
  $scope.text2;

  this.$onInit = function() {
    var documentId1 = $location.search().document1;
    var documentId2 = $location.search().document2;
    $scope.compare(documentId1, documentId2);
  }

  $scope.compare = function(documentId1, documentId2) {
    similarityService.shingle(documentId1, documentId2).then(function(data) {
      $scope.similarity = data;

      documentService.getById(documentId1).then(function(data) {
        $scope.document1 = data;
        $scope.text1 = $scope.highlight($scope.document1.text, $scope.similarity.rangeDocument1);
      });

      documentService.getById(documentId2).then(function(data) {
        $scope.document2 = data;
        $scope.text2 = $scope.highlight($scope.document2.text, $scope.similarity.rangeDocument2);
      });

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
