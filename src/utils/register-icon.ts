import {App} from "vue";
import {library} from '@fortawesome/fontawesome-svg-core';

// components
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import {
    faChevronUp,
    faChevronDown,
    faInfoCircle,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
    faArrowsAlt,
    faExpand,
    faSort,
    faSortAmountDown,
    faSortAmountDownAlt,
    faSortAmountUp,
    faSortAmountUpAlt,
    faTimes,
    faCheck,
    faSquare,
    faCircleNotch,
    faPlus,
    faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

// import the icons you want to use
library.add(
    faChevronUp,
    faChevronDown,
    faInfoCircle,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
    faArrowsAlt,
    faExpand,
    faSort,
    faSortAmountDown,
    faSortAmountDownAlt,
    faSortAmountUp,
    faSortAmountUpAlt,
    faTimes,
    faCheck,
    faSquare,
    faCircleNotch,
    faPlus,
    faCaretUp,
);

export function registerIconComponents(app: App) {
    app.component('font-awesome-icon', FontAwesomeIcon);
}