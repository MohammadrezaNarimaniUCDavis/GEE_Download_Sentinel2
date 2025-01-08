
# GEE Download Sentinel2

This repository contains a Google Earth Engine (GEE) script designed to facilitate dynamic visualization and analysis of Sentinel-2 imagery. Users can draw polygons over areas of interest on the map, visualize true color imagery, and export the data within the polygon to Google Drive.

![Sample Area of Interest](Sample_AOI.png)

## Features

- **Interactive Mapping**: Visualize Sentinel-2 true color imagery on a dynamic map.
- **Polygon Drawing**: Users can draw polygons to define their areas of interest.
- **Image Export**: Export the selected area's imagery directly to Google Drive.

## Getting Started

### Prerequisites

Ensure you have access to Google Earth Engine. You can sign up for an account [here](https://signup.earthengine.google.com/).

### Usage Guide

1. **Open the Script**: Navigate to the GEE code editor and then, copy and paste the [`GEE_Download_Sentinel2.js`](./GEE_Download_Sentinel2.js) script.
2. **Set Date Range**: Modify the date range in the script to filter the Sentinel-2 images to your specific timeframe.
   ```javascript
   .filterDate('start-date', 'end-date')
   ```
3. **Draw a Polygon**: Use the polygon tool in the GEE map viewer to draw a polygon over your area of interest.
4. **Download Data**: Click the 'Download Data' button to export the imagery of the drawn polygon to your Google Drive.
5. **Clear Drawing**: Use the 'Clear Drawing' button to remove the drawn polygon and start anew.

### Script Functions

- **maskS2clouds**: Masks clouds in the Sentinel-2 imagery using the QA60 band.
- **Visualization Parameters**: Set visualization parameters for displaying the Sentinel-2 data.
- **Exporting**: Configurations for exporting the image, including scale, resolution, and file format.

## Example

The following example shows a typical workflow for a user:

1. Set the visualization parameters.
2. Draw the area of interest on the map.
3. Export the selected area's data to Google Drive.

```javascript
// Example of setting visualization parameters
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2']
};
```

## Additional Resources

For more information on Google Earth Engine, visit the [official documentation](https://developers.google.com/earth-engine).

## Acknowledgments

This script and its functionalities are developed in collaboration with the Digital Agriculture Laboratory at the University of California, Davis. For more information about the lab and its projects, visit [Digital Agriculture Laboratory](https://digitalag.ucdavis.edu/).

## Contact

For questions or support, please contact [Mohammadreza Narimani](mailto:mnarimani@ucdavis.edu).
