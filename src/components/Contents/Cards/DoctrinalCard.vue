<template>
	<app-card customClasses="blog-layout one overflow-hide blog-layout-one h-100" :fullBlock="true">
		<div class="card-thumbnail">
			<img class="img-fluid" src="/static/img/post-1.jpg" height="400" alt="blog" />
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
					<p class="font-sm">{{doctrinal.title_description}}</p>
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

	export default {
        props:["meta", "doctrinal"],
		data: function () {
			return {	
			};
        },
        methods:{
            detailDoctrinal(){
                this.$router.push("/contents/detail/DOCTRINAL/"+this.meta.id);
            }
        },
	};
</script>