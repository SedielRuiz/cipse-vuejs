<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-folder-open"></i> {{ titleText }}</h2>
                </b-card-title><hr>
                <b-form @submit="processContent" @reset="onBack">
                    

                    <b-form-group id="input-group-title" label="Correo electrónico:" label-for="title">
                        <b-form-input
                        id="title"
                        v-model="content.title"
                        type="text"
                        required
                        placeholder=""
                        ></b-form-input>
                    </b-form-group>


                    <hr>
                    <div class="text-right">
                        <b-button class="m-1" type="submit" variant="primary"><i class="fas fa-save"></i> Guardar</b-button>
                        <b-button class="m-1" type="reset" variant="danger"><i class="fas fa-times-circle"></i> Cancelar</b-button>
                    </div>
                </b-form>
            </b-card>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    
    export default {
        name: 'content-manage',
        data () {
            return {
                type:"",
                edit:"",
                titleText:"",
                content:"",
            }
        },
        watch:{
        },
        mounted () {
            this.type = this.$route.params.type;
            this.edit = this.$route.params.id == undefined ? 0 : this.$route.params.id;
            if(this.edit!=""){
                if(this.edit == 1){
                    this.titleText="Nuevo Contenido"
                }
                else{
                    this.titleText="Editar contenido"
                    this.getUser(this.edit);
                }
            }else{
                this.titleText="Nuevo contenido"
            }
        },
        methods: {
            ...mapActions({
                create: 'content/create',
                update: 'content/update',
            }),
            onBack(){
                this.$router.push('/contents/consult/'+this.type);
            },
            processContent () {
                if(this.edit){
                    this.update(this.user).then(
                        data => {
                            this.setWarning(data, { root: true }).then(()=>{
                            if(this.edit == 1){
                                this.$router.push('/contents/consult/'+this.type);
                            }else{
                                this.$router.push('/contents/update/'+this.type+'/'+this.edit);
                            }
                            });
                        },
                        error => {
                    });
                }else{
                    this.create(this.user).then(
                        data => {
                            this.setWarning(data, { root: true }).then(()=>{
                                this.$router.push('/contents/consult/'+this.type);
                            })
                        },
                        error => {
                    })
                }
            },
        },
        computed:{
            ...mapState({
                language: state => state.auth.language,
            }),
        },
    }
</script>

