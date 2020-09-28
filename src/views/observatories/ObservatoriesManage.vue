<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-eye"></i> {{$t('message.'+titleText)}}</h2>
                </b-card-title><hr>
                <b-form @submit="processObservatory" @reset="onBack">

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-country" :label="$t('message.country')+':'" label-for="country">
                                <select class="form-control" id="country" v-model="observatory.country_id" required>
                                    <option v-for="(country, index) in countries" :key="index" :value="country.id">{{country.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-unit" :label="$t('message.unit')+':'" label-for="unit">
                                <select class="form-control" id="unit" v-model="observatory.unit_id" required>
                                    <option v-for="(unit, index) in units" :key="index" :value="unit.id">{{unit.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-crime" :label="$t('message.crime')+':'" label-for="crime">
                                <select class="form-control" id="crime" v-model="observatory.crime_id" required>
                                    <option v-for="(crime, index) in crimes" :key="index" :value="crime.id">{{crime.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-year" :label="$t('message.year')+':'" label-for="year">
                                <select class="form-control" id="year" v-model="observatory.year_id" required>
                                    <option v-for="(year, index) in years" :key="index" :value="year.id">{{year.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <h3>Meses</h3><hr>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6" v-for="(montn, index) in months" :key="index">
                            <b-form-group id="input-group-identification" :label="$t('message.'+montn.name)+':'" label-for="montn">
                                <b-form-input
                                type="number"
                                id="montn"
                                v-model="data.montn"
                                required
                                placeholder=""
                                ></b-form-input>
                            </b-form-group>
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
        name: 'observatory-manage',
        data () {
            return {
                observatory: {},
                edit:"",
                titleText:"observatory",
                data:{},
                years:[
                    {
                        id:"2020",
                        name:"2020",
                    }
                ],
                months:[
                    {
                        id:1,
                        name:"january",
                    },
                    {
                        id:2,
                        name:"february",
                    },
                    {
                        id:3,
                        name:"march",
                    },
                    {
                        id:4,
                        name:"april",
                    },
                    {
                        id:5,
                        name:"may",
                    },
                    {
                        id:6,
                        name:"june",
                    },
                    {
                        id:7,
                        name:"july",
                    },
                    {
                        id:8,
                        name:"august",
                    },
                    {
                        id:9,
                        name:"september",
                    },
                    {
                        id:10,
                        name:"october",
                    },
                    {
                        id:11,
                        name:"november",
                    },
                    {
                        id:12,
                        name:"december",
                    },
                ]
            }
        },
        watch:{
            us(val){
                if(val){
                    this.observatory = val;
                }
            },
        },
        async mounted () {
            //Unidades
            await this.getUnits();
            //paises
            await this.getCountries();
            //crimenes
            await this.getCrimes();

            this.edit = this.$route.params.id == undefined ? 0 : this.$route.params.id;
            if(this.edit!=""){
                if(this.edit == 1){
                    this.titleText="newObservatory"
                }
                else{
                    this.titleText="editObservatory"
                    // this.getObservatory(this.edit);
                }
            }else{
                this.titleText="newObservatory"
            }
        },
        methods: {
            ...mapActions({
                create: 'observatory/create',
                update: 'observatory/update',
                getCrimes: 'crime/getCrimes',
                getUnits: 'unit/getUnits',
                getCountries: 'country/getCountries',
            }),
            onBack(){
                this.$router.push('/observatories/consult');
            },
            processObservatory () {
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
                crimes: state => state.crime.crimes, 
                units: state => state.unit.units,
                countries: state => state.country.countries,
            }),
        },
    }
</script>

