const JOB_HARVEST = 'harvest'; 
const JOB_SUPPLY = 'haul'; 

const COLOR = '#ff0'; 

var alt = require('role.upgrade'); 

module.exports = {
    initial: 'HL', 
    minPop: 0, 
    maxPop: 1, 
    body: [CARRY, CARRY, CARRY, CARRY, MOVE], 
    
    run: function(creep) 
    {
        if (creep.memory.job !== JOB_HARVEST && creep.memory.job !== JOB_SUPPLY) {
            creep.memory.job = JOB_SUPPLY; 
        }
        
        if (creep.memory.job === JOB_HARVEST && creep.carry.energy !== 0) {
            creep.memory.job = JOB_SUPPLY; 
        }
        else if (creep.memory.job === JOB_SUPPLY && creep.carry.energy === 0) {
            creep.memory.job = JOB_HARVEST; 
        }
        
        if (creep.memory.job === JOB_HARVEST) {
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 0}); 
            if (target) {
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                } 
            }
        }
        else if (creep.memory.job === JOB_SUPPLY) {
            // check for extensions first
            let target = creep.room.storage; 
            
            // // if spawn is good, check all other energy structures
            // if (!target) {
            //     target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => s.structureType !== STRUCTURE_SPAWN && s.energy !== undefined && s.energy < s.energyCapacity}); 
            // }
            
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                } 
            }
            else { 
                alt.run(creep); 
            }
        }
    }
}