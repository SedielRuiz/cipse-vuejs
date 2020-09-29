<template>
	<div class="user-list-wrapper">
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
        <app-card v-if="type" customClasses="grid-b-space" :heading="''">
            <div class="table-responsive">
                <div class="unseen">
                    <table id="tableUser" class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary text-center">
                                <th>{{$t('message.unit')}}</th>
                                <th>{{$t('message.country')}}</th>
                                <th>{{$t('message.role')}}</th>
                                <th>{{$t('message.document')}}</th>
                                <th>{{$t('message.name')}}</th>
                                <th>{{$t('message.email')}}</th>
                                <th>{{$t('message.actions')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td class="text-center">{{user.unit.name}}</td>
                                <td class="text-center">{{user.country.name}}</td>
                                <td class="text-center">{{user.role.name}}</td>
                                <td class="text-right">{{user.identification | formatNumber}}</td>
                                <td class="text-center">{{user.name}}</td>
                                <td class="text-center">{{user.email}}</td>
                                <td class="text-center">
                                    <b-button @click="redirect(false, user.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </b-button> 
                                    <b-button @click="redirect(true, user.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-pen"></i>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div><!-- table responsive closed -->
        </app-card>
        <div v-else>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3 p-2" v-for="(user, index) in users" :key="index">
                    <user-list-card :user=user @redirect="redirect"></user-list-card>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import pagination from '@/components/Pagination/Paginate';
    import UserListCard from '@/components/Users/UserListCard';


    export default {
        name: 'user-list',
        components:{
            pagination,
            UserListCard
        },
        data () {
            return {
                type: true,
            }
        },
        created(){
            this.buildDataTable();
        },
        async mounted () {
            await this.getUsers();
            this.buildDataTable();
        },
        methods: {
            ...mapActions({
                getUsers: 'user/getUsers',
            }),
            buildDataTable(){
                var language = this.language.locale == "sp" ? "Spanish.json" : "English.json" ;
                $('#tableUser').DataTable({
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
                this.getUsers(pagination);
            },
            redirect(page, id){
                if(!page){
                    if(id){
                        this.$router.push('/users/user-profile/'+id)
                    }else{
                        this.$router.push('/users/create')
                    }
                }else{
                    this.$router.push('/users/update/'+id)
                }
            }
        },
        computed:{
            ...mapState({
                users: state => state.user.users,
                language: state => state.settings.selectedLocale,
            }),
        },
    }
</script>