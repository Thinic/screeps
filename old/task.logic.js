var roles = require('roles'); 

module.exports = 
{
    name: 'Logic', 
    
    run: function() 
    {
        for (let name in Game.creeps) 
        {
            let creep = Game.creeps[name]; 
            let role = creep.memory.role; 
            try 
            {
                roles[role].logic.run(creep); 
            }
            catch (error) 
            {
                console.log('Error updating creep ' + name + ': ' + error); 
            }
        }
    }
}
