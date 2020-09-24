<template>
	<div class="clients-list-wrap ">
        <div class="row">
            <div class="mb-30 col-12 col-sm-6 col-md-4 col-lg-3">
                <app-card customClasses="mb-0 client-item">
                    <div class="text-center position-relative">
                        <div class="thumb-wrap mb-3 ">
                            <img :src="'/static/img/user-3.jpg'" class="rounded-lg" />
                        </div>
                        <div class="client-content">
                            <h4 class="mb-2 text-primary">{{ user.name }}</h4>
                            
                            <div class="address-block px-20 text-left">
                                <span class="font-sm d-block mb-10"><i class="fas fa-universal-access"></i> {{user.unit.name}}</span>
                                <span class="font-sm d-block mb-10"><i class="fas fa-map-marker-alt"></i> {{user.country.name}}</span>
                                <span class="font-sm d-block mb-10"><i class="far fa-id-card"></i> {{user.type.initials +"."+ user.identification}}</span>
                                <span class="font-sm d-block mb-10"><i class="fas fa-envelope"></i> {{user.email}}</span>
                                <span class="font-sm d-block mb-10"><i class="fas fa-phone-alt"></i> {{user.cellphone}}</span>  
                            </div>

                        </div>
                        <div class="action-btn-wrap">
                            <b-button @click="$emit('redirect', true, user.id)" class="border-0">
                                <i class="fas fa-pen"></i>
                            </b-button>
                            <b-button @click="$emit('redirect', false, user.id)" class="border-0">
                                <i class="fas fa-ellipsis-h"></i>
                            </b-button>
                        </div>
                    </div>
                </app-card>
            </div>
        </div>
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
			onDeleteClients(item, tabName) {
			},
			deleteClientItem() {
			},
			onEditClients(item, tabName) {
				
			},
		}
	}
</script>