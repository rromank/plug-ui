'use strict';

angular.module('myApp.similarity.service', [])

.factory('similarityService', function ($http) {

  var shingle = function(documentId1, documentId2) {
    return $http.get('http://localhost:8082/similarity/shingle', {
              params: {documentId1: documentId1, documentId2: documentId2}
            }).then(function(response) {
              return response.data;
            });
  }

  return {
    shingle: shingle
  }

});