<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-user-tie"></i> {{$t('message.'+titleText)}}</h2>
                </b-card-title><hr>
                <b-form @submit="processUser" @reset="onBack">

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-country" :label="$t('message.country')+':'" label-for="country">
                                <select class="form-control" id="country" v-model="user.country_id" required>
                                    <option v-for="(country, index) in countries" :key="index" :value="country.id">{{country.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-language" :label="$t('message.language')+':'" label-for="language">
                                <select class="form-control" id="language" v-model="user.language_id" required>
                                    <option v-for="(language, index) in languages" :key="index" :value="language.id">{{language.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-unit" :label="$t('message.unit')+':'" label-for="unit">
                                <select class="form-control" id="unit" v-model="user.unit_id" required>
                                    <option v-for="(unit, index) in units" :key="index" :value="unit.id">{{unit.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-name" :label="$t('message.nameComplete')+':'" label-for="name">
                                <b-form-input
                                id="name"
                                v-model="user.name"
                                required
                                placeholder=""
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-rank" :label="$t('message.rank')+':'" label-for="rank">
                                <select class="form-control" id="rank" v-model="user.rank_id" required>
                                    <option v-for="(rank, index) in ranks" :key="index" :value="rank.id">{{rank.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-position" :label="$t('message.position')+':'" label-for="position">
                                <select class="form-control" id="position" v-model="user.position_id" required>
                                    <option value="">-{{$t('message.select')}}-</option>
                                    <option v-for="(position, index) in positions" :key="index" :value="position.id">{{position.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-typeContacts" :label="$t('message.typeContact')+':'" label-for="typeContact">
                                <select class="form-control" id="typeContact" v-model="user.type_contact_id" required>
                                    <option v-for="(typesContact, index) in typesContacts" :key="index" :value="typesContact.id">{{typesContact.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4">
                            <b-form-group id="input-group-identification" :label="$t('message.document')+':'" label-for="identification">
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
                            <b-form-group id="input-group-cellphone" :label="$t('message.cellphone')+':'" label-for="cellphone">
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
                    

                    <b-form-group id="input-group-email" :label="$t('message.email')+':'" label-for="email">
                        <b-form-input
                        id="email"
                        v-model="user.email"
                        type="email"
                        required
                        placeholder=""
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-role" :label="$t('message.role')+':'" label-for="role">
                        <select class="form-control" id="role" v-model="user.role_id" required>
                            <option v-for="(role, index) in roles" :key="index" :value="role.id">{{role.name}}</option>
                        </select>
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
                        <b-button class="m-1" type="submit" variant="primary"><i class="fas fa-save"></i> {{$t('message.save')}}</b-button>
                        <b-button class="m-1" type="reset" variant="danger"><i class="fas fa-times-circle"></i> {{$t('message.cancel')}}</b-button>
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
                titleText:"user",
            }
        },
        watch:{
            us(val){
                if(val){
                    this.user = val;
                }
            },
        },
        async mounted () {
            //Roles
            await this.getRoles();
            //terminos
            await this.getTerms("TIPOS_DE_DOCUMENTO");
            await this.getTerms("RANGOS");
            await this.getTerms("TIPOS_CONTACTO");
            await this.getTerms("POSITIONS");
            //Unidades
            await this.getUnits();
            //paises
            await this.getCountries();
            //idiomas
            await this.getLanguages();

            this.edit = this.$route.params.id == undefined ? 0 : this.$route.params.id;
            if(this.edit!=""){
                if(this.edit == 1){
                    this.titleText="newUser"
                }
                else{
                    this.titleText="editUser"
                    this.getUser(this.edit);
                }
            }else{
                this.titleText="newUser"
            }
        },
        methods: {
            ...mapActions({
                create: 'user/create',
                update: 'user/update',
                getRoles: 'role/getRoles',
                getUser: 'user/getUser',
                getTerms: 'term/getTerms',
                getUnits: 'unit/getUnits',
                getCountries: 'country/getCountries',
                getLanguages: 'language/getLanguages',
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
                                this.$router.push('/users/update/'+this.type+"/"+this.edit);
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
                positions: state => state.term.positions, 
                ranks: state => state.term.ranks, 
                typesContacts: state => state.term.typesContacts,
                units: state => state.unit.units,
                languages: state => state.language.languages,
                countries: state => state.country.countries,
            }),
        },
    }
</script>

