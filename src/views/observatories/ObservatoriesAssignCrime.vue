<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-hands-helping"></i> {{$t('message.assignCrime')}}</h2>
                </b-card-title><hr>
                <b-form @submit="processAssign">

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-country" :label="$t('message.country')+':'" label-for="country">
                                <select :disabled="assign.disabled" class="form-control" id="country" v-model="assign.country_id" required>
                                    <option v-for="(country, index) in countries" :key="index" :value="country.id">{{country.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-unit" :label="$t('message.unit')+':'" label-for="unit">
                                <select :disabled="assign.disabled" class="form-control" id="unit" v-model="assign.unit_id" required>
                                    <option v-for="(unit, index) in units" :key="index" :value="unit.id">{{unit.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <b-form-group id="input-group-crime" :label="$t('message.crime')+':'" label-for="crime">
                                <select :disabled="assign.disabled" class="form-control" id="crime" v-model="assign.crime_id" required>
                                    <option v-for="(crime, index) in crimes" :key="index" :value="crime.id">{{crime.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <hr>
                    <div class="text-right">
                        <b-button class="m-1" type="submit" variant="primary"><i class="fas fa-save"></i> {{$t('message.save')}}</b-button>
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
        name: 'assign-manage',
        data () {
            return {
                edit:"",
                crime:"",
                country:"",
                assign: {},
                data:{},
            }
        },
        watch:{
            repot(val){
                if(val){
                }
            },
        },
        async mounted () {
            //paises
            await this.getCountries();
            //Unidades
            await this.getUnits();
            //crimenes
            await this.getCrimes();
        },
        methods: {
            ...mapActions({
                getReport: 'report/getReport',
                getCrimes: 'crime/getCrimes',
                getUnits: 'unit/getUnits',
                getCountries: 'country/getCountries',
            }),
            processAssign () {
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

