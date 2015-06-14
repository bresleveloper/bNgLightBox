var app = app || angular.module("app", []); //dont forget to set this to your app
app.directive('bNgLightBox', function ($log, $window) {
    return {
        scope: {
            onOpen: '&', onSave: '&', onClose: '&',      // & means Pass a reference to the method 
            valOpen: '@', valSave: '@', valClose: '@',      // @Store the string associated by fromName
            buttonClass: '@'
        },
        template: '<div class="box-wrapper" ><div class="box-button" ><button type="button" ng-class="buttonClass" ng-click="ngLightBoxFunction(funcOptions.open)">{{ valOpen }}</button></div><div class="box-content-wrapper" ng-show="openContent" ><div class="box-content"  ><div class="box-buttons" ><button type="button" ng-class="buttonClass" ng-click="ngLightBoxFunction(funcOptions.save)">{{ valSave }}</button><button type="button" ng-class="buttonClass" ng-click="ngLightBoxFunction(funcOptions.close)">{{ valClose }}</button></div><div class="box-content-transclude"  ng-transclude ></div></div></div></div>' + 
                  '<style>.box-content-wrapper { position: fixed; background-color: rgba(0,0,0,.5); overflow:auto; top:0; right:0;}.box-content { background-color:white; overflow:auto; margin: 1%; padding: 1%;  border-radius: 15px;}.box-buttons {padding: 0 0 15px 0;}.box-buttons button {float: none;}</style> ',
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
                    $log.error('bNgLightBox.on-' + funcOption + ' function error, exception: ' + e);
                }
            };
        }
    }
});
