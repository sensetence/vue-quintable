<template>

    <div class="content">
        <p class="alert alert-info">
            <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
            Resize your brower window to see responsive behaviour
        </p>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>

        <b-button v-b-toggle.code-basic variant="secondary">Toggle Code</b-button>
        <b-collapse id="code-basic" class="mt-2">
            <!-- @formatter:off -->
<pre data-toolbar-order="copy-to-clipboard"><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;&lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;
    import VueQuintable from "../components/VueQuintable.vue"
    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            breakpoint:"md"
                        }, {
                            headline: "Birth Place",
                            sticky:true
                        }, {
                            headline: "Job",
                            breakpoint:"all"
                        }
                    ],
                },

                rows: [
                    [
                        {
                            text: "Mia Wong"
                        },
                        {
                            text: 50
                        },
                        {
                            text: "Beijing"
                        },
                        {
                            text: "CEO"
                        },
                    ],
                    [
                        {
                            text: "Peter Stanbridge"
                        },
                        {
                            text: 18
                        },
                        {
                            text: "London"
                        },
                        {
                            text: "Trainee"
                        },
                    ],
                    [
                        {
                            text: "Natalie Lee-Walsh"
                        },
                        {
                            text: 25
                        },
                        {
                            text: "Dublin"
                        },
                        {
                            text: "Managing Director"
                        },
                    ],
                ],
            }
        }
    }
&lt;/script&gt;</code></pre>
            <!-- @formatter:on -->

        </b-collapse>
    </div>

</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            breakpoint:"md"
                        }, {
                            headline: "Birth Place",
                            sticky:true
                        }, {
                            headline: "Job",
                            breakpoint:"all"
                        }
                    ],
                },

                rows: [
                    [
                        {
                            text: "Mia Wong"
                        },
                        {
                            text: 50
                        },
                        {
                            text: "Beijing"
                        },
                        {
                            text: "CEO"
                        },
                    ],
                    [
                        {
                            text: "Peter Stanbridge"
                        },
                        {
                            text: 18
                        },
                        {
                            text: "London"
                        },
                        {
                            text: "Trainee"
                        },
                    ],
                    [
                        {
                            text: "Natalie Lee-Walsh"
                        },
                        {
                            text: 25
                        },
                        {
                            text: "Dublin"
                        },
                        {
                            text: "Managing Director"
                        },
                    ],
                ],
            }
        }
    }
</script>