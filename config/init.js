'use strict'

/**
* Module dependencies
**/
const glob  = require('glob'),
      chalk = require('chalk');
      
/**
 * Module init function
 */
module.exports = function () {
    //Set the Environment Variable
    console.log(chalk.black.bgWhite('Using environment ' + process.env.NODE_ENV));
};