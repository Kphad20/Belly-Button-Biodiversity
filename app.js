function Graphs(sampleID) {
    d3.json("data/samples.json").then((otuData) => {
        console.log(otuData);
        // var data = otuData.samples;
        var array = otuData.samples.filter(s => s.id == sampleID);
        var sample = array[0];
        var otu_ids = sample.otu_ids;
        var otu_labels = sample.otu_labels;
        var sample_values = sample.sample_values;
        
        // Trace for horizontal bar graph. Slice the top 10 OTUs and use reverse method to accommodate Plotly's ascending default
        var trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 OTUs found in Each Test Subject",
            xaxis: {title: "Number of OTUs"},
        };
        
        // Render horizontal bar plot
        Plotly.newPlot("bar", data1, layout1);

        // Trace for bubble graph
        var trace2 = {
            x: otu_ids,
            y: sample_values, 
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            type: "scatter"
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Present Microbes in Test Subject",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Number of OTUs"},
            showlegend: false
        };

        // Render bubble plot
        Plotly.newPlot("bubble", data2, layout2);

        // BONUS //
        //Trace for gauge
        var trace3 = {
            type: "gauge",
            'scale-r': {
            aperture:200,
            values: "0:100:20",
            center: {
                size:5,
                'background-color': "#66CCFF #FFCCFF",
                'border-color': "none"
            },
            ring: {
                size:5,
                rules: [{
                    rule: "%v >= 0 && %v <= 20",
                    'background-color': "red"
                    },
                    {rule: "%v >= 20 && %v <= 40",
                    'background-color': "orange"
                    },
                    {rule: "%v >= 40 && %v <= 60",
                    'background-color': "yellow"
                    },
                    {rule: "%v >= 60 && %v <= 80",
                    'background-color': "green"
                    },
                    {rule: "%v >= 80 && %v <=100",
                    'background-color': "blue"
                    }],
                labels: [ "Very Poor", "Poor", "Fair", "Good", "Great", "Very Great" ]
                }
            },
        plot: {
            csize: "5%",
            size: "100%",
            'background-color': "#000000"
        },
        series: [
            { values: [otuData.metadata.wfreq],
            indicator: [-10,0,0,0,0.3],
            text: "R-Base (neg value --> flat base)"}
        ]
        };
        // var trace3 = {
        //     type: 'pie',
        //     showlegend: false,
        //     hole: 0.3,
        //     rotation: 90,
        //     values: [81/5, 81/5, 81/5, 81/5, 81/5, 81],
        //     text: ['0-1','2-3','4-5','6-7','8-9'],
        //     direction: 'clockwise',
        //     textinfo: 'text',
        //     textposition: 'inside',
        //     marker: {
        //         colors: ['','','','','','white'],
        //         labels: ['0-1','2-3','4-5','6-7','8-9'],
        //         hoverinfo: 'label'
        //     }
        // };
  
        // //  Dial
        // var wfreq = otuData.metadata.wfreq
        // var degrees = 50, radius = .9
        // var radians = degrees * Math.PI / 180
        // var x = -1 * radius * Math.cos(radians) * wfreq
        // var y = radius * Math.sin(radians)
  
        var layout3 = {
        //     shapes: [{
        //     type: 'line',
        //     x0: 0.5,
        //     y0: 0.5,
        //     x1: 0.6,
        //     y1: 0.6,
        //     line: {
        //         color: 'black',
        //         width: 3
        //     }
        //     }],
            title: 'Belly Button Washing Frequency'};
            // xaxis: {visible: false, range: [-1, 1]},
        //     yaxis: {visible: false, range: [-1, 1]}
        // };
  
        var data3 = [trace3];
  
        Plotly.plot('gauge', data3, layout3);
    });
};

// Filter demographic info
function demographData(sampleId) {
    d3.json("data/samples.json").then((otuData) => {
        // var metadata = otuData.metadata;
        var demoArray = otuData.metadata.filter(m => m.id == sampleId);
        var result = demoArray[0];
        // var panel = d3.select("#sample-metadata");
        d3.select("#sample-metadata").html("");

        Object.entries(result).forEach(([key, value]) => {
            var display = `${key}: ${value}`;
            var panel = d3.select("#sample-metadata")
            panel.append("p").text(display);
        });
    });
};

//Function to filter data on dashboard when Test Subject ID dropdown is selected
function optionChanged(sampleID) {
    Graphs(sampleID);
    demographData(sampleID);
};

// Initialize the page with default graphs and demographics info
function init() {
    var selection = d3.select("#selDataset");
    d3.json("data/samples.json").then((otuData) => {
        var names = otuData.names;
        names.forEach((sampleId) => {
            selection.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });
        var sampleId = names[0];
        Graphs(sampleId);
        demographData(sampleId)
    });
};

init();