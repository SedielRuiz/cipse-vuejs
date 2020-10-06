<template>
    <div>
        <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
        >
            <div v-for="(image, index) in images" :key="index">

                <b-carousel-slide
                    v-if="image.path"
                    :caption="image.caption"
                    :text="image.text"
                    :img-src="image.path"
                    :img-alt="image.caption"
                ></b-carousel-slide>

                <!-- Slide with blank fluid image to maintain slide aspect ratio -->
                <b-carousel-slide v-else caption="Blank Image" img-blank img-alt="Blank image">
                </b-carousel-slide>
            </div>

        </b-carousel>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                slide: 0,
                sliding: null,
                images:[
                    {
                        caption:"Primera",
                        text:"Description corta",
                        path:"/static/img/carousel/img-1.jpg",
                    },
                    {
                        caption:"Segunda",
                        text:"Description corta",
                        path:"/static/img/carousel/img-2.jpg",
                    },
                    {
                        caption:"Tercera",
                        text:"Description corta",
                        path:"/static/img/carousel/img-4.jpg",
                    }
                ]
            }
        },
        methods: {
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            }
        }
    }
</script>