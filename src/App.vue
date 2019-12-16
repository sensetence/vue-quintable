<template>
  <div id="app">
  	<div class="container py-5">
  		<div class="row">
  			<div class="col-12">
  				<h1 class="mb-4">
  					Foo Table Demo
  				</h1>
  			</div>
  		</div>
  		<div class="row">
  			<div class="col-12">
  				
			
			    <VueFooTable v-model="selectedRows" :filters="filters" :config="config" :rows="rows" key="table-3">
			    	<template v-slot:header>
			    		<div class="clearfix">
					  	<label>Name: </label>
						  	<select v-model="name" class="form-control">
						  		<option>NICHTS</option>
						  		<option>TEST</option>
						  		<option>JA</option>
						  		<option>UND</option>
						  	</select>
						</div>
					  	<div class="clearfix py-2">
					  		<p-check class="p-switch" v-model="active" value="true">Active</p-check>
					  	</div>
					  	<div class="clearfix py-2">
					  		<p-check class="p-switch" v-model="company" value="true">Company</p-check>
					  	</div>
					  	<div class="clearfix py-2">
					  		<p-check class="p-switch" v-model="filtering" value="true">Multiple Filter [names:ole,matt]</p-check>
					  	</div>
					  	<hr>

			    	</template>
			    	<template v-slot:footer>
			    		<div class="text-center py-3 mt-3 bg-info text-white">
			    			Copyright © 2019 by Quintet Consulting UG (haftungsbeschränkt)
			    		</div>
			    	</template>
			    </VueFooTable>
			    <!-- <VueFooTable :loading="loading" :config="remoteConfig" :rows="remoteRows" key="table-2" /> -->
  			</div>
  		</div>
  	</div>
  </div>

</template>

<script>
// import VueFooRow from './components/VueFooRow.vue'
import VueFooTable from './components/VueFooTable.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    VueFooTable,
    // VueFooRow,
  },

  data(){
  	return {
  		//filters
  		name:"NICHTS",
  		active:false,
  		company:false,
  		filtering:false,

  		selectedRows:[],

  		//Boolean table loading
  		loading:false,
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
						name:"company"
					}
				],
				relation:"AND"
			},
			{
				items:[
					{name:"name"},
					{name:"active"}
				],
				relation:"AND"
			}
		],
		//Object Table config
  		config:{ 
		   	  //Object[] columns with headline, sticky, breakpoint, align
		      columns:[ 
		         {
		         	headline:"Test",
		         	sticky:false,
		         	breakpoint:"md",
		         },{
		         	headline:"Test 1",
		         	sort:true,
		         	sticky:false,
		         	breakpoint:"md"
		         },{
		         	headline:"Test 2",
		         	sticky:false,
		         	breakpoint:"md"
		         },{
		         	headline:"Test 3",
		         	sort:true,
		         	sticky:false,
		         	breakpoint:"sm"
		         },{
		         	headline:"Test 4",
		         	sort:true,
		         	sticky:false,
		         },{
		         	headline:"Test 5",
		         	sort:true,
		         	sticky:false,
		         	align:"right",
		         }
		      ],

		      //Boolean String of class rows are set to on hover, default class bg-muted
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
		      //Boolean if there shall be a search input filter 
		      search:true,
		      //Integer displayed page range of pagination
		      pageRange:5,
		      //Boolean show plus for row toggle or not
		      hideRowToggle:false,
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
		      //String ["AND"/"OR"] default filter relation, if no filter group affected
		      filterRelation:"OR",
		       //String ["AND"/"OR"] default relation filter groups to each other
		      filterGroupRelation:"OR",
		      //Boolean if multi-key sorting is enabled in case that more than one column has a sort flag
		      multiSort:false,
		      //String/Boolean search/filter/sort/pagination per ajax
		      // ajaxUrl:"http://192.168.188.56/test/data.php",
		     
		    
			},
			//Array of Array and/or Object
		   rows:[ 
		   	  //Object, if options apart from cell content will be set 
		      { 
		      	 //Array with cell content/options
		      	 cells:[
		         {
		         	//HTML string
		         	html:"TEST 1",
		         	//String space separated classes
		         	classes:"special-td",
		         	//String alignment
		         	align:"right",

		         },
		         	//Option[] or string
		         {html:"hmmmm"},{html:"TEST 3"},{html:"TEST 4"},{html:"TEST 5"},{html:"TEST 6"},
		         ],

		         //expanded on default
		         expanded:true,
		         //Keywords for search
	         	keywords:[
	         		"Rambo"
	         	],

	         	//Custom filter values
	         	filters:{
	         		company:true,
	         		active:true,

	         	}
		      },
		      { 
		      	cells:[
		         {html:1,sortValue:"Mist 1"},{html:"Mist 2"},{html:"Mist 3"},{html:"Mist 4"},{html:"Mist 5"},{html:"Mist 6"}],
		         classes:"tester",
		         //Custom filter values
	         	filters:{
	         		name:"UND",
	         		company:true,
	         		names:"Matt"
	         	},
	         	tooltip:"HAHAHAHA"

		      },
		      {
		          cells:[{html:"LOL 1"},{html:"LOL 2"},{html:"LOL 3"},{html:"LOL 4"},{html:"LOL 5"},{html:"LOL 6"}],
		          filters:{
	         		name:"UND",
	         		active:true,
	         		names:"Ole",
	         	}
		      },
		      [ 
		         {html:"WOW 1",tooltip:"HAHAHAHA"},{html:"WOW 2"},{html:"WOW 3"},{html:"WOW 4"},{html:"WOW 5"},{html:"WOW 6"}
		      ],
		      [ 
		         {html:"WOW 1"},{html:"WOW 2"},{html:"WOW 3"},{html:"WOW 4"},{html:"WOW 5"},{html:"WOW 6"}
		      ],
		      [ 
		         {html:"WOW 1"},{html:"WOW 2"},{html:"WOW 3"},{html:"WOW 4"},{html:"WOW 5"},{html:"WOW 6"}
		      ],
		      [ 
		         {html:"WOW 1"},{html:"WOW 2"},{html:"WOW 3"},{html:"WOW 4"},{html:"WOW 5"},{html:"WOW 6"}
		      ],
		      [ 
		         {html:"WOW 1"},{html:"WOW 2"},{html:"WOW 3"},{html:"WOW 4"},{html:"WOW 5"},{html:"WOW 6"}
		      ]
		   ],
		
  		remoteConfig:{},
  		remoteRows:[]
  	}
  },
  watch:{
	selectedRows(val){
		console.log("SELECTED ROWS",val);
	},
	name(val){
  		if(val !== "NICHTS"){
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
  	company(val){
  		if(val){
  			this.$set(this.filters,"company",true); 
  		}else{
  			this.$delete(this.filters,"company");
  		}
  	},
  	filtering(val){
  		if(val){
  			this.$set(this.filters,"names",["Matt","Ole"]); 
  		}else{
  			this.$delete(this.filters,"names");
  		}
  	}
  },
  methods:{
  	test(a,b){
  		console.log(a,b)
  	}
  },
  mounted(){
  	this.loading = true;
  	axios.get("http://192.168.188.56/test/data.php?fetch=true").then((response)=>{
  		this.remoteRows = response.data.rows;
  		this.remoteConfig = response.data.config;
  		this.loading = false;
  	});

  	setInterval(()=>{

  		// var rows = Object.assign({},this.rows);
  		// rows[1].cells[0].html++;
  		// this.$set(this.rows,1,rows[1]);


  	},1000);
  }
}
</script>

