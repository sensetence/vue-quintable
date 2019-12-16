<template>
	<tr @click="onToggleShow" :class="classesParsed" @mouseover="onMouseenter(index)" @mouseleave="onMouseleave(index)" :id="uuid">
		<td class="toggle" v-show="hiddenCells.length && !hideRowToggle">
			<b-tooltip :target="uuid" triggers="hover" v-if="tooltip" placement ="top">
			    <span v-html="tooltip"></span>
			</b-tooltip>
			<span>
				<span v-if="!open">+</span>
				<span v-else>-</span>
			</span>
		</td>
		<td v-if="select && selectPosition === 'pre'">

			<p-check v-if="pretty" name="check" class="p-icon" v-model="selected" @change="selectRow">
				<template slot="extra" >
					<span><font-awesome-icon v-show="selected" icon="check" class="text-success icon-check" /></span>
				</template>
			</p-check>
			<input v-else type="checkbox" v-model="selected" @change="selectRow" value>
		</td>
		
			<VueFooCell v-for="(cell, cIndex) in row" :key="'cell-'+index+'-'+cIndex" :index="cIndex" :align="alignments[cIndex]" :sticky="stickyCols[cIndex]" :cell="cell" @toggle="onToggleCell" :breakpoint="breakpoints[cIndex]" />

		<td v-if="select && selectPosition === 'post'">

			<p-check v-if="pretty" name="check" class="p-icon" v-model="selected" @change="selectRow">
				<template slot="extra" >
					<span><font-awesome-icon v-show="selected" icon="check" class="text-success icon-check" /></span>
				</template>
			</p-check>
			<input v-else type="checkbox" v-model="selected" @change="selectRow">
		</td>
	</tr>
</template>

<script>
	import VueFooCell from './VueFooCell.vue'
	import {v4 as uuid} from 'uuid';

	export default{
		props:["index","row","tooltip","breakpoints","stickyCols","alignments","value","select","pretty","selectPosition","hideRowToggle","expanded","classes"],
		components: {
		    VueFooCell,
		},
		data(){
			return {
				triggered:null,
				hiddenCells:[],
				selected:false,
				uuid:uuid()
			}
		},

		computed:{
			open:{
				get(){
					if(this.triggered === null && (this.expanded || this.row.expanded)){
						return true;
					}
					return this.triggered;
				},
				set(val){
					this.triggered = val;
				}
				
			},
			classesParsed(){
				let classes = [];
				if(this.hiddenCells.length){
					classes.push("cursor-pointer");
				}

				if(this.classes){
					let splitted = this.classes.split(" ");
					Array.prototype.push.apply(classes,splitted);
				}

				return classes.join(" ");

			}
			
		},
		watch:{
			value(val){
				this.selected = val;
			},
			open(val){
				this.$emit("toggle",val,this.index);
			}
		},

		methods:{
			onMouseenter(e){
				this.$emit("mouseenter",e);
			},
			onMouseleave(e){
				this.$emit("mouseleave",e);
			},
			onToggleCell(cellIndex,cell,hidden){
				
				if(hidden && hidden !== "sticky"){
					this.hiddenCells.push(cellIndex);
				}else{
					let index = this.hiddenCells.indexOf(cellIndex);
					if(index !== -1){
						this.hiddenCells.splice(index,1);
					}
				}

				this.$emit("updateBreakpoints",this.index,cellIndex,cell,hidden);
			},
			selectRow(){
				this.$emit("toggleSelect",this.selected,this.index);
				this.$emit("input",this.selected);
			},
			onToggleShow(e){
			
				if(!this.hiddenCells.length || e.target.type === "checkbox"){
					return;
				}
				this.open = !this.open;
			}
		},
		mounted(){
			this.$emit("toggle",this.open,this.index);
		}
  
	}
</script>

<style scoped>
	.cursor-pointer{
		cursor: pointer;
	}
</style>