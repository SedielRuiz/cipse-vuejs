import { Bar } from 'vue-chartjs'
import ChartConfig from 'Constants/ChartConfig';

export default {
	extends: Bar,
	props:["label", "labels", "dataSet", "type"],
	data: function () {
		return {
			options: {
				width: this.width,
				height: this.height,
				responsive: true,
				maintainAspectRatio: true,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							padding: 20,
						},
						gridLines: {
							display: true,
							drawBorder: false
						},
					}],
					xAxes: [{
						ticks: {
							padding: 10
						},
						barPercentage: 1,
						gridLines: {
							display: true,
							drawBorder: false
						}
					}]
				},
				legend: {
					position: 'top',
					labels: {
						fontSize: 12,
						usePointStyle: true
					}
				},
				maintainAspectRatio: true,
				responsive: true,
			}
		}
	},
	mounted() {
		const { danger, white, primary } = ChartConfig.color;
		if(this.type == "single"){
			var data = [
				{
					type: 'bar',
					label: this.label,
					backgroundColor: primary,
					data: this.dataSet
				}
			];
		}else{
			var data = this.dataSet;
		}
		
		this.renderChart({
			labels: this.labels,
			datasets: data
		}, this.options)
	}
}