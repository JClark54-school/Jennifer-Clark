"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const chart_js_1 = require("chart.js");
let ChartsComponent = class ChartsComponent {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ionViewDidLoad() {
        // AJP-SECTION GetChartCall -->
        this.myChart = this.getMyChart();
        this.barChart = this.getBarChart();
        this.doughnutChart = this.getDoughnutChart();
        this.lineChart = this.getLineChart();
        this.radarChart = this.getRadarChart();
        this.pieChart = this.getPieChart();
        this.polarAreaChart = this.getPolarAreaChart();
        this.bubbleChart = this.getBubbleChart();
        this.mixedChart = this.getMixedChart();
    }
    getChart(context, chartType, data, options) {
        return new chart_js_1.default(context, {
            type: chartType,
            data: data,
            options: options
        });
    }
    // AJP-SECTION GetChartImplementation -->
    getMyChart() {
        let data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
        };
        let options = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        return this.getChart(this.myCanvas.nativeElement, "bar", data, options);
    }
    getMixedChart() {
        let data = {
            labels: ['Item 1', 'Item 2', 'Item 3'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Bar Component',
                    data: [10, 20, 30],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
                {
                    type: 'line',
                    label: 'Line Component',
                    data: [30, 20, 10],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                }
            ]
        };
        return this.getChart(this.mixedCanvas.nativeElement, "bar", data);
    }
    getPieChart() {
        let data = {
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
                }
            ]
        };
        return this.getChart(this.pieCanvas.nativeElement, "pie", data);
    }
    getPolarAreaChart() {
        let data = {
            datasets: [{
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
                    label: 'My dataset'
                }],
            labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
        };
        let options = {
            elements: {
                arc: {
                    borderColor: "#000000"
                }
            }
        };
        return this.getChart(this.polarCanvas.nativeElement, "polarArea", data, options);
    }
    getBubbleChart() {
        let data = {
            datasets: [
                {
                    label: 'First Dataset',
                    data: [
                        { x: 20, y: 30, r: 15 },
                        { x: 40, y: 10, r: 10 },
                    ],
                    backgroundColor: "#FF6384",
                    hoverBackgroundColor: "#FF6384",
                }
            ]
        };
        let options = {
            elements: {
                points: {
                    borderWidth: 1,
                    borderColor: 'rgb(0, 0, 0)'
                }
            }
        };
        return this.getChart(this.bubbleCanvas.nativeElement, "bubble", data, options);
    }
    getRadarChart() {
        let data = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "rgba(179,181,198,0.2)",
                    borderColor: "rgba(179,181,198,1)",
                    pointBackgroundColor: "rgba(179,181,198,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(179,181,198,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    pointBackgroundColor: "rgba(255,99,132,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(255,99,132,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
        let options = {
            scale: {
                reverse: true,
                ticks: {
                    beginAtZero: true
                }
            }
        };
        return this.getChart(this.radarCanvas.nativeElement, "radar", data, options);
    }
    getDoughnutChart() {
        let data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
                }]
        };
        return this.getChart(this.doughnutCanvas.nativeElement, "doughnut", data);
    }
    getBarChart() {
        let data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
        };
        let options = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
    }
    getLineChart() {
        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                },
                {
                    label: "My Second dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(175,92,192,0.4)",
                    borderColor: "rgba(31,156,156,1)",
                    borderCapStyle: 'butt',
                    borderDash: [5, 8],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(31,156,156,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(31,156,156,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [15, 39, 50, 81, 51, 55, 30],
                    spanGaps: false,
                }
            ]
        };
        return this.getChart(this.lineCanvas.nativeElement, "line", data);
    }
};
__decorate([
    core_1.ViewChild('myCanvas')
], ChartsComponent.prototype, "myCanvas", void 0);
__decorate([
    core_1.ViewChild('barCanvas')
], ChartsComponent.prototype, "barCanvas", void 0);
__decorate([
    core_1.ViewChild('doughnutCanvas')
], ChartsComponent.prototype, "doughnutCanvas", void 0);
__decorate([
    core_1.ViewChild('lineCanvas')
], ChartsComponent.prototype, "lineCanvas", void 0);
__decorate([
    core_1.ViewChild('radarCanvas')
], ChartsComponent.prototype, "radarCanvas", void 0);
__decorate([
    core_1.ViewChild('polarCanvas')
], ChartsComponent.prototype, "polarCanvas", void 0);
__decorate([
    core_1.ViewChild('pieCanvas')
], ChartsComponent.prototype, "pieCanvas", void 0);
__decorate([
    core_1.ViewChild('bubbleCanvas')
], ChartsComponent.prototype, "bubbleCanvas", void 0);
__decorate([
    core_1.ViewChild('mixedCanvas')
], ChartsComponent.prototype, "mixedCanvas", void 0);
ChartsComponent = __decorate([
    core_1.Component({
        selector: 'page-charts',
        templateUrl: 'charts.html'
    })
], ChartsComponent);
exports.ChartsComponent = ChartsComponent;
//# sourceMappingURL=charts.component.js.map