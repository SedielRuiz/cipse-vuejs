<template>
	<div class="user-list-wrapper">
		<!-- <page-title-bar></page-title-bar> -->
        <div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
				<div class="custom-search-wrap px-4 py-15 idb-block">
					<div class="row align-self-center">
						<div class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-3">
							<h2>{{$t('message.requests')}}</h2>
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
                    <table id="tableRequests" class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary text-center">
                                <th>{{$t('message.type')}}</th>
                                <th>{{$t('message.description')}}</th>
                                <th>{{$t('message.unitFrom')}}</th>
                                <th>{{$t('message.unitTo')}}</th>
                                <th>{{$t('message.class')}}</th>
                                <th>{{$t('message.actions')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in requests" :key="request.id">
                                <td class="text-center">{{request.type.name}}</td>
                                <td class="text-center">{{textTruncate(request.description)}}</td>
                                <td class="text-center">
                                    {{request.country_start.name}} - {{request.unit_start.name}}
                                    <span v-if="request.unit_start.key == 'ESPECIALES'">
                                        <img class="flag-img" :src="'/static/flag-icons/'+getFlag()+'.png'">
                                    </span>
                                </td>
                                <td class="text-center">
                                    {{request.country_end.name}} - {{request.unit_end.name}}
                                    <span v-if="request.unit_start.key != 'ESPECIALES'">
                                        <img class="flag-img" :src="'/static/flag-icons/'+getFlag()+'.png'">
                                    </span>
                                </td>
                                <td class="text-center">
                                    <span v-if="request.unit_start.key == unit">
                                        Saliente
                                    </span>
                                    <span v-else-if="request.unit_end.key == unit">
                                        Entrante
                                    </span>
                                </td>
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
    import { textTruncate, dataTable, getFlag } from "Helpers/helpers";
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
            getFlag(){
                return getFlag("ESPANOL");
            },
            buildDataTable(){
                var language = this.language.locale == "sp" ? "Spanish.json" : "English.json" ;
                dataTable('tableRequests', language);
            },
            alertSweet(){
                this.$swal('Hello Vue world!!!');
            },
            textTruncate(text) {
				return textTruncate(text, 60);
			},
            search(pagination){
                this.getRequests(pagination);
            },
            redirect(page, id){
                if(!page){
                    if(id){
                        this.$router.push('/requests/detail/'+id)
                    }else{
                        this.$router.push('/requests/create')
                    }
                }else{
                    this.$router.push('/requests/update/'+id)
                }
            }
        },
        computed:{
            ...mapState({
                requests: state => state.request.requests,
                language: state => state.settings.selectedLocale,
                unit: state => state.auth.unit,
            }),
        },
    }
</script>