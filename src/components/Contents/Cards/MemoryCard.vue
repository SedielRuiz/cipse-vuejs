<template>
	<app-card customClasses="blog-layout one overflow-hide blog-layout-one h-100" :fullBlock="true">
		<div class="card-thumbnail">
			<img class="img-fluid" src="/static/img/post-1.jpg" height="400" alt="blog" />
		</div>
		<div class="card-body pos-relative">
			<a href="javascript:;" @click="detailMemory" class="icon-btn top"><i class="fas fa-ellipsis-h"></i></a>
			<div class="media mb-15 align-items-center">
				<div class="img-wrap">
					<!-- <img src="/static/img/user-1.jpg" class="rounded-circle" width="65" height="65" alt="author" /> -->
				</div>
				<div class="media-body">
					<h3>{{memory.title}}</h3>
				</div>
			</div>
			<div class="blog-content">
				<div class="custom-p-lh">
					<p class="font-sm">{{memory.description_title}}</p>
                    <p class="font-sm">{{textTruncate(memory.memory, 250)}}</p>
				</div>
				<hr>
                    <ul>
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
                            <span class="fw-semi-bold text-capitalize">{{memory.language.name}}</span>
                        </li>
                    </ul>
			</div>
		</div>
	</app-card>
</template>

<script>
    import { textTruncate } from "Helpers/helpers";

	export default {
        props:["meta", "memory"],
		data: function () {
			return {	
			};
        },
        methods:{
            textTruncate(text, limit) {
				return textTruncate(text, limit);
			},
            detailMemory(){
                this.$router.push("/contents/detail/MEMORIAS/"+this.meta.id);
            }
        },
	};
</script>