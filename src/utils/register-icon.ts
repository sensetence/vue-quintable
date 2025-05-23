import {App} from "vue";
import {library} from '@fortawesome/fontawesome-svg-core';

// components
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import {
    faChevronUp,
    faChevronDown,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

// import the icons you want to use
library.add(
    faChevronUp,
    faChevronDown,
    faInfoCircle
);

export function registerIconComponents(app: App) {
    app.component('font-awesome-icon', FontAwesomeIcon);
}