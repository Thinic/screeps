module.exports = {
    name: 'Tower', 
    
    run: function() {
        Memory.towerEnergy = {}; 
        
        if (!Memory.towerRequest) {
            Memory.towerRequest = {}; 
        }
        
        let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER); 
        
        for (let i in towers) {
            let tower = towers[i]; 
            
            if (tower.energy > 0) {
                Memory.towerEnergy[tower.room.name] = true; 
            }
            
            if (tower.energy / tower.energyCapacity < 0.4) {
                Memory.towerRequest[tower.id] = true; 
            }
            
            if (tower.energy === tower.energyCapacity) {
                delete Memory.towerRequest[tower.id]; 
            }
            
            let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS); 
            if (target) {
                tower.attack(target); 
            }
            else {
                target = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: s => s.structureType !== STRUCTURE_WALL && s.hits != undefined && s.hits < s.hitsMax}); 
                
                // if (!target) {
                //     target = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: s => s.hits != undefined && s.hits < s.hitsMax}); 
                // }
                
                if (target) {
                    tower.repair(target); 
                }
            }
        }
    }
};