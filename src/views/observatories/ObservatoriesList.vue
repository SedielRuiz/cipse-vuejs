<template>
	<div class="report-list-wrapper">
		<!-- <page-title-bar></page-title-bar> -->
        <div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
				<div class="custom-search-wrap px-4 py-15 idb-block">
					<div class="row align-self-center">
						<div class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-3">
							<h2>{{$t('message.observatory')}}</h2>
						</div>
						<div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9">
                            <div class="row text-right align-items-center">
                                <div class="col-xs-12 col-sm-12 col-md-8">
								    <b-form-input class="form-control" type="text" required > </b-form-input>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4">
                                    <b-button @click="alertSweet()" variant="primary" class="mr-3 text-capitalize">
                                        {{$t('message.search')}} <i class="fas fa-search m-1"></i>
                                    </b-button>

                                    <b-button @click="redirect(false)" variant="success" class="text-capitalize">
                                        {{$t('message.addNew')}} <i class="fas fa-plus m-1"></i>
                                    </b-button>
                                </div>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <app-card customClasses="grid-b-space" :heading="''">
            <b-form-group id="input-group-view" :label="'Vista'" label-for="view">
                <select class="form-control" id="view" v-model="stadistics" >
                    <option :value="true">Tabla</option>
                    <option :value="false">Grafica</option>
                </select>
            </b-form-group>
            <div v-if="stadistics" class="table-responsive">
                <div class="unseen">
                    <table id="tableReport" class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary text-center">
                                <th>{{$t('message.country')}}</th>
                                <th>{{$t('message.crime')}}</th>
                                <th>{{$t('message.unit')}}</th>
                                <th>{{$t('message.actions')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="report in reports" :key="report.id">
                                <td class="text-center">{{report.country.name}}</td>
                                <td class="text-center">{{report.crime.name}}</td>
                                <td class="text-center">{{report.unit.name}}</td>
                                <td class="text-center">
                                    <b-button @click="redirect(false, report.year, report.crime_id, report.country_id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </b-button> 
                                    <b-button @click="redirect(true, report.year, report.crime_id, report.country_id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-pen"></i>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div><!-- table responsive closed -->
            <div v-else>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <stadisticts v-if="data.length > 0 && labels.length > 0" 
                                :data=dataLocal :labels=labelsLocal :label=label :type="'double'">
                        </stadisticts>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <stadisticts v-if="data.length > 0 && labels.length > 0" 
                                :data=data :labels=labels :label=label :type="'double'">
                        </stadisticts>
                    </div>
                </div>

            </div>
        </app-card>
	</div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import { dataTable, getMonth } from "Helpers/helpers";
    import Stadisticts from "Components/Observatories/Stadistics";

    export default {
        name: 'report-list',
        components:{
            Stadisticts
        },
        data () {
            return {
                data:[],
                labels:[],
                label:"",
                dataLocal:[],
                labelsLocal:[],
                stadistics:true
            }
        },
        watch:{
            countries(val){
                if(val){
                    this.data = [];
                    this.label ="Grafica internacional";
                    for (let s = 0; s < val.length; s++) {
                        this.labels.push(val[s].name);
                        this.labelsLocal.push(val[s].name);
                    }
                    for (let r = 0; r < val[0].crimes.length; r++) {
                        var dataCrime = [];
                        for (let s = 0; s < val.length; s++) {
                            var total = val[s].data.filter(crime => crime.name == val[0].crimes[r].name);
                            dataCrime.push( total.length > 0 ? total[0].total : 0 );
                        }
                        var crime = {
                            type: 'bar',
                            backgroundColor: this.generateColor(),
                            borderColor: "#fff",
                            data: dataCrime,
                            label: val[0].crimes[r].name,
                        }
                        this.data.push(crime);
                        this.dataLocal.push(crime);
                    }
                }
            },
            stadistics(val){
                if(val){
                    this.buildDataTable();
                }
            }
        },
        created(){
            this.buildDataTable();
        },
        async mounted () {
            await this.getReports();
            await this.getCountries();

            this.buildDataTable();
        },
        methods: {
            ...mapActions({
                getCountries: 'report/getCountries',
                getReports: 'report/getReports',
            }),
            generateColor(){
                var simbolos, color;
                simbolos = "0123456789ABCDEF";
                color = "#";

                for(var i = 0; i < 6; i++){
                    color = color + simbolos[Math.floor(Math.random() * 16)];
                }

                return color;
            },
            getMonth(month){
                return getMonth(month);
            },
            buildDataTable(){
                var language = this.language.locale == "sp" ? "Spanish.json" : "English.json";
                dataTable('tableReport', language);
            },
            alertSweet(){
                this.$swal('Hello Vue world!!!');
            },
            search(pagination){
                this.getReports(pagination);
            },
            redirect(page, id, crime, country){
                if(!page){
                    if(id){
                        this.$router.push('/observatories/detail/'+id+'/'+crime+'/'+country)
                    }else{
                        this.$router.push('/observatories/create')
                    }
                }else{
                    this.$router.push('/observatories/update/'+id+'/'+crime+'/'+country)
                }
            }
        },
        computed:{
            ...mapState({
                reports: state => state.report.reports,
                countries: state => state.report.countries,
                language: state => state.settings.selectedLocale,
            }),
        },
    }
</script>