<template>
    <bar-chart v-if="data.length > 0 && labels.length > 0" class="overflow-hide h-100" 
                :width="200" :height="100" :label=label :dataSet=data :labels=labels>
    </bar-chart>
</template>

<script>
    import BarChart from "Components/Charts/BarChart";

    export default {
        props:["data", "labels", "label"],
        name: 'observatory-detail',
        components:{
            BarChart
        },
        data () {
            return {
            }
        },
        mounted () {
            
        },
    }
</script>