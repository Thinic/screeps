const JOB_HARVEST = 'harvest'; 
const JOB_TRANSFER = 'transfer'; 

const COLOR = '#fff'; 

var alt = require('role.upgrade'); 

module.exports = {
    initial: 'LRH', 
    minPop: 0, 
    maxPop: 4, 
    body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 
    
    run: function(creep) {
        if (!creep.memory.remoteRuns) { 
            creep.memory.remoteRuns = 0; 
        }
        
        if (creep.memory.job !== JOB_HARVEST && creep.memory.job !== JOB_TRANSFER) {
            creep.memory.job = JOB_TRANSFER; 
        }
        
        if (creep.memory.job === JOB_HARVEST && creep.carry.energy === creep.carryCapacity) {
            creep.memory.job = JOB_TRANSFER; 
        }
        else if (creep.memory.job === JOB_TRANSFER && creep.carry.energy === 0) {
            creep.memory.job = JOB_HARVEST; 
        }
        
        if (creep.memory.job === JOB_HARVEST) {
            creep.moveTo(Game.flags.ExternalSource, {visualizePathStyle: {stroke: COLOR}}); 
            let target = creep.pos.findClosestByPath(FIND_SOURCES); 
            if (target) {
                creep.harvest(target); 
            }
        }
        else if (creep.memory.job === JOB_TRANSFER) {
            if (creep.room !== Game.rooms['E99N61']) { 
                creep.moveTo(Game.rooms['E99N61'].controller, {visualizePathStyle: {stroke: COLOR}}); 
            }
            else { 
                let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => ((s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] < s.storeCapacity)}); 
                if (target) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                    let status = creep.transfer(target, RESOURCE_ENERGY); 
                    if (status === 0) {
                        if (creep.memory.remoteRuns) { 
                            creep.memory.remoteRuns++; 
                        }
                        else { 
                            creep.memory.remoteRuns = 1; 
                        }
                    }
                }
                else { 
                    alt.run(creep); 
                }
            }
        }
    }
}; 