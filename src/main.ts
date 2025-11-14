import {createApp} from 'vue'

// global styles
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/global.scss'

// local imports
import {registerIconComponents} from './utils/register-icon';
import {registerFormComponents} from './utils/register-form';
import {registerTooltipComponent} from "./utils/register-tooltip";
import App from './app.vue'

const app = createApp(App);
registerFormComponents(app);
registerIconComponents(app);
registerTooltipComponent(app);
app.mount('#app');