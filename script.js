var app = app || angular.module("app", []); //dont forget to set this to your app
app.directive('bNgLightBox', function ($log, $window) {
    return {
        scope: {
            onOpen: '&', onSave: '&', onClose: '&',      // & means Pass a reference to the method 
            valOpen: '@', valSave: '@', valClose: '@',      // @Store the string associated by fromName
            buttonClass: '@'                               
        },
        templateUrl: 'bNgLightBox.html',
        transclude: true,
        controller: function ($scope) {
            var funcOptions = $scope.funcOptions = { open: 'open', close: 'close', save: 'save' };

            $scope.ngLightBoxFunction = function (funcOption) {
                $scope.openContent = funcOption === funcOptions.open;
                
                if ($scope.openContent === true) {
                    var boxContentWrapper = angular.element(document.querySelector(".box-content-wrapper"));
                    boxContentWrapper[0].style.height = $window.innerHeight + 'px';
                    boxContentWrapper[0].style.width = $window.innerWidth + 'px';
                }

                try {
                    switch (funcOption) {
                        case funcOptions.open: $scope.onOpen(); break;
                        case funcOptions.close: $scope.onClose(); break;
                        case funcOptions.save: $scope.onSave(); break;
                    }
                } catch (e) {
                    $log.error('ngLightBox.on-' + funcOption + ' function error, exception: ' + e);
                }
            };
        }
    }
}); 
