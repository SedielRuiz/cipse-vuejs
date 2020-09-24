<template>
	<div>
        <div v-if="type == 'NOTICIA' && content != ''">
            <notice @back="back()" :meta=content :notice=getContentLanguage()></notice>
        </div>
        <div v-if="type == 'NOSOTROS' && content != ''">
            <unit-us @back="back()" :meta=content :us=getContentLanguage()></unit-us>
        </div>
        <div v-if="type == 'DOCTRINAL' && content != ''">
            <doctrinal @back="back()" :meta=content :doctrinal=getContentLanguage()></doctrinal>
        </div>
        <div v-if="type == 'MEMORIAS' && content != ''">
            <memory @back="back()" :meta=content :memory=getContentLanguage()></memory>
        </div>
	</div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    import notice from '@/components/Contents/Notice';
    import unitUs from '@/components/Contents/Us';
    import doctrinal from '@/components/Contents/Doctrinal';
    import memory from '@/components/Contents/Memory';

    export default {
        name: 'user-list',
        components:{
            notice,
            unitUs,
            doctrinal,
            memory
        },
        data () {
            return {
                type: "",
                id:""
            }
        },
        mounted () {
            this.type = this.$route.params.type;
            this.id = this.$route.params.id;
            this.getContent(this.id);
        },
        methods: {
            ...mapActions({
                getContent: 'content/getContent',
            }),
            getContentLanguage(){
                var result = this.content.contents.filter(content => content.language.key == this.language);
                if(result.length > 0){
                    result = result[0];
                }else{
                    result = this.content.contents[0];
                }
                return result;
            },
            back(){
                this.$router.push('/contents/consult/'+this.type);
            }
        },
        computed:{
            changeType(){
                this.type = this.$route.params.type;
                return this.type;
            },
            ...mapState({
                language: state => state.auth.language,
                content: state => state.content.content,
            }),
        },
    }
</script>