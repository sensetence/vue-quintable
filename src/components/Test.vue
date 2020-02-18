<template>
    <div class="checkbox-wrapper" @click="check"><div>Checked: {{checked}} | Test: {{test}} | Tester: {{tester}}</div></div>
</template>


<script>

    export default {
        props:["test","tester"],
        data(){
            return {
                checked:true,
            }
        },
        methods: {
            check() { this.checked = !this.checked; this.$emit("action",{index:1,checked:this.checked,tester:this.tester,test:this.test}) }
        }
    }

</script>