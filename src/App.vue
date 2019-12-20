<template>
  <div id="app">
  	<div class="container py-5">
  		<div class="row">
  			<div class="col-12">
  				<h1 class="mb-4">
  					Vue Foo Table Demo
  				</h1>
  			</div>
  		</div>
  		<div class="row">
  			<div class="col-12">
<!--			    <VueFooTable -->
<!--			    	v-model="selectedRows" -->
<!--			    	:verbose="verbose"-->
<!--			    	:filterGroups="filterGroups" -->
<!--			    	:filters="filters" -->
<!--			    	:config="config" -->
<!--			    	:rows="rows" -->
<!--			    	key="table-1" -->
<!--			    	@update:sort="eventListener"-->
<!--			    	@update:page="eventListener"-->
<!--			    	@update:search="eventListener"-->
<!--			    	@update:rows-per-page="eventListener"-->
<!--			    	@click:row="eventListener" -->
<!--			    	@click:cell="eventListener" -->
<!--			    	@expand:row="eventListener" -->
<!--			    	@hover:row="eventListener" -->
<!--			    	@collapse:row="eventListener" -->
<!--			    	@change:breakpoints="eventListener">-->
<!--			    	<template v-slot:header>-->
<!--					  	<div class="clearfix py-2">-->
<!--			                <label>-->
<!--			                    Name: -->
<!--			                    <input class="form-control" v-model="name" placeholder="Name"/>						-->
<!--			                </label>-->
<!--			            </div>-->
<!--					  	<div class="clearfix py-2">-->
<!--					  		<p-check class="p-switch" v-model="active" value="true">Active</p-check>-->
<!--					  	</div>-->
<!--					  	<div class="clearfix py-2">-->
<!--					  		<p-check class="p-switch" v-model="printable" value="true">Printable</p-check>-->
<!--					  	</div>-->
<!--					  	-->
<!--					  	<hr>-->
<!--			    	</template>-->
<!--			    	<template v-slot:footer>-->
<!--			    		<div class="text-center py-3 px-3 mt-3 bg-info text-white">-->
<!--			    			Copyright © 2019 by Quintet Consulting UG (haftungsbeschränkt)-->
<!--			    		</div>-->
<!--			    	</template>-->
<!--			    	<template v-slot:no-results>-->
<!--			    		<div class="text-center">No Results...</div>-->
<!--			    	</template>-->
<!--			    	-->
<!--			    </VueFooTable>-->

			    <!-- Remote Loading Data -->
			     <VueFooTable :loading="loading" :config="remoteConfig" :rows="remoteRows" key="table-2" />

  			</div>
  		</div>
  	</div>
  </div>

</template>

<script>

import VueFooTable from './components/VueFooTable.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    VueFooTable,
  },

 data(){
        return {

        	//loading
        	loading:false,
        	remoteRows:[],
        	remoteConfig:{},
        	verbose:false,
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
                        headline:"Name",
                        sort:true,
                     },{
                        headline:"Age",
                        breakpoint:"sm",
                        sort:true,
                     },{
                        headline:"Birthplace",
                        breakpoint:"md",
                        align:"right"
                     },{
                        headline:"Job",
                        sticky:false,
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
                            //HTML string
                            html:"Max Mustermann",
                            //String space separated classes
                            classes:"special-td",
                            //String alignment
                            align:"right",

                         },
                     	{html:20},
                        {html:"Berlin"},
                        {html:"Software Developer"},
                     ],

                      //expanded on default
                      expanded:true,
                      //Keywords for search
                      keywords:[
                          "Web Developer"
                      ],

                    //Custom filter values
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
                    //Custom filter values
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
                          {html:22},
                          {html:"Boston"},
                          {html:"CFO"},
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
  watch:{
	selectedRows(val){
		if(this.verbose){
			console.log("SELECTED ROWS",val);
		}
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
  	},
	},
  methods:{
  	
  	eventListener(data,event){
  		if(this.verbose){
	  		console.log(event,data);
	  	}
  	}
  },
  mounted(){
  	this.loading = true;
  	axios.get("http://192.168.188.56/test/data.php?fetch=true").then((response)=>{
  		console.log(response);
  		this.remoteRows = response.data.rows;
  		this.remoteConfig = response.data.config;
  		this.loading = false;
  	});
  }
}
</script>

