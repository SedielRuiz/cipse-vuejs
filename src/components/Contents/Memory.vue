<template>
    <div id="dashboard" class="project-detail-wrap">
		<!-- <page-title-bar></page-title-bar> -->
        <div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 grid-b-space">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-1 align-self-center text-left">
                    <b-button @click="$emit('back')" class="m-1" type="reset" variant="success"><i class="fas fa-chevron-left"></i></b-button>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-11 align-self-center">
                    <h2>{{memory.title}}</h2>
                </div>
            </div>
        </div>
		<div class="row align-items-stretch">
			<div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 grid-b-space">
				<app-card customClasses="mb-30">
					<h3 class="mb-4">{{$t('message.description')}}</h3><hr>
					<div class="project-content">
						<p>{{ memory.description_title }}</p>
                        <div class="ql-editor" v-html="memory.memory"></div>
					</div>
                    <hr>
                    <ul>
                        <li v-if="viewContent" class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-calendar-day"></i> {{$t('message.publishDate')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{meta.created_at | formatDate}}</span>
                        </li>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-user-cog"></i> {{$t('message.user')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{meta.user.name}}</span>
                        </li>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-users"></i> {{$t('message.unit')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{meta.unit.name}}</span>
                        </li>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="far fa-object-group"></i> {{$t('message.category')}} :
                            </span>
                            <span class="fw-semi-bold text-capitalize">{{meta.category.name}}</span>
                        </li>
                        <li class="p-2 border-bottom d-flex justify-content-between align-content-center">
                            <span class="fw-light text-capitalize pr-10">
                                <i class="fas fa-file-upload"></i> {{$t('message.filesAttached')}} :
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
				</app-card>
				<app-card :heading="$t('message.filesAttached')" customClasses="mb-30 files-uploaded">
					<files-uploaded></files-uploaded>
				</app-card>
			</div>
			<div class="col-full-lg-block col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 grid-b-space">
				<app-card :heading="$t('message.gallery')" customClasses="mb-30">
					<content-gallery :images=images></content-gallery>
				</app-card>
			</div>
		</div>
	</div>
</template>

<script>
    import FilesUploaded from 'Components/Contents/FilesUploaded'
    import ContentGallery from 'Components/Contents/ContentGallery'

	export default {
        props:["viewContent", "meta", "memory"],
        components: {
			FilesUploaded,
			ContentGallery
		},
		data: function () {
			return {	
			};
        },
	};
</script>