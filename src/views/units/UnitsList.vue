<template>
	<div class="user-list-wrapper">
		<!-- <page-title-bar></page-title-bar> -->
        <div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
				<div class="custom-search-wrap px-4 py-15 idb-block">
					<div class="row align-self-center">
						<div class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-3">
							<h2>{{$t('message.units')}}</h2>
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
            <div class="table-responsive">
                <div class="unseen">
                    <table id="tableUnits" class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary text-center">
                                <th>{{$t('message.name')}}</th>
                                <th>{{$t('message.description')}}</th>
                                <th>{{$t('message.actions')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="unit in units" :key="unit.id">
                                <td class="text-center">{{unit.name}}</td>
                                <td class="text-center">{{textTruncate(unit.description)}}</td>
                                <th class="text-center">
                                    <b-button @click="redirect(true, unit.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-pen"></i>
                                    </b-button>
                                </th>
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
    import { textTruncate, dataTable } from "Helpers/helpers";
    import pagination from '@/components/Pagination/Paginate';

    export default {
        name: 'unit-list',
        components:{
            pagination,
        },
        data () {
            return {
                headers: [],
            }
        },
        created(){
            this.buildDataTable();
        },
        async mounted () {
            await this.getUnits();
            this.buildDataTable();
        },
        methods: {
            ...mapActions({
                getUnits: 'unit/getUnits',
            }),
            buildDataTable(){
                var language = this.language.locale == "sp" ? "Spanish.json" : "English.json" ;
                dataTable('tableUnits', language);
            },
            alertSweet(){
                this.$swal('Hello Vue world!!!');
            },
            textTruncate(text) {
                if(text){
                    return textTruncate(text, 80);
                }else{
                    return "";
                }
			},
            search(pagination){
                this.getUnits(pagination);
            },
            redirect(page, id){
                if(!page){
                    this.$router.push('/units/create')
                }else{
                    this.$router.push('/units/update/'+id)
                }
            }
        },
        computed:{
            ...mapState({
                units: state => state.unit.units,
                language: state => state.settings.selectedLocale,
            }),
        },
    }
</script>