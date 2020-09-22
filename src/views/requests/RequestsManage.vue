<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-user-tie"></i> {{ titleText }}</h2>
                </b-card-title><hr>
                <b-form @submit="processUser" @reset="onBack">

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-country" label="País:" label-for="country">
                                <b-form-select
                                id="country"
                                v-model="user.country_id"
                                :options="countries"
                                required
                                ></b-form-select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-language" label="Idioma:" label-for="language">
                                <b-form-select
                                id="language"
                                v-model="user.language_id"
                                :options="languages"
                                required
                                ></b-form-select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-unit" label="Unidad:" label-for="unit">
                                <b-form-select
                                id="unit"
                                v-model="user.unit_id"
                                :options="units"
                                required
                                ></b-form-select>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-name" label="Nombres y Apellidos:" label-for="name">
                                <b-form-input
                                id="name"
                                v-model="user.name"
                                required
                                placeholder=""
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-position" label="Grado:" label-for="position">
                                <b-form-select
                                id="position"
                                v-model="user.position_id"
                                :options="positions"
                                required
                                ></b-form-select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-rank" label="Cargo:" label-for="rank">
                                <b-form-select
                                id="rank"
                                v-model="user.rank_id"
                                :options="ranks"
                                required
                                ></b-form-select>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-typeContacts" label="Tipo de contacto:" label-for="typeContacts">
                                <b-form-select
                                id="typeContacts"
                                v-model="user.type_contact_id"
                                :options="typeContacts"
                                required
                                ></b-form-select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-identification" label="Identificación:" label-for="identification">
                                <b-form-input
                                type="number"
                                id="identification"
                                v-model="user.identification"
                                required
                                placeholder=""
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-cellphone" label="Teléfono:" label-for="cellphone">
                                <b-form-input
                                type="number"
                                id="cellphone"
                                v-model="user.cellphone"
                                required
                                placeholder=""
                                ></b-form-input>
                            </b-form-group>
                        </div>
                    </div>
                    

                    <b-form-group id="input-group-email" label="Correo electrónico:" label-for="email">
                        <b-form-input
                        id="email"
                        v-model="user.email"
                        type="email"
                        required
                        placeholder=""
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-role" label="Rol:" label-for="role">
                        <b-form-select
                        id="role"
                        v-model="user.role_id"
                        :options="roles"
                        required
                        ></b-form-select>
                    </b-form-group>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-3">
                            <b-form-checkbox
                                id="in_directory"
                                v-model="user.in_directory"
                                name="in_directory"
                                value="true"
                                unchecked-value="false"
                                class="nowrap">
                                ¿ Aparece en el directorio ?
                            </b-form-checkbox>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-checkbox
                                id="portal_terms_accepted"
                                v-model="user.portal_terms_accepted"
                                name="portal_terms_accepted"
                                value="true"
                                unchecked-value="false"
                                class="nowrap">
                                ¿Autoriza condiciones de uso del portal?
                            </b-form-checkbox>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-checkbox
                                id="app_terms_accepted"
                                v-model="user.app_terms_accepted"
                                name="app_terms_accepted"
                                value="true"
                                unchecked-value="false"
                                class="nowrap">
                                ¿Autoriza condiciones de uso del app móvil?
                            </b-form-checkbox>
                        </div>
                    </div>

                    <hr>
                    <div class="text-right">
                        <b-button class="m-1" type="submit" variant="primary"><i class="fas fa-save"></i> Guardar</b-button>
                        <b-button class="m-1" type="reset" variant="danger"><i class="fas fa-times-circle"></i> Cancelar</b-button>
                    </div>
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
                roles:[],
                countries:[],
                units:[],
                positions:[],
                ranks:[],
                languages:[],
                typeContacts:[]
            }
        },
        watch:{
            us(val){
                if(val){
                    this.user = val;
                }
            },
            rols(val){
                if(val){
                    for(var s = 0; s < val.length; s++){
                        this.roles.push({"text":val[s].name, "value":val[s].id});
                    }
                }
            },
        },
        mounted () {
            this.getRoles();
            this.edit = this.$route.params.id == undefined ? 0 : this.$route.params.id;
            if(this.edit!=""){
                if(this.edit == 1){
                    this.titleText="Nuevo Usuario"
                }
                else{
                    this.titleText="Editar usuario"
                    this.getUser(this.edit);
                }
            }else{
                this.titleText="Nuevo usuario"
            }
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
                rols: state => state.role.roles,
                us: state => state.user.user, 
            }),
        },
    }
</script>

