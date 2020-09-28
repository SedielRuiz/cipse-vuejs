<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-users"></i> {{$t('message.'+titleText)}}</h2>
                </b-card-title><hr>
                <b-form @submit="processUnit" @reset="onBack">

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <b-form-group id="input-group-name" :label="$t('message.name')+':'" label-for="name">
                                <b-form-input
                                id="name"
                                v-model="unit.name"
                                required
                                placeholder=""
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <b-form-group id="input-group-description" :label="$t('message.description')+':'" label-for="description">
                                <b-form-textarea
                                    id="description"
                                    v-model="unit.description"
                                    placeholder="Escriba una descripción..."
                                    rows="3"
                                    max-rows="6"
                                    ></b-form-textarea>
                            </b-form-group>
                        </div>
                    </div>

                    <hr>
                    <div class="text-right">
                        <b-button class="m-1" type="submit" variant="primary"><i class="fas fa-save"></i> {{$t('message.save')}}</b-button>
                        <b-button class="m-1" type="reset" variant="danger"><i class="fas fa-times-circle"></i> {{$t('message.cancel')}}</b-button>
                    </div>
                </b-form>
            </b-card>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex';
    
    export default {
        name: 'unit-manage',
        data () {
            return {
                unit: {},
                edit:"",
                titleText:"unit",
            }
        },
        watch:{
            unt(val){
                if(val){
                    this.unit = val;
                }
            },
        },
        async mounted () {
            this.edit = this.$route.params.id == undefined ? 0 : this.$route.params.id;
            if(this.edit!=""){
                if(this.edit == 1){
                    this.titleText="newUnit"
                }
                else{
                    this.titleText="editUnit"
                    this.getUnit(this.edit);
                }
            }else{
                this.titleText="newUnit"
            }
        },
        methods: {
            ...mapActions({
                create: 'unit/create',
                update: 'unit/update',
                getUnit: 'unit/getUnit',
            }),
            onBack(){
                this.$router.push('/units/consult');
            },
            processUnit () {
                if(this.edit){
                    this.update(this.unit).then(
                        data => {
                            this.setWarning(data, { root: true }).then(()=>{
                            if(this.edit == 1){
                                this.$router.push('/');
                            }else{
                                this.$router.push('/units/update/'+this.edit);
                            }
                            });
                        },
                        error => {
                    });
                }else{
                    this.create(this.unit).then(
                        data => {
                            this.setWarning(data, { root: true }).then(()=>{
                                this.$router.push('/units/consult')
                            })
                        },
                        error => {
                    })
                }
            },
        },
        computed:{
            ...mapState({
                unt: state => state.unit.unit,
            }),
        },
    }
</script>

