<template>

	<td v-show="cell && show" :class="classes">
			<div class="breakpoints">
                <div ref="xs"></div>
                <div ref="sm" class="d-none d-sm-block"></div>
                <div ref="md" class="d-none d-md-block"></div>
                <div ref="lg" class="d-none d-lg-block"></div>
                <div ref="xl" class="d-none d-xl-block"></div>
            </div>
           <div class="cell-inner" v-html="cell.html"></div>
	</td>
</template>

<script>
	export default{
		props:[
			"cell",
			"index",
			"breakpoint",
			"align",
			"sticky",
			"generated",
		
		],
		data(){
			return {
				hidden:null,
			}
		},
		computed:{
			classes(){
				let classes = this.cell.classes + " ";
				if( (this.align || this.cell.align) && !this.generated){
					if(this.cell.align){
						classes += "text-"+ this.cell.align;
					}else{
						classes += this.align == true?"text-left":"text-"+ this.align;
					}
				}
				return classes;
			},
			show(){
				return !this.hidden && this.hidden !== "sticky";
			}
		},
		watch:{
			hidden(val){
				this.$emit("toggle",this.index,this.cell,val);
			}
		},
		methods:{

			breakpoints() {

				let breakpoints = [];
		        if (!this.isVisible(this.$refs.xl)) {
		            breakpoints.push("xl");
		        }     

		        if (!this.isVisible(this.$refs.lg)) {
		            breakpoints.push("lg");
		        }

		        if (!this.isVisible(this.$refs.md)) {
		            breakpoints.push("md");
		        }

		        if (!this.isVisible(this.$refs.sm)) {
		            breakpoints.push("sm");
		        }

		        return breakpoints;

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

		  		this.hidden = this.breakpoints().indexOf(this.breakpoint) !== -1;
		  	},
		    isVisible(el) {
		        if (el) {
		            let computedStyle = window.getComputedStyle(el);
		            return computedStyle.display !== "none";
		        }
		        return false;
		    },
		},
		mounted(){
			this.checkBreakpoints();

			window.addEventListener("resize",this.checkBreakpoints);
		
		},
		beforeDestroy(){
			window.removeEventListener("resize",this.checkBreakpoints);
		}
	
	}
</script>

<style scoped>
	td.full-width{
		display:block;width:100%;clear:both
	}
</style>