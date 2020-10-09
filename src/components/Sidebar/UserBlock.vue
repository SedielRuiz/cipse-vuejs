<template>
	<div class="user-section d-flex flex-column align-items-center">
        <div class="row sm-center xs-center">
            <div class="col-xs-12 col-sm-12 col-md-4 text-right">
                <img src="/static/img/user-11.jpg" width="60" height="60" alt="user" class="img-fluid rounded-circle mb-10" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 white">
                <span>
                    <i class="fas fa-signature"></i> 
                    Sediel Ruiz  
                    <img class="flag-img" :src="'/static/flag-icons/'+getFlag()+'.png'">
                </span><br>
                <small><i class="fas fa-user-tag"></i> Administrador Tecnico</small><br>
                <small><i class="fas fa-universal-access"></i> Especiales</small>
            </div>
        </div>

		<b-dropdown variant="link" size="md" text="Opciones" class="admin-section py-0 ">
			<b-dropdown-header class="gradient-primary">
				<span>Opciones</span>
			</b-dropdown-header>
			<template v-for="(menu,index) in userMenu">
				<b-dropdown-item :to="menu.path" v-if="index !== 3" :key="index">
					<i class="mx-10" :class="[menu.icon, menu.color]"></i>
					{{$t(menu.text)}}
				</b-dropdown-item>
				<b-dropdown-item @click="logoutUser" v-else :key="index">
					<i class="mx-10" :class="[menu.icon, menu.color]"></i>
					{{$t(menu.text)}}
				</b-dropdown-item>
			</template>
		</b-dropdown>
	</div>
</template>
<script>
    import { getFlag } from "Helpers/helpers";
    
	export default {
        props:["language"],
		data() {
			return {
				userMenu: [
					{
						icon: "ti-user",
						text: "message.myProfile",
						color: "text-warning",
						path: '/users/user-profile/91b18762-1f44-42ac-8c27-7abb1561c984',
					},
					{
						icon: "ti-power-off",
						text: "message.logOut",
						color: "text-danger",
						path: '/session/login'
					}
				]
			}
		},
		methods: {
            getFlag(){
                return getFlag("ESPANOL");
            },
			logoutUser() {
				this.$store.dispatch("logoutUserFromFirebase");
			}
		}
	}
</script>