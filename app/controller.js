var app = angular.module("app");
app.controller("myCtrl", [
    '$scope', function ($scope) {
        $scope.tasks = {
            data: [{
                id: 1,
                text: "Project #2",
                start_date: "01-04-2013",
                duration: 18,
                tree: true
            }, {
                id: 2,
                text: "Task #1",
                start_date: "02-04-2013",
                duration: 8,
                progress: 0.6,
                parent: 1
            }, {
                id: 3,
                text: "Task #2",
                start_date: "11-04-2013",
                duration: 8,
                progress: 0.6,
                parent: 1
            }],
            links: [{
                id: 1,
                source: 1,
                target: 2,
                type: 1
            }, {
                id: 2,
                source: 2,
                target: 3,
                type: 0
            }]
        };

        var columnConfig = [{
            name: "text",
            label: "Task name",
            tree: true,
            width: '*'
        }, {
            name: "start_date",
            label: "Start time",
            align: "center"
        }, {
            name: "duration",
            label: "Duration",
            align: "center"
        }];

        $scope.granttConfig = {
            dataSource: $scope.tasks,
            config: {
                columns: columnConfig,
                show_chart: true
            }
        }

        $scope.action = function ($data, $action) {
            console.log($data);
            console.log($action);
        }



    }
]);