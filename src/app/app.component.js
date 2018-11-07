import template from './app.html';

const AppComponent = {
  template,
  controller: /* @ngInject */ class AppComponent {
    constructor($scope) {
      this.$scope = $scope;
    }

    $onInit() {}
  }
};

export default AppComponent;
