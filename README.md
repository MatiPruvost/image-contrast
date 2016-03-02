# image-contrast

image-contrast helps you to apply contrast in a group of images automatically.

## Requisites
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node](https://nodejs.org/en/download/)

## Installation

Clone the repository:
- `$ git clone git@github.com:MatiPruvost/image-contrast.git`

Install dependencies:
- `$ npm install`

## Run image-contrast

`$ node index.js -i "input directory" -o "Output directory" -c "Contrast value"`

### Options

    -h, --help                output usage information
    -V, --version             output the version number
    -i, --input [directory]   The input directory. Example: input/
    -o, --output [directory]  The output directory. Example: output/
    -c, --contrast [number]   The contrast value. Always has to be a positive number. Default value is -2
    -n, --negative            If you want to use a negative contrast
