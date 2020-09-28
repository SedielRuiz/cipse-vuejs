<template>
    <b-form-group id="input-group-roles" label-for="role">
        <select class="form-control top-grip" id="role" v-model="roleSelected">
            <option v-for="(opc, index) in roles" :key="index" :value="opc.key">{{opc.name}}</option>
        </select>
    </b-form-group>
</template>
<script>
    import { mapActions, mapState } from "vuex";

	export default {
		data: function () {
			return {
				form: {
					search: '',
                },
                roleSelected:""
			}
        },
        async mounted () {
            await this.getRoles();
            this.roleSelected = this.role;
        },
        watch:{
            roleSelected(val){
                this.changeRole(val);
                if(val == "ADMINISTRADOR_FUNCIONAL" || val == "ADMINISTRADOR_TECNICO"){
                    this.changeViewContent(true);
                }else{
                    this.changeViewContent(false);
                }
            }
        },
        methods: {
            ...mapActions({
                changeRole: 'auth/changeRole',
                changeViewContent: 'auth/changeViewContent',
                getRoles: 'role/getRoles',
            }),
        },
        computed: {
            ...mapState({
                roles: state => state.role.roles,
                role: state => state.auth.role
            }),
            
        }
	}
</script>