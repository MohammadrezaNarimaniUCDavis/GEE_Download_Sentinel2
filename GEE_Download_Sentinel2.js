/*****************************************************
 * University of California, Davis - Digital Agriculture Laboratory
 * Developers: Mohammadreza Narimani
 *
 * Description:
 * This application operates within Google Earth Engine (GEE) to facilitate dynamic visualization and analysis of Sentinel-2 imagery.
 * Users can load the Sentinel-2 dataset, draw a polygon over any area of interest, and download the clipped image data for further analysis.
 *
 * Key Functionalities Include:
 * 1. Interactive Mapping: Users can visualize Sentinel-2 true color imagery.
 * 2. Drawing Tool: Users can draw a polygon over their area of interest.
 * 3. Image Export: Allows users to export the image inside the drawn polygon to Google Drive.
 *
 * The app uses the Sentinel-2 dataset provided by Copernicus.
 *
 * Visit our lab for more information: https://digitalag.ucdavis.edu/
 *****************************************************/

// Function to mask clouds using the Sentinel-2 QA band
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask).divide(10000);
}

// Import the Sentinel-2 dataset
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2024-10-01', '2024-11-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);

var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};

// Set map center
Map.setCenter(-121.7415, 38.5449, 12);
Map.addLayer(dataset.mean(), visualization, 'True Color');

// Create a Drawing Tool for Polygon
var drawingTools = Map.drawingTools();
drawingTools.setShown(true);
drawingTools.setDrawModes(['polygon']);

// Add a button to clear the drawing
var clearButton = ui.Button('Clear Drawing', function() {
  drawingTools.layers().forEach(function(layer) {
    drawingTools.layers().remove(layer);
  });
  print('Drawing cleared.');
});

// Add a button to export the data
var exportButton = ui.Button('Download Data', function() {
  var layers = drawingTools.layers();
  if (layers.length() > 0) {
    var geometry = layers.get(0).getEeObject();
    var clippedImage = dataset.mean().clip(geometry);
    Export.image.toDrive({
      image: clippedImage,
      description: 'Sentinel2_Exported_Image',
      folder: 'EarthEngine',
      fileNamePrefix: 'Sentinel2_Export',
      scale: 10,  // Export resolution in meters
      region: geometry,
      maxPixels: 1e9
    });
    print('Export task has been added to Tasks tab in the Code Editor.');
  } else {
    print('No geometry drawn!');
  }
});

// Add buttons to the map
Map.add(clearButton);
Map.add(exportButton);

// Function to handle export task
function showExportTask(geometry) {
  var clippedImage = dataset.mean().clip(geometry);
  Export.image.toDrive({
    image: clippedImage,
    description: 'Sentinel2_Exported_Image',
    folder: 'EarthEngine',
    fileNamePrefix: 'Sentinel2_Export',
    scale: 10,  // Export resolution in meters
    region: geometry,
    maxPixels: 1e9
  });
  print('Export task has been added to Tasks tab in the Code Editor.');
}
