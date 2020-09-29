<template>
	<div class="user-list-wrapper">
		<page-title-bar></page-title-bar>
        <div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
				<div class="custom-search-wrap px-4 py-30 idb-block">
					<div class="row align-items-stretch">
						<div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
							<h2>{{$t('message.search')}}</h2>
						</div>
						<div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
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
                    <table id="tableRequests" class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary text-center">
                                <th>{{$t('message.type')}}</th>
                                <th>{{$t('message.language')}}</th>
                                <th>{{$t('message.description')}}</th>
                                <th>{{$t('message.unitFrom')}}</th>
                                <th>{{$t('message.unitTo')}}</th>
                                <th>{{$t('message.actions')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in requests" :key="request.id">
                                <td class="text-center">{{request.type.name}}</td>
                                <td class="text-center">{{request.language.name}}</td>
                                <td class="text-center">{{textTruncate(request.description)}}</td>
                                <td class="text-center">{{request.unit_start.name}}</td>
                                <td class="text-center">{{request.unit_end.name}}</td>
                                <th class="text-center">
                                    <b-button @click="redirect(false, request.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </b-button>
                                    <b-button @click="redirect(true, request.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
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
        name: 'request-list',
        components:{
            pagination,
        },
        data () {
            return {
                headers: [],
            }
        },
        async mounted () {
            await this.getRequests();
            this.buildDataTable();
        },
        methods: {
            ...mapActions({
                getRequests: 'request/getRequests',
            }),
            buildDataTable(){
                var language = this.language.locale == "sp" ? "Spanish.json" : "English.json" ;
                dataTable('tableRequests', language);
            },
            alertSweet(){
                this.$swal('Hello Vue world!!!');
            },
            textTruncate(text) {
				return textTruncate(text, 80);
			},
            search(pagination){
                this.getRequests(pagination);
            },
            redirect(page, id){
                if(!page){
                    this.$router.push('/requests/detail/'+id)
                }else{
                    this.$router.push('/requests/update/'+id)
                }
            }
        },
        computed:{
            ...mapState({
                requests: state => state.request.requests,
                language: state => state.settings.selectedLocale,
            }),
        },
    }
</script>