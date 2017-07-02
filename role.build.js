const JOB_HARVEST = 'harvest'; 
const JOB_BUILD = 'build'; 

const COLOR = '#f00'; 

var alt = require('role.upgrade'); 

module.exports = {
    initial: 'B', 
    minPop: 0, 
    maxPop: 1, 
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], 
    
    run: function(creep) 
    {
        if (creep.memory.job !== JOB_HARVEST && creep.memory.job !== JOB_BUILD) {
            creep.memory.job = JOB_BUILD; 
        }
        
        if (creep.memory.job === JOB_HARVEST && creep.carry.energy !== 0) {
            creep.memory.job = JOB_BUILD; 
        }
        else if (creep.memory.job === JOB_BUILD && creep.carry.energy === 0) {
            creep.memory.job = JOB_HARVEST; 
        }
        
        if (creep.memory.job === JOB_HARVEST) {
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0}); 
            if (target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                creep.withdraw(target, RESOURCE_ENERGY); 
            }
        }
        else if (creep.memory.job === JOB_BUILD) {
            let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES); 
            if (target) {
                if (creep.build(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                } 
            }
            else { 
                // there is no target to build, 
                // default to upgrading
                alt.run(creep); 
            }
        }
    }
}