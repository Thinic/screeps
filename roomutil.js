'use strict'; 

global.RoomUtil = {}; 

RoomUtil.getSourceCount = function(room) {
    return room.find(FIND_SOURCES).length; 
}