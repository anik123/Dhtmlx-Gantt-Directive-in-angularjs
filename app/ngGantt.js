var app = angular.module("app");
app.directive('ngGrantt', [function () {
    var btnCode = {
        Add: {
            "code": 1,
            "class": "fa fa-plus"
        },
        Edit: {
            "code": 2,
            "class": "fa fa-edit"
        },
        Delete: {
            "code": 3,
            "class": "fa fa-minus"
        }
    };
    return {
        restrict: 'A',
        scope: {
            ngGrantt: '=',
            action: '&'
        },
        transclude: true,
        template: '<div ng-transclude></div>',
        link: link
    };

    function link($scope, $elm, $attr) {
        try {


            // css design

            $elm.css("height", "400px"); // default height
            $elm.css("padding-top", "5px"); // default height


            // value assign


            // app config

            var config = $scope.ngGrantt.config || {}; // setting config 

            gantt.config.show_task_cells = false;
            gantt.config.autofit = true;
            gantt.config.readonly = typeof config.readonly == "undefined" ? true : config.readonly;
            gantt.config.show_progress = typeof config.show_progress == "undefined" ? false : config.show_progress;
            gantt.config.show_chart = typeof config.show_chart == "undefined" ? false : config.show_chart;
            gantt.config.show_grid = typeof config.show_grid == "undefined" ? true : config.show_grid;
            gantt.config.open_tree_initially = typeof config.open_tree_initially == "undefined" ? true : config.open_tree_initially;

            // events

            // when task is clicked 
            gantt.attachEvent("onTaskClick", function (id, e) {

                var classes = [btnCode.Add.class, btnCode.Edit.class, btnCode.Delete.class]; // action class list 
                if (classes.indexOf(e.target.className) > -1) { // checked if clicked item is a action button or not 
                    var dataList = getList(btnCode).filter(function (x) { return x.value.class == e.target.className; }); // get infomation of action 

                    var actionObj = dataList.length > 0 ? {
                        action: dataList[0].text, code: dataList[0].value.code
                    } : {}; // setting action object 

                    $scope.action({ $data: gantt.getTask(id), $action: actionObj }); // pass to the controller 
                }
                return true;
            });

            // click on grid header 
            gantt.attachEvent("masterAdd", function () {
                $scope.action({ $data: void (0), $action: { action: "Root", code: -1 } });
                return true;
            });


            // Watches

            //size of gantt
            var resize = $scope.$watch(function () {
                return $elm[0].offsetWidth + "." + $elm[0].offsetHeight;
            }, function () {
                gantt.setSizes();
            });

            //watch data collection, reload on changes
            var source = $scope.$watch("ngGrantt.dataSource", function (nv, ov) {
                if (!nv) return;
                gantt.clearAll();
                gantt.parse(nv, "json");
            }, true);


            // column settings 

            /*
               
               // column property 
                
               align ('left', 'center', 'right') the horizontal title alignment
               hide	(boolean) hides/shows a column
               label (string) the title of the column
               name	(function) the column's id. The name 'add' allows you to add a column with the '+' sign
               resize	(boolean) enables a possibility to resize a column by dragging the column's border
               template	(function) the data template
               tree	(boolean) indicates that the related column should display the tree
               width	(number) the width of the column

            
            */

            // manage columns 

            if (config.columns) { // if user passed column 
                gantt.config.columns.length = 0; // clear previous column
                gantt.config.columns = config.columns; // assign user column 
            } else {// get default selected column 
                for (var i = 0; i < gantt.config.columns.length; i++) { // remove default add button 
                    if (gantt.config.columns[i].name == "add") {
                        gantt.config.columns.splice(i, 1);
                        break;
                    }
                }
            }

            // setting action column 
            gantt.config.columns.push({
                name: "Action",
                label: '<a href="javascript:;" onclick="gantt.callEvent(\'masterAdd\');"> <i class="fa fa-plus"></i></a> &nbsp;<i class="fa fa-minus"></i>',
                align: "center",
                width: 80,
                template: function (note) {

                    var html = "";

                    (config.btnCode || "1,2,3").split(",").map(function (x) {
                        switch (+x) {
                            case btnCode.Add.code:
                                html += ' <a href="javascript:;"><i class="' + btnCode.Add.class + '"></i></a>&nbsp;';
                                break;
                            case btnCode.Edit.code:
                                html += ' <a href="javascript:;"><i class="' + btnCode.Edit.class + '"></i></a>&nbsp;';
                                break;
                            case btnCode.Delete.code:
                                html += ' <a href="javascript:;"><i class="' + btnCode.Delete.class + '"></i></a>';
                        }
                    });

                    return html;
                }
            });

            // initlialize gantt 
            gantt.init($elm[0]);

            // destroy 
            $scope.$on("$destroy", function () {
                resize();
                source();
            });

        } catch (e) {
            throw e;
        }
    }

}]);