<template>

    <div class="content">
        <p class="alert alert-info">
            <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
            Nested VueQuintable
        </p>
        <VueQuintable :config="config" :rows="rows"></VueQuintable>

        <b-button v-b-toggle.code-basic variant="secondary">Toggle Code</b-button>
        <b-collapse id="code-basic" class="mt-2">
            <!-- @formatter:off -->
            <pre data-toolbar-order="copy-to-clipboard"><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;&lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;

    import VueQuintable from &quot;../components/VueQuintable.vue&quot;

    import Chance from &quot;chance&quot;;

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: &quot;Name&quot;,
                        }, {
                            headline: &quot;Age&quot;,
                        }, {
                            headline: &quot;Birth Time&quot;,
                            sticky:true,

                        }, {
                            headline: &quot;Job&quot;,
                        }
                    ],
                },

            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i &lt; count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            quintable: {
                                tableClasses:&quot;text-center&quot;,
                                config: {
                                    columns: [
                                        {
                                            headline: &quot;Country&quot;,
                                        }, {
                                            headline: &quot;City&quot;,
                                            breakpoint:&quot;lg&quot;

                                        }, {
                                            headline: &quot;Time&quot;,
                                            breakpoint:&quot;xl&quot;
                                        }
                                    ],
                                },
                                rows: [
                                    [
                                        {text: &quot;Germany&quot;},
                                        {text: &quot;Berlin&quot;},
                                        {text: &quot;10:10 AM&quot;}
                                    ],
                                    [
                                        {text: &quot;United States&quot;},
                                        {text: &quot;New York&quot;},
                                        {text: &quot;04:10 AM&quot;}
                                    ],
                                    [
                                        {text: &quot;United States&quot;},
                                        {text: &quot;Houston&quot;},
                                        {text: &quot;03:10 AM&quot;}
                                    ],
                                ],
                            },},
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


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

    import Chance from "chance";
    import * as moment from 'moment';
    import 'moment-timezone'

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
                            headline: "Birth Time",
                            sticky:true,

                        }, {
                            headline: "Job",
                        }
                    ],
                },

            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){

                    const hours = Math.ceil(Math.random() * 24);
                    const minutes = Math.ceil(Math.random() * 59);

                    var m = moment.tz("Europe/Berlin");
                    m.set({hour:hours,minute:minutes,second:0,millisecond:0});

                    const timeB = m.format("hh:mm A");

                    const timeNY = m.tz("America/New_York").format("hh:mm A");

                    const timeH =  m.tz("America/Chicago").format("hh:mm A");

                    rows.push([
                        {
                            text:chance.name({ nationality: 'en' })
                        },
                        {
                            text:chance.age()
                        },
                        {
                            quintable: {
                                tableClasses:"text-center",
                                config: {
                                    columns: [
                                        {
                                            headline: "Country",
                                        }, {
                                            headline: "City",
                                            breakpoint:"lg"

                                        }, {
                                            headline: "Time",
                                            breakpoint:"xl"
                                        }
                                    ],
                                },
                                rows: [
                                    [
                                        {text: "Germany"},
                                        {text: "Berlin"},
                                        {text:  timeB}
                                    ],
                                    [
                                        {text: "United States"},
                                        {text: "New York"},
                                        {text: timeNY}
                                    ],
                                    [
                                        {text: "United States"},
                                        {text: "Chicago"},
                                        {text: timeH}
                                    ],
                                ],
                            },},
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;


            }
        }
    }
</script>