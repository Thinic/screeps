const JOB_HARVEST = 'harvest'; 
const JOB_SUPPLY = 'supply'; 

const COLOR = '#ff0'; 

var alt = require('role.repair'); 

module.exports = {
    initial: 'TS', 
    minPop: 0, 
    maxPop: 1, 
    body: [WORK, CARRY, CARRY, CARRY, MOVE], 
    
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
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0}); 
            if (target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                creep.withdraw(target, RESOURCE_ENERGY); 
            }
        }
        else if (creep.memory.job === JOB_SUPPLY) {
            // check for extensions first
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_TOWER && s.energy !== undefined && s.energy < s.energyCapacity && Memory.towerRequest[s.id]}); 
            
            if (!target) {
                creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_EXTENSION && s.energy !== undefined && s.energy < s.energyCapacity}); 
            }
            
            // if all extensions are good, check spawn (it can regen, fill ext's first)
            if (!target) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_SPAWN && s.energy !== undefined && s.energy < s.energyCapacity}); 
            }
            
            if (target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                creep.transfer(target, RESOURCE_ENERGY); 
            }
            else { 
                alt.run(creep); 
            }
        }
    }
}