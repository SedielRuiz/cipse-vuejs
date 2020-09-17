<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" header="Nuevo usuario">
                <b-form @submit="processUser" @reset="onBack">
                    <b-form-group
                        id="input-group-1"
                        label="Email address:"
                        label-for="input-1"
                        description="We'll never share your email with anyone else."
                    >
                        <b-form-input
                        id="input-1"
                        v-model="user.email"
                        type="email"
                        required
                        placeholder="Enter email"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="user.name"
                        required
                        placeholder="Enter name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Rol:" label-for="input-3">
                        <b-form-select
                        id="input-3"
                        v-model="user.role"
                        :options="roles"
                        required
                        ></b-form-select>
                    </b-form-group>
                    
                    <b-button type="submit" variant="primary">Guardar</b-button>
                    <b-button type="reset" variant="danger">Cancelar</b-button>
                </b-form>
            </b-card>
        </div>
    </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex';
  
  export default {
    
    name: 'user-manage',
    data () {
      return {
        user: {},
        edit:"",
        titleText:"",
      }
    },
    watch:{
        us(val){
            if(val){
                this.user = val;
            }
        },
    },
    mounted () {
        this.edit = this.$route.params.id == undefined ? 0 : this.$route.params.id;
        if(this.edit!=""){
            if(this.edit == 1){
                this.getUser(this.usr._id);
                this.titleText="Perfil"
            }
            else{
                this.titleText="Editar usuario"
                this.getUser(this.edit);
            }
        }else{
            this.titleText="Nuevo usuario"
        }
        this.getRoles().then(data=>{
        },error=>{});
    },
    methods: {
        ...mapActions({
            create: 'user/create',
            update: 'user/update',
            getRoles: 'role/getRoles',
            getUser: 'user/getUser',
        }),
        onBack(){
            this.$router.push('/users/consult');
        },
        processUser () {
            if(this.edit){
                this.update(this.user).then(
                    data => {
                        this.setWarning(data, { root: true }).then(()=>{
                        if(this.edit == 1){
                            this.$router.push('/');
                        }else{
                            this.$router.push('/users/update/'+this.edit);
                        }
                        });
                    },
                    error => {
                });
            }else{
                this.create(this.user).then(
                    data => {
                        this.setWarning(data, { root: true }).then(()=>{
                            this.$router.push('/users/consult')
                        })
                    },
                    error => {
                })
            }
        },
    },
    computed:{
        ...mapState({
            roles: state => state.role.roles,
            us: state => state.user.user, 
        }),
    },
  }
</script>

