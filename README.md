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
	     @update:sort="eventListenerSort"
	     @update:page="eventListenerPage"
	     @update:search="eventListenerSearch"
	     @update:rows-per-page="eventListenerPePage"
	     @click:row="eventListenerClickRow" 
	     @click:cell="eventListenerClickCell" 
	     @expand:row="eventListenerExpandRow" 
         @collapse:row="eventListenerCollapseRow" 
	     @hover:row="eventListenerHoverRow" 
	     @change:breakpoints="eventListenerBreakpoints">

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
                     },{
                        headline:"Age",
                        sort:true,
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
                            //String space separated classes
                            classes:"special-td",
                            //String alignment ["left","right","center"]
                            align:"right",

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

