<template>
	<div>
        <request @back="back()" :request=request :descriptions=descriptions></request>
	</div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import Request from '@/components/Requests/Request';

    export default {
        name: 'request-detail',
        components:{
            Request
        },
        data () {
            return {
                id:"",
                descriptions:[],
            }
        },
        watch:{
            request(val){
                var descriptions = this.request.description.split("_@_");
                for (let s = 0; s < descriptions.length; s++) {
                    descriptions[s] = descriptions[s].replace("\n", "<br>").replace("\r", " ");
                    this.descriptions.push(descriptions[s]);
                }
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