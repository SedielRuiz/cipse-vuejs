<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2>
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-1 align-self-center text-left">
                                <b-button @click="onBack()" class="m-1" type="reset" variant="success"><i class="fas fa-chevron-left"></i></b-button>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-11 align-self-center">
                                {{country}} ({{crime}}) - {{year}}
                            </div>
                        </div>
                    </h2>
                </b-card-title><hr>
                <div>
                    <bar-chart v-if="data.length > 0 && labels.length > 0" class="overflow-hide h-100" 
                                :width="100" :height="60" :label=label :dataSet=data :labels=labels :type="'single'">
                    </bar-chart>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import BarChart from "Components/Charts/BarChart";
    import { months, getMonth } from "Helpers/helpers";

    export default {
        name: 'observatory-detail',
        components:{
            BarChart
        },
        data () {
            return {
                year:"",
                crime:"",
                country:"",

                months:months,
                observatory: {},
                label:"Observatorio",
                data:[],
                labels:[],
            }
        },
        watch:{
            report(val){
                if(val){
                    console.log(val);
                    for (let s = 0; s < val.length; s++) {
                        this.labels.push(getMonth(val[s].month));
                        this.data.push(val[s].value);
                    }
                }
                this.crime = val[0].crime.name;
                this.label = this.crime;
                this.country = val[0].country.name;
                this.labels.push();
                this.data.push();
            },
        },
        mounted () {
            this.country = this.$route.params.country == undefined ? 0 : this.$route.params.country;
            this.year = this.$route.params.year == undefined ? 0 : this.$route.params.year;
            this.crime = this.$route.params.crime == undefined ? 0 : this.$route.params.crime;

            var params = {
                "country": this.country, 
                "year": this.year, 
                "crime": this.crime,
            }
            this.getReport(params);
        },
        methods: {
            ...mapActions({
                getReport: 'report/getReport',
            }),
            onBack(){
                this.$router.push('/observatories/consult');
            },
        },
        computed:{
            ...mapState({
                report: state => state.report.report,
            }),
        },
    }
</script>