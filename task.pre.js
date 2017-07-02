module.exports = {
    name: 'Pre', 
    
    run: function() {
        let list = ['supply', 'upgrade', 'harvest', 'repair', 'build', 'undefined']; 
        
        for (let i in list) {
            let word = list[i]; 
            if (Memory[word]) {
                Memory.names[word] = Memory[word]; 
            }
        }
    }
}; 