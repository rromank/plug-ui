'use strict';

angular.module('myApp.document.service', [])

.factory('documentService', function ($http) {

  var getById = function (id) {
    return $http.get('http://localhost:8082/document/' + id)
    .then(function(response) {
      return response.data;
    });
  }

  var getAll = function () {
    return $http.get('http://localhost:8082/document')
    .then(function (response) {
      return response.data;
    });
  }

  var getByIdWithText = function(id) {
    return $http.get('http://localhost:8082/document/text/' + id)
    .then(function (response) {
      return response.data;
    });
  }

  var deleteById = function (id) {
    return $http.delete('http://localhost:8082/document/' + id)
    .then(function(response) {
      return response.data;
    });
  }

  return {
    getById: getById,
    getAll: getAll,
    deleteById: deleteById,
    getByIdWithText: getByIdWithText
  }

});
