<template>
	<div class="table-wrapper">

		<div class="breakpoints">
            <div ref="xs"></div>
            <div ref="sm" class="d-none d-sm-block"></div>
            <div ref="md" class="d-none d-md-block"></div>
            <div ref="lg" class="d-none d-lg-block"></div>
            <div ref="xl" class="d-none d-xl-block"></div>
        </div>

		<div class="header">
			<slot name="header"></slot>
		</div>

		<div v-if="configFinal.search" class="mb-3">
			<input type="search" :placeholder="configFinal.searchPlaceholder" v-model="query" class="form-control">
		</div>		
		<table class="vue-foo-table table" v-show="!ajaxLoading">
			<thead v-if="configFinal.headlines.length">
				<tr>
					<th class="placeholder" v-if="hasGeneratedRows && !configFinal.hideRowToggle">&nbsp;</th>
					<th v-if="configFinal.select &&  configFinal.selectPosition == 'pre'">
						<template v-if="configFinal.selectAll">
							<p-check v-if="configFinal.prettySelect" name="check" class="p-icon  p-smooth" v-model="allSelectedProperty" @change="checkAll()">
								<template slot="extra" >
									<span><font-awesome-icon v-show="allSelected" icon="check" class="text-success icon-check" /></span>
									<span><font-awesome-icon v-show="someSelected && !allSelected" icon="square" class="text-success icon-check" /></span>
								</template>
							</p-check>
							<input v-else type="checkbox" v-model="allSelectedProperty"  @change="checkAll()">
						</template>
					</th>

					<th 
						v-for="(headline,hIndex) in configFinal.headlines" 
						v-show="(
							!configFinal.columns[hIndex].breakpoint || !breakpoints[configFinal.columns[hIndex].breakpoint]
						) && 
						!configFinal.columns[hIndex].sticky" 
						:class="headerClass[hIndex]" 
						:title="'headline-'+hIndex" 
						:key="'headline-'+hIndex" 
						@click="setSortColumn(hIndex)">
						<span class="headline" v-html="headline"></span> 
						<span class="sorting-icon ml-2" v-show="configFinal.sorts[hIndex]">
							<font-awesome-icon v-show="!currentSortIndexes[hIndex]" icon="sort" class="text-primary" />
							<font-awesome-icon v-show="currentSortIndexes[hIndex] && currentSortIndexes[hIndex].asc" icon="sort-amount-down-alt" class="text-primary" />
							<font-awesome-icon v-show="currentSortIndexes[hIndex] && !currentSortIndexes[hIndex].asc" icon="sort-amount-down" class="text-primary" />
							<span v-if="currentSortIndexes[hIndex]" @click.stop.prevent="removeSort(hIndex)" class="ml-1 text-muted">
								<span class="badge bg-info text-white" v-if="numberOfSorts>1" >
									{{currentSortIndexes[hIndex].order+1}}
								</span>
								<small v-else>
									<font-awesome-icon icon="times"/>
								</small>
							</span>
						</span>
					</th>
					<th v-if="configFinal.select && configFinal.selectPosition == 'post'">
						<template v-if="configFinal.selectAll">
							<p-check v-if="configFinal.prettySelect" name="check" class="p-icon  p-smooth" v-model="allSelectedProperty" @change="checkAll()">
								<template slot="extra" >
									<span><font-awesome-icon v-show="allSelected" icon="check" class="text-success icon-check" /></span>
									<span><font-awesome-icon v-show="someSelected && !allSelected" icon="square" class="text-success icon-check" /></span>
								</template>
							</p-check>
							<input v-else type="checkbox" v-model="allSelectedProperty"  @click="checkAll()">
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
							:ref="'row-highlighted-on-hover-'+rIndex"
							:classes="(rowsFinal[rIndex].classes?rowsFinal[rIndex].classes:'') + ' ' +hoverClasses[rIndex]"
							:hideRowToggle="configFinal.hideRowToggle" 
							:breakpoints="configFinal.breakpoints" 
							:stickyCols="configFinal.stickyCols"
							:expanded="configFinal.expandedAll||rowsFinal[rIndex].expanded"
							:alignments="configFinal.alignments" 
							:tooltip="rowsFinal[rIndex].tooltip" 
							:preSelected="rowsFinal[rIndex].selected" 
							:hiddenBreakpoints="hiddenBreakpoints" 
							:row="rowsFinal[rIndex].cells?rowsFinal[rIndex].cells:rowsFinal[rIndex]"
							@toggleSelect="checkListener" 
							@updateBreakpoints="generateRowsForCells" 
							@mouseenter="onMouseenterRow"
							@mouseleave="onMouseleaveRow"
							@toggle="onRowToggle" 
							@click="onRowClick"
							@cell:click="onCellClick"
							v-model="selected[rIndex]"
							v-if="visibleRows[rIndex]" />
						<template v-if="(generatedRows[rIndex] || stickyRowsFinal[rIndex]) && visibleRows[rIndex]">
							<tr 
								@mouseenter="onMouseenterRow(rIndex)"
								@mouseleave="onMouseleaveRow(rIndex)"
								@click="onRowClick(rowsFinal[rIndex])"
								:ref="'generated-row-highlighted-on-hover-'+rIndex"
								:key="'generated-row-'+rIndex"
								class="generated-row" 
								:class="hoverClasses[rIndex]"
								v-if=
									"openRows[rIndex] 
									&& Object.keys(generatedRows[rIndex]).length 
									|| Object.keys(stickyRowsFinal[rIndex]).length">
								
								<td :colspan="configFinal.number+1" class="p-0">
									<table class="table mb-0" :class="hoverClasses[rIndex]">
										<tbody>
											<tr 
												class="generated-row-cell"
												:class="{hovered:hoverClasses[rIndex]}"
												:key="'generated-row-cell-'+rIndex+'-'+cIndex" 
												v-show="openRows[rIndex]"
												v-for="(cell,cIndex) in generatedRows[rIndex]">

												<td class="pl-4">
													<strong v-html="configFinal.headlines[cIndex]">
													</strong>
												</td>
												<VueFooCell :hiddenBreakpoints="hiddenBreakpoints" :cell="generatedRows[rIndex][cIndex]" :generated="true" classes="text-right pr-4" />
											</tr>
											<tr v-for="(cell,cIndex) in stickyRowsFinal[rIndex]" :key="'sticky-row-cell-'+rIndex+'-'+cIndex" :class="{hovered:hoverClasses[rIndex]}" class="generated-row-cell">
												<td><strong v-html="configFinal.headlines[cIndex]"></strong></td>
												<VueFooCell :hiddenBreakpoints="hiddenBreakpoints" :cell="stickyRowsFinal[rIndex][cIndex]"  :generated="true" />
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
					</template>
				</template>
			    
			</tbody>
		</table>

			<template v-if="noRows && !ajaxLoading">
				<div class="clearfix">
					<slot name="no-results">
					   <div class="text-center p-3">
					   		<em v-html="configFinal.emptyPlaceholder"></em>
					   </div>
					</slot>
				   <hr>
				</div>
			</template>
			<div v-if="ajaxLoading">
				<slot name="loading">
					
						<div  class="loader text-center py-4" >
							<font-awesome-icon icon="circle-notch" spin class="ajax-loader" />
						</div>
				</slot>
			</div>

			<div class="clearfix">
				<div class="row">
					<div class="col-md-4">
						<div class="float-left" v-if="configFinal.multiSortSelect">
							<p-check class="p-switch" v-model="multiSort" value="true">{{configFinal.multiSortPlaceholder}}</p-check>
						</div>
					</div>
					<div class="col-md-8">
						<div class="pt-md-0 pt-3 float-md-right mr-3 pagination-container" v-if="configFinal && configFinal.pagination" v-show="!ajaxLoading">
							<span class="d-inline-block align-middle mr-2" v-if="configFinal.rowsSelect" v-html="configFinal.rowsPlaceholder"></span> 
							<v-select v-if="configFinal.rowsSelect" class="d-inline-block align-middle"  :options="paginationOptionsFilled" v-model="currentRowsPerPageProperty" :clearable="false" />

							<nav v-if="configFinal && configFinal.pagination && pages>1" class="d-inline-block align-middle ml-3" v-show="!ajaxLoading">
							  <ul class="pagination mb-0">
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

							<span class="d-inline-block align-middle ml-3" v-if="onlyVisibleRows.length" >{{firstVisibleRow}}-{{lastVisibleRow}} of {{onlyVisibleRows.length}}</span>
						</div>
					</div>
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
import axios from 'axios'

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
		},
		verbose:{
			type:Boolean
		}
	},
  components: {
    VueFooRow,
    VueFooCell,
  },
  data(){
  	return {
  		hoveredRow:null,
  		allSelectedCustom:null,
  		selected:[],
  		stickyRows:{},
  		generatedRows:{},
  		openRows:{},
  		sortedIndexes:{},
  		hasGeneratedRows:false,
  		currentSortIndexes:{},
  		query:"",
      	currentPage:1,
      	paginationOptions:[1,2,3,4,5,6,7,8,9,10,15,20,25,30,50,100],
      	fetching:false,
      	ajaxRows:[],
      	ajaxPages:0,
      	ajaxAll:0,
      	customRowsPerPage:null,
      	customMultiSort:null,
      	hiddenBreakpoints:[],
      	initBreakpoints:true,
      	lastSelected:[],
      	generationDate:new Date(),
  	}
  },

  recomputed: {

  	currentRowsPerPage(){

	  if(!this.customRowsPerPage){
		return this.configFinal.pagination?this.configFinal.pagination:"All";
		}
		return this.customRowsPerPage;

  },

  stickyRowsFinal(){
  	 return this.stickyRows;
  },

  allSelected(){


  		if(this.allSelectedCustom === null){
	  			return this.configFinal.defaultSelected;
	  		}
	  		return this.allSelectedCustom;

  },


    visibleRows(){

	    if(!this.configFinal.ajaxUrl && this.currentRowsPerPage !== "All"){

	       let visible = [];

	       for(let i = 0;i<this.rowsFinal.length;i++){
	       		visible.push(false);
	       }

	       var onlyVisibleSortedRows = {};

	       for(let index in this.sortedIndexes){
	       		index = parseInt(index);
	       		if(this.filteredRows[this.sortedIndexes[index]]){
	       			onlyVisibleSortedRows[index] = this.sortedIndexes[index];
	       		}
	       }


	       let borderHigh = this.currentPage * this.currentRowsPerPage;
	       let borderLow =  borderHigh - this.currentRowsPerPage;

	       let counter = 0;
	       for(let index in onlyVisibleSortedRows){
	       		index = parseInt(index);
	       		if(counter < borderHigh && counter >= borderLow){
	       			visible[onlyVisibleSortedRows[index]] = true;
		       	}
		       	counter++;
	       }

	       return visible;

	    }else{
	    	return this.filteredRows;
	    }
  	},
  },

  computed:{

  	DEBUG(){
  		return this.verbose;
  	},

  	allSelectedProperty:{
  		get(){

	  		if(this.allSelectedCustom === null){
	  			return this.configFinal.defaultSelected;
	  		}
	  		return this.allSelectedCustom;

  		},
  		set(val){
			this.allSelectedCustom = val;
  		}

  	},

  	breakpoints(){
  		let bp = {};
  		for (let i = 0;i<this.hiddenBreakpoints.length;i++){
  			bp[this.hiddenBreakpoints[i]] = true;
  		}

  		return bp;
  	},

	currentRowsPerPageProperty:{
		get(){
			  if(!this.customRowsPerPage){
				  return this.currentRowsPerPage;
			  }
			  return this.customRowsPerPage;

		},
		set(val){
			this.customRowsPerPage = val;
		}

	},

  	rowsFinal(){
	  return this.configFinal.ajaxUrl?this.ajaxRows:this.rows?this.rows:[];
  	},

  	someSelected(){
  		for (let i = 0; i<this.selected.length;i++){
  			if(this.selected[i]){
  				return true;
  			}
  		}
  		return false;
  	},

  	numberOfSorts(){
  		return Object.keys(this.currentSortIndexes).length;
  	},


  	multiSort:{
  		get(){

	  		if(this.customMultiSort === null){
	  			return this.configFinal.multiSort;
	  		}
	  		return this.customMultiSort;

  		},
  		set(val){
			this.customMultiSort = val;
  		}

  	},



  	paginationOptionsFilled(){

  		let all = this.rowsFinal.length

  		if(this.configFinal.ajaxUrl){
  			all = this.ajaxAll;
  		}

  		let options = ["All"];
  		let i = 0;
  		while(i<this.paginationOptions.length&&i<all){
  			options.push(this.paginationOptions[i]);
  			i++;
  		}

  		return options;
  	},

  	sortingColumns(){
  		let columns = {};

  		for(let index in this.currentSortIndexes){
  			columns[index] = this.configFinal.columns[index];
  		}

  		return columns

  	},

  	configFinal(){

  		if(!this.config){
  			return {};
		}

  		let pagination = false;
  		if(this.config.pagination === true){
  			pagination = 25;
  		}else if(this.config.pagination){

  			let i = 0;
  			while(this.paginationOptions[i] < this.config.pagination && i < this.paginationOptions.length){
  				i++;
  			}
  			pagination = this.paginationOptions[Math.min(i-1,this.paginationOptions.length-1)];
  		}


  		let select = false;
  		if(this.config.select){
  			select = true;
  		}

  		let hoverClass = "bg-muted";
  		if(this.config.hoverClass === false){
  			hoverClass = false;
  		}else if(this.config.hoverClass && this.config.hoverClass !== true){
  			hoverClass = this.config.hoverClass
  		}

  		let multiSort = false;
  		if(this.config.multiSort){
  			multiSort = true;
  		}

  		let multiSortSelect = false;
  		if(this.config.multiSortSelect){
  			multiSortSelect = true;
  		}

  		let ajaxUrl = false;
  		if(this.config.ajaxUrl){
  			ajaxUrl = this.config.ajaxUrl;
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

	    let multiSortPlaceholder = "Multiple sort";
	    if(this.config.multiSortPlaceholder){
	       multiSortPlaceholder = this.config.multiSortPlaceholder;
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

  		let defaultSelected = false;
		if(this.config.defaultSelected){
		  	defaultSelected = true;
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

  		let columns = null;
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

	  		columns = this.config.columns;

  		}

  		return{
  			headlines:headlines,
  			sorts:sorts,
  			multiSort:multiSort,
  			multiSortSelect:multiSortSelect,
  			filterGroupRelation:filterGroupRelation,
  			filterRelation:filterRelation,
        	rowsSelect:rowsSelect,
        	defaultSelected:defaultSelected,
        	searchLength:searchLength,
        	search:search,
        	ajaxUrl:ajaxUrl,
        	multiSortPlaceholder:multiSortPlaceholder,
        	searchPlaceholder:searchPlaceholder,
        	rowsPlaceholder:rowsPlaceholder,
        	emptyPlaceholder:emptyPlaceholder,
  			stickyCols:stickyCols,
  			alignments:alignments,
  			breakpoints:breakpoints,
  			pagination:pagination,
  			select:select,
  			selectAll:selectAll,
  			hoverClass:hoverClass,
  			expandedAll:expandedAll,
  			pageRange:pageRange,
  			prettySelect:prettySelect,
  			number:number,
  			columns:columns,
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

				if(this.currentSortIndexes[i]){
					iClasses.push("active")
				}
			}


			classes.push(iClasses.join(" "));
  		}
  		return classes;
  	},


  	pageRange(){
      return Math.min(this.configFinal.pageRange,this.pages);
    },
    pages(){

     if(this.ajaxPages){
     	return this.ajaxPages;
     }

      if(!this.currentRowsPerPage || this.currentRowsPerPage == "All"){
        return 1;
      }

      return Math.max(1,Math.ceil(this.onlyVisibleRows.length / this.currentRowsPerPage));
    },
    onlyVisibleRows(){

    	if(this.configFinal.ajaxUrl){
    		let rows = [];
    		for (let i = 0;i<this.ajaxAll; i++){
    			rows.push(true);
    		}
    		return rows; 
    	}

 		return this.filteredRows.filter((item)=>{
	       return item;
	    });
    },

    visibleRowIndexes(){

		let rows = [];
    	if(this.configFinal.ajaxUrl){
    		for (let i = 0;i<this.ajaxAll; i++){
    			rows.push(i);
    		}
    	}else{
	    	for (let i = 0;i<this.visibleRows.length; i++){
				if(this.visibleRows[i]){
					rows.push(this.sortedIndexes[i]);
				}
			}
		}

 		return rows;
    },

    onlyVisiblePagedRows(){

    	if(this.configFinal.ajaxUrl){
    		let rows = [];
    		for (let i = 0;i<this.ajaxAll; i++){
    			rows.push(true);
    		}
    		return rows; 
    	}

 		return this.visibleRows.filter((item)=>{
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

       if(this.configFinal.ajaxUrl){
  			return this.rowsFinal;
  		}

       for(let i = 0 ; i<this.rowsFinal.length;i++) {
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
        for(let i = 0 ; i<this.rowsFinal.length;i++) {

	       	let row = this.rowsFinal[i].cells?this.rowsFinal[i].cells:this.rowsFinal[i];
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

		   	//filter are active but no filter values on row!
		   	if(this.filterActive && !this.rowsFinal[i].filters){
	   			match = false;
	   		}

		   	//filter will be applied
		   	else if((searched && match || !searched) && this.filterActive){

		   		//filter groups are defined
		   		if(this.filterGroups){
		   			match = this.doFiltering(this.rowsFinal[i].filters);

		   		//define dummy filter group with filters and relation set
		   		}else{

		   			let group = {
		   				items:[],
		   				relation:this.configFinal.filterRelation,
		   			};

		   			for (let filter in this.filters){
		   				group.items.push({name:filter});
		   			}

		   			match = this.doFilteringForGroup(this.filters,this.rowsFinal[i].filters,group);

		   		}
				//######################################
				if(this.DEBUG){
			   		console.log("\n");
		   			console.log("ROW " + i,match,this.rowsFinal[i].filters);
		   			console.log("\n");
	   			}
	   			//######################################
		   	}

		    visible[i] = match;

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
  	},
  	hoverClasses(){

  		if(!this.configFinal.hoverClass){
  			return {};
  		}

  		let classes = [];

  		for (let i = 0; i<this.rowsFinal.length; i++){
  			if(i !== this.hoveredRow){
  				classes.push("");
  			}else{
  				classes.push(this.configFinal.hoverClass);
  			}

  		}

  		return classes;
  	}

  },

  watch:{
  	filters:{
    	handler(){

    		if(this.configFinal.ajaxUrl){
	 			this.loadViaAjax(true);
	 			return;
	 		}

 			this.currentPage = 1;
 			this.resetSelect();
    	},
    	deep:true,
    },

    hasGeneratedRows(){

    	let date =  new Date();

    	if(date - this.generationDate > 1000){
    		this.updateVisibleRows();
    		this.generationDate = new Date();
    	}

    },

    hiddenBreakpoints(val){
    	if(!this.initBreakpoints){
    		this.$emit("change:breakpoints",val,"change:breakpoints");
    	}
    	this.initBreakpoints = false;
    },

    hoveredRow(val){
    	if(val){
    		this.$emit("hover:row",this.rowsFinal[val],"hover:row");
    	}
    },

    query(val){
        if(val.length > this.configFinal.searchLength){
	    	if(this.configFinal.ajaxUrl){
	 			this.loadViaAjax(true);
	 			return;
	 		}

          this.$emit("update:search",val,"update:search");

          this.currentPage = 1;
          this.resetSelect();

        }
    },

    currentRowsPerPage(val){

    	this.$emit("update:rows-per-page",val,"update:rows-per-page");

    	if(this.configFinal.ajaxUrl){
 			this.loadViaAjax(true);
 			return;
 		}
    	
 		this.currentPage = 1;
 		this.resetSelect();
    },
    

  	config(val){
  		if(typeof val !== "object"){
	  		throw "config must be an object"
	  	}

	  	this.initLists();
		this.updateVisibleRows();

		if(this.configFinal.ajaxUrl){
 			this.loadViaAjax();
	 	}

	 	if(this.configFinal.defaultSelected){
	 		this.checkAll();
	 	}
  	},
  
  	selected(val){

  		let selected = [];

  		for (let index in this.sortedIndexes){
  			index = parseInt(index);
  			if(val[index]){
  				selected.push(this.rowsFinal[this.sortedIndexes[index]]);
  			}
  		}

  		if(selected.length && selected.length === this.onlyVisiblePagedRows.length){
  			this.allSelectedProperty = true;
  		}

  		if(JSON.stringify(this.lastSelected) !== JSON.stringify(selected)){
			this.$emit("input",selected);
			this.lastSelected = selected;
  		}
		

	},

	currentPage(val){

		this.$emit("update:page",val,"update:page");

	 	if(this.configFinal.ajaxUrl){
	 		this.loadViaAjax(true);
	 		return;
	 	}

	 	this.resetSelect();

	 	this.updateVisibleRows();
	 },

	 customMultiSort(val){
  		if(!val && Object.keys(this.currentSortIndexes).length > 1){

  			let currentItem;
  			let currentIndex;
  			for(let index in this.currentSortIndexes ){
  				if(this.currentSortIndexes[index].order === 0){
  					currentItem = this.currentSortIndexes[index];
  					currentIndex = index;
  					break;
  				}
  			}

  			this.currentSortIndexes = {};
  			this.$set(this.currentSortIndexes,currentIndex,currentItem);

  			this.sort();

  		}
  	},

	rows(){
	  this.updateVisibleRows();

	  this.$nextTick(()=>{
	  	this.initLists();
	  	this.$forceUpdate();

	  	if(this.configFinal.defaultSelected){
	  		this.allSelectedCustom = null;
	 		this.checkAll();
	 	}
	  });
	}
	
 
  },
  methods:{

  	onRowClick(row){
  		this.$emit("click:row",row,"click:row");
  	},

  	onRowToggle(show,rowIndex){
	  	if(show){
	  		if(this.openRows[rowIndex] !== undefined){
	  			this.$emit("expand:row",this.rowsFinal[this.sortedIndexes[rowIndex]],"expand:row");
	  		}
	  		this.$set(this.openRows,rowIndex,true);

		}else{
			if(this.openRows[rowIndex] !== undefined){
	  			this.$emit("collapse:row",this.rowsFinal[this.sortedIndexes[rowIndex]],"collapse:row");
	  		}
	  		this.$set(this.openRows,rowIndex,false);
		}

		// this.openRows = Object.assign({},this.openRows);

	},

  	onCellClick(cell){
  		this.$emit("click:cell",cell,"click:cell");
  	},

  	onMouseenterRow(index){
  		this.hoveredRow = index;
  	},

  	onMouseleaveRow(){
  		this.hoveredRow = null;
  	},

  	removeSort(index){

  		for(var i in this.currentSortIndexes){
  			let item = this.currentSortIndexes[i];
  			if(item.order > this.currentSortIndexes[index].order){
  				item.order--;
  			}
  			this.$set(this.currentSortIndexes,i,item);
  		}
  		this.$delete(this.currentSortIndexes,index);


  		if(this.numberOfSorts === 0){

	 		for(let i = 0 ; i<this.rowsFinal.length;i++) {
	  			this.sortedIndexes[i] = parseInt(i);
		 	}
		 	this.updateVisibleRows();

  		}else{
  			this.sort();
  		}
  	},

  	checkAll(){

      for (let index in this.sortedIndexes){
      		index = parseInt(index);

			if(this.visibleRows[this.sortedIndexes[index]]){
				this.$set(this.selected,this.sortedIndexes[index],this.allSelected);
			}else{
				this.$set(this.selected,this.sortedIndexes[index],false);
			}

		}      
    },

    checkListener(bool,index){

    	let tmp = this.selected.slice();
    	tmp[index] = bool;

    	if(tmp.indexOf(false) !== -1){
  			this.allSelectedProperty = false;
  		}

  		else if(tmp.indexOf(false) === -1){
  			this.allSelectedProperty = true;
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
  	//######################################
  	if(this.DEBUG){
  		console.log("RESULTS FOR GROUPS:",results,this.configFinal.filterGroupRelation);
  	}
  	//######################################

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

  	let spaces = "   ";

  	for (let i = 0;i<index;i++){
  		spaces+= "   ";
  	}

  	if(this.DEBUG){

	  	

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
  	}

  	//######################################

  	let found = false;

  	//######################################
  	if(this.DEBUG){
  		console.log(spaces,"GROUP:",group);
  	}
  	//######################################

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

  			}

  		}
  		return found

  	}else if(group.relation === "OR" || group.items){
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


  	setSortColumn(index){

  		if(!this.configFinal.sorts[index]){
  			return;
  		}

  		let item;

  		if(!this.currentSortIndexes[index]){

  			if(!this.multiSort){
  				this.currentSortIndexes  = {};
  			}

  			item = {
  				headline:this.configFinal.headlines[index],
  				index:index,
  				asc:true,
  				order:this.numberOfSorts,
  			};

  		}else{

  			item = this.currentSortIndexes[index];
  			item.asc = !item.asc;
  		}

  		this.$set(this.currentSortIndexes,index,item);

  		this.$emit("update:sort",this.currentSortIndexes,"update:sort");

  		this.sort();


  	},

  	sort(){

  		if(this.configFinal.ajaxUrl){
  			this.loadViaAjax(true);
  			return;
  		}


  		let rows = this.rowsFinal.slice();

  		for(let i = 0 ; i<rows.length;i++) {
			rows[i].index = i;
		}

		let sortableIndexes = [];
		for (let index in this.currentSortIndexes) {
			let data = this.currentSortIndexes[index];
			data.index = index;
		    sortableIndexes.push(data);
		}

		sortableIndexes.sort(function(a, b) {
		    return a.order - b.order;
		});

		let compare =(a, b, keys, index) => {
		    index = index || 0;

		    let currentKey = keys[index];

		    let i = currentKey.index;

  			let cellsA = a.cells?a.cells:a;
			let cellsB = b.cells?b.cells:b;

			let aValue = cellsA[i].sortValue?cellsA[i].sortValue:cellsA[i].html;
		  	let bValue = cellsB[i].sortValue?cellsB[i].sortValue:cellsB[i].html;

		  	if(currentKey.asc){
		    	return aValue > bValue ? 1 : (aValue < bValue ? -1 : ( keys[index+1] ? compare(a, b, keys, index + 1):1));
		  	}else{
		    	return aValue < bValue ? 1 : (aValue > bValue ? -1 : ( keys[index+1] ? compare(a, b, keys, index + 1):-1));
		  	}
		  
		} 

		rows.sort(function(a, b){
			return compare(a, b, sortableIndexes);
		});


		for(let i = 0 ; i<rows.length;i++) {
			this.sortedIndexes[i] = parseInt(rows[i].index);
		}

		this.currentPage = 1;
		this.resetSelect();

		this.updateVisibleRows();

  	},

  
  	checkOpenRow(index){
  		return this.openRows[index];
  	},
  	generateRowsForCells(rowIndex,cellIndex,cell,hide){

  		if(!this.generatedRows){
  			this.generatedRows = {};
  		}

  		if(!this.generatedRows[rowIndex]){
  			this.$set(this.generatedRows,rowIndex,{});
  		}

  		let cells = null;
  		if(hide && hide !== "sticky"){
  			cells = this.generatedRows[rowIndex];
  			cells[cellIndex] = cell;
  			this.$set(this.generatedRows,rowIndex,cells);

  		}else if(hide === "sticky"){
  			cells = this.stickyRows[rowIndex];
  			cells[cellIndex] = cell;
  			this.$set(this.stickyRows,rowIndex,cells);

  		}else{
  			cells = this.generatedRows[rowIndex];
  			delete cells[cellIndex];
	  		this.$set(this.generatedRows,rowIndex,cells);
  		}

  		let generatedRows = 0;
  		for(let i = 0;i<this.visibleRowIndexes.length;i++){

  			if(Object.keys(this.generatedRows[this.visibleRowIndexes[i]]).length){
  				generatedRows++;
  			}
  		}

  		this.hasGeneratedRows = generatedRows;

  		this.updateVisibleRows();

  	},

  	initLists(){

  		if(!this.rowsFinal){
  			return;
  		}

 		for(let i = 0 ; i<this.rowsFinal.length;i++) {
 			if(typeof this.generatedRows[i] !== "object"){
  				this.generatedRows[i] = {};
  			}

  			if(typeof this.stickyRows[i] !== "object"){
  				this.stickyRows[i] = {};
  			}

  			if(typeof this.sortedIndexes[i] === "undefined"){
  				this.sortedIndexes[i] = parseInt(i);
  			}
	 	}

	 	if(!this.config || !this.configFinal.number){
  			return;
  		}

	 	for(let i = 0 ; i<this.configFinal.number;i++) {
 			if(typeof this.selected[i] === "undefined"){
  				this.selected[i] = false;
  			}
	 	}

  		
  	},
  	clearLists(){
  		this.selected = [];
  		this.stickyRows = {};
  		this.generatedRows = {};
  		this.openRows = {};
  		this.sortedIndexes = {};
  	},
  	resetSelect(){
  		this.allSelectedProperty = false;
  		for(let i = 0 ; i<this.rowsFinal.length;i++) {
  			this.$set(this.selected,i,false);
	 	}
  	},
  	loadViaAjax(clear = false){
  		this.fetching = true;
  		this.clearLists();
  		this.ajaxRows = [];

  		if(clear){
  			this.currentPage = 1;
			this.resetSelect();
  		}

  		let params = {
  			search:this.query,
  			filters:this.filters,
  			perPage:this.currentRowsPerPage,
  			page:this.currentPage,
  			sort:this.numberOfSorts>0?{
  				indexes:this.currentSortIndexes,
  				columns:this.sortingColumns,
  			}:null

  		};

  		axios.get(this.configFinal.ajaxUrl,{params}).then((response)=>{
	  		this.ajaxRows = response.data.rows;
	  		this.ajaxPages = Math.ceil(response.data.all / this.currentRowsPerPage);
	  		this.ajaxAll = response.data.all;
	  		this.fetching = false;
	  		this.initLists();
	  	});

  	},

  	elementVisible(el) {
		        if (el) {
		            let computedStyle = window.getComputedStyle(el);
		            return computedStyle.display !== "none";
		        }
		        return false;
		    },

  	generateHiddenBreakpoints(regenerate = false) {

  		if(regenerate){
  			this.hiddenBreakpoints = [];
  		}

		let breakpoints = [];
        if (!this.elementVisible(this.$refs.xl)) {
            breakpoints.push("xl");
        }     

        if (!this.elementVisible(this.$refs.lg)) {
            breakpoints.push("lg");
        }

        if (!this.elementVisible(this.$refs.md)) {
            breakpoints.push("md");
        }

        if (!this.elementVisible(this.$refs.sm)) {
            breakpoints.push("sm");
        }

        if((JSON.stringify(this.hiddenBreakpoints) !== JSON.stringify(breakpoints))){
        	this.hiddenBreakpoints = breakpoints;
        }


    },

    updateVisibleRows() {
		this.generateHiddenBreakpoints(true);
		this.$nextTick(()=>{
			this.$recompute('currentRowsPerPage');
			this.$recompute('allSelected');
	      	this.$recompute('visibleRows');
	      	this.$recompute('stickyRowsFinal');
		});
	     
    },
  	
  },
  created(){
  	 this.initLists();
 },
 mounted(){
 	if(this.configFinal.ajaxUrl){
 		this.loadViaAjax();
 	}

 	if(this.configFinal.defaultSelected){
 		this.checkAll();
 	}

 	this.generateHiddenBreakpoints();
 	this.updateVisibleRows();

	window.addEventListener("resize",this.generateHiddenBreakpoints);

},
beforeDestroy(){
	window.removeEventListener("resize",this.generateHiddenBreakpoints);
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

	.table-wrapper .bg-muted{
		background:rgba(0,0,0,0.1);
	}

	.table-wrapper .pretty{
		background:#fff;
	}

</style>

<style scoped>

	.table th{
		border-top: none;
	}

	.pretty{
		margin-right: 0 !important;
	}

	.sort-header{
	  cursor: pointer;
	  position: relative;
	}

	.sort-header:hover{
		padding-right: 20px !important;
	}

	.sort-header.active{
		padding-right: 40px !important;
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

	.generated-row-cell:nth-child(odd){
		background:rgba(255,255,0,0.1);
	}

	.generated-row-cell:nth-child(even){
		background:rgba(100,100,0,0.1);
	}

	.generated-row-cell:nth-child(odd).hovered,
	.generated-row-cell:nth-child(even).hovered{
		background:none;
	}

	.generated-row table tr:first-child td{
		border-top:none;
	}

</style>