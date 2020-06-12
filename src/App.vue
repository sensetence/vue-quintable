<template>
  <div id="app">
  	<div class="container py-5">
  		<div class="row">
  			<div class="col-12">
           <center>
            <img src="banner.png" width="400" height="300">
            <h1 class="mb-4">
                    VueQuintable Demo
                  </h1>
            </center>
  			</div>
  		</div>
  		<div class="row">
  			<div class="col-12">


<!--                <div>-->
<!--                    <b-tabs content-class="mt-3" @activate-tab="tabChanged">-->
<!--                        <b-tab title="Basic" active>-->
<!--                            <Basic></Basic>-->
<!--                        </b-tab>-->
<!--                        <b-tab title="Sort">-->
<!--							<Sort></Sort>-->
<!--      >-->
<!--                </b-tab>-->
<!--						<b-tab title="Pagination">-->
<!--							<Pagination></Pagination>-->
<!--						</b-tab>-->
<!--						<b-tab title="Select">-->
<!--							<Select></Select>-->
<!--						</b-tab>-->
<!--						<b-tab title="Breakpoints">-->
<!--							<Breakpoints></Breakpoints>-->
<!--						</b-tab>-->
<!--						<b-tab title="Breakpoints Advanced">-->
<!--							<BreakpointsAdvanced></BreakpointsAdvanced>-->
<!--						</b-tab>-->
<!--						<b-tab title="Ajax">-->
<!--							<Ajax></Ajax>-->
<!--						</b-tab>-->
<!--						<b-tab title="Ajax Loaded">-->
<!--							<AjaxLoaded :updated="tabUpdated"></AjaxLoaded>-->
<!--						</b-tab>-->
<!--						<b-tab title="Filter">-->
<!--							Coming soon...-->
<!--						</b-tab>-->
<!--						<b-tab title="Component">-->
<!--							Coming soon...-->
<!--						</b-tab>-->
<!--						<b-tab title="Nested">-->
<!--							Coming soon...-->
<!--						</b-tab>-->
<!--						<b-tab title="Slots">-->
<!--							Coming soon...-->
<!--						</b-tab>-->
<!--						<b-tab title="Computed Rows">-->
<!--							Coming soon...-->
<!--						</b-tab>-->
<!--						<b-tab title="Full">-->
<!--							Coming soon...-->
<!--						</b-tab>-->

<!--                    </b-tabs>-->
<!--                </div>-->

				<v-select class="mb-3" :clearable="false" v-model="example" :options="examples"></v-select>

				<div class="example-content">
					<component :is="example.value"></component>
				</div>




<!--			     <VueQuintable-->
<!--			    	v-model="selectedRows"-->
<!--			    	:verbose="verbose"-->
<!--			    	:filters="filters"-->
<!--			    	:filterGroups="filterGroups"-->
<!--			    	:config="config"-->
<!--			    	:rows="rows"-->
<!--                    :sortOrder="sortOrder"-->
<!--			    	key="table-1"-->
<!--					table-classes="test"-->
<!--			    	@update:sort="eventListener"-->
<!--			    	@update:page="eventListener"-->
<!--			    	@update:search="eventListener"-->
<!--			    	@update:rows-per-page="eventListener"-->
<!--			    	@click:row="eventListener"-->
<!--			    	@click:cell="eventListener"-->
<!--			    	@expand:row="eventListener"-->
<!--			    	@hover:row="eventListener"-->
<!--			    	@collapse:row="eventListener"-->
<!--			    	@change:breakpoints="eventListener"-->
<!--				 	@component:event="onComponentEvent"-->

<!--				 >-->
<!--			    	<template v-slot:header>-->
<!--					  	<div class="clearfix py-2">-->
<!--			                <label>-->
<!--			                    Name:-->
<!--			                    <input class="form-control" v-model="name" placeholder="Name"/>-->
<!--			                </label>-->
<!--			            </div>-->
<!--					  	<div class="clearfix py-2">-->
<!--					  		<p-check class="p-switch" v-model="active" value="true">Active</p-check>-->
<!--					  	</div>-->
<!--					  	<div class="clearfix py-2">-->
<!--					  		<p-check class="p-switch" v-model="printable" value="true">Printable</p-check>-->
<!--					  	</div>-->

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

<!--			    </VueQuintable>-->

			    <!-- Remote Loading Data -->
<!--			     <VueQuintable :loading="loading" :config="remoteConfig" :rows="remoteRows" key="table-2" />-->

<!--				<VueQuintable :axios="axios" :updated="updated" :config="ajaxConfig" key="table-3" />-->



			</div>
  		</div>
  	</div>
  </div>

</template>

<script>

// import VueQuintable from "./components/VueQuintable.vue"
import axiosCustom from "axios"
import Vue from "vue"


import Basic from "./examples/Basic.vue"
import Select from "./examples/Select.vue"
import Pagination from "./examples/Pagination.vue"
import Sort from "./examples/Sort.vue"
import Breakpoints from "./examples/Breakpoints.vue"
import AjaxLoaded from "./examples/AjaxLoaded.vue"
import Filters from "./examples/Filters.vue"
import Components from "./examples/Components.vue"
import Nested from "./examples/Nested.vue"
import Slots from "./examples/Slots.vue"
import ComputedRows from "./examples/ComputedRows.vue"
import CellFormatters from "./examples/Formatter.vue"
import Ajax from "./examples/Ajax.vue"
import BreakpointsAdvanced from "./examples/BreakpointsAdvanced.vue"

import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/toolbar/prism-toolbar.min.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js';

import Tester from "./examples/CheckboxComponent.vue"


Vue.component(
		"tester",
		// Look for the component options on `.default`, which will
		// exist if the component was exported with `export default`,
		// otherwise fall back to module's root.
		Tester.default || Tester
);

axiosCustom.interceptors.request.use(
		(config) => {

			console.warn("Custom axios",config);

			return config
		},
		error => {
			console.log("ERROR AXIOS", error)
		}
)

export default {
  name: 'app',
  components: {
    // VueQuintable,
	  Basic,
	  Breakpoints,
	  BreakpointsAdvanced,
	  Ajax,
	  AjaxLoaded,
	  Pagination,
	  Sort,
	  Select,
	  Filters,
	  Components,
	  Nested,
	  Slots,
	  ComputedRows,
	  CellFormatters,
  },

 data(){
        return {

			example:{
				value:"Basic",
				label:"Basic Example",
			},
        	examples:[
				{
					value:"Basic",
					label:"Basic Example",
				},
				{
					value:"ComputedRows",
					label:"Computed Rows Example",
				},
				{
					value:"Pagination",
					label:"Pagination Example",
				},
				{
					value:"Sort",
					label:"Sort Example",
				},
				{
					value:"Select",
					label:"Select Example",
				},
				{
					value:"CellFormatters",
					label:"Cell Formatters Example",
				},
				{
					value:"Breakpoints",
					label:"Breakpoints Example",
				},
				{
					value:"BreakpointsAdvanced",
					label:"Breakpoints Advanced Example",
				},
				{
					value:"Ajax",
					label:"Ajax Example",
				},
				{
					value:"AjaxLoaded",
					label:"Ajax Loaded Example",
				},
				{
					value:"Slots",
					label:"Slots Example",
				},
				{
					value:"Filters",
					label:"Filter Example",
				},
				{
					value:"Components",
					label:"Component Example",
				},
				{
					value:"Nested",
					label:"Nested Example",
				},

			],
        	axios:axiosCustom,

        	//loading
        	loading:false,

			ajaxConfig: {
				//Object[] columns with headline, sticky, breakpoint, align, sort
				columns: [
					{
						headline: "Name",
						sort: true,
					}, {
						headline: "Email",
						breakpoint: "sm",
						sort: true,
					}, {
						headline: "Phone",
						breakpoint: "md",
					}, {
						headline: "Job Title",
						breakpoint: "md",
						sort: true,
					}
				],
				select:true,
				selectAll:true,
				pagination:5,
				ajaxUrl:"http://localhost/test/data.php"
			},

        	remoteRows:[],
        	remoteConfig: {
                    //Object[] columns with headline, sticky, breakpoint, align, sort
                    columns: [
                        {
                            headline: "Name",
                            sort: true,
                        }, {
                            headline: "Email",
                            breakpoint: "sm",
                            sort: true,
                        }, {
                            headline: "Phone",
                            breakpoint: "md",
                        }, {
                            headline: "Job Title",
                            breakpoint: "md",
                            sort: true,
                        }
                    ],
                    select: true,
                    prettySelect: true,
                    selectAll: true,
                    defaultSelected: true,
                },
        	verbose:false,
			//property to trigger ajax update for current page and filters
        	updated:false,
			tabUpdated:false,
            //filters
            active:false,
            name:"",
            printable:false,
			      //selected rows for v-model
            selectedRows:[],

            //Object active filter criterias
            filters:{},

            sortOrder:[{index:1,asc:false},0],

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
						 title:"Name of participant",
						 sort:true,
						 showHeadlineBreakpoint:"md",

					 },{
                        headline:"Age",
						  hideHeadlineBreakpoint:"md",
						  breakpoint:"sm",
                          sort:true,
						  // cellFormatter(cell){
							//   return {
							// 	  value: cell.html + "<p>Additional Text</p>",
							// 	  type:"html"
							//   };
						  // },
						  // alwaysExpanded:true,
                     },{
                        headline:"Birth Place",
                        breakpoint:"md",
                          sticky:true
                     },{
						  headline:"Job",
						  hideHeadlineBreakpoint:"xl",
						  breakpoint:"xl",
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
                  selectAllRows:false,
                  //Boolean if all rows are selected on init
                  defaultSelected:false,
                  //Boolean if there shall be a search input
                  search:true,
				  //Boolean use fuzzy.js search matching library to find more search results
				  useFuzzySearch:true,
                  //Integer displayed page range of pagination
                  pageRange:2,
                  //Boolean show plus for row toggle or not
                  hideRowToggle:false,
                  //Integer minimum length of query that triggers search
                  searchLength:3,
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
                  //Array initial sort order of column
                  initialSortOrder:[1,0],
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

                            //text string
                            text:"max mustermann",
							 //html string
							 component:{
                            	name:"tester",
								 props:{
                            		test:1,
									 tester:2,
								 }
							 },
                            //String space separated classes
                            classes:"special-td",
                            //String alignment
                            align:"center",

                         },
                     	{html:20},
                        {text:"Berlin"},
                        { quintable: {
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
							},},
                     ],

                      //selected on default
                      selected:true,
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
                    tooltip:"John Doe (CEO)",
					  selected:true,

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
                      },
					  selected:true,
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
                      {html:"Beijing",
						  tooltip:"Test: Peking!"},
                      {html:"Trainee"},
                  ],
                  [
                      {html:"Peter Stanbridge"},
                      {html:18},
                      {html:"London"},
                      {html:"Trainee", tooltip:"Test: London!"},
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

  	example:{
  		handler(){
  			this.$nextTick(()=>{
  				console.log(Prism.plugins);
				Prism.highlightAll();
			});

		},
		immediate:true,
	},


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

  		console.log(this.filters);

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
  	},
	  onComponentEvent(data){
		  console.log(data);
	  }
  },
	created(){
		Prism.manual = true;
	},
  mounted(){
  	this.loading = true;
	  axiosCustom.get("http://localhost/test/data.php?fetch=true").then((response)=>{
  		this.remoteRows = response.data.rows;
  		this.remoteConfig = response.data.config;
      // this.remoteRows = JSON.parse(response.data.rows);
  		this.loading = false;
  	});


  // 	setTimeout(()=>{
  // 	    this.sortOrder = [0,1];
  //   },2500)
  //
  // setTimeout(()=>{
	//   this.updated = new Date();
  // },15000)

  }
}
</script>

<style>
    pre .close {
        float: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        text-shadow: inherit;
        opacity: inherit;
    }

	.nav-item{
		font-size: .85em;
		padding: .3rem 0.5rem;
	}
</style>

