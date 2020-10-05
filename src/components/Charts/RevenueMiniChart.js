import { Bar } from 'vue-chartjs'
import ChartConfig from 'Constants/ChartConfig';

export default {
    extends: Bar,
    props:["labels", "dataSets"],
    data: function () {
        return {
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            scales: {
            yAxes: [{
                display: false,
                beginAtZero:true
            }],
            xAxes: [{
                barPercentage: 1,
                display: false,
                beginAtZero:true,
                precision:1
            }]
            }
        }
        }
    },
    mounted() {
        console.log("ene l grafica");
        console.log(this.labels);
        console.log(this.dataSets);
        this.renderChart({
            labels: this.labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Usuarios',
                    backgroundColor: ChartConfig.color.white,
                    data: this.dataSets
                }
            ]
        }, this.options)
    }
}