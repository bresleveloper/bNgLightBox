var app = app || angular.module("app", []); //dont forget to set this to your app
app.directive('bNgLightBox', function ($log, $window) {
    return {
        scope: {
            onOpen: '&', onSave: '&', onClose: '&',      // & means Pass a reference to the method 
            valOpen: '@', valSave: '@', valClose: '@',   // @Store the string associated by fromName
            buttonClass: '@'                             // =pass value
        },
        template: '<style>.box-content-wrapper { position: absolute; background-color: rgba(0,0,0,.5); overflow:auto; top:0; right:0;}.box-content { background-color:white; overflow:auto; margin: 1%; padding: 1%;  border-radius: 15px;}.box-buttons {padding: 0 0 15px 0;}.box-buttons button {float: none;}.box-button span {float: right; margin-top:-16px; font-family:cursive;cursor:pointer;}</style>' + 
                  '<div class="box-wrapper" ><div class="box-button" ng-if="buttons"><button type="button" ng-class="buttonClass" ng-click="ngLightBoxFunction(funcOptions.open)">{{ valOpen }}</button></div>        <div class="box-content-wrapper" ng-show="openContent" ><div class="box-content"  ng-if="openContent"><div class="box-buttons" ng-if="buttons"><button type="button" ng-class="buttonClass" ng-click="ngLightBoxFunction(funcOptions.save)">{{ valSave }}</button><button type="button" ng-class="buttonClass" ng-click="ngLightBoxFunction(funcOptions.close)">{{ valClose }}</button></div><div class="box-button" ng-if="!buttons"><span ng-click="ngLightBoxFunction(funcOptions.close,$event)">x</span></div><div class="box-content-transclude"  ng-transclude ></div></div></div></div>',
        transclude: true,
        link:function(scope, elem, attrs){
            var funcOptions = scope.funcOptions = { open: 'open', close: 'close', save: 'save' };
            scope.buttons = attrs.onOpen ? true : false;
            
            if (!scope.buttons){
              elem.parent().on('click', function(){ 
                scope.ngLightBoxFunction(funcOptions.open);
                scope.$apply();
              });
              
              scope.close = function(e){
                $log.log('close click, scope.openContent: ' + scope.openContent);
                scope.openContent = false;
                e.stopPropagation();
              };
            }

            scope.ngLightBoxFunction = function (funcOption, e) {
                scope.openContent = funcOption === funcOptions.open;
                if (scope.openContent === true) {
                    var boxContentWrapper = elem.children().children();
                    if (boxContentWrapper.length > 1){
                      boxContentWrapper = angular.element(boxContentWrapper[1]);
                    }
                    boxContentWrapper[0].style.height = $window.innerHeight + 'px';
                    boxContentWrapper[0].style.width = $window.innerWidth + 'px';
                }
                
                if(!scope.buttons && e){
                  e.stopPropagation();
                }
                else {
                  try {
                      switch (funcOption) {
                          case funcOptions.open: scope.onOpen(); break;
                          case funcOptions.close: scope.onClose(); break;
                          case funcOptions.save: scope.onSave(); break;
                      }
                  } catch (e) {
                      $log.error('ngLightBox.on-' + funcOption + ' function error, exception: ' + e);
                  }
                }
            };
        }
    };
});
