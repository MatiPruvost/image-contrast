var fs = require('fs');
var path = require('path');
var async = require('async');
var program = require('commander');
var gm = require('gm');
var dir = require('node-dir');

program
  .version('0.0.1')
  .description('Change the contrast to a group of images')
  .option('-i, --input [directory]', 'The input directory. Example: input/')
  .option('-o, --output [directory]', 'The output directory. Example: output/')
  .option('-c, --contrast [number]', 'The contrast value. Always has to be a positive number. Default value is -2', -2)
  .option('-n, --negative', 'If you want to use a negative contrast')
  .parse(process.argv);

var files;

// Get the path for each file into the directory given
var getFiles = function(callback){
  dir.files(program.input, function(err, paths) {
    if (err) {
      throw err;
    }
    files = paths;
    callback(null, 'done');
  });
};

// Apply contrast on each image and save it on a new image
var applyContrast = function(callback){
  // Process each image at a time
  async.eachSeries(files, function iteratee(file, callbackEach) {
    processImage(file, callbackEach)
  }, function done() {
    callback(null, 'done');
  });
};

// Apply contrast on a image and save it into a given directory
var processImage = function(file, callback) {
  var newPath = program.output + path.basename(file);
  gm(file)
  .contrast(program.contrast)
  .autoOrient()
  .write(newPath, function (err) {
    if(!err) {
      console.log(file + " is done");
      // Execute the callback when the image is already saved
      callback();
    }
    if(err) {
      throw err;
    }
  });
};

var execute = function(){
  // First get all path of images, then apply contrast and save new images
  async.series({
    getPaths: function(callback){
      getFiles(callback);
    },
    contrast: function(callback){
      applyContrast(callback);
    }
  },
  // Execute the callback when each function is done
  function(err, results){
    if(err) {
      throw err;
    }
  });
};

var validations = function(){
  // Validate if the user gives directories
  if (program.input && program.output){
    // Validate if directories given already exist
    if (fs.existsSync(program.input) && fs.existsSync(program.output)) {
      // User needs a negative contrast
      if(program.negative){
        program.contrast = -Math.abs(program.contrast)
      }
      return true;
    }
    else{
      return "Input and output directory must exist. Run 'node index.js -h' for help.";
    }
  }
  else {
    return "Input and output directory are required. Run 'node index.js -h' for help.";
  }
};

var validation = validations();
if(validation === true){
  execute();
}
else{
  console.log(validation)
}
