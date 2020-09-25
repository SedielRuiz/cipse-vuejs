<template>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <b-card class="mt-3" >
                <b-card-title>
                    <h2><i class="fas fa-folder-open"></i> {{$t('message.'+titleText)}} {{capitalizeType()}}</h2>
                </b-card-title><hr>
                <b-form @submit="processContent" @reset="onBack">
                    
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-country" :label="$t('message.country')+':'" label-for="country">
                                <select class="form-control" id="country" v-model="content.country_id" required>
                                    <option v-for="(country, index) in countries" :key="index" :value="country.id">{{country.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group id="input-group-unit" :label="$t('message.unit')+':'" label-for="unit">
                                <select class="form-control" id="unit" v-model="content.unit_id" required>
                                    <option v-for="(unit, index) in units" :key="index" :value="unit.id">{{unit.name}}</option>
                                </select>
                            </b-form-group>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <h4>{{$t('message.files')}}</h4>
                            <b-form-group id="input-group-notice" label-for="files">
                                <dropzone id="files" v-on:vdropzone-success="showSuccess" class="mb-30"
                                    @vdropzone-removed-file="removeFile" :options="dropzoneOptions">
                                    <div class="dropzone-custom-content">
                                        <h3>Arrastres o selecione archivos</h3>
                                    </div>
                                    <input type="hidden" name="token" value="xxx">
                                </dropzone>
                            </b-form-group>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <b-form-group v-if="type=='NOTICIA'" id="input-group-category" :label="$t('message.category')+':'" label-for="category">
                                <select class="form-control" id="category" v-model="content.category_id" required>
                                    <option v-for="(category, index) in categories" :key="index" :value="category.id">{{category.name}}</option>
                                </select>
                            </b-form-group>

                            <b-form-group v-if="type=='NOTICIA'" id="input-group-durationDate" :label="$t('message.durationDate')+':'" label-for="durationDate">
                                <b-form-input
                                id="durationDate"
                                v-model="content.duration_date"
                                required
                                type="date"
                                ></b-form-input>
                            </b-form-group>
                        
                            <b-form-group v-if="type=='DOCTRINAL'" id="input-group-topic" :label="$t('message.topic')+':'" label-for="topic">
                                <b-form-input
                                id="topic"
                                v-model="content.topic"
                                required
                                placeholder=""
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group v-if="type=='DOCTRINAL'" id="input-group-type-document" :label="$t('message.typeDocument')+':'" label-for="type_document">
                                <b-form-input
                                id="type_document"
                                v-model="content.type_document"
                                required
                                placeholder=""
                                ></b-form-input>
                            </b-form-group>

                        </div>
                    </div>

                    <hr>
                    <div class="row" v-for="(language, index) in languages" :key="index">
                        <!-- <div v-if="contentLanguage.language_id"> -->
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <h2>{{language.name}}</h2>
                                <hr>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <b-form-group id="input-group-title" :label="$t('message.title')+':'" label-for="title">
                                    <b-form-input
                                    id="title"
                                    v-model="language.title"
                                    required
                                    placeholder=""
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6">
                                <b-form-group id="input-group-description-title" :label="$t('message.description')+':'" label-for="description_title">
                                    <b-form-input
                                    id="description_title"
                                    v-model="language.description_title"
                                    required
                                    placeholder=""
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <b-form-group id="input-group-notice" :label="$t('message.content')+':'" label-for="notice">
                                    <quill-editor v-model="language.content" ref="myQuillEditor" :options="editorOption"
                                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
                                    </quill-editor>
                                </b-form-group>
                            </div>
                        <!-- </div> -->
                    </div><hr>

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
        name: 'content-manage',
        components: {
			Dropzone
		},
        data () {
            return {
                files:[],
                type:"",
                edit:"",
                titleText:"content",
                editorOption:{
                    placeholder: "Escriba aquí su contenido",
                },
                content:{},
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
            contet(val){
                if(val){
                    this.content = val;
                    for (var s = 0; s < this.languages.length; s++) {
                        var contentLanguage = val.contents.filter(ctn => ctn.language_id == this.languages[s].id);
                        if(contentLanguage.length > 0){
                            this.languages[s].title = contentLanguage[0].title;
                            this.languages[s].description_title = contentLanguage[0].description_title;
                            if(this.type == "NOTICIA"){
                                this.languages[s].content = contentLanguage[0].notice;
                            }
                            if(this.type == "MEMORIA"){
                                this.languages[s].content = contentLanguage[0].memory;
                            }
                            if(this.type == "NOSOTROS"){
                                this.languages[s].content = contentLanguage[0].us;
                            }
                        }
                    }
                }
            }
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

            this.type = this.$route.params.type;
            this.edit = this.$route.params.id == undefined ? 0 : this.$route.params.id;
            if(this.edit!=""){
                if(this.edit == 1){
                    this.titleText="newContent"
                }
                else{
                    this.titleText="editContent"
                    this.getContent(this.edit);
                }
            }else{
                this.titleText="newContent"
            }
        },
        methods: {
            ...mapActions({
                create: 'content/create',
                update: 'content/update',
                getContent: 'content/getContent',
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
            capitalizeType(){
                var text = this.type.toLowerCase();
                return text.charAt(0).toUpperCase()+text.slice(1);
            },
            onBack(){
                this.$router.push('/contents/consult/'+this.type);
            },
            processContent () {
                console.log("contenido editor ", this.content);
                // if(this.edit){
                //     this.update(this.content).then(
                //         data => {
                //             this.setWarning(data, { root: true }).then(()=>{
                //             if(this.edit == 1){
                //                 this.$router.push('/contents/consult/'+this.type);
                //             }else{
                //                 this.$router.push('/contents/update/'+this.type+'/'+this.edit);
                //             }
                //             });
                //         },
                //         error => {
                //     });
                // }else{
                //     this.create(this.content).then(
                //         data => {
                //             this.setWarning(data, { root: true }).then(()=>{
                //                 this.$router.push('/contents/consult/'+this.type);
                //             })
                //         },
                //         error => {
                //     })
                // }
            },
        },
        computed:{
            ...mapState({
                language: state => state.auth.language,
                contet: state => state.content.content,
                units: state => state.unit.units,
                languages: state => state.language.languages,
                countries: state => state.country.countries,
                categories: state => state.term.categories,
            }),

            editor() {
				return this.$refs.myQuillEditor.quill
			}
        },
    }
</script>

