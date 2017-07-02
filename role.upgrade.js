const JOB_HARVEST = 'harvest'; 
const JOB_UPGRADE = 'upgrade'; 

const COLOR = '#00f'; 

module.exports = {
    initial: 'U', 
    minPop: 0, 
    maxPop: 0, 
    body: [WORK, WORK, CARRY, MOVE], 
    
    run: function(creep) 
    {
        if (creep.memory.job !== JOB_HARVEST && creep.memory.job !== JOB_UPGRADE) {
            creep.memory.job = JOB_UPGRADE; 
        }
        
        if (creep.memory.job === JOB_HARVEST && creep.carry.energy !== 0) {
            creep.memory.job = JOB_UPGRADE; 
        }
        else if (creep.memory.job === JOB_UPGRADE && creep.carry.energy === 0) {
            creep.memory.job = JOB_HARVEST; 
        }
        
        if (creep.memory.job === JOB_HARVEST) {
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0}); 
            if (target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                creep.withdraw(target, RESOURCE_ENERGY); 
            }
        }
        else if (creep.memory.job === JOB_UPGRADE) {
            let target = creep.room.controller; 
            if (target) {
                if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                }
            }
        }
    }
}