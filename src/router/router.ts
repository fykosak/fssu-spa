import component from '*.vue';
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../pages/home.vue";
import Account from "../pages/account.vue";
import Admin from "../pages/admin.vue";
import Competition from "../pages/competition.vue";
import Problem from "../pages/problem.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/account", component: Account },
	{ path: "/admin", component: Admin },
	{ path: "/competition", component: Competition },
	{ path: "/problem", component: Problem }
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;