<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-file-contract"></i> {{$t('message.'+titleText)}}</h2>
                </b-card-title><hr>
                <b-form @submit="processRequest" @reset="onBack">

                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-country" :label="$t('message.country')+':'" label-for="country">
                                <select class="form-control" id="country" v-model="request.country_id" required>
                                    <option v-for="(country, index) in countries" :key="index" :value="country.id">{{country.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-language" :label="$t('message.language')+':'" label-for="language">
                                <select class="form-control" id="language" v-model="request.language_id" required>
                                    <option v-for="(language, index) in languages" :key="index" :value="language.id">{{language.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-unit-strat" :label="$t('message.unitFrom')+':'" label-for="unitStart">
                                <select class="form-control" id="unitStart" v-model="request.unit_start_id" required>
                                    <option v-for="(unit, index) in units" :key="index" :value="unit.id">{{unit.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-unit-end" :label="$t('message.unitTo')+':'" label-for="unitEnd">
                                <select class="form-control" id="unitEnd" v-model="request.unit_end_id" required>
                                    <option v-for="(unit, index) in units" :key="index" :value="unit.id">{{unit.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>

                    <b-form-group id="input-group-description" :label="$t('message.description')+':'" label-for="description">
                        <quill-editor v-model="request.description" ref="myQuillEditor" :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
                        </quill-editor>
                    </b-form-group>

                    <b-form-group id="input-group-notice" label="Archivos" label-for="files">
                        <dropzone id="files" v-on:vdropzone-success="showSuccess" class="mb-30"
                            @vdropzone-removed-file="removeFile" :options="dropzoneOptions">
                            <div class="dropzone-custom-content">
                                <h3>Arrastres o selecione archivos</h3>
                            </div>
                            <input type="hidden" name="token" value="xxx">
                        </dropzone>
                    </b-form-group>

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
    import Dropzone from "vue2-dropzone";

    export default {
        name: 'request-manage',
        components: {
			Dropzone
		},
        data () {
            return {
                request: {},
                edit:"",
                titleText:"request",
                file:[],
                editorOption:{
                    placeholder: "Escriba aquí su contenido",
                },
                dropzoneOptions: {
                    url: "https://httpbin.org/post",
                    addRemoveLinks:true,
					thumbnailWidth: 150,
					maxFilesize: 20,
					headers: { "My-Awesome-Header": "header value" }
				},
            }
        },
        watch:{
            requst(val){
                if(val){
                    this.request = val;
                }
            },
        },
        async mounted () {
            //terminos
            await this.getTerms("CATEGORIAS");
            //Unidades
            await this.getUnits();
            //paises
            await this.getCountries();
            //idiomas
            await this.getLanguages();

            this.edit = this.$route.params.id == undefined ? 0 : this.$route.params.id;
            if(this.edit!=""){
                if(this.edit == 1){
                    this.titleText="newRequest"
                }
                else{
                    this.titleText="editRequest"
                    this.getRequest(this.edit);
                }
            }else{
                this.titleText="newRequest"
            }
        },
        methods: {
            ...mapActions({
                create: 'request/create',
                update: 'request/update',
                getRequest: 'request/getRequest',
                getTerms: 'term/getTerms',
                getUnits: 'unit/getUnits',
                getCountries: 'country/getCountries',
                getLanguages: 'language/getLanguages',
            }),
            removeFile(file){
                console.log("File removed!")
                console.log(file);
                console.log(this.files);
            },
            showSuccess(file) {
                console.log("A file was successfully uploaded");
                console.log(file);
                this.files.push(file);
                console.log(this.files);
			},
            onEditorBlur(editor) {
				console.log('editor blur!', editor)
			},
			onEditorFocus(editor) {
				console.log('editor focus!', editor)
			},
			onEditorReady(editor) {
				console.log('editor ready!', editor)
			},
			onEditorChange({ editor, html, text }) {
				console.log('editor change!', editor, html, text)
			},
            onBack(){
                this.$router.push('/requests/consult');
            },
            processRequest () {
                if(this.edit){
                    this.update(this.user).then(
                        data => {
                            this.setWarning(data, { root: true }).then(()=>{
                            if(this.edit == 1){
                                this.$router.push('/');
                            }else{
                                this.$router.push('/request/update/'+this.edit);
                            }
                            });
                        },
                        error => {
                    });
                }else{
                    this.create(this.user).then(
                        data => {
                            this.setWarning(data, { root: true }).then(()=>{
                                this.$router.push('/request/consult')
                            })
                        },
                        error => {
                    })
                }
            },
        },
        computed:{
            ...mapState({
                requst: state => state.request.request, 
                categories: state => state.term.categories,
                units: state => state.unit.units,
                languages: state => state.language.languages,
                countries: state => state.country.countries,
            }),
        },
    }
</script>

