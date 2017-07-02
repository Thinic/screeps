module.exports = 
{
    name: 'GC', 
    
    run: function() {
        for (let name in Memory.creeps)
        {
            if (Game.creeps[name] === undefined)
            {
                console.log('Deleted ' + name + ' (' + Memory.creeps[name].role + ')');
                delete Memory.creeps[name];
            }
        }
    }
}