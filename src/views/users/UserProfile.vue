<template>
	<div class="user-profile-wrapper">
		<page-title-bar></page-title-bar>
		<div class="row">
			<div class="col-full-lg-block col-sm-12 col-md-12 col-lg-4 col-xl-4">
				<user-profile-block :user=user></user-profile-block>
			</div>
            <!-- Noticias -->
			<div class="col-full-lg-block col-sm-12 col-md-12 col-lg-8 col-xl-8">
				<app-card customClasses="grid-b-space">
                    <b-card-title>
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-1 align-self-center text-left">
                                <b-button @click="back()" class="m-1" type="reset" variant="success"><i class="fas fa-chevron-left"></i></b-button>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 align-self-center">
                                <h2><i class="fas fa-book-open"></i> {{$t('message.notices')}}</h2>
                            </div>
                        </div>
                    </b-card-title>
					<hr>
                    <div class="view-blog-content" v-if="notices.length > 0">
                        <div v-for="(content, index) in notices" :key="index">
                            <content-blog :content=getContent(content)></content-blog>
                        </div>
                    </div>
                    <div v-else class="alert alert-info">
                        {{$t('message.noResults')}}
                    </div>
				</app-card>
			</div>

            <!-- Memorias -->
            <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-6 col-xl-6">
				<app-card customClasses="grid-b-space">
                    <b-card-title>
                        <h2><i class="fas fa-star-of-life"></i> {{$t('message.memories')}}</h2>
                    </b-card-title>
					<hr>
                    <div class="view-blog-content" v-if="memories.length > 0">
                        <div v-for="(content, index) in memories" :key="index">
                            <content-blog :content=getContent(content)></content-blog>
                        </div>
                    </div>
                    <div v-else class="alert alert-info">
                        {{$t('message.noResults')}}
                    </div>
				</app-card>
			</div>

            <!-- Doctrinal -->
            <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-6 col-xl-6">
				<app-card customClasses="grid-b-space">
                    <b-card-title>
                        <h2><i class="fas fa-memory"></i> {{$t('message.doctrinal')}}</h2>
                    </b-card-title>
					<hr>
                    <div class="view-blog-content" v-if="doctrinals.length > 0">
                        <div v-for="(content, index) in doctrinals" :key="index">
                            <content-blog :content=getContent(content)></content-blog>
                        </div>
                    </div>
                    <div v-else class="alert alert-info">
                        {{$t('message.noResults')}}
                    </div>
				</app-card>
			</div>
		</div>
	</div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';

	import ContentBlog from "Components/Contents/ContentBlog";
	import UserProfileBlock from "Components/Users/UserProfileBlock";
    
    export default {
        name: 'user-manage',
        components: {
			ContentBlog,
			UserProfileBlock
		},
        data () {
            return {
                notices:[],
                memories:[],
                doctrinals:[],
            }
        },
        watch:{
            user(val){
                if(val){
                    this.notices = val.contents.filter(content => content.type.key == "NOTICIA");
                    this.memories = val.contents.filter(content => content.type.key == "MEMORIAS");
                    this.doctrinals = val.contents.filter(content => content.type.key == "DOCTRINAL");
                }
            }
        },
        mounted () {
            this.getUser(this.$route.params.id);
        },
        methods: {
            ...mapActions({
                getRoles: 'role/getRoles',
                getUser: 'user/getUser',
            }),
            getContent(content){
                var result = content.contents.filter(content => content.language.key == this.language);
                if(result.length > 0){
                    result = result[0];
                }else{
                    result = content.contents[0];
                }

                var data = {};
                data.id = content.id;
                data.title = result.title;
                data.type = content.type.key;
                switch (content.type.key) {
                    case "NOTICIA":
                        data.info = result.notice;
                        break;
                    case "MEMORIAS":
                        data.info = result.memory;
                        break;
                    case "DOCTRINAL":
                        data.info = result.topic;
                        break;
                }
                
                data.created_at = content.created_at;
                data.files = content.files;

                return data;
            },
            back(){
                this.$router.push('/users/consult')
            },
        },
        computed:{
            ...mapState({
                user: state => state.user.user, 
            }),
        },
    }
</script>