<template>
	<div class="user-profile-wrapper">
		<page-title-bar></page-title-bar>
		<div class="row">
			<div class="col-full-lg-block col-sm-12 col-md-12 col-lg-4 col-xl-4">
				<user-profile-block :user=user></user-profile-block>
			</div>
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
                    <activity-timeline :user=user :notices=notices></activity-timeline>
				</app-card>
			</div>
		</div>
	</div>
</template>

<script>
	import Blogs from "Components/Widgets/Blogs";
	import ActivityTimeline from "Components/Widgets/ActivityTimeline";
	import UserProfileBlock from "Components/Widgets/UserProfileBlock";

    import {mapActions,mapState} from 'vuex';
    
    export default {
        name: 'user-manage',
        components: {
			Blogs,
			ActivityTimeline,
			UserProfileBlock
		},
        data () {
            return {
                notices:[]
            }
        },
        watch:{
            user(val){
                if(val){
                    this.notices = [];
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