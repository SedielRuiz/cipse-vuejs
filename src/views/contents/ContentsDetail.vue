<template>
	<div>
        <div v-if="type == 'NOTICIA'">
            <notice v-for="(notice, index) in content.contents" :key="index"  @back="back()" :notice=notice></notice>
        </div>
        <div v-if="type == 'NOSOTROS'">
            <unit-us v-for="(us, index) in content.contents" :key="index"  @back="back()" :us=us></unit-us>
        </div>
        <div v-if="type == 'DOCTRINAL'">
            <doctrinal v-for="(doctrinal, index) in content.contents" :key="index"  @back="back()" :doctrinal=doctrinal></doctrinal>
        </div>
        <div v-if="type == 'MEMORIAS'">
            <memory v-for="(memory, index) in content.contents" :key="index"  @back="back()" :memory=memory></memory>
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
                content: state => state.content.content,
            }),
        },
    }
</script>