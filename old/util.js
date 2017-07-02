module.exports = {
    createCreep: function(spawn, body, baseName, filter) {
        if (!Memory.names[baseName]) {
            Memory.names[baseName] = 1; 
        }
        
        let name = spawn.createCreep(body, '' + baseName + Memory.names[baseName], filter); 
        
        if (!(name < 0)) {
            Memory.names[baseName]++; 
        }
        
        return name; 
    }
};