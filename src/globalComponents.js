/**
 * Vuely Global Components
 */

//spinner for app card
import Spinner from 'vue-spinner-component/src/Spinner.vue';

//perfect scroll bar
import VuePerfectScrollbar from "vue-perfect-scrollbar";

//date picker
import Datepicker from 'vuejs-datepicker';

// count up
import CountUp from 'Components/CountUp/CountUp';

// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// App Card component
import AppCard from 'Components/AppCard/AppCard';

// Stats Card Component
import StatsCard from 'Components/StatsCard/StatsCard';

// Stats Card V2 Component
import StatsCardV2 from "Components/StatsCardV2/StatsCardV2"

// social stats card
import SocialStatsCard from 'Components/SocialStatsCard/SocialStatsCard';

//App Card loader 
import AppSectionLoader from 'Components/AppSectionLoader/AppSectionLoader';

//crypto slider
import CryptoSlider from "Components/Widgets/CryptoSlider";

//Delete Confirmation Dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

const GlobalComponents = {
	install(Vue) {
		Vue.component('countUp', CountUp);
		Vue.component('appCard', AppCard);
		Vue.component('statsCard', StatsCard);
		Vue.component('statsCardV2', StatsCardV2);
		Vue.component('socialStatsCard', SocialStatsCard);
		Vue.component('vuePerfectScrollbar', VuePerfectScrollbar);
		Vue.component('pageTitleBar', PageTitleBar);
		Vue.component('datePicker', Datepicker);
		Vue.component('appSectionLoader', AppSectionLoader);
		Vue.component('DeleteConfirmationDialog', DeleteConfirmationDialog);
		Vue.component('Spinner', Spinner);
		Vue.component('cryptoSlider', CryptoSlider);
	}
}

export default GlobalComponents