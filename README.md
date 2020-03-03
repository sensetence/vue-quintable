# VueQuintable

VueQuintable is a table wrapper for Vue.js. It is build with bootstrap 4.0. High configurable, easy to use, flexible and responsive.



## Features:

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

- header
- footer
- no-results
- loading

```html
<template v-slot:header>HEADER</template>
```



## Events

- click:row | passing row as second parameter

- click:cell | passing cell as second parameter

- expand:row | passing row as second parameter

- collapse:row | passing row as second parameter

- update:perPage | passing integer as second parameter

- update:page | passing integer as second parameter

- update:search | passing string as second parameter

- update:sort | passing object of sort group as second parameter

- component:event | generic event for passing data from child components

  

## Selection of Rows

VueQuintable uses v-model for selected rows



## Run build

```shell
npm install && npm run build-bundle
```



## Usage

#### Install

```shell
npm install --save https://zeitler-quintet@bitbucket.org/zeitler-quintet/vuefootable.git
```



#### Integration

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



#### Basic Example

```vue
<template>

...
                
	<VueQuintable 
	     v-model="selectedRows" 
	     :filterGroups="filterGroups" 
	     :filters="filters" 
	     :config="config"
	     :rows="rows" 
         :verbose="true"
         :table-classes="custom-table-class"
	     @update:sort="eventListenerSort"
	     @update:page="eventListenerPage"
	     @update:search="eventListenerSearch"
	     @update:rows-per-page="eventListenerPePage"
	     @click:row="eventListenerClickRow" 
	     @click:cell="eventListenerClickCell" 
	     @expand:row="eventListenerExpandRow" 
         @collapse:row="eventListenerCollapseRow" 
	     @hover:row="eventListenerHoverRow" 
	     @change:breakpoints="eventListenerBreakpoints"
         @components:event="handleComponentEvents">

        <template v-slot:header>
            <div class="clearfix py-2">
                <p-check class="p-switch" v-model="active" value="true">
                    Active
                </p-check>
            </div>
            <div class="clearfix py-2">
                <p-check class="p-switch" v-model="printable" value="true">
                    Printable
    			</p-check>
            </div>
            <div class="clearfix py-2">
                <label>
                    Name: 
                    <input class="form-control" v-model="name" placeholder="Name"/>						</label>
            </div>
            <hr>
        </template>

        <template v-slot:footer>
        	<div class="text-center py-3 mt-3 bg-info text-white">
            	Copyright © 2019 by Example Company
            </div>
        </template>
        <template v-slot:no-results>
        	<div class="text-center">No Results...</div>
        </template>


	</VueQuintable>

...

</template>

<script>

    import VueQuintable from './components/VueQuintable.vue'
	
    ...
 
  	data(){
        return {
            //filters
            active:false,
            name:"",
            printable:false,
			//selected rows for v-model
            selectedRows:[],

            //Object active filter criterias
            filters:{},
            
            //Object[] filter groups with relations, recursive.
            filterGroups:[
                {
                    items:[
                        {
                            items:[
                                {name:"name"},
                                {name:"active"}
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
            
            //Object Table config
            config:{ 
              
                  //Object[] columns with headline, sticky, breakpoint, align, sort
                  columns:[ 
                     {
                        //String headline for table header 
                        headline:"Name",
                        //Boolean if column is sortable
                        sort:true,
                        //String hover title
                        title:"Name of Participant"
                     },{
                        headline:"Age",
                        sort:true,
                        /*
                        Function for cell formatting. May return Object with value:String
                        and type:String{"text","html"} properties or just a formatted 
                        value (will be interpreted as type "text")
                        */
                        cellFormatter(cell){
							  return {
								  value: cell.html + "<p>Additional Text</p>",
								  type:"html"
							  };
						 },
                     },{
                        headline:"Birthplace",
                        //String for breakpoint when column should be hidden
                        //["xs","sm","md","lg","xl","all"] 
                        breakpoint:"md",
                        //String alignment of table header ["right","left","center"]
                        align:"right"
                     },{
                        headline:"Job",
                        //will always be displayed as additional open row 
                        sticky:true,
                     }
                  ],

                  //Boolean String of class rows on hover, default class bg-muted
                  hoverClass:"bg-success text-white",	
                  //Number or false/true, default false, if true => 25
                  pagination:5,
                  //Boolean if cells can be selected
                  select:true,
                  //Boolean if use pretty checkboxes library
                  prettySelect:true,
                  //String [pre/post] position of the select checkboxes 
                  selectPosition:"pre",
                  //Boolean if there should be a select all checkbox
                  selectAll:true,
				  //Boolean if "select all" selects all rows allover the pages
                  selectAllRows:true,
                  //Boolean if all rows are selected on init
                  defaultSelected:false,
                  //Boolean if there shall be a search input 
                  search:true,
                  //Integer displayed page range of pagination
                  pageRange:5,
                  //Boolean show plus for row toggle or not
                  hideRowToggle:true,
                  //Integer minimum length of query that triggers search
                  searchLength:1,
                  //String Placeholder for search input
                  searchPlaceholder:"Search rows...",
                  //String Placeholder for no searching/filtered resulting rows
                  emptyPlaceholder:"No results!",
                  //Boolean if all columns should be expanded by default
                  expandedAll:false,
                  //Boolean if user should be allowed to set rows per page
                  rowsSelect:true,
                  //String text for rows per page select
                  rowsPlaceholder:"Rows:",
                  //String ["AND"/"OR"] filter relation, if no filter group affected
                  filterRelation:"OR",
                   //String ["AND"/"OR"] default relation filter groups to each other
                  filterGroupRelation:"OR",
                  //Boolean if multi-key sorting is enabled
                  multiSort:true,
                  //Boolean if user should be allowed to set multisort
                  multiSortSelect:true,
                  //String Placeholder for multiple sort description
                  multiSortPlaceholder:"Multiple sort",
                  //String/Boolean search/filter/sort/pagination per ajax
                  ajaxUrl:false,
                },
            
               //Array of Array and/or Object
               rows:[ 
                  //Object, if options apart from cell content will be set 
                  { 
                     //Array with cell content/options
                     cells:[
                         {
                            //String text string
                            text:"Max Mustermann",
                            //String HTML string
                            html:"Max Mustermann",
                            //Object component definition
                            component:{
                                //String name/tag definition of component
                            	name:"test-component",
								//Object properties passed to component 
                                props:{
                            		identifier:1,
								 }
							 },
                             //Object nested VueQuintable
                             quintable: {
                                 //String classes for sub table
                                 tableClasses:"text-center",
                                 //Object config for sub table
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
                                 //Object rows for sub table
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
                            //String space separated classes
                            classes:"special-td",
                            //String alignment ["left","right","center"]
                            align:"right",
                     
						  },

                         },
                     	{html:20},
                        {html:"Berlin"},
                        {html:"Software Developer"},
                     ],
					  //Boolean if selected on default
                      selected:true,
                      //Bollean if expanded on default
                      expanded:true,
                      //String[] Keywords for search
                      keywords:[
                          "Web Developer"
                      ],

                    //Object Custom filter values
                    filters:{
                        printable:true,
                        active:true,
                    }
                  },
                  { 
                    cells:[
                     	{
                            html:"John Doe",
                         	sortValue:"#1"
                        },
                        {html:25},
                        {html:"New York"},
                        {html:"CEO"}
                    ],
                    //String space separated classes
                    classes:"text-danger",
                    //Object Custom filter values
                    filters:{
                        name:"John Doe",
                        printable:true,
                        active:false
                    },
                    tooltip:"John Doe (CEO)"

                  },
                  {
                      cells:[
                          {html:"John Stone"},
                          {html:"WOW 2"},
                          {html:"WOW 3"},
                          {html:"LOL 4"},
                          {html:"LOL 5"},
                          {html:"LOL 6"}
                      ],
                      filters:{
                          active:true,
                          printable:true
                      }
                  },
                  [ 
                     {
                         html:"Ponnappa Priya",
                         tooltip:"Name: Ponnappa Priya"
                     },
                      {html:28},
                      {html:"San Fransisco"},
                      {html:"Trainee"},

                  ],
                  [ 
                      {html:"Mia Wong"},
                      {html:50},
                      {html:"Pejing"},
                      {html:"Trainee"},
                  ],
                  [ 
                      {html:"Peter Stanbridge"},
                      {html:18},
                      {html:"London"},
                      {html:"Trainee"},
                  ],
                  [ 
                      {html:"Natalie Lee-Walsh"},
                      {html:25},
                      {html:"Dublin"},
                      {html:"Trainee"},
                  ],
                  [ 
                      {html:"Eugenia Anders"},
                      {html:65},
                      {html:"Jerusalem"},
                      {html:"Trainee"},
                  ],
                  [ 
                      {html:"Desiree Burch"},
                      {html:27},
                      {html:"Kopenhaven"},
                      {html:"Trainee"},
                  ],
               ],
           }
      },
          
      ...
      
      watch:{
        selectedRows(val){
            console.log("SELECTED ROWS",val);
        },
        name(val){
            if(val !== ""){
                this.$set(this.filters,"name",val); 
            }else{
                this.$delete(this.filters,"name");
            }

        },
        active(val){
            if(val){
                this.$set(this.filters,"active",true); 
            }else{
                this.$delete(this.filters,"active");
            }
        },
        printable(val){
            if(val){
                this.$set(this.filters,"printable",true); 
            }else{
                this.$delete(this.filters,"printable");
            }
        }
      }
    
    ...
    
</script>
```



#### Component Definition

To use a custom component inside a VueQuintable you have to define it as the following:

```vue
<template>
    <div @click="check">
       Component ID: {{identifier}}
    </div>
</template>


<script>

    export default {
        props:["identifier"],
        methods: {
            check() {
                //emit the pre-defined event for component actions
                //handled from VueQuintable by "component:event"
                this.$emit("action",
                    {
                        identifiert:this.id,
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
    }

};
```

The response has to be the following structure:

```javascript
{
	//Array of all rows, see above
	rows:[]
    //Number of all matching rows, without paging
    all:240
}
```



### Good to know

- Links won't trigger expanded rows to collapse. Also you can prevent collapse parent row by define an element with the class "prevent-toggle"