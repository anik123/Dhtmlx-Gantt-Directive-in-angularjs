# Dhtmlx Gantt Directive in angularjs

A directive which will maintain dhtmlx gantt in angularjs.

# What is Dhtmlx Gantt ? 

dhtmlxGantt is an open source JavaScript Gantt chart that helps you visualize a project schedule in a nice-looking chart. It can show the dependencies between tasks as lines and allows you to set up different relationships between tasks (finish-to-start, start-to-start, end-to-end). dhtmlxGantt provides flexible API and a large number of event handles, which gives you the freedom to customize it for your needs.

- [WiKi](http://dhtmlx.com/docs/products/dhtmlxGantt/)
- [Docs](http://docs.dhtmlx.com/gantt/desktop__guides.html)



# Settings

This directive's scope is isolated.

This is the config object which will be passed from controler.

```
$scope.granttConfig = {
    dataSource: $scope.tasks,
    config: {
        columns: columnConfig,
        show_chart: true
    }
}
```

Html binding 

```
<div ng-grantt="granttConfig" action="action($data,$action)"></div>
```

Action method 

```
$scope.action = function($data, $action) {
    console.log($data);
    console.log($action);
}
```

  - [$data]() will send selected object 
  - [$action]() will send performed action (Add,Edit,Delete)
  
Data Design of dhtmlx grantt is 

```
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
```

        
In ```tasks``` object's ```data``` property will hold infomation of ```data``` and ```link``` property will hold information of link between the tasks in the chart.


In directive , configuration are used from dhtmlx gantt [docs](http://docs.dhtmlx.com/gantt/desktop__guides.html).

```
var config = $scope.ngGrantt.config || {}; // setting config 
gantt.config.show_task_cells = false;
gantt.config.autofit = true;
gantt.config.readonly = typeof config.readonly == "undefined" ? true : config.readonly;
gantt.config.show_progress = typeof config.show_progress == "undefined" ? false : config.show_progress;
gantt.config.show_chart = typeof config.show_chart == "undefined" ? false : config.show_chart;
gantt.config.show_grid = typeof config.show_grid == "undefined" ? true : config.show_grid;
gantt.config.open_tree_initially = typeof config.open_tree_initially == "undefined" ? true : config.open_tree_initially;
```

# Demo 


- Dhtmlx Gantt without chart

![Without chart](http://i66.tinypic.com/14ybc3k.jpg)

- Dhtmlx Gantt with chart

![With chart](http://i64.tinypic.com/r23m6o.jpg)        
        
