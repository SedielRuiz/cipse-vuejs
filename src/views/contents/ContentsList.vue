<template>
	<div class="user-list-wrapper">
		<page-title-bar></page-title-bar>
        <div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
				<div class="custom-search-wrap px-4 py-30 idb-block">
					<div class="row align-items-stretch">
						<div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
							<h2>{{$t('message.search')}} {{type}}</h2>
						</div>
						<div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
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
                                <th v-for="(head, index) in heading" :key="index">
                                    {{$t('message.'+head)}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="content in contents" :key="content.id">
                                <td class="text-center">{{content.unit.name}}</td>
                                <td class="text-center">{{content.user.name}}</td>
                                <td class="text-center">
                                    <span class="badge badge-success" v-for="language in content.contents" :key="language.id">
                                        {{language.language.name}}
                                    </span>
                                </td>
                                
                                <td class="text-center" v-if="type == 'NOTICIA'">
                                    {{content.category ? content.category.name : ""}}
                                </td>
                                <td class="text-center" v-else-if="type == 'MEMORIAS'">
                                    {{content.topic}}
                                </td>


                                <td class="text-center" v-if="type == 'NOTICIA'">
                                    {{content.duration_date | formatDate}}
                                </td>

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
                heading:[],
                contents:[]
            }
        },
        mounted () {
            this.type = this.$route.params.type;
            this.search();
        },
        watch:{
            changeType(val){
                this.search();
            },
        },
        methods: {
            ...mapActions({
                getContents: 'content/getContents',
            }),
            alertSweet(){
                this.$swal('Hello Vue world!!!');
            },
            async search(){
                await this.getContents(this.type);
                this.heading = [
                    "unit",
                    "user",
                    "languages"
                ];
                switch (this.type) {
                    case "NOTICIA":
                        this.heading.push("category","durationDate");
                        this.contents = this.notices;
                        console.log("aca", this.notices, this.contents);
                        break;
                    case "MEMORIAS":
                        this.heading.push("topic");
                        this.contents = this.memories;     
                        break;
                    case "DOCTRINAl":
                        this.contents = this.doctrinal;      
                        break;
                    case "NOSOTROS":
                        this.contents = this.us;
                        break;
                }
                this.heading.push("actions");
                this.contents.push();
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
            changeType(){
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