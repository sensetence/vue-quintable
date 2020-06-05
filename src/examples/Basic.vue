<template>

    <div class="content">

        <VueQuintable :config="config" :rows="rows"></VueQuintable>

        <b-button v-b-toggle.code-basic variant="secondary">Toggle Code</b-button>
        <b-collapse id="code-basic" class="mt-2">

        <pre>
             <code data-language="HTML">
    &lt;template&gt;
            &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;&lt;/VueQuintable&gt;
    &lt;/template&gt;
            </code>
            <code data-language="javascript">
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
                        }, {
                            headline: "Birthplace",
                            breakpoint: "md"
                        }, {
                            headline: "Job",
                            sticky: true,
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
                            text: "Pejing"
                        },
                        {
                            text: "Trainee"
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
                            text: "Trainee"
                        },
                    ],
                ],
            }
        }
    }
        </code>
      </pre>
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
                        }, {
                            headline: "Birthplace",
                            breakpoint: "md"
                        }, {
                            headline: "Job",
                            sticky: true,
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
                            text: "Pejing"
                        },
                        {
                            text: "Trainee"
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
                            text: "Trainee"
                        },
                    ],
                ],
            }
        }
    }
</script>