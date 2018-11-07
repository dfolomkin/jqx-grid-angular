import moment from 'moment';

import template from './projects-grid.html';

const convertDate = date => moment(date, 'DD.MM.YYYY').format('DD MMM YYYY');

const ProjectsGridComponent = {
  template,
  controller: /* @ngInject */ class ProjectsGridComponent {
    constructor(ProjectsGridService) {
      this.projectsGridService = ProjectsGridService;
      this.onSelect = this.onSelect.bind(this);
      this.onSwitch = this.onSwitch.bind(this);
    }

    fetchGridData(id) {
      this.projectsGridService
        .EmployeeProjects(id)
        .query()
        .$promise.then(data => {
          this.gridData = data.map(item => ({
            ...item,
            'start-date': convertDate(item['start-date']),
            'end-date': convertDate(item['end-date'])
          }));
        });
    }

    $onInit() {
      this.projectsGridService
        .Employees()
        .query()
        .$promise.then(data => {
          this.employees = data;
          this.employeesList = data.map(item => item.name);

          const firstItem = data[0];

          this.selectedEmployee = firstItem;
          this.selectedEmployeeName = firstItem.name;

          this.fetchGridData(firstItem.id);
        });

      this.comboBoxSettings = {
        itemHeight: 24,
        height: 25,
        width: 220,
        renderer: (index, label, value) => value,
        renderSelectedItem: (index, item) => item.value
      };

      this.gridColumnSets = [
        [
          { text: 'ID', datafield: 'id', width: 45 },
          { text: 'Title', datafield: 'title', width: 150 },
          { text: 'Start Date', datafield: 'start-date', width: 100 },
          { text: 'End Date', datafield: 'end-date', width: 100 },
          { text: 'Activity', datafield: 'activity' },
          { text: 'Note', datafield: 'note' },
          { text: 'Address-1', datafield: 'add-1' },
          { text: 'Address-2', datafield: 'add-2' }
        ],
        [
          { text: 'ID', datafield: 'id', width: 45 },
          { text: 'Title', datafield: 'title', width: 150 },
          { text: 'IP-Address', datafield: 'ip-add' },
          { text: 'Function', datafield: 'function' },
          { text: 'Rating', datafield: 'rating' },
          { text: 'Feedback', datafield: 'feedback' }
        ]
      ];

      this.selectedColumnSet = this.gridColumnSets[0];

      this.gridSettings = {
        altrows: true,
        height: 338,
        ready: function() {
          $scope.settings.apply('selectrow', 1);
        },
        sortable: true
      };

      this.gridWidth = $('.projects-grid-container').width();
    }

    onSelect(event) {
      this.selectedEmployee = this.employees.find(
        item => item.name === event.args.item.value
      );
      this.fetchGridData(this.selectedEmployee.id);
    }

    onSwitch(event) {
      this.selectedColumnSet = this.gridColumnSets[event.args.index];
    }
  }
};

export default ProjectsGridComponent;
