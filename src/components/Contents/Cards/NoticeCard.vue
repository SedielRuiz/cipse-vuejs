<template>
	<app-card customClasses="blog-layout one overflow-hide blog-layout-one h-80" :fullBlock="true">
		<div class="card-thumbnail">
			<img v-if="photo" class="img-fluid" :src="images[getNumber()].path" height="100" alt="blog" />
		</div>
		<div class="card-body pos-relative">
			<a href="javascript:;" @click="detailNotice" :class="'icon-btn top'+(!photo ? ' top-btn-photo' : '')"><i class="fas fa-ellipsis-h"></i></a>
			<div class="media mb-15 align-items-center">
				<div class="img-wrap">
					<!-- <img src="/static/img/user-1.jpg" class="rounded-circle" width="65" height="65" alt="author" /> -->
				</div>
				<div class="media-body">
					<h3>{{notice.title}}</h3>
				</div>
			</div>
            <hr>
			<div class="blog-content">
				<div class="custom-p-lh">
					<p class="">
                        {{notice.description_title}}
                    </p>
                    <div class="font-sm ql-editor" v-html="notice.notice"></div>
                    <hr>
                    <ul>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-users"></i> {{$t('message.unit')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">
                                {{meta.unit.name}}
                                <img class="flag-img" :src="'/static/flag-icons/'+getFlag()+'.png'">
                            </span>
                        </li>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-user-cog"></i> {{$t('message.user')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{meta.user.name}}</span>
                        </li>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="far fa-object-group"></i> {{$t('message.category')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{meta.category.name}}</span>
                        </li>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-file-upload"></i> {{$t('message.filesUploaded')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{meta.files.length}}</span>
                        </li>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-language"></i> {{$t('message.language')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{notice.language.name}}</span>
                        </li>
                    </ul>
				</div>
			</div>
		</div>
	</app-card>
</template>

<script>
    import { textTruncate, getFlag } from "Helpers/helpers";
    
	export default {
        props:["meta", "notice", "language" , "photo"],
		data: function () {
			return {	
                images:[
                    {
                        path:"/static/img/notices/notice-1.jpg",
                    },
                    {
                        path:"/static/img/notices/notice-2.jpg",
                    },
                    {
                        path:"/static/img/notices/notice-3.jpg",
                    },
                    {
                        path:"/static/img/notices/notice-4.jpg",
                    },
                    {
                        path:"/static/img/notices/notice-5.jpg",
                    },
                    {
                        path:"/static/img/notices/notice-6.jpg",
                    },
                    {
                        path:"/static/img/notices/notice-7.jpg",
                    },
                    {
                        path:"/static/img/notices/notice-8.jpg",
                    },
                ]
			};
        },
        methods:{
            getFlag(){
                return getFlag(this.language);
            },
            getNumber(){
                return Math.floor(Math.random() * (8 - 0)) + 0;
            },
            textTruncate(text, limit) {
				return textTruncate(text, limit);
			},
            detailNotice(){
                this.$router.push("/contents/detail/NOTICIA/"+this.meta.id);
            }
        },
	};
</script>