<template>
	<div class="table-wrapper">
		<div v-if="configFinal.search" class="text-right">
			<span class="text-left">
				<input type="search" placeholder="Search..." v-model="query" class="form-control">
			</span>
		</div>		
		<table class="vue-foo-table table">
			<thead v-if="configFinal.headlines.length">
				<tr>
					<th class="placeholder" v-if="hasGeneratedRows && !configFinal.hideRowToggle">&nbsp;</th>
					<th v-if="configFinal.select &&  configFinal.selectPosition == 'pre'">
						<template v-if="configFinal.selectAll">
						<p-check v-if="configFinal.prettySelect" name="check" class="p-icon  p-smooth" v-model="allSelected">
							<template slot="extra" >
								<span><font-awesome-icon v-show="allSelected" icon="check" class="text-success icon-check" /></span>
							</template>
						</p-check>
						<input v-else type="checkbox" v-model="allSelected">
						</template>
					</th>

					<th v-for="(headline,hIndex) in configFinal.headlines" v-show="visibleColumns[hIndex]" :class="headerClass[hIndex]" :title="'headline-'+hIndex" :key="'headline-'+hIndex" @click="setSortColumn(hIndex)">
						<span class="headline" v-html="headline"></span> 
						<span class="sorting-icon ml-2" v-if="configFinal.sorts[hIndex]">
							<font-awesome-icon v-show="currentSortIndex != hIndex" icon="sort" class="text-primary" />
							<font-awesome-icon v-show="currentSortIndex == hIndex && sortAscending" icon="sort-amount-down-alt" class="text-primary" />
							<font-awesome-icon v-show="currentSortIndex == hIndex && !sortAscending" icon="sort-amount-down" class="text-primary" />
						</span>
						
					</th>
					<th v-if="configFinal.select && configFinal.selectPosition == 'post'">
						<template v-if="configFinal.selectAll">
							<p-check v-if="configFinal.prettySelect" name="check" class="p-icon  p-smooth" v-model="allSelected">
								<template slot="extra" >
									<span><font-awesome-icon v-show="allSelected" icon="check" class="text-success icon-check" /></span>
								</template>
							</p-check>
							<input v-else type="checkbox" v-model="allSelected">
						</template>
					</th>
				</tr>
			</thead>
			  <tbody>
					<template  v-for="(rIndex) in sortedIndexes" v-show="visibleRows[rIndex]" >
						<VueFooRow 
							:key="'row-'+rIndex"
							:pretty="configFinal.prettySelect" 
							:selectPosition="configFinal.selectPosition" 
							:select="configFinal.select" 
							:index="rIndex" 
							:hideRowToggle="configFinal.hideRowToggle" 
							:breakpoints="configFinal.breakpoints" 
							:stickyCols="configFinal.stickyCols" 
							:alignments="configFinal.alignments" 
							:row="rows[rIndex]" 
							@updateBreakpoints="generateRowsForCells" 
							@toggle="onToggleRow" 
							v-model="selected[rIndex]"/>

						<template v-if="generatedRows[rIndex] || stickyRows[rIndex]">
							<tr 
								:key="'generated-row-'+rIndex"
								class="generated-row" 
								v-show=
									"openRows[rIndex] 
									&& Object.keys(generatedRows[rIndex]).length 
									|| Object.keys(stickyRows[rIndex]).length">
								
								<td :colspan="configFinal.number+1" >
									<table class="table">
										<tbody>
											<tr 
												:key="'generated-row-cell-'+rIndex+'-'+cIndex" 
												v-for="(cell,cIndex) in generatedRows[rIndex]">

												<td>
													<strong 
														v-html="configFinal.headlines[cIndex]">
														
													</strong></td>
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
		<template v-if="noRows">
			   <div class="text-center p-3"><em>No results!</em></div>
			   <hr>
		</template>
	</div>

</template>

<script>

import VueFooRow from "./VueFooRow.vue"
import VueFooCell from "./VueFooCell.vue"

import fuzzy from "fuzzy.js";

export default {
  name: 'VueFooTable',
  props:["rows","config","value"],
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
  	}
  },
  computed:{
  	configFinal(){


  		let pagination = false;
  		if(this.config.pagination === true){
  			pagination = 25;
  		}else if(this.config.pagination){
  			pagination = this.config.pagination;
  		}

  		let select = false;
  		if(this.config.select){
  			select = true;
  		}

  		let selectPosition = "post";
  		if(["pre","post"].indexOf(this.config.selectPosition)!== -1){
  			selectPosition = this.config.selectPosition;
  		}

  		let prettySelect = false;
  		if(this.config.prettySelect){
  			prettySelect = true;
  		}

  		let search = false;
  		if(this.config.search){
  			search = true;
  		}

  		let selectAll = false;
  		if(this.config.selectAll){
  			selectAll = true;
  		}

  		let hideRowToggle = false;
  		if(this.config.hideRowToggle){
  			hideRowToggle = true;
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
  			stickyCols:stickyCols,
  			alignments:alignments,
  			breakpoints:breakpoints,
  			pagination:pagination,
  			select:select,
  			selectAll:selectAll,
  			search:search,
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
  	visibleRows(){

  		let visible = [];

  		for(let i = 0 ; i<this.rows.length;i++) {
  			let row = this.rows[i];

  			if(!this.configFinal.search && !this.configFinal.filter){
  				visible.push(true);
  				continue;
  			}

  			if(this.configFinal.search && this.query.length > 1){
  				let match = false;
  				for (var j = 0; j < row.length; j++){
  					let col = row[j];
  					if(fuzzy((col.html + "").toLowerCase(), (this.query + "").toLowerCase()).score > 6){
  						match = true;
  						break;
  					}
  				}

  				visible.push(match);
  			}else if(this.configFinal.search && this.query.length <=1){

  				visible.push(true);
  			}

  		}

  		return visible;
  	},
  	noRows(){
  		for (var i = 0; i < this.visibleRows.length; i++){
  			if( this.visibleRows [i]){
  				return false;
  			}
  		}
  		return true;
  	}


  },
  watch:{

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
  	allSelected(bool){
  		
		for(let i = 0 ; i<this.configFinal.number;i++) {
			this.$set(this.selected,i,bool);
		}
  		
  	},
  	selected(val){
		this.$emit("input",val);
	 },
 
  },
  methods:{

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
			let aValue = a[index].sortValue?a[index].sortValue:a[index].html;
		  	let bValue = b[index].sortValue?b[index].sortValue:b[index].html;

			if(asc){
			  return aValue > bValue?1:-1;
			}
		  	return aValue < bValue?1:-1;
		}

		rows.sort(compare);

		for(let i = 0 ; i<rows.length;i++) {
			this.sortedIndexes[i] = rows[i].index;
		}

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
  mounted(){
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

</style>