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
									<b-form-input type="text" required placeholder="Search Projects">
									</b-form-input>
								</div>
								<div class="action-btn-wrap ml-3">
									<b-button @click="alertSweet()" variant="primary" class="mr-3 text-capitalize">Buscar</b-button>
									<b-button @click="redirect(false)" variant="primary" class="d-inline-flex align-items-center text-capitalize">
                                        Nuevo<i class="material-icons btn-icon ml-1">add</i>
                                    </b-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <app-card customClasses="grid-b-space" :heading="'Usuarios'">
            <div class="table-responsive">
                <div class="unseen">
                    <table class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary">
                                <th>Documento</th>
                                <th>Name</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.identification}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <th>
                                    <b-button @click="redirect(true, user.id)" variant="primary" class="d-inline-flex align-items-center text-capitalize">
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
  import pagination from '@/components/Pagination/Paginate';

  export default {
    name: 'user-list',
    components:{
      pagination,
    },
    data () {
        return {
            headers: [],
        }
    },
    mounted () {
        this.getUsers();
    },
    methods: {
        ...mapActions({
            getUsers: 'user/getUsers',
        }),
        alertSweet(){
            this.$swal('Hello Vue world!!!');
        },
        search(pagination){
            this.getUsers(pagination);
        },
        redirect(page, id){
            if(!page){
                this.$router.push('/users/create')
            }else{
                this.$router.push('/users/update/'+id)
            }
        }
    },
    computed:{
        ...mapState({
            users: state => state.user.users,
        }),
    },
  }
</script>