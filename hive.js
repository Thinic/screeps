'use strict'; 

global.hive = {}; 

hive.update = function() {
    this.jobList = []; 
    this.updateRooms(); 
}

hive.updateRooms = function() {
    for (let i in Game.rooms) {
        let room = Game.rooms[i]; 
        if (room.controller && room.controller.my) {
            this.updateRoomControlled(room); 
        }
    }
}

hive.updateRoomControlled = function(room) {
    let sources = RoomUtil.getSourceCount(room); 
    
    for (let i = 0; i < sources; i++) {
        this.addJob({job: 'harvest', priority: 1000}); 
    }
}

hive.addJob = function(job) {
    job.priority = job.priority || 0; 
    this.jobList.push(job); 
}

hive.sortJobList = function() {
    this.jobList.sort((a, b) => b.priority - a.priority); 
}