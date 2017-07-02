'use strict'; 

require('roomutil'); 
require('hive'); 

module.exports.loop = function() {
    hive.update(); 
}