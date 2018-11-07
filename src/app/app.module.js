import angular from 'angular';

import ProjectsGridModule from './components/projects-grid/projects-grid.module';
import AppComponent from './app.component';

import './app.less';

const AppModule = angular
  .module('app', [ProjectsGridModule, 'jqwidgets'])
  .component('app', AppComponent).name;
