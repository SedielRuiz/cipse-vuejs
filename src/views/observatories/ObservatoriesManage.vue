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
                                <select :disabled="observatory.disabled" class="form-control" id="country" v-model="observatory.country_id" required>
                                    <option v-for="(country, index) in countries" :key="index" :value="country.id">{{country.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-year" :label="$t('message.year')+':'" label-for="year">
                                <select :disabled="observatory.disabled" class="form-control" id="year" v-model="observatory.year" required>
                                    <option v-for="(year, index) in years" :key="index" :value="year.id">{{year.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-crime" :label="$t('message.crime')+':'" label-for="crime">
                                <select :disabled="observatory.disabled" class="form-control" id="crime" v-model="observatory.crime_id" required>
                                    <option v-for="(crime, index) in crimes" :key="index" :value="crime.id">{{crime.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-unit" :label="$t('message.unit')+':'" label-for="unit">
                                <select :disabled="observatory.disabled" class="form-control" id="unit" v-model="observatory.unit_id" required>
                                    <option v-for="(unit, index) in units" :key="index" :value="unit.id">{{unit.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <h3>Meses</h3><hr>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6" v-for="(month, index) in months" :key="index">
                            <b-form-group id="input-group-identification" :label="$t('message.'+month.name)+':'" label-for="month">
                                <b-form-input
                                type="number"
                                :id="'month'+month.id"
                                v-model="month.value"
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
    import { months } from "Helpers/helpers";

    export default {
        name: 'observatory-manage',
        data () {
            return {
                edit:"",
                crime:"",
                country:"",
                observatory: {},
                titleText:"observatory",
                data:{},
                years:[
                    {
                        id:"2020",
                        name:"2020",
                    }
                ],
                months:months
            }
        },
        watch:{
            repot(val){
                if(val){
                    for (let s = 0; s < this.months.length; s++) {
                        var observatory = val.filter(observatory => observatory.month == this.months[s].id);
                        this.months[s].value = observatory.length > 0 ? observatory[0].value : 0;
                    }
                    this.months.push();
                    this.observatory.country_id = this.country;
                    this.observatory.crime_id = this.crime;
                    this.observatory.year = this.year;
                    this.observatory.disabled = true;
                }
            },
        },
        async mounted () {
            for (let s = 0; s < this.months.length; s++) {
                this.months[s].value = 0;
            }
            //paises
            await this.getCountries();
            //Unidades
            await this.getUnits();
            //crimenes
            await this.getCrimes();

            this.country = this.$route.params.country == undefined ? 0 : this.$route.params.country;
            this.year = this.$route.params.year == undefined ? 0 : this.$route.params.year;
            this.crime = this.$route.params.crime == undefined ? 0 : this.$route.params.crime;
            if(this.year!=""){
                if(this.year == 1){
                    this.titleText="newObservatory"
                }
                else{
                    this.titleText="editObservatory"
                    var params = {
                        "country": this.country, 
                        "year": this.year, 
                        "crime": this.crime,
                    }
                    await this.getReport(params);
                }
            }else{
                this.titleText="newObservatory"
            }
        },
        methods: {
            ...mapActions({
                create: 'observatory/create',
                update: 'observatory/update',
                getReport: 'report/getReport',
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
                repot: state => state.report.report, 
                crimes: state => state.crime.crimes, 
                units: state => state.unit.units,
                countries: state => state.country.countries,
            }),
        },
    }
</script>

