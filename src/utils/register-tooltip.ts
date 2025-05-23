import {App} from "vue";
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

export function registerTooltipComponent(app: App) {
    app.use(FloatingVue, {
        themes: {
            tooltip: {
                $extend: 'dropdown', // inherit default styles
                triggers: ['hover', 'focus'],
                delay: {
                    show: 200,
                    hide: 200,
                },
                popperOptions: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 6],
                            },
                        },
                    ],
                },
                contentClass: 'quintable-tooltip',
            },
        },
    });
}