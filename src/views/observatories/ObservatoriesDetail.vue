<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-eye"></i> {{$t('message.detail')}}</h2>
                </b-card-title><hr>
                <line-chart :label=label :dataSet=data :labels=labels></line-chart>
            </b-card>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import LineChart from "Components/Charts/LineChart";

    export default {
        name: 'observatory-detail',
        components:{
            LineChart
        },
        data () {
            return {
                observatory: {},
                label:"Observatorio",
                data:[],
                labels:[],
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