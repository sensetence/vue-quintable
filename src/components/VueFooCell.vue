<template>

	<td v-show="cell && show" :class="classesParsed" :id="uuid" @click="onClick">
		<b-tooltip :target="uuid" triggers="hover" v-if="cell.tooltip" placement ="left">
			    <span v-html="cell.tooltip"></span>
			</b-tooltip>
           <div class="cell-inner" v-html="cell.html"></div>
	</td>
</template>

<script>
	
	import {v4 as uuid} from 'uuid';

	export default{
		props:[
			"cell",
			"index",
			"breakpoint",
			"align",
			"classes",
			"sticky",
			"generated",
			"hiddenBreakpoints",
		
		],
		data(){
			return {
				hidden:null,
				uuid:uuid()
			}
		},
		computed:{
			classesParsed(){
				let classes = this.classes?this.classes.split(" "):[];
				if( (this.align || this.cell.align) && !this.generated){
					if(this.cell.align){
						classes.push ("text-"+ this.cell.align);
					}else{
						classes.push (this.align == true?"text-left":"text-"+ this.align);
					}
				}

				if(this.cell.classes){
					let splitted = this.cell.classes.split(" ");
					Array.prototype.push.apply(classes,splitted);
				}

			 	return classes.join(" ");
			},
			show(){
				return !this.hidden && this.hidden !== "sticky";
			}
		},
		watch:{
			hidden(val){
				if(this.index !== undefined){
					this.$emit("toggle",this.index,this.cell,val);
				}
			},
			hiddenBreakpoints:{
				handler(){
					this.checkBreakpoints();
				},
				depp:true
			}
		},
		methods:{

			onClick(){
				this.$emit("click",this.cell);
			},

		  	checkBreakpoints(){
		  		if(this.sticky){
		  			this.hidden =  "sticky";
		  			return;
		  		}

		  		if(typeof this.breakpoint !== "string"){
		  			this.hidden =  false;
		  			return;
		  		}

		  		this.hidden = this.hiddenBreakpoints.indexOf(this.breakpoint) !== -1;
		  	},

		},
		mounted(){
			this.checkBreakpoints();
		}
	
	}
</script>

<style scoped>
	td.full-width{
		display:block;width:100%;clear:both
	}
</style>