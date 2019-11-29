<template>
  <div id="app">
    <VueFooTable v-model="selectedRows" :config="config" :rows="rows" key="table-3"/>
    <!-- <VueFooTable :config="remoteConfig" :rows="remoteRows" key="table-2" /> -->
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
  		selectedRows:[],
  		config:{ 
		   	  //String[] or false, default false
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
		      //Number or false/true, default false, if true => 25
		      pagination:25,
		      //if cells can be selected
		      select:true,
		      //if use pretty checkboxes library
		      prettySelect:true,
		      //position of the select checkboxes string pre/post
		      selectPosition:"pre",
		      //if there should be a select all checkbox
		      selectAll:false,
		      //if there shall be a search input filter 
		      search:true,
		      //show plus for row toggle or not
		      hideRowToggle:false,
			},
		   rows:[ 
		      [ 
		      	//Option[] or string
		         {
		         	//HTML string
		         	html:"TEST 1",
		         	//space separated string
		         	classes:"special-td",
		         	align:"right",
		         	keywords:[
		         		"Rambo"
		         	],
		         	filter:{
		         		test:true,
		         		sinn:"yep",
		         	}

		         },
		         	//Option[] or string
		         {html:"hmmmm"},{html:"TEST 3"},{html:"TEST 4"},{html:"TEST 5"},{html:"TEST 6"}
		      ],
		      [ 
		         {html:1,sortValue:"Mist 1"},{html:"Mist 2"},{html:"Mist 3"},{html:"Mist 4"},{html:"Mist 5"},{html:"Mist 6"}
		      ],
		      [ 
		          {html:"LOL 1"},{html:"LOL 2"},{html:"LOL 3"},{html:"LOL 4"},{html:"LOL 5"},{html:"LOL 6"}
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
	}
  },
  methods:{
  	test(a,b){
  		console.log(a,b)
  	}
  },
  mounted(){
  	axios.get("http://192.168.188.56/test/data.php").then((response)=>{
  		this.remoteRows = response.data.rows;
  		this.remoteConfig = response.data.config;
  	});

  	setInterval(()=>{

  		var rows = Object.assign({},this.rows);
  		rows[1][0].html++;
  		this.$set(this.rows,1,rows[1]);


  	},1000);
  }
}
</script>

