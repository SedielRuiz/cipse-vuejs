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
                            <a class="nav-link nav-link-only">
                                <i :class="menu.menu_icon" class="mr-15"></i>
                                <span class="menu-title">{{ textTruncate($t(menu.menu_title)) }}</span>
                            </a>
                        </router-link>
                    </template>
                </ul>
            </nav>
            <div class="idb-server-progress p-30 text-center">
                <search-form class=""></search-form>
                <div class="progress-wrap mb-80"></div>
                <div class="progress-wrap mb-60">
                    <h5 class="text-white">CIPSE</h5>
                    <p class="fs-12"><i class="fas fa-envelope"></i> Correo: cipse@example.com</p>
                </div>
            </div>
        </vue-perfect-scrollbar>
    </div>
</template>

<script>
	import { mapGetters, mapState } from "vuex";
    import menuAdminTechnical from "./Menus/menuAdminTechnical.js";
    import menuAdminFuntional from "./Menus/menuAdminFuntional.js";
    import menuFuntional from "./Menus/menuFuntional.js";
    import menuObservator from "./Menus/menuObservator.js";
    import { textTruncate } from "Helpers/helpers";
    import SearchForm from "@/components/Header/SearchForm.vue";

	export default {
        components:{
            SearchForm,
        },
		data() {
			return {
				settings: {
					maxScrollbarLength: 220
                },
                sideBarLinks:null
			};
        },
        watch:{
            dataMenu(val){
                
            }
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
        },
        computed: {
            ...mapGetters({
				role: 'auth/getRole',
            }),
            dataMenu() {
				switch (this.role) {
                    case "ADMINISTRADOR_TECNICO":
                        this.sideBarLinks = menuAdminTechnical;
                        break;
                    case "ADMINISTRADOR_FUNCIONAL":
                        this.sideBarLinks = menuAdminFuntional;
                        break;
                    case "FUNCIONAL":
                        this.sideBarLinks = menuFuntional;
                        break;
                    case "OBSERVADOR":
                        this.sideBarLinks = menuObservator;
                        break;
                
                    default:
                        this.sideBarLinks = menuObservator;
                        break;
                }
                return this.sideBarLinks;
			},
        }

	};
</script>