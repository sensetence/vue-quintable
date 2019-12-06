<template>
	<div class="table-wrapper">

		<div class="header">
			<slot name="header"></slot>
		</div>

		<div v-if="configFinal.search" class="text-right">
			<span class="text-left">
				<input type="search" :placeholder="configFinal.searchPlaceholder" v-model="query" class="form-control">
			</span>
		</div>		
		<table class="vue-foo-table table" v-show="!ajaxLoading">
			<thead v-if="configFinal.headlines.length">
				<tr>
					<th class="placeholder" v-if="hasGeneratedRows && !configFinal.hideRowToggle">&nbsp;</th>
					<th v-if="configFinal.select &&  configFinal.selectPosition == 'pre'">
						<template v-if="configFinal.selectAll">
						<p-check v-if="configFinal.prettySelect" name="check" class="p-icon  p-smooth" v-model="allSelected" @change="checkAll()">
							<template slot="extra" >
								<span><font-awesome-icon v-show="allSelected" icon="check" class="text-success icon-check" /></span>
							</template>
						</p-check>
						<input v-else type="checkbox" v-model="allSelected"  @change="checkAll()">
						</template>
					</th>
					<th v-for="(headline,hIndex) in configFinal.headlines" v-show="visibleColumns[hIndex]" :class="headerClass[hIndex]" :title="'headline-'+hIndex" :key="'headline-'+hIndex" @click="setSortColumn(hIndex)">
						<span class="headline" v-html="headline"></span> 
						<span class="sorting-icon ml-2" v-show="configFinal.sorts[hIndex]">
							<font-awesome-icon v-show="currentSortIndex != hIndex" icon="sort" class="text-primary" />
							<font-awesome-icon v-show="currentSortIndex == hIndex && sortAscending" icon="sort-amount-down-alt" class="text-primary" />
							<font-awesome-icon v-show="currentSortIndex == hIndex && !sortAscending" icon="sort-amount-down" class="text-primary" />
						</span>
						
					</th>
					<th v-if="configFinal.select && configFinal.selectPosition == 'post'">
						<template v-if="configFinal.selectAll">
							<p-check v-if="configFinal.prettySelect" name="check" class="p-icon  p-smooth" v-model="allSelected"  @change="checkAll()">
								<template slot="extra" >
									<span><font-awesome-icon v-show="allSelected" icon="check" class="text-success icon-check" /></span>
								</template>
							</p-check>
							<input v-else type="checkbox" v-model="allSelected"  @click="checkAll()">
						</template>
					</th>
				</tr>
			</thead>
			  <tbody>
					<template  v-for="(rIndex) in sortedIndexes" >
						<VueFooRow 
							:key="'row-'+rIndex"
							:pretty="configFinal.prettySelect" 
							:selectPosition="configFinal.selectPosition" 
							:select="configFinal.select" 
							:index="rIndex" 
							:classes="rows[rIndex].classes"
							:hideRowToggle="configFinal.hideRowToggle" 
							:breakpoints="configFinal.breakpoints" 
							:stickyCols="configFinal.stickyCols"
							:expanded="configFinal.expandedAll||rows[rIndex].expanded"
							:alignments="configFinal.alignments" 
							:row="rows[rIndex].cells?rows[rIndex].cells:rows[rIndex]"
							@toggleSelect="checkListener" 
							@updateBreakpoints="generateRowsForCells" 
							@toggle="onToggleRow" 
							v-model="selected[rIndex]"
							v-show="visibleRows[rIndex]" />
						<template v-if="(generatedRows[rIndex] || stickyRows[rIndex]) && visibleRows[rIndex]">
							<tr 
								:key="'generated-row-'+rIndex"
								class="generated-row" 
								v-show=
									"openRows[rIndex] 
									&& Object.keys(generatedRows[rIndex]).length 
									|| Object.keys(stickyRows[rIndex]).length">
								
								<td :colspan="configFinal.number+1">
									<table class="table">
										<tbody>
											<tr 
												:key="'generated-row-cell-'+rIndex+'-'+cIndex" 
												v-for="(cell,cIndex) in generatedRows[rIndex]">

												<td>
													<strong v-html="configFinal.headlines[cIndex]">
													</strong>
												</td>
												<VueFooCell :cell="generatedRows[rIndex][cIndex]" :generated="true" />
											</tr>
											<tr v-for="(cell,cIndex) in stickyRows[rIndex]" :key="'sticky-row-cell-'+rIndex+'-'+cIndex">
												<td><strong v-html="configFinal.headlines[cIndex]"></strong></td>
												<VueFooCell :cell="stickyRows[rIndex][cIndex]"  :generated="true" />
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
					</template>
				</template>
			    
			</tbody>
		</table>
		<nav v-if="configFinal.pagination && pages>1" class="float-left" v-show="!ajaxLoading">
		  <ul class="pagination">
		    <li class="page-item" v-if="pages>pageRange" :class="{disabled:currentPage<=1}" @click="gotoPage('first')">
		      <span class="page-link">
		        <font-awesome-icon icon="angle-double-left" />
		      </span>
		    </li>
		    <li class="page-item" :class="{disabled:currentPage<=1}" @click="gotoPage('prev')">
		      <span class="page-link">
		        <font-awesome-icon icon="angle-left" />
		      </span>
		    </li>

		    <li :key="'pagination-item-'+page" class="page-item"  :class="{active:page==currentPage}" v-for="page in visiblePages"  @click="gotoPage(page)">
		      <span class="page-link">
		        {{page}}
		      </span>
		    </li>

		    <li class="page-item" :class="{disabled:pages==currentPage}" @click="gotoPage('next')">
		      <span class="page-link">
		        <font-awesome-icon icon="angle-right" />
		      </span>
		    </li>
		    <li class="page-item" v-if="pages>pageRange" :class="{disabled:pages==currentPage}" @click="gotoPage('last')">
		      <span class="page-link">
		        <font-awesome-icon icon="angle-double-right" />
		      </span>
		    </li>
		  </ul>
		</nav>
		
		<div class="clearfix">

			<div class="float-right" v-if="configFinal.pagination" v-show="!ajaxLoading">
				<span class="d-inline-block align-middle mr-2" v-if="configFinal.rowsSelect" v-html="configFinal.rowsPlaceholder"></span> <v-select v-if="configFinal.rowsSelect" class="d-inline-block align-middle"  :options="paginationOptionsFilled" v-model="currentRowsPerPage" :clearable="false" />
				<span class="d-inline-block align-middle px-3">{{firstVisibleRow}}-{{lastVisibleRow}} of {{onlyVisibleRows.length}}</span>
			</div>

			<template v-if="noRows &&!ajaxLoading">
				   <div class="text-center p-3"><em v-html="configFinal.emptyPlaceholder"></em></div>
				   <hr>
			</template>

			<div class="loader text-center py-4" v-if="ajaxLoading">
				<font-awesome-icon icon="circle-notch" spin class="ajax-loader" />
			</div>
		</div>

		<div class="footer">
			<slot name="footer"></slot>
		</div>	
	</div>

</template>

<script>

import VueFooRow from "./VueFooRow.vue"
import VueFooCell from "./VueFooCell.vue"

import fuzzy from "fuzzy.js";

export default {
  name: 'VueFooTable',
  props:{
		rows:{
			type:Array
		},
		config:{
			type: Object
		},
		value:{
			type:Array
		},
		loading:{
			type:Boolean
		},
		filters:{
			type:Object
		},
		filterGroups:{
			type:Array
		}
	},
  components: {
    VueFooRow,
    VueFooCell,
  },
  data(){
  	return {
  		selected:[],
  		allSelected:false,
  		stickyRows:{},
  		generatedRows:{},
  		openRows:{},
  		visibleColumns:{},
  		hasGeneratedRows:false,
  		currentSortIndex:null,
  		sortAscending:true,
  		sortedIndexes:{},
  		query:"",
      	currentPage:1,
      	customRowsPerPage:null,
      	paginationOptions:[1,2,3,4,5,6,7,8,9,10,15,20,25,30,50,100]
  	}
  },
  computed:{

  	paginationOptionsFilled(){
  		let options = ["All"];
  		let i = 0;
  		while(i<this.paginationOptions.length&&i<this.rows.length){
  			options.push(this.paginationOptions[i]);
  			i++;
  		}

  		return options;
  	},

  	configFinal(){

  		let pagination = false;
  		if(this.config.pagination === true){
  			pagination = 25;
  		}else if(this.config.pagination){

  			let i = 0;
  			while(this.paginationOptions[i] < this.config.pagination && i < this.paginationOptions.length){
  				i++;
  			}
  			pagination = this.paginationOptions[Math.min(i,this.paginationOptions.length-1)];
  		}

  		let select = false;
  		if(this.config.select){
  			select = true;
  		}

  		let selectPosition = "post";
  		if(["pre","post"].indexOf(this.config.selectPosition)!== -1){
  			selectPosition = this.config.selectPosition;
  		}

  		let expandedAll = false;
  		if(this.config.expandedAll){
  			expandedAll = true;
  		}

  		let prettySelect = false;
  		if(this.config.prettySelect){
  			prettySelect = true;
  		}

  		let rowsSelect = false;
  		if(this.config.rowsSelect){
  			rowsSelect = true;
  		}

  		let search = false;
  		if(this.config.search){
  			search = true;
  		}

	    let searchLength = 1;
	    if(this.config.searchLength){
	       searchLength = this.config.searchLength;
	    }

	    let searchPlaceholder = "Search...";
	    if(this.config.searchPlaceholder){
	       searchPlaceholder = this.config.searchPlaceholder;
	    }

	    let filterRelation = "AND";
	    if(["AND","OR"].includes(this.config.filterRelation)){
	       filterRelation = this.config.filterRelation;
	    }

	    let filterGroupRelation = "AND";
	    if(["AND","OR"].includes(this.config.filterGroupRelation)){
	       filterGroupRelation = this.config.filterGroupRelation;
	    }

	    let rowsPlaceholder = "Rows per page:";
	    if(this.config.rowsPlaceholder){
	       rowsPlaceholder = this.config.rowsPlaceholder;
	    }

	    let emptyPlaceholder = "No rows...";
	    if(this.config.emptyPlaceholder){
	       emptyPlaceholder = this.config.emptyPlaceholder;
	    }
	    
  		let selectAll = false;
  		if(this.config.selectAll){
  			selectAll = true;
  		}

  		let hideRowToggle = false;
  		if(this.config.hideRowToggle){
  			hideRowToggle = true;
  		}

      let pageRange = 5;
      if(this.config.pageRange){
        pageRange = this.config.pageRange;
      }

  		let number= 0;
  		let headlines = [];
  		let breakpoints = [];
  		let sorts = [];
  		let stickyCols = [];
  		let alignments = [];

  		if(this.config.columns){

  			number = this.config.columns.length;

	  		for(let i = 0 ; i<this.config.columns.length;i++) {

	  			if(this.config.columns[i] && this.config.columns[i].headline){
	  				headlines[i] = this.config.columns[i].headline;
	  			}else{
	  				headlines[i] = "";
	  			}

	  			if(this.config.columns[i] && this.config.columns[i].breakpoint){
	  				breakpoints[i] = this.config.columns[i].breakpoint;
	  			}else{
	  				breakpoints[i] = "";
	  			}

	  			if(this.config.columns[i] && this.config.columns[i].sort){
	  				sorts[i] = true;
	  			}else{
	  				sorts[i] = false;
	  			}

	  			if(this.config.columns[i] && this.config.columns[i].sticky){
	  				stickyCols[i] = true;
	  			}else{
	  				stickyCols[i] = false;
	  			}

	  			if(this.config.columns[i] && this.config.columns[i].align){
	  				alignments[i] = this.config.columns[i].align;
	  			}else{
	  				alignments[i] = false;
	  			}
	  		}

  		}

  		return{
  			headlines:headlines,
  			sorts:sorts,
  			filterGroupRelation:filterGroupRelation,
  			filterRelation:filterRelation,
        	rowsSelect:rowsSelect,
        	searchLength:searchLength,
        	search:search,
        	searchPlaceholder:searchPlaceholder,
        	rowsPlaceholder:rowsPlaceholder,
        	emptyPlaceholder:emptyPlaceholder,
  			stickyCols:stickyCols,
  			alignments:alignments,
  			breakpoints:breakpoints,
  			pagination:pagination,
  			select:select,
  			selectAll:selectAll,
  			expandedAll:expandedAll,
  			pageRange:pageRange,
  			prettySelect:prettySelect,
  			number:number,
  			hideRowToggle:hideRowToggle,
  			selectPosition:selectPosition,
  		}
  	},
  	headerClass(){

  		let classes = []

  		for(let i = 0 ; i<this.configFinal.number;i++) {
  			let iClasses = [];
  			if(this.configFinal.alignments[i]){
				iClasses.push("text-"+ this.configFinal.alignments[i]);
			}

			if(this.configFinal.sorts[i]){
				iClasses.push("sort-header");

				if(this.currentSortIndex === i){
					iClasses.push("active")
				}
			}


			classes.push(iClasses.join(" "));
  		}
  		return classes;
  	},

  	currentRowsPerPage:{
  		get(){
	  		if(!this.customRowsPerPage){
	  			return this.configFinal.pagination;
	  		}
	  		return this.customRowsPerPage;

  		},
  		set(val){
			this.customRowsPerPage = val;
  		}

  	},
  	pageRange(){
      return Math.min(this.configFinal.pageRange,this.pages);
    },
    pages(){
      if(!this.currentRowsPerPage || this.currentRowsPerPage == "All"){
        return 1;
      }

      return Math.max(1,Math.ceil(this.onlyVisibleRows.length / this.currentRowsPerPage));
    },
    onlyVisibleRows(){
 		return this.filteredRows.filter((item)=>{
	       return item;
	    });
    },

    visiblePages(){

      let pages = [];
      let start = 0;

      if(this.pages < this.pageRange){
        start = 1;
      }else if(this.currentPage === 1){
        start = 1;
      }else if(this.currentPage==this.pages){
        start = this.currentPage - (this.pageRange-1);
      }else{
        let off;
        if(this.pageRange % 2 == 0){
           off = this.pageRange/2
        }else{
          off = (this.pageRange-1)/2
          if(this.currentPage + off > this.pages){
            off++;
          }
        }

        start = this.currentPage - off; 

      }

      start = Math.max(start,1);

      for(let i = 0; i<this.pageRange;i++){
        if(i+start > this.pages){
          break;
        }
        pages.push(i+start);
      }
  
      return pages;

    },


    filterActive(){
    	return this.filters && Object.keys(this.filters).length;
    },

    filteredRows(){
       let visible = [];

       for(let i = 0 ; i<this.rows.length;i++) {
		      visible.push(true);
		}

	   if(
	   		(!this.configFinal.search && !this.filterActive) ||
	   		(!this.filterActive && this.configFinal.search && this.query.length <= this.configFinal.searchLength)
	   	){
	   	  //Skip filtering, no search or filter is active
	      return visible;
	    }

	    //search per row
        for(let i = 0 ; i<this.rows.length;i++) {

	       	let row = this.rows[i].cells?this.rows[i].cells:this.rows[i];
       	  	let match = false;
       	  	let searched = false;

       	  	if(this.configFinal.search && this.query.length > this.configFinal.searchLength){


		        for (let j = 0; j < row.length; j++){
		            let col = row[j];

		            if(fuzzy((col.html + "").toLowerCase(), (this.query + "").toLowerCase()).score > 6){
		              match = true;
		              break;
		            }

			    }

			     if(row.keywords){
	            	 for(let k = 0;k<row.keywords.length;k++){
	            	 	if(fuzzy((row.keywords[k] + "").toLowerCase(), (this.query + "").toLowerCase()).score > 6){
			              match = true;
			              break;
			            }
	            	 }
	            }

			    searched = true;
		   	}

		   	//filter will be applied
		   	if((searched && match || !searched) && this.filterActive && this.rows[i].filters){

		   		//filter groups are defined
		   		if(this.filterGroups){
		   			match = this.doFiltering(this.rows[i].filters);

		   		//define dummy filter group with filters and relation set
		   		}else{

		   			let group = {
		   				items:[],
		   				relation:this.configFinal.filterRelation,
		   			};

		   			for (let filter in this.filters){
		   				group.items.push({name:filter});
		   			}

		   			match = this.doFilteringForGroup(this.filters,this.rows[i].filters,group);

		   		}

		   		console.log("\n");
	   			console.log("ROW " + i,match,this.rows[i].filters);
	   			console.log("\n");
		   	}

		    visible[i] = match;

    	}

      	return visible;
    },

  	visibleRows(){

      	let visible = this.filteredRows;

	    if(this.currentRowsPerPage && this.pages>1){

	       let borderHigh = this.currentPage * this.currentRowsPerPage;
	       let borderLow =  borderHigh - this.currentRowsPerPage;

	       visible = visible.map((item,index) =>{
	          return visible[index] && index < borderHigh && index >= borderLow;
	       });

	    }

  		return visible;
  	},
  	noRows(){
  		return !this.onlyVisibleRows.length;
  	},

  	firstVisibleRow(){
  		if(this.currentRowsPerPage === "All"){
  			return 1;
  		}
  		return this.currentPage * this.currentRowsPerPage - this.currentRowsPerPage + 1;
  	},
  	lastVisibleRow(){
  		if(this.currentRowsPerPage === "All"){
  			return 1;
  		}
  		return Math.min(this.firstVisibleRow + this.currentRowsPerPage-1,this.onlyVisibleRows.length);
  	},
  	ajaxLoading(){
  		return this.loading || this.fetching;
  	}

  },

  watch:{
  	filters:{
    	handler(){
 			this.currentPage = 1;
    	},
    	deep:true,
    },

  	
    query(val){
        if(val.length > this.configFinal.searchLength){
          this.currentPage = 1;
        }
    },

    currentRowsPerPage(){
 		this.currentPage = 1;
    },
    
  	currentSortIndex(){
  		this.sortAscending = true;
  	},

  	sortAscending(){
  		this.sort();
  	},

  	config(val){
  		if(typeof val !== "object"){
	  		throw "config must be an object"
	  	}

	  	this.initLists();
  	},
  
  	selected(val){
		this.$emit("input",val);
	 },
	 currentPage(){
	 	this.allSelected = false;
	 	
	 	for(let i = 0;i<this.visibleRows.length;i++){
	 		this.selected[i] = false;
	 	}
	 }
 
  },
  methods:{

  	checkAll: function(){

      for(let i = 0 ; i<this.visibleRows.length;i++) {
			if(this.visibleRows[i]){
				this.$set(this.selected,i,this.allSelected);
			}else{
				this.$set(this.selected,i,false);
			}
		}
      
    },

    checkListener(bool,index){

    	let tmp = this.selected.slice();
    	tmp[index] = bool;

    	if(tmp.indexOf(false) !== -1){
  			this.allSelected = false;
  		}

  		else if(tmp.indexOf(false) === -1){
  			this.allSelected = true;
  		}

    },
  
  doFiltering(filterValues){

  	let results = [];


  	for (let i = 0; i<this.filterGroups.length;i++){

  		results.push(this.doFilteringForGroup(this.filters,filterValues,this.filterGroups[i]));

  		if(i<this.filterGroups.length-1){
  			console.log(this.configFinal.filterGroupRelation);
  		}

  	}

  	console.log("RESULTS FOR GROUPS:",results,this.configFinal.filterGroupRelation);

  	if(this.configFinal.filterGroupRelation === "AND"){
  		if(results.indexOf(true) !== -1){
  			return true;
  		}
  		return false;
  		
  	}else if(this.configFinal.filterGroupRelation === "OR"){
		if(results.indexOf(true) === -1){
  			return false;
  		}
  		return true;
  	}else{
  		return true;
  	}
  },

  
  doFilteringForGroup(filters,filterValues,group,index = 0){

  	//######################################
  	//DEBUG!

  	let spaces = "   ";

  	for (let i = 0;i<index;i++){
  		spaces+= "   ";
  	}

  	if(group.items){

	  	let str = spaces;

	  	let tmp = group.items.slice();

	  	let cmp = function(a,b){
	  	
	  		if(a.name === undefined){
	  			return 1;
	  		}
	  		if(b.name === undefined){
	  			return -1;
	  		}
	  		return 0;
	  	}

	  	tmp = tmp.sort(cmp);

	  	for (let i = 0; i<tmp.length;i++){
	  		if(tmp[i].name){
		  		str += tmp[i].name;
		  		if(i<tmp.length-1){
		  			str +=" "+group.relation+" "
		  		}
	  		}
	  	}

	  	console.log(str);
  	}

  	//######################################

  	let found = false;

  	console.log(spaces,"GROUP:",group);

  	if(group.relation === "AND"){
  		for(let key in filters){
  			if(this.filterGroups && !this.findInFilterGroups(key,this.filterGroups)){
  				continue;
  			}

  			let allIncluding = true;
  			for (let i = 0; i<group.items.length;i++){
  				let item = group.items[i];

  				if(item.name && filterValues[item.name] === undefined){
  					allIncluding = false;
  					break;
  				}
  			}

  			if(allIncluding){

	  			for (let i = 0; i<group.items.length;i++){
	  				let item = group.items[i];
	  				found = true;
	  				if(item.items){
	  					found = this.doFilteringForGroup(filters,filterValues,item,index+1);
	  				}

	  				if(!found){
	  					break;
	  				}

	  				//actual checking for matching
	  				if(typeof filters[item.name] === "object" && filters[item.name].length && filters[item.name].indexOf(filterValues[item.name]) === -1){
	  					found =  false;
	  					break;
	  				}else if(typeof filters[item.name] !== "object" &&filterValues[item.name] !== filters[item.name]){
	  					found =  false;
	  					break;
	  				}
	  			}

  		console.log(spaces,"FOUND:",found);

  			}

  		}
  		console.log("FOUND:",found);
  		return found

  	}else if(group.relation === "OR"){
  		for(let key in filters){

  			if(this.filterGroups && !this.findInFilterGroups(key,this.filterGroups)){
  				continue;
  			}

  			for (let i = 0; i<group.items.length;i++){
  				let item = group.items[i];
  				if(item.items){
  					found = this.doFilteringForGroup(filters,filterValues,item,index+1);

  					if(found){
	  					break;
	  				}
  				}
  				
  				//actual checking for matching
  				if(typeof filters[item.name] === "object" && filters[item.name].length && filters[item.name].indexOf(filterValues[item.name]) !== -1){
  					found =  true;
  					break;
	  			}else if(typeof filters[item.name] !== "object" && filterValues[item.name] && filters[item.name] && filterValues[item.name] === filters[item.name]){
  					found =  true;
  					break;
  				}
  			}

  		}
  	  	return found
  	}else{
  		return true;
  	}

  },

  	findInFilterGroups(key,arr,index=0) {

  		if(!arr){
  			return false;
  		}

  		let found = false;

  		for(let i = 0;i<arr.length;i++){
  			let item = arr[i];
  			if(item.items){
  				found = this.findInFilterGroups(key,item.items,index+1);
  				if(found){
  					break;
  				}
  			}

  			if(item.name == key){
  				found = true;
  				break;
  			}
  			
  		}
  		return found;

	},

    gotoPage(page){

      if(page === "prev"){
        if(this.currentPage -1 >0){
          this.currentPage--;
        }
        return;
      }else if(page === "next"){
        if(this.currentPage +1 <= this.pages){
          this.currentPage++;
        }
        return;
      }else if(page === "first"){
        this.currentPage = 1;
        return;
      }else if(page === "last"){
        this.currentPage = this.pages;
        return;
      }else{
        this.currentPage = page;
        return;
      }
      
    },


  	toggleSortDir(){
  		this.sortAscending = !this.sortAscending;
  	},

  	setSortColumn(index){

  		if(!this.configFinal.sorts[index]){
  			return;
  		}

  		if(this.currentSortIndex !== index){
  			if(this.sortAscending){
				this.currentSortIndex = index;
				this.sort();
  			}else{
  				this.currentSortIndex = index;
  			}
  		}else{
  			this.toggleSortDir();
  		}

  	},

  	sort(){

  		let index = this.currentSortIndex;
  		let asc = this.sortAscending;

  	 	let rows = this.rows.slice();


  	 	for(let i = 0 ; i<rows.length;i++) {
			rows[i].index = i;
		}

		function compare(a, b) {

			let cellsA = a.cells?a.cells:a;
			let cellsB = b.cells?b.cells:b;


			let aValue = cellsA[index].sortValue?cellsA[index].sortValue:cellsA[index].html;
		  	let bValue = cellsB[index].sortValue?cellsB[index].sortValue:cellsB[index].html;

			if(asc){
			  return aValue > bValue?1:-1;
			}
		  	return aValue < bValue?1:-1;
		}

		rows.sort(compare);

		for(let i = 0 ; i<rows.length;i++) {
			this.sortedIndexes[i] = rows[i].index;
		}

		this.currentPage = 1;

  	},
  	
  	 onToggleRow(show,rowIndex){
	  	if(show){
	  		this.$set(this.openRows,rowIndex,true);
		}else{
	  		this.$set(this.openRows,rowIndex,false);
		}
		this.openRows = Object.assign({},this.openRows);

	  },
	  
  	checkOpenRow(index){
  		return this.openRows[index];
  	},
  	generateRowsForCells(rowIndex,cellIndex,cell,hide){


  		this.initLists();
  		let cells = null;
  		if(hide && hide !== "sticky"){
  			cells = this.generatedRows[rowIndex];
  			cells[cellIndex] = cell;
  			if(this.visibleColumns[cellIndex]>0){
  				this.$set(this.visibleColumns,cellIndex,this.visibleColumns[cellIndex]-1)
  			}

  			this.$set(this.generatedRows,rowIndex,cells);

  		}else if(hide === "sticky"){
  			cells = this.stickyRows[rowIndex];
  			cells[cellIndex] = cell;
  			if(this.visibleColumns[cellIndex]>0){
  				this.$set(this.visibleColumns,cellIndex,this.visibleColumns[cellIndex]-1)
  			}
  			this.$set(this.stickyRows,rowIndex,cells);

  		}else{
  			cells = this.generatedRows[rowIndex];
  			delete cells[cellIndex];
  			if(this.visibleColumns[cellIndex]<this.rows.length){
	  			this.$set(this.visibleColumns,cellIndex,this.visibleColumns[cellIndex]+1)
	  		}
	  		this.$set(this.generatedRows,rowIndex,cells);
  		}

  		this.visibleColumns = Object.assign({},this.visibleColumns);


  		for(let row in this.generatedRows){
  			if(Object.keys(this.generatedRows[row]).length){
  				this.hasGeneratedRows = true;
  				return;
  			}
  		} 

  		this.hasGeneratedRows = false;


  	},
  	initLists(){

  		if(!this.rows){
  			return;
  		}

 		for(let i = 0 ; i<this.rows.length;i++) {
 			if(typeof this.generatedRows[i] !== "object"){
  				this.generatedRows[i] = {};
  			}

  			if(typeof this.stickyRows[i] !== "object"){
  				this.stickyRows[i] = {};
  			}

  			if(typeof this.sortedIndexes[i] === "undefined"){
  				this.sortedIndexes[i] = i;
  			}
	 	}

	 	if(!this.config || !this.configFinal.number){
  			return;
  		}

	 	for(let i = 0 ; i<this.configFinal.number;i++) {
 			if(typeof this.visibleColumns[i] !== "number"){
  				this.visibleColumns[i] = this.rows.length;
  			}
	 	}

	 	for(let i = 0 ; i<this.configFinal.number;i++) {
 			if(typeof this.selected[i] === "undefined"){
  				this.selected[i] = false;
  			}
	 	}

  		
  	}
  },
  created(){
  	 this.initLists();
 }
 
  
}
</script>

<style>
	.icon-check{
		padding: 3px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
</style>

<style scoped>
	

	.pretty{
		margin-right: 0 !important;
	}

	.sort-header{
	  cursor: pointer;
	  padding-right: 30px !important;
	  position: relative;
	}
	.sort-header .sorting-icon {
		position: absolute;
		right: 5px;
		opacity: 0;
		transition: opacity 0.25s esae-in-out;
	}

	.sort-header.active .sorting-icon,
	.sort-header:hover .sorting-icon {
		opacity: 1;
	}

	.ajax-loader{
		font-size: 3em;
	}

</style>