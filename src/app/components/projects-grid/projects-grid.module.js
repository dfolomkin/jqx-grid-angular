import angular from 'angular';
import ngResource from 'angular-resource';

import ProjectsGridComponent from './projects-grid.component';
import ProjectsGridService from './projects-grid.service';
import './projects-grid.less';

const ProjectsGridModule = angular
  .module('projectsGrid', [ngResource])
  .component('projectsGrid', ProjectsGridComponent)
  .service('ProjectsGridService', ProjectsGridService).name;

export default ProjectsGridModule;
