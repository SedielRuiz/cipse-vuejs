<template>
	<app-card customClasses="blog-layout one overflow-hide blog-layout-one h-100" :fullBlock="true">
		<div class="card-thumbnail">
			<img class="img-fluid" :src="images[getNumber()].path" height="100" alt="blog" />
		</div>
		<div class="card-body pos-relative">
			<a href="javascript:;" @click="detailDoctrinal" class="icon-btn top"><i class="fas fa-ellipsis-h"></i></a>
			<div class="media mb-15 align-items-center">
				<div class="img-wrap">
					<!-- <img src="/static/img/user-1.jpg" class="rounded-circle" width="65" height="65" alt="author" /> -->
				</div>
				<div class="media-body">
					<h5>{{doctrinal.title}}</h5>
				</div>
			</div>
            <hr>
			<div class="blog-content">
				<div class="custom-p-lh">
                    <div class="font-sm ql-editor" v-html="doctrinal.title_description"></div>
				</div>
				<ul>
                    <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                        <span class="fw-light text-capitalize pr-10">
                            <i class="fas fa-code-branch"></i> {{$t('message.version')}} :
                        </span>
                        <span class="fw-semi-bold text-capitalize badge badge-success">{{doctrinal.version}}</span>
                    </li>
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
                            <i class="fas fa-thumbtack"></i> {{$t('message.topic')}} :
                        </span>
                        <span class="fw-semi-bold text-capitalize">{{doctrinal.topic}}</span>
                    </li>
                    <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                        <span class="fw-light text-capitalize pr-10">
                            <i class="fas fa-language"></i> {{$t('message.typeDocument')}} :
                        </span>
                        <span class="fw-semi-bold text-capitalize">{{doctrinal.type_document}}</span>
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
                        <span class="fw-semi-bold text-capitalize">{{doctrinal.language.name}}</span>
                    </li>
                </ul>
			</div>
		</div>
	</app-card>
</template>

<script>
    import { getFlag } from "Helpers/helpers";

	export default {
        props:["meta", "doctrinal", "language"],
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
            getNumber(){
                return Math.floor(Math.random() * (8 - 0)) + 0;
            },
            getFlag(){
                return getFlag(this.language);
            },
            detailDoctrinal(){
                this.$router.push("/contents/detail/DOCTRINAL/"+this.meta.id);
            }
        },
	};
</script>