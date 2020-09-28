<template>
	<div class="clients-list-wrap ">
        <app-card customClasses="mb-0 client-item">
            <div class="text-center position-relative">
                <div class="thumb-wrap mb-3 ">
                    <img :src="'/static/img/user-3.jpg'" class="rounded-lg" />
                </div>
                <div class="client-content">
                    <h4 class="mb-2 text-primary">
                        {{ user.name }} 
                        <img class="flag-img" :src="'/static/flag-icons/'+getFlag()+'.png'">
                        <br>
                        ({{ user.role.name }})
                    </h4>
                    <div class="address-block px-20 text-left">
                        <span class="font-sm d-block mb-10"><i class="fas fa-universal-access"></i> {{user.unit.name}}</span>
                        <span class="font-sm d-block mb-10">
                            <i class="fas fa-map-marker-alt"></i> {{user.country.name}} ({{user.language.name}})
                        </span>
                        <span class="font-sm d-block mb-10"><i class="far fa-id-card"></i> {{user.type.initials +"."+ user.identification}}</span>
                        <span class="font-sm d-block mb-10"><i class="fas fa-envelope"></i> {{user.email}}</span>
                        <span class="font-sm d-block mb-10"><i class="fas fa-phone-alt"></i> {{user.cellphone}}</span>  
                    </div>

                </div>
                <div class="action-btn-wrap">
                    <b-button @click="$emit('redirect', false, user.id)" class="border-0">
                        <i class="fas fa-ellipsis-h"></i>
                    </b-button>
                    <b-button @click="$emit('redirect', true, user.id)" class="border-0">
                        <i class="fas fa-pen"></i>
                    </b-button>
                </div>
            </div>
        </app-card>
	</div>
</template>

<script>
    import {mapState} from 'vuex';

	export default {
        props:["user"],
		data() {
			return {
			}
		},
		methods: {
            getFlag(){
                var flag = "";
                if(this.user.language.key == "ESPANOL"){
                    flag = "en";
                }else{
                    flag = "es";
                }

                return flag;
            },
			onDeleteClients(item, tabName) {
			},
			deleteClientItem() {
			},
			onEditClients(item, tabName) {
				
			},
		}
	}
</script>