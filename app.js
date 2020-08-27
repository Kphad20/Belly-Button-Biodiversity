function Graphs(sampleID) {
    d3.json("data/samples.json").then((otuData) => {
        console.log(otuData);
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
    });
};

// BONUS //
function Gauge(sampleID) {
    d3.json("data/samples.json").then((otuData) => {
        var wfreq = otuData.metadata.find(data => data.id.toString() === sampleID).wfreq
        
        //Trace for gauge
        var trace3 = {
            type: "indicator",
            mode: "gauge+number",
            value: wfreq,
            title: {text: "Belly Button Washing Frequency", font: {size: 20}},
            gauge: {
                axis: {range: [0, 9], tickwidth: 2, tickcolor: "black"},
                bar: {color: "darkblue"},
                bgcolor: "red",
                borderwidth: 2,
                bordercolor: "black",
                steps: [
                  {range: [0, 1], color: "#33BEFF"},
                  {range: [1, 2], color: "#33ACFF"},
                  {range: [2, 3], color: "#339FFF"},
                  {range: [3, 4], color: "#3390FF"},
                  {range: [4, 5], color: "#337AFF"},
                  {range: [5, 6], color: "#3364FF"},
                  {range: [6, 7], color: "#334CFF"},
                  {range: [7, 8], color: "#3633FF"},
                  {range: [8, 9], color: "#4C33FF"}
                ],
                threshold: {
                  line: {color: "red", width: 4},
                  thickness: 0.75,
                  value: wfreq
                }
            }
        };
        
        var data3 = [trace3];

        var layout3 = {
            width: 550,
            height: 350,
            margin: {t: 25, b: 25},
            paper_bgcolor: "white",
            font: {color: "auto", family: "Arial"}
        };
    
        Plotly.plot("gauge", data3, layout3);
    });
};

// Filter demographic info
function demographData(sampleId) {
    d3.json("data/samples.json").then((otuData) => {
        var demoArray = otuData.metadata.filter(m => m.id == sampleId);
        var result = demoArray[0];
        d3.select("#sample-metadata").html("");
        // Grab all key, values in metadata to display
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
    Gauge(sampleID)
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
        demographData(sampleId);
        Gauge(sampleID)
    });
};

init();