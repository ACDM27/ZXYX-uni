import { createSSRApp } from "vue";

import App from "@/App.vue";
import pinia from '@/store';

export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia();
	
	app.use(pinia);
	
	return {
		app,
		pinia,
	};
}
