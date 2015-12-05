'use strict';

angular.module('chopShopApp')
  .controller('SettingsCtrl', function($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function() {
            $scope.message = 'Mot de passe modifié avec succes.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Mot de passe incorrect';
            $scope.message = '';
          });
      }
    };
  });
