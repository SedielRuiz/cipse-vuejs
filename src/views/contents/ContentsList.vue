<template>
	<div class="user-list-wrapper">
		<page-title-bar></page-title-bar>
        <div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
				<div class="custom-search-wrap px-4 py-30 idb-block">
					<div class="row align-items-stretch">
						<div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
							<h2>{{$t('message.search')}} {{type}}</h2>
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
                    <table class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary text-center">
                                <th>{{$t('message.unit')}}</th>
                                <th>{{$t('message.user')}}</th>
                                <th>{{$t('message.category')}}</th>
                                <th>{{$t('message.languages')}}</th>
                                <th>{{$t('message.durationDate')}}</th>
                                <th>{{$t('message.actions')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="content in contents" :key="content.id">
                                <td class="text-center">{{content.unit.name}}</td>
                                <td class="text-center">{{content.user.name}}</td>
                                <td class="text-center">{{content.category ? content.category.name : ""}}</td>
                                <td class="text-center">
                                    <span class="badge badge-success" v-for="language in content.contents" :key="language.id">
                                        {{language.language.name}}
                                    </span>
                                </td>
                                <td class="text-center">{{content.duration_date | formatDate}}</td>
                                <th class="text-center">
                                    <b-button @click="redirect(false, content.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
                                        <i class="fas fa-ellipsis-h"></i>
                                    </b-button>
                                    <b-button @click="redirect(true, content.id)" variant="success" class="d-inline-flex align-items-center text-capitalize m-1">
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
                type: "",
                contents:[]
            }
        },
        mounted () {
            this.type = this.$route.params.type;
            this.getContents(this.type);
        },
        watch:{
            cahngeType(val){
                this.search();
            },
            contents(val){
                console.log("nuevi comnetnido");
                console.log(val);
            }
        },
        methods: {
            ...mapActions({
                getContents: 'content/getContents',
            }),
            alertSweet(){
                this.$swal('Hello Vue world!!!');
            },
            search(){
                this.getContents(this.type);

                switch (this.type) {
                    case "NOTICIA":
                        this.contents = this.notices;
                        break;
                    case "DOCTRINAl":
                        this.contents = this.doctrinal;      
                        break;
                    case "MEMORIAS":
                        this.contents = this.memories;     
                        break;
                    case "NOSOTROS":
                        this.contents = this.us;
                        break;
                }
            },
            redirect(page, id){
                if(!page){
                    this.$router.push('/contents/create')
                }else{
                    this.$router.push('/contents/update/'+id)
                }
            }
        },
        computed:{
            cahngeType(){
                this.type = this.$route.params.type;
                return this.type;
            },
            ...mapState({
                notices: state => state.content.notices,
                doctrinal: state => state.content.doctrinal,
                memories: state => state.content.memories,
                us: state => state.content.us,
            }),
        },
    }
</script>