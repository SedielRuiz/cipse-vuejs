<template>
	<app-card customClasses="blog-layout one overflow-hide blog-layout-one h-100" :fullBlock="true">
		<div class="card-thumbnail">
			<img class="img-fluid" src="/static/img/post-1.jpg" height="400" alt="blog" />
		</div>
		<div class="card-body pos-relative">
			<a href="javascript:;" class="icon-btn top"><i class="zmdi zmdi-share"></i></a>
			<div class="media mb-15 align-items-center">
				<div class="img-wrap">
					<img src="/static/img/user-1.jpg" class="rounded-circle" width="65" height="65" alt="author" />
				</div>
				<div class="media-body">
					<h5>{{doctrinal.title}}</h5>
				</div>
			</div>
			<div class="blog-content">
				<div class="custom-p-lh">
					<p class="font-sm">{{doctrinal.title_description}}</p>
				</div>
				<div class="post-actions">
					<a href="javascript:;" class="font-xs text-muted"><i
						class="zmdi zmdi-comment font-sm text-success"></i>21 Comments</a>
					<a href="javascript:;" class="font-xs text-muted"><i
						class="zmdi zmdi-thumb-up font-sm text-primary"></i>16 Likes</a>
				</div>
			</div>
		</div>
	</app-card>
</template>

<script>

	export default {
        props:["doctrinal"],
		data: function () {
			return {	
			};
        },
	};
</script>