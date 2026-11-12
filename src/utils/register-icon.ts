import type { App } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";

// components
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Font Awesome 7, by the canonical names (the FA 4/5 aliases such as "times" or "sort-amount-down" are gone).
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faArrowDownWideShort,
  faArrowUpShortWide,
  faCaretDown,
  faCaretUp,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faCircleNotch,
  faDownLong,
  faExpand,
  faEye,
  faEyeSlash,
  faMinus,
  faPlus,
  faSquare,
  faUpDownLeftRight,
  faUpLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faArrowDownWideShort,
  faArrowUpShortWide,
  faCaretDown,
  faCaretUp,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faCircleNotch,
  faDownLong,
  faExpand,
  faEye,
  faEyeSlash,
  faMinus,
  faPlus,
  faSquare,
  faUpDownLeftRight,
  faUpLong,
  faXmark,
);

export function registerIconComponents(app: App) {
  app.component("QuintableFontAwesomeIcon", FontAwesomeIcon);
}
