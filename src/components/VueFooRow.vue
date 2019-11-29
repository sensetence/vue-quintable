<template>
	<tr @click="onToggleShow" :class="{'cursor-pointer':hiddenCells.length}">
		<td class="toggle" v-show="hiddenCells.length && !hideRowToggle">
			<span>
				<span v-if="!open">+</span>
				<span v-else>-</span>
			</span>
		</td>
		<td v-if="select && selectPosition == 'pre'">

			<p-check v-if="pretty" name="check" class="p-icon" v-model="selected">
				<template slot="extra" >
					<span><font-awesome-icon v-show="selected" icon="check" class="text-success icon-check" /></span>
				</template>
			</p-check>
			<input v-else type="checkbox" v-model="selected" @change="selectRow">
		</td>
		
		<slot v-for="(cell, cIndex) in row" name="cells">
			<VueFooCell :index="cIndex" :align="alignments[cIndex]" :sticky="stickyCols[cIndex]" :cell="cell" @toggle="onToggleCell" :breakpoint="breakpoints[cIndex]" />
		</slot>
		<slot name="content">
		</slot>
		<td v-if="select && selectPosition == 'post'">

			<p-check v-if="pretty" name="check" class="p-icon" v-model="selected">
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
	export default{
		props:["index","row","breakpoints","stickyCols","alignments","value","select","pretty","selectPosition","hideRowToggle"],
		components: {
		    VueFooCell,
		},
		data(){
			return {
				open:false,
				hiddenCells:[],
				selected:false,
			}
		},

		watch:{
			value(val){
				this.selected = val;
			}
		},

		methods:{
			onToggleCell(cellIndex,cell,hidden){
				
				if(hidden && hidden !== "sticky"){
					this.hiddenCells.push(cellIndex);
				}else{
					var index = this.hiddenCells.indexOf(cellIndex);
					if(index !== -1){
						this.hiddenCells.splice(index,1);
					}
				}

				this.$emit("updateBreakpoints",this.index,cellIndex,cell,hidden);
			},
			selectRow(){
				this.$emit("input",this.selected);
			},
			onToggleShow(){
				if(!this.hiddenCells.length){
					return;
				}

				this.open = !this.open;
				this.$emit("toggle",this.open,this.index);
			}
		}
  
	}
</script>

<style scoped>
	.cursor-pointer{
		cursor: pointer;
	}
</style>