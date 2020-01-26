const purple = '#5e72e4';
const green = '#2dce89';
const red = '#f5365c';
const orange = '#fb6340';
const blue = '#11cdef';
const dark = '#172b4d';



new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        labels: ["Bicycle Lane", "Path"],
        datasets: [
            {
                label: "Plan cluster 1",
                backgroundColor: purple,
                data: [849, 160]
            }, {
                label: "Plan cluster 2",
                backgroundColor: blue,
                data: [0, 179]
            }, {
                label: "Plan cluster 3",
                backgroundColor: red,
                data: [0, 464]
            }
        ]
    },
    options: {
        title: {
            display: false,
            text: 'area features'
        },
        legend: {
            position: "bottom"
        }
    }
});

new Chart(document.getElementById("bar-chart1"), {
    type: 'bar',
    data: {
        labels: ["Natural area", "Playground", "Community garden", "Sports area", "Lawn"],
        datasets: [
            {
                label: "Plan cluster 1",
                backgroundColor: purple,
                data: [3936, 547, 1433, 0, 553]
            }, {
                label: "Plan cluster 2",
                backgroundColor: blue,
                data: [4454, 0, 2209, 0, 853]
            }, {
                label: "Plan cluster 3",
                backgroundColor: red,
                data: [0, 2028, 0, 5353, 2673]
            }
        ]
    },
    options: {
        title: {
            display: false,
            text: 'Population growth (millions)'
        },
        legend: {
            position: "bottom"
        }
    }
});


new Chart(document.getElementById("bar-chart2"), {
    type: 'bar',
    data: {
        labels: ["Bench", "Drinking water", "Tree"],
        datasets: [
            {
                label: "Plan cluster 1",
                backgroundColor: purple,
                data: [6, 1, 0]
            }, {
                label: "Plan cluster 2",
                backgroundColor: blue,
                data: [10, 4, 10]
            }, {
                label: "Plan cluster 3",
                backgroundColor: red,
                data: [2, 4, 3]
            }
        ]
    },
    options: {
        title: {
            display: false,
            text: 'Population growth (millions)'
        },
        legend: {
            position: "bottom"
        }
    }
});



new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [{
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: "Africa",
            backgroundColor: blue,
            borderColor: blue,
            fill: false
        }, {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: "Asia",
            backgroundColor: purple,
            borderColor: purple,
            fill: false
        }, {
            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
            label: "Europe",
            backgroundColor: green,
            borderColor: green,
            fill: false
        }, {
            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
            label: "Latin America",
            backgroundColor: red,
            borderColor: red,
            fill: false
        }, {
            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
            label: "North America",
            backgroundColor: orange,
            borderColor: orange,
            fill: false
        }
        ]
    },
    options: {
        legend: {
            display: true,
            position: 'bottom'
        },
        title: {
            display: false,
            text: 'World population per region (in millions)'
        }
    }
});



new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
        labels: ["Natural area", "Playground", "Community garden", "Sports area", "Lawn"],
        datasets: [{
            label: "Area sq. meters",
            backgroundColor: [green, purple, blue, red, orange],
            data: [2796, 858, 1214, 1784, 1360]
        }]
    },
    options: {
        legend: {
            display: true,
            position: 'left'
        },
        title: {
            display: false,
            text: 'Predicted world population (millions) in 2050'
        }
    }
});


new Chart(document.getElementById("bar-chart-horizontal"), {
    type: 'horizontalBar',
    data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
            {
                label: "Population (millions)",
                backgroundColor: [blue, purple, green, red, orange],
                data: [2478, 5267, 734, 784, 433]
            }
        ]
    },
    options: {
        legend: { display: false },
        title: {
            display: false,
            text: 'Predicted world population (millions) in 2050'
        }
    }
});

new Chart(document.getElementById("bubble-chart"), {
    type: 'bubble',
    data: {
        labels: "Africa",
        datasets: [
            {
                label: ["China"],
                backgroundColor: purple,
                borderColor: purple,
                data: [{
                    x: 21269017,
                    y: 5.245,
                    r: 15
                }]
            }, {
                label: ["Denmark"],
                backgroundColor: blue,
                borderColor: blue,
                data: [{
                    x: 258702,
                    y: 7.526,
                    r: 10
                }]
            }, {
                label: ["Germany"],
                backgroundColor: red,
                borderColor: red,
                data: [{
                    x: 3979083,
                    y: 6.994,
                    r: 15
                }]
            }, {
                label: ["Japan"],
                backgroundColor: green,
                borderColor: green,
                data: [{
                    x: 4931877,
                    y: 5.921,
                    r: 15
                }]
            }
        ]
    },
    options: {
        title: {
            display: false,
            text: 'Predicted world population (millions) in 2050'
        }, scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Happiness"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "GDP (PPP)"
                }
            }]
        }
    }
});