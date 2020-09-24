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
                    <div v-if="notices.length > 0">
                        <notice-card v-for="(notice, index) in notices" :key="'notice-'+index" :notice=notice></notice-card>
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
                    <div v-if="memories.length > 0">
                        <memory-card v-for="(memory, index) in memories" :key="'memory-'+index" :memory=memory></memory-card>
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
                    <div v-if="doctrinals.length > 0">
                        <doctrinal-card v-for="(doctrinal, index) in doctrinals" :key="'docrinal-'+index" :doctrinal=doctrinal></doctrinal-card>
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
	import Blogs from "Components/Widgets/Blogs";
	import UserProfileBlock from "Components/Users/UserProfileBlock";
    import NoticeCard from "Components/Contents/Cards/NoticeCard";
    import MemoryCard from "Components/Contents/Cards/MemoryCard";
    import DoctrinalCard from "Components/Contents/Cards/DoctrinalCard";

    import {mapActions,mapState} from 'vuex';
    
    export default {
        name: 'user-manage',
        components: {
			Blogs,
			UserProfileBlock,
            NoticeCard,
            MemoryCard,
            DoctrinalCard
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