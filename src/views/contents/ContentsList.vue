<template>
	<div class="user-list-wrapper">
        
        <content-carousel v-if="type == 'NOTICIA'" ></content-carousel>
        <br>
		<!-- <page-title-bar></page-title-bar> -->
        <div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
                <div class="custom-search-wrap px-4 py-15 idb-block">
					<div class="row align-self-center">
						<div class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-3">
							<h2>{{capitalizeType()}}</h2>
						</div>
						<div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-9" v-if="type != 'NOSOTROS'">
                            <div class="row text-right align-items-center">
                                <div class="col-xs-12 col-sm-12 col-md-8">
								    <b-form-input class="form-control" type="text" required > </b-form-input>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-4">
                                    <b-button @click="alertSweet()" variant="primary" class="mr-3 text-capitalize">
                                        {{$t('message.search')}} <i class="fas fa-search m-1"></i>
                                    </b-button>

                                    <b-button v-if="role != 'OBSERVADOR'" @click="redirect(false)" variant="success" class="text-capitalize">
                                        {{$t('message.addNew')}} <i class="fas fa-plus m-1"></i>
                                    </b-button>
                                </div>
                            </div>
						</div>
					</div>
				</div>

			</div>
		</div>

        <app-card v-if="view" customClasses="grid-b-space" :heading="''">
            <div class="table-responsive">
                <div class="unseen">
                    <table id="tableContents" class="table table-hover table-bordered table-striped">
                        <thead>
                            <tr class="bg-primary text-center">
                                <th v-for="(head, index) in heading" :key="index">
                                    {{$t('message.'+head)}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="content in contents" :key="content.id">
                                <td class="text-center">{{content.country.name}}</td>
                                <td class="text-center">{{content.unit.name}}</td>
                                <td class="text-center">{{content.user.name}}</td>
                                <td class="text-center">
                                    <span class="badge badge-success" v-for="language in content.contents" :key="language.id">
                                        {{language.language.name}}
                                    </span>
                                </td>

                                <!-- Campo para doctrinal -->
                                <td class="text-center" v-if="type == 'DOCTRINAL'">
                                    {{ getColumn(content.contents, "topic") }}
                                </td>
                                
                                 <!-- Noticias y Memorias-->
                                <td class="text-center" v-if="type == 'NOTICIA' || type == 'MEMORIAS'">
                                    {{content.category ? content.category.name : ""}}
                                </td>

                                <td class="text-center">
                                    {{ getColumn(content.contents, "title") }}
                                </td>

                                <!-- Campo para doctrinal y noticias y memorias-->
                                <td class="text-center" v-if="type == 'NOTICIA' || type == 'DOCTRINAL' || type == 'MEMORIAS'">
                                    {{content.created_at | formatDate}}
                                </td>

                                <!-- Noticias-->
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
        <div v-else class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 p-2" v-for="(content, index) in contents" :key="index">
                <div v-if="type == 'NOTICIA'">
                    <notice-card :meta=content :notice=getContent(content) :language=language :photo="index==0?false:true"></notice-card>
                </div>
                <div v-if="type == 'DOCTRINAL'">
                    <doctrinal-card :meta=content :doctrinal=getContent(content) :language=language></doctrinal-card>
                </div>
                <div v-if="type == 'MEMORIAS'">
                    <memory-card :meta=content :memory=getContent(content) :language=language></memory-card>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex';
    import { dataTable } from "Helpers/helpers";
    import pagination from '@/components/Pagination/Paginate';
    import NoticeCard from "Components/Contents/Cards/NoticeCard";
    import MemoryCard from "Components/Contents/Cards/MemoryCard";
    import DoctrinalCard from "Components/Contents/Cards/DoctrinalCard";
    import ContentCarousel from "Components/Contents/Carousel";

    export default {
        name: 'content-list',
        components:{
            pagination,
            NoticeCard,
            MemoryCard,
            DoctrinalCard,
            ContentCarousel
        },
        data () {
            return {
                type: "",
                heading:[],
                contents:[],
            }
        },
        async mounted () {
            this.type = this.$route.params.type;
            await this.search();
            this.buildDataTable();
        },
        watch:{
            changeType(val){
                this.search();
            },
            role(val){}
        },
        methods: {
            ...mapActions({
                getContents: 'content/getContents',
            }),
            buildDataTable(){
                var language = this.languageLocale.locale == "sp" ? "Spanish.json" : "English.json" ;
                dataTable('tableContents', language)
            },
            getContent(content){
                var result = content.contents.filter(content => content.language.key == this.language);
                if(result.length > 0){
                    result = result[0];
                }else{
                    result = content.contents[0];
                }
                return result;
            },
            alertSweet(){
                this.$swal('Hello Vue world!!!');
            },
            capitalizeType(){
                var type = this.type == "NOTICIA" ? "NOTICIAS" : this.type;
                var text = type.toLowerCase();
                return text.charAt(0).toUpperCase()+text.slice(1);
            },
            getColumn(contents, column){
                var result = "";
                var content = contents.filter(content => content.language.key == this.language);
                
                if(content.length > 0){
                    result = content[0][column];
                }else{
                    result = contents[0][column];
                }
                return result;
            },
            async search(){
                await this.getContents(this.type);
                this.heading = [
                    "country",
                    "unit",
                    "user",
                    "languages"
                ];
                switch (this.type) {
                    case "NOTICIA":
                        this.heading.push("category", "title", "publishDate", "durationDate");
                        this.contents = this.notices;
                        break;
                    case "DOCTRINAL":
                        this.heading.push("topic", "title", "publishDate");
                        this.contents = this.doctrinal;      
                        break;
                    case "MEMORIAS":
                        this.heading.push("category", "title", "publishDate");
                        this.contents = this.memories;     
                        break;
                    case "NOSOTROS":
                        this.heading.push("title");
                        this.contents = this.us;
                        if(!this.view && this.type=="NOSOTROS"){
                            this.redirect(false, this.contents[0].id);
                        }
                        break;
                }
                this.heading.push("actions");
                this.contents.push();
            },
            redirect(page, id){
                if(!page){
                    if(id){
                        this.$router.push('/contents/detail/'+this.type+"/"+id);
                    }else{
                        this.$router.push('/contents/create/'+this.type)
                    }
                }else{
                    this.$router.push('/contents/update/'+this.type+"/"+id);
                }
            }
        },
        computed:{
            ...mapGetters({
				getRole: 'auth/getRole',
            }),
            ...mapState({
                language: state => state.auth.language,
                notices: state => state.content.notices,
                doctrinal: state => state.content.doctrinal,
                memories: state => state.content.memories,
                us: state => state.content.us,
                cardContent: state => state.auth.viewContent,
                languageLocale: state => state.settings.selectedLocale,
            }),
            role(){
                return this.getRole;
            },
            view(){
                return this.cardContent;
            },
            changeType(){
                this.type = this.$route.params.type;
                return this.type;
            },
        },
    }
</script>