# Plot.ly-Challenge

In this assignment, I will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1 - Plot.ly
<br/>1. Use the D3 library to read in samples.json.
<br/>2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
<br/>- Use sample_values as the values for the bar chart.
<br/>- Use otu_ids as the labels for the bar chart.
<br/>- Use otu_labels as the hovertext for the chart.
<br/>3. Create a bubble chart that displays each sample.
<br/>- Use otu_ids for the x values.
<br/>- Use sample_values for the y values.
<br/>- Use sample_values for the marker size.
<br/>- Use otu_ids for the marker colors.
<br/>- Use otu_labels for the text values.
<br/>4. Display the sample metadata, i.e., an individual's demographic information.
<br/>5. Display each key-value pair from the metadata JSON object somewhere on the page.
<br/>6. Update all of the plots any time that a new sample is selected.

## Advanced Challenge Assignment (Bonus)
The following task is advanced and therefore optional.
<br/>- Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
<br/>- I will need to modify the example gauge code to account for values ranging from 0 through 9.
<br/>- Update the chart whenever a new sample is selected.
