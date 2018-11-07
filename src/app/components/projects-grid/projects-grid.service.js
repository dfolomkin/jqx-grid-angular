const backUrl = 'http://localhost:3001/api';

class ProjectsGridService {
  constructor($resource) {
    this.$resource = $resource;
  }

  Employees() {
    return this.$resource(backUrl + '/employees/all');
  }

  EmployeeProjects(id) {
    return this.$resource(`${backUrl}/projects/employee-${id}`);
  }
}

/* @ngInject */
export default ProjectsGridService;
