const COLOR = '#f88'; 

const ROOM = 'E97N61'; 

module.exports = {
    initial: 'BR', 
    minPop: 0, 
    maxPop: 0, 
    body: [TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK], 
    
    run: function(creep) 
    {
        if (!creep.room.my) {
            let spawns = creep.room.find(FIND_HOSTILE_SPAWNS); 
            if (spawns.length > 0) {
                creep.moveTo(spawns[0], {visualizePathStyle: {stroke: COLOR}}); 
                creep.attack(spawns[0]); 
            }
            else { 
                let con = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES); 
                if (con) {
                    creep.moveTo(con, {visualizePathStyle: {stroke: COLOR}}); 
                    creep.attack(con); 
                }
                else {
                    let enemies = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS); 
                    if (enemies) {
                        creep.moveTo(enemies, {visualizePathStyle: {stroke: COLOR}}); 
                        creep.attack(enemies); 
                    }
                }
            }
            
        }
        else { 
            creep.moveTo(Game.flags.Attack1, {visualizePathStyle: {stroke: COLOR}}); 
        }
    }
}