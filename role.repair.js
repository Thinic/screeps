const JOB_HARVEST = 'harvest'; 
const JOB_REPAIR = 'repair'; 

const COLOR = '#f0f'; 

var alt = require('role.build'); 

module.exports = {
    initial: 'R', 
    minPop: 0, 
    maxPop: 1, 
    body: [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 
    
    run: function(creep) 
    {
        if (creep.memory.job !== JOB_HARVEST && creep.memory.job !== JOB_REPAIR) {
            creep.memory.job = JOB_REPAIR; 
        }
        
        if (creep.memory.job === JOB_HARVEST && creep.carry.energy !== 0) {
            creep.memory.job = JOB_REPAIR; 
        }
        else if (creep.memory.job === JOB_REPAIR && creep.carry.energy === 0) {
            creep.memory.job = JOB_HARVEST; 
        }
        
        if (creep.memory.job === JOB_HARVEST) {
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0}); 
            if (target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                creep.withdraw(target, RESOURCE_ENERGY); 
            }
        }
        else if (creep.memory.job === JOB_REPAIR) {
            // repair walls only for now
            let target = undefined; 
            // let list = creep.room.find(FIND_STRUCTURES, {filter: s => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART) && s.hits != undefined && s.hits < s.hitsMax}); 
            
            // if (list.length > 0) {
            //     target = list[0]; 
            //     let targetRatio = target.hits / target.hitsMax; 
                
            //     for (let i in list) {
            //         let ratio = list[i].hits / list[i].hitsMax; 
            //         if (ratio + 5000 / 300000000 < targetRatio) {
            //             target = list[i]; 
            //             targetRatio = ratio; 
            //         }
            //     }
            // }
            
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => (s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART) && s.hits !== undefined && s.hits < s.hitsMax}); 
            
            if (!Memory.towerEnergy[creep.room.name] && target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: COLOR}}); 
                creep.repair(target); 
            }
            else { 
                alt.run(creep); 
            }
        }
    }
}