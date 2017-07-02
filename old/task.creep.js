var roles = require('roles'); 
var roleUnknown = require('role.unknown'); 

module.exports = {
    name: 'creep', 
    
    run: function() {
        for (let i in Game.creeps) {
            let creep = Game.creeps[i]; 
            let role = roles[creep.memory.role]; 
            if (role) {
                role.run(creep); 
            }
            else {
                roleUnknown.run(creep); 
            }
        }
    }
};