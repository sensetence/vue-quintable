<template>
    <div class="content">
        <div class="btn-group mr-2">
            <div class="btn btn-info" @click="moveRow('up')">
                <font-awesome-icon icon="chevron-up"></font-awesome-icon>
            </div>
            <div class="btn btn-info" @click="moveRow('down')">
                <font-awesome-icon icon="chevron-down"></font-awesome-icon>
            </div>
       </div>
        <div class="btn btn-danger mr-2" @click="deleteRow" title="Delete Row">
            <font-awesome-icon icon="times"></font-awesome-icon>
        </div>

        <drop  class="d-inline-block align-middle " @drop="handleDrop">
            <div class="card px-3 d-inline-block">
                <div class="py-2 bg-muted">
                    <font-awesome-icon icon="expand"></font-awesome-icon>
                </div>
            </div>
        </drop>
    </div>
</template>


<script>
    import { Drop } from 'vue-drag-drop';

    export default {
        props:{
            index:{
                type:Number
            }
        },
        components:{
            Drop
        },
        data(){
            return {
                checked:false,
                reference:"checkbox-component",
            }
        },
        methods: {
            handleDrop(data) {
                this.$emit("action",
                    {
                        index:data.index,
                        type:"move-row",
                        to:this.index
                    }
                )
            },
            moveRow(mode = "up") {
                this.$emit("action",
                    {
                        index:this.index,
                        type:"move-row",
                        to:mode === "up" ? this.index - 1:this.index + 1
                    }
                )
            },
            deleteRow(){
                this.$emit("action",
                    {
                        index:this.index,
                        type:"delete-row",
                    }
                )
            }
        }
    }

</script>


