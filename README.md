# VueQuintable

VueQuintable is a table wrapper for Vue.js. It is build with bootstrap 4.0. High configurable, easy to use, flexible and responsive.

## Getting Started

These instructions will get you running VueQuintable for your project for development purposes. 

### Prerequisites

VueQuintable is a https://vuejs.org/ vue.js package and uses https://getbootstrap.com/ bootstrap by default. Please install both before using the package. If you want to use https://de.wikipedia.org/wiki/Ajax_(Programmierung) ajax functionalities please install https://github.com/axios/axios axios as it is used by VueQuintable.

```
npm install --save vue bootstrap-vue
npm install --save axios
```

### Installing

```shell
npm install --save https://zeitler-quintet@bitbucket.org/zeitler-quintet/vuefootable.git
```

### Integration

```js
import Vue from 'vue'

//use bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
//use bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "@quintet/vue-quintable/dist/vue-quintable.css"
import VueTable from '@quintet/vue-quintable'
Vue.use(VueTable);
```



## Features

These points will convince you that VueQuintable is the last table plugin you will ever need 

- Responsive columns which will be rendered as additional rows
- Pagination
- Sort/Multi-sort
- Search
- Custom Filters
- Recursive filter groups with relations
- Select rows
- Custom search keywords and filter values for rows
- Vue-binded values for columns and rows
- Nested VueQuintables
- Vue components inside tables
- Custom cell formatters



## Slots

You can define some slots to customize the table as you want to.

- header
- footer
- no-results
- loading

```html
<template v-slot:header>Your HTML-Code</template>
```



## Events

Add listeners for the following events to handle them as you want to.

- click:row | passing row as second parameter

- click:cell | passing cell as second parameter

- expand:row | passing row as second parameter

- collapse:row | passing row as second parameter

- update:perPage | passing integer as second parameter

- update:page | passing integer as second parameter

- update:search | passing string as second parameter

- update:sort | passing object of sort group as second parameter

- component:event | generic event for passing data from child components

  

## Configuration

The following will give you an overview how to configure the VueQuintable for your needs.

### Table Properties

| Parameter     | Type          | Required                    | Description                                                  |
| ------------- | ------------- | --------------------------- | ------------------------------------------------------------ |
| config        | Object        | yes                         | The table configuration object. See details below.           |
| rows          | Array         | yes (if no ajax url is set) | Table rows containing all cells. See details below.          |
| filters       | Object        | no                          | The active filters for displaying rows. This has to be an Object with filter name as key and filter value as value. See example below. |
| filter-groups | Array         | no                          | Filter groups with relations. See example below.             |
| sort-order    | Object        | no                          | Set sorting values and order by default or on the fly. See examples below. |
| axios         | Object        | no                          | Pass a configured axios instance to be used for ajax functionalities. Only relevant if ajax is used. |
| updated       | Boolean\|Date | no                          | Property to trigger reload on current page. Only relevant if ajax is used. |
| verbose       | Boolean       | no                          | Default is false. Set to true to see debug informations on developer tools in your Browser. |



#### Example for config property

| Key                  | Type                  | Required | Pre-condition                                                | Description                                                  | Default          | Example                                                      |
| -------------------- | --------------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- | ------------------------------------------------------------ |
| columns              | Array                 | yes      | -                                                            | Contains the configuration for the table columns including headlines. | null             | *See below*                                                  |
| expandedAll          | Boolean               | no       | Breakpoints for columns are set                              | If set to true, all columns will be expanded by default      | false            | true                                                         |
| hoverClass           | Boolean\|String       | no       | -                                                            | Class for rows on hover                                      | "bg-muted"       | "bg-success"                                                 |
| hideRowToggle        | Boolean               | no       | Breakpoints for columns are set                              | If set to true, no plus symbols will be displayed for row toggle. | false            | true                                                         |
| pagination           | Boolean\|Number       | no       | -                                                            | If set to true, the default page size will be 25.            | false            | 5                                                            |
| pageRange            | Number                | no       | *pagination* enabled                                         | Displayed page range of pagination.                          | 5                | 3                                                            |
| rowsSelect           | Boolean               | no       | *pagination* enabled                                         | If set to true, user will be allowed to set rows per page    | false            | true                                                         |
| rowsPlaceholder      | String                | no       | *pagination* enabled and *rows select* is enabled            | Text for *rows per page* selection                           | "Rows per page:" | "Rows:"                                                      |
| select               | Boolean               | no       | -                                                            | If set to true rows can be selected by check boxes. Tables v-model can be used for selected row Array. | false            | true                                                         |
| prettySelect         | Boolean               | no       | *select* is enabled                                          | If set to true, https://lokesh-coder.github.io/pretty-checkbox/ pretty checkboxes library will be used. | false            | true                                                         |
| selectPosition       | String{"pre"\|"post"} | no       | *select* is enabled                                          | Position of the select check boxes, first or last column.    | "post"           | "pre"                                                        |
| selectAll            | Boolean               | no       | *select* is enabled                                          | If set to true,  additional checkbox will appear to select all rows | false            | true                                                         |
| selectAllRows        | Boolean               | no       | *select* is enabled                                          | If set to true, *select all* selects all rows allover the pages. Please keep in mind that this won't work with server side pagination. | false            | true                                                         |
| defaultSelected      | Boolean               | no       | *select* is enabled                                          | If set to true, all rows will be selected initially.         | false            | true                                                         |
| search               | Boolean               | no       | -                                                            | If set to true a filter search input will be displayed       | false            | true                                                         |
| searchLength         | Number                | no       | *search* is enabled                                          | Minimum length of query that triggers search.                | 1                | 3                                                            |
| searchPlaceholder    | String                | no       | *search* is enabled                                          | Placeholder if no search query is entered                    | "Search..."      | "Search rows..."                                             |
| emptyPlaceholder     | String                | no       | *search* is enabled or *filters* are set                     | Placeholder if filtering rows has no results.                | "No rows"        | "No results"                                                 |
| filterRelation       | String{"OR"\|"AND"}   | no       | *filters* are set                                            | Filter relation, if no filter group affected                 | "AND"            | "OR"                                                         |
| filterGroupRelation  | String{"OR"\|"AND"}   | no       | *filters* are set                                            | Default relation filter groups to each other                 | "AND"            | "OR"                                                         |
| multiSort            | Boolean               | no       | *sort* is enabled on at least one column                     | If set to true multi-key sorting is enabled                  | false            | true                                                         |
| multiSortSelect      | Boolean               | no       | *sort* is enabled on at least one column                     | If set to true user will be allowed to enable and disable *multi sort* | false            | true                                                         |
| multiSortPlaceholder | String                | no       | *sort* is enabled on at least one column and *multi sort select* is enabled | Placeholder for multiple sort description                    | "Multiple sort"  | "Toggle multiple"                                            |
| ajaxUrl              | String\|Boolean       | no       | -                                                            | If set ajax will be useed for search/filter/sort/pagination  | false            | "[https://www.example.com/table-options](https://www.example.com/table-options)" |

##### Addtional example for *columns* config property

| Key                    | Type     | Options                             | Pre-condition           | Description                                                  |
| ---------------------- | -------- | ----------------------------------- | ----------------------- | ------------------------------------------------------------ |
| headline               | String   | -                                   | -                       | Headline for column                                          |
| title                  | String   | -                                   | -                       | Description, displayed on hover the headline                 |
| sort                   | Boolean  | true\|false                         | -                       | If set to true, this column will be sortable                 |
| breakpoint             | String   | "xs"\|"sm"\|"md"\|"lg"\|"xl"\|"all" | -                       | Bootstrap breakpoint from which descending the column will be displayed as additional row |
| showHeadlineBreakpoint | String   | "xs"\|"sm"\|"md"\|"lg"\|"xl"\|"all" | *headline* is set       | Bootstrap breakpoint from which descending the columns headline will be shown |
| hideHeadlineBreakpoint | String   | "xs"\|"sm"\|"md"\|"lg"\|"xl"\|"all" | *headline* is set       | Bootstrap breakpoint from which descending the columns headline will be hidden |
| align                  | String   | "left"\|"right"\|"center"           |                         | Text alignment for whole column                              |
| alwaysExpanded         | Boolean  | true\|false                         | *breakpoint* is set     | If set to true, the additional columns row will be always expanded if the breakpoint is reached |
| sticky                 | Boolean  | true\|false                         | *breakpoint* is not set | If set to true,  this column will be always displayed as additional row and will be expanded always |
| cellFormatter          | Function | -                                   | -                       | Function for complex custom cell formatting. The cell will be passed as function parameter |



#### Example for rows property

| Key      | Type                              | Pre-condition                                   | Description                                                  | Default |
| -------- | --------------------------------- | ----------------------------------------------- | ------------------------------------------------------------ | ------- |
| cells    | Array                             | -                                               | List of cells for the row                                    | null    |
| selected | Boolean                           | *select* is enabled                             | If set to true the row will be selected on default           | false   |
| expanded | Boolean                           | *breakpoint* of at least one column is affected | If set to true the row will be expanded on default           | false   |
| keywords | String[]                          | *search* is enabled                             | Additional keywords which will match a search query          | null    |
| classes  | String                            | -                                               | Additional CSS classes for row                               | null    |
| filters  | Object                            | *filters* are set                               | Filters with filter name(s) and value(s), which will match selected filter(s) | null    |
| align    | String{"left"\|"right"\|"center"} | -                                               | Text alignment for whole row, this will be overwritten by *columns* align value | "left"  |

##### Addtional example for *cells* rows property

| Key       | Type   | Pre-condition                                                | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| text      | String | non of the following are set: *html*, *component*, *quintable* | Content string                                               |
| html      | String | non of the following are set: *text*, *component*, *quintable* | HTML content string                                          |
| component | String | non of the following are set: *text*, *html*, *quintable*    | Custom component object, see code example below              |
| quintable | String | non of the following are set: *text*, *html*, *component*    | VueQuintable object component for nested table, see simple code example below |
| classes   | String | -                                                            | Additional CSS classes for cell                              |
| align     | String | -                                                            | Text alignment for whole column, this will overwrite *columns* and *rows* align values |

Lets have a look on a example for *rows* and *cells*

```javascript
//Table with columns "Name","Age","Birthplace","Job"

[
    //simple row as array
    [ 
        {
            text:"John Doe"
        },
        {
            text:50
        },
        {
            text:"New York"
        },
        {
            text:"Trainee"
        },
    ],
    //advances row as object
    {
    	cells:[
            {
                html:"<b>Max</b> Mustermann",
                classes:"special-td",
                align:"right",
             },
            {
                component:{
                    name:"age-component",
                    props:{
                        age:20,
                    }
                },
            },
            {
                quintable: {
                    tableClasses:"text-center",
                    config: {
                        columns: [
                            {
                                headline: "State of birth",
                            }, {
                                headline: "City of birth",
                            }, {
                                headline: "Time of birth",
                            }
                        ],
                    },
                    rows: [
                        [
                            {text: "Bavaria"}, 
                            {text: "Augsburg"},
                            {text: "10:10 AM"}
                        ],
                        [
                            {text: "New York"}, 
                            {text: "New York"}, 
                            {text: "12:10 AM"}
                        ],
                        [
                            {text: "Texas"}, 
                            {text: "Houston"}, 
                            {text: "09:12 PM"}
                        ],        								
                    ],
            	},
            },
            {
                text:"Trainee"
            },
		]
    }
]


```

##### Component Definition

To use a custom component inside a VueQuintable you have to define it as the following:

```vue
<template>
    <div @click="check">
      Age: {{age}}
    </div>
</template>


<script>

    export default {
        props:["age"],
        methods: {
            check() {
                //emit the pre-defined event for component actions
                //handled from VueQuintable by "component:event"
                this.$emit("action",
                    {
                        age:this.age,
                    }
                )
            }
        }
    }

</script>

```

Import and use the Component in your Code:

```js
import TestComponent from "./components/TestComponent.vue"

Vue.component(
    "test-component",
    TestComponent.default || TestComponent
);
```



#### Example for *filters* property

This example shows selected values for **name**, **active** and **printable** filters.

```javascript
{
   name:"John",
   active:true,
   printable:false
}
```



#### Example for *filter-groups* property

| Key      | Type                | Description                                                  |
| -------- | ------------------- | ------------------------------------------------------------ |
| items    | Object[]            | List that contains Object of filter names or nested groups related to the group |
| relation | String{"OR"\|"AND"} | Relation between the items                                   |

This filter groups example will cause to show rows that have filter matching filter values for selected  **name** *OR* **active** filter **AND** selected printable filter. This groups are infinitely nestable.

```javascript
[
    {
        items:[
            {
                items:[
                    {
                        name:"name"
                    },
                    {
                        name:"active"
                    }
                ],
                relation:"OR",
            },
            {
                items:[
                    {
                        name:"printable"
                    }
                ],
            }
        ],
        relation:"AND"
    }
],
```

#### Example for for *sort-order* property

These examples depict a sorting ordered second column (index=1) before first column (index=0). You can use Objects to set the ascending or descending order optionally. The Default will be *asc=true*, column index starts on zero.

```javascript
//simple
[
   1,0
]

//advanced
[
    {
        index:1,
        asc:false
    },
    {
        index:0,
        asc:true
    },
]

```



## Basic Example

A simple basic example to show the usage of VueQuintable. More examples are included in the project and can be started with:

```shell
npm run start
```

 

```vue
<template>
	<VueQuintable :config="config" :rows="rows"></VueQuintable>
</template>

<script>

    import VueQuintable from './components/VueQuintable.vue

    ...
 
  	data() {
        return {
            config: {
                columns: [
                    {
                        headline: "Name",
                    }, {
                        headline: "Age",
                    }, {
                        headline: "Birthplace",
                        breakpoint: "md"
                    }, {
                        headline: "Job",
                        sticky: true,
                    }
                ],
            },

            rows: [
                [
                    {
                        text: "Mia Wong"
                    },
                    {
                        text: 50
                    },
                    {
                        text: "Pejing"
                    },
                    {
                        text: "Trainee"
                    },
                ],
                [
                    {
                        text: "Peter Stanbridge"
                    },
                    {
                        text: 18
                    },
                    {
                        text: "London"
                    },
                    {
                        text: "Trainee"
                    },
                ],
                [
                    {
                        text: "Natalie Lee-Walsh"
                    },
                    {
                        text: 25
                    },
                    {
                        text: "Dublin"
                    },
                    {
                        text: "Trainee"
                    },
                ],
            ],
        }
    }
          
  ...
</script>
```



#### AJAX data example

```vue
<template>

...

<VueQuintable :loading="loading" :config="remoteConfig" :rows="remoteRows" />

...

</template>

<script>
	import axios from 'axios'

	...

  	data(){
        return {
            loading:false,
            remoteConfig:null,
            remoteRows:null
  		
 	...
 
    mounted(){
        this.loading = true;
        axios.get("http://your.server.url").then((response)=>{
            this.remoteRows = response.data.rows;
            this.remoteConfig = response.data.config;
            this.loading = false;
        });
    }
...

</script>
```

The request for the ajax handling on server has got the following structure:

```javascript
{
    //String search query
    search:"some query",
    //Object Filters, see above
    filters:{},
    //Number etries per page
    perPage:12,
    //Number current page, starting at 1
    page:2,
    //Object sorting columns and 
    sort:{
        //Array of sorting column indexes
        indexes:this.currentSortIndexes,
        //Object of column definitions keyed by column index
        columns:this.sortingColumns,
    },
};
```

The response has to be the following structure:

```javascript
{
	//Array of all rows, structure see above
	rows:[]
    //Number of all matching rows, without paging
    all:240
}
```



### Good to know

- Links won't trigger expanded rows to collapse. Also you can prevent collapse parent row by define an element with the class "prevent-toggle"
- VueQuintable uses v-model for selected rows



## Authors

Quintet Consulting UG - Samuel Zeitler