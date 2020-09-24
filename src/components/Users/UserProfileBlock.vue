<template>
	<app-card customClasses="grid-b-space" :fullBlock="true" contentCustomClass="text-center pt-20 user-profile-block">
		<div class="avatar-wrap pos-relative d-inline-block mb-15">
			<img src="/static/img/logo_micrositios.png" class="img-fluid rounded-circle" alt="user thumb" width="100" height="100">
			<span class="badge badge-success badge-label-sm badge-thumb-top-right badge-pill">&nbsp;</span>
		</div>
		<div class="mb-20 user-info">
			<h4 class="mb-0">{{user.name}}</h4>
			<span class="text-muted font-xs"></span>
		</div>
		<b-list-group class="mb-20">
			<b-list-group-item v-for="profile in profile" :key="profile.title" class="d-flex align-items-center py-15 px-20 justify-content-between">
				<h5 class="m-0">{{profile.title}} :</h5>
				<h6 class="mb-0">{{profile.details}}</h6>
			</b-list-group-item>
		</b-list-group>
		<div class="address-block px-20 text-left">
            <span class="font-sm d-block mb-10"><i class="far fa-id-card"></i> {{user.identification}}</span>
			<span class="font-sm d-block mb-10"><i class="fas fa-envelope"></i> {{user.email}}</span>
			<span class="font-sm d-block mb-10"><i class="fas fa-phone-alt"></i> {{user.cellphone}}</span>
            <br>
		</div>
	</app-card>
</template>

<script>
	export default {
        props:["user"],
		data: function () {
			return {
				profile: [],
			};
        },
        watch:{
            user(val){
                if(val){
                    this.profile = [
                        {
                            title: "Tipo de contacto",
                            details: val.type_contact.name
                        },
                        {
                            title: "Unidad",
                            details: val.unit.name
                        },
                        {
                            title: "Rol",
                            details: val.role.name
                        },
                        {
                            title: "País",
                            details: val.country.name
                        },
                        {
                            title: "Idioma",
                            details: val.language.name
                        },
                    ];
                }
            },
        },
	};
</script>