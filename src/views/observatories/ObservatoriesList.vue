<template>
	<div class="report-list-wrapper">
		<page-title-bar></page-title-bar>
        <div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
				<div class="custom-search-wrap px-4 py-30 idb-block">
					<div class="row align-items-stretch">
						<div class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
							<h2>{{$t('message.search')}}</h2>
						</div>
						<div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
                            <!-- <b-form-group id="input-group-view">
                                <b-form-checkbox-group v-model="type" id="type">
                                    <b-form-checkbox value=true>Tabla</b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group> -->
							<div class="d-sm-flex align-items-center">
								<div class="input-wrap">
									<b-form-input type="text" required >
									</b-form-input>
								</div>
								<div class="action-btn-wrap ml-3">
									<b-button @click="alertSweet()" variant="primary" class="mr-3 text-capitalize">{{$t('message.search')}}</b-button>

									<b-button @click="redirect(false)" variant="success" class="d-inline-flex align-items-center text-capitalize">
                                        {{$t('message.addNew')}}<i class="material-icons btn-icon ml-1">add</i> 
                                    </b-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <app-card customClasses="grid-b-space" :heading="''">
            <div class="table-responsive">
                <div class="unseen">
                    <table id="tableReport" class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary text-center">
                                <th>{{$t('message.country')}}</th>
                                <th>{{$t('message.crime')}}</th>
                                <th>{{$t('message.year')}}</th>
                                <th>{{$t('message.month')}}</th>
                                <th>{{$t('message.quantity')}}</th>
                                <th>{{$t('message.actions')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="report in reports" :key="report.id">
                                <td class="text-center">{{report.country.name}}</td>
                                <td class="text-center">{{report.crime.name}}</td>
                                <td class="text-center">{{report.year}}</td>
                                <td class="text-center">{{report.month}}</td>
                                <td class="text-center">{{report.value}}</td>
                                <td class="text-center">
                                    <b-button @click="redirect(false, report.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </b-button> 
                                    <b-button @click="redirect(true, report.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-pen"></i>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div><!-- table responsive closed -->
        </app-card>
	</div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';

    export default {
        name: 'report-list',
        components:{
        },
        data () {
            return {
                
            }
        },
        created(){
            this.buildDataTable();
        },
        async mounted () {
            await this.getReports();
            this.buildDataTable();
        },
        methods: {
            ...mapActions({
                getReports: 'report/getReports',
            }),
            buildDataTable(){
                var language = this.language.locale == "sp" ? "Spanish.json" : "English.json" ;
                $('#tableReport').DataTable({
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/"+language
                    },
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                });
            },
            alertSweet(){
                this.$swal('Hello Vue world!!!');
            },
            search(pagination){
                this.getReports(pagination);
            },
            redirect(page, id){
                if(!page){
                    if(id){
                        this.$router.push('/observatories/detail/'+id)
                    }else{
                        this.$router.push('/observatories/create')
                    }
                }else{
                    this.$router.push('/observatories/update/'+id)
                }
            }
        },
        computed:{
            ...mapState({
                reports: state => state.report.reports,
                language: state => state.settings.selectedLocale,
            }),
        },
    }
</script>