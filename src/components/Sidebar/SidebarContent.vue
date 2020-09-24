<template>
    <div>
        <vue-perfect-scrollbar :settings="settings">
            <nav class="idb-sidebar-nav">
                <ul class="idb-nav list-unstyled p-0">
                    <template v-for="(menu, index) in sideBarLinks.routes">
                        <li v-if="menu.child_routes!=null" :key="index" :class="[ 'nav-item', { 'active': menu.active } ]"
                            @click="toggleActive(index)">
                            <a href="javascript:void(0)" class="nav-link">
                                <i :class="menu.menu_icon" class="menu-icon"></i>
                                <span class="menu-title">{{ textTruncate($t(menu.menu_title)) }}</span>
                            </a>
                            <ul @click="toggleActive(index)" class="list-unstyled sub-menu">
                                <router-link :to="subMenu.path" tag="li" v-for="(subMenu, key) in menu.child_routes" :key="key">
                                    <a href="javascript:void(0)" class="sub-menu-nav-link">
                                        <span>{{ textTruncate($t(subMenu.menu_title)) }}</span>
                                    </a>
                                </router-link>
                            </ul>
                        </li>
                        <router-link :key="index" :to="menu.path" tag="li" class="nav-item" @click.native="toggleActive(index)"
                            v-else>
                            <a class="nav-link">
                                <i :class="menu.menu_icon" class="mr-15"></i>
                                <span class="menu-title">{{ textTruncate($t(menu.menu_title)) }}</span>
                            </a>
                        </router-link>
                    </template>
                </ul>
            </nav>
        </vue-perfect-scrollbar>
        <div class="foot-sidebar">
            <img src="/static/img/foot_logo.jpeg" width="244" alt="Escudos" class="logo-ponal " />
        </div>
    </div>
</template>

<script>
	import sideBarLinks from "./menu.js";
	import { textTruncate } from "Helpers/helpers";

	export default {
		data() {
			return {
				settings: {
					maxScrollbarLength: 220
				},
				sideBarLinks,
			};
		},
		methods: {
			textTruncate(text) {
				return textTruncate(text, 20);
			},
			toggleActive(index) {
				for (let selectedRoute in this.sideBarLinks.routes) {
					if (selectedRoute == index) {
						this.sideBarLinks.routes[selectedRoute].active = !this.sideBarLinks.routes[selectedRoute].active
					} else {
						this.sideBarLinks.routes[selectedRoute].active = false
					}
				}
			}
		}

	};
</script>