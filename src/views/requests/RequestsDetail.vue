<template>
	<div>
        <request @back="back()" :request=request></request>
	</div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import Request from '@/components/Requests/Request';

    export default {
        name: 'user-list',
        components:{
            Request
        },
        data () {
            return {
                id:""
            }
        },
        mounted () {
            this.id = this.$route.params.id;
            this.getRequest(this.id);
        },
        methods: {
            ...mapActions({
                getRequest: 'request/getRequest',
            }),
            back(){
                this.$router.push('/requests/consult/');
            }
        },
        computed:{
            changeType(){
                this.type = this.$route.params.type;
                return this.type;
            },
            ...mapState({
                language: state => state.auth.language,
                request: state => state.request.request,
            }),
        },
    }
</script>