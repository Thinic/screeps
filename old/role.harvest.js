const JOB_HARVEST = 'harvest'; 
const JOB_TRANSFER = 'transfer'; 

const COLOR = '#000'; 

var alt = require('role.upgrade'); 

module.exports = {
    initial: 'H', 
    minPop: 2, 
    maxPop: 2, 
    body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], 
    
    run: function(creep) {
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
            let target = creep.pos.findClosestByPath(FIND_SOURCES); 
            if (target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                creep.harvest(target); 
            }
        }
        else if (creep.memory.job === JOB_TRANSFER) {
            // let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_EXTENSION && s.energy < s.energyCapacity)}); 
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => ((s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] < s.storeCapacity)}); 
            if (target) {
                let status = creep.transfer(target, RESOURCE_ENERGY); 
                if (status === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}});     
                }
            }
            else { 
                alt.run(creep); 
            }
        }
    }
}; 