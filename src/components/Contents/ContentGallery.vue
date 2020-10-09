<template>
    <div class="top-selling-widget project-gallery-wrap">
        <slick :options="slickOptions">
            <div v-for="(img,index) in images" :key="index">
                <img :src="img.path" class="img-fluid" />
            </div>
        </slick>
    </div>
</template>

<script>
	import Slick from "vue-slick";

	export default {
        props:["images"],
		components: {
			Slick,
		},
		data() {
			return {
				slickOptions: {
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					dots: false,
					arrows: false,
					rtl: this.$store.getters.rtlLayout
				},
			};
		}
	};
</script>