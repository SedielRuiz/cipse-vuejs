<template>
	<div class="timeline-wrap">
		<ul class="list-unstyled">
			<div class="alert alert-info" v-if="notices.length == 0">
                No has registrado noticias o tu unidad no tiene noticias
            </div>
		</ul>
	</div>
</template>

<script>
	export default {
        props:["user", "notices"],
		data() {
			return {
				activityTimeline: [
					{
						name: "Garden sprinkler",
						price: "$152.00",
						img: "/static/img/10.jpg"
					},
					{
						name: "Portable Invoice",
						price: "$152.00",
						img: "/static/img/4.jpg"
					},
					{
						name: "Walkytalky phones",
						price: "$152.00",
						img: "/static/img/3.jpg"
					}
				]
			}
		}
	}
</script>