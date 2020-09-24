<template>
    <b-list-group>
        <b-list-group-item class="d-sm-flex py-15 px-20 list-item-wrap">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-2 avatar-wrap mb-sm-0 mb-3">
                    <img :src="'/static/img/blog-1.jpg'" alt="blog gallery" class="img-fluid" width="220" height="170">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-7">
                    
                    <span class="font-xs d-block mb-2 meta-info">{{$t('message.publishDate')}} - {{content.created_at | formatDate}}</span>
                    <span class="font-xs d-block mb-2 meta-info">{{textTruncate(content.title, 40)}}</span>
                    <p class="fs-14 text-muted mb-3">{{textTruncate(content.info, 80)}}</p>
                    <div class="post-actions">
                        <li class="border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-file-upload"></i> {{$t('message.filesUploaded')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{content.files.length}}</span>
                        </li>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-3">
                    <div class="btn-wrap d-xl-flex">
                        <a href="javascript:;" @click="redirectBlog(false)" class="icon-btn text-danger "><i class="fas fa-ellipsis-h"></i></a>
                        <a href="javascript:;" @click="redirectBlog(true)" class="icon-btn text-primary mb-md-0 mb-2"><i class="fas fa-pen"></i></a>
                    </div>
                </div>
            </div>

            <div class="d-sm-flex list-wrap">
                
            </div>

        </b-list-group-item>
    </b-list-group>
</template>

<script>
    import { textTruncate } from "Helpers/helpers";

	export default {
        props:["content"],
		data() {
			return {
				
			};
        },
        methods: {
            textTruncate(text, limit) {
				return textTruncate(text, limit);
			},
            redirectBlog(page){
                if(!page){
                    this.$router.push('/contents/detail/'+this.content.type+"/"+this.content.id);
                }else{
                    this.$router.push('/contents/update/'+this.content.id)
                }
            }
        }
	};
</script>