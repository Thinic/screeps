var roles = require('roles'); 
var util = require('util'); 

module.exports = 
{
    name: 'Spawn', 
    
    run: function() 
    {
        let pop = _.sum(Game.creeps, c => true); 
        
        let pops = {}; 
        
        let created = false; 
        let waitForMin = false; 
        
        for (let roleName in roles) {
            pops[roleName] = _.sum(Game.creeps, c => c.memory.role === roleName);
            
            if (!created && pops[roleName] < roles[roleName].minPop) {
                waitForMin = true; 
                let name = util.createCreep(Game.spawns.Home1, roles[roleName].body, roleName, {role: roleName}); 
                if (!(name < 0)) {
                    console.log('Created ' + name + ' (' + roleName + ')'); 
                    created = true; 
                }
            }
        }
        
        // only try to spawn extras in min requirements have been met
        if (!waitForMin) {
            for (let roleName in roles) {
                if (!created && pops[roleName] < roles[roleName].maxPop) {
                    let name = util.createCreep(Game.spawns.Home1, roles[roleName].body, roleName, {role: roleName}); 
                    if (!(name < 0)) {
                        console.log('Created ' + name + ' (' + roleName + ')'); 
                        created = true; 
                    }
                }
            }
        }
        
        let str = 'T:' + pop; 
        
        for (let roleName in roles) {
            str += ' ' + roles[roleName].initial + ':' + pops[roleName] + '/' + roles[roleName].minPop + '/' + roles[roleName].maxPop; 
        }
        
        Memory.population = str; 
        
        if (Game.time % 10 == 0) 
        {
            console.log(str); 
        }
    }
}
