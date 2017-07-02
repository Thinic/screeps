var tasks = [
    require('task.pre'), 
    require('task.gc'), 
    require('task.tower'), 
    require('task.spawn'), 
    require('task.creep'), 
    require('task.post')
]; 

module.exports = 
{
    loop: function() {
		console.log('test'); 
        tasks.forEach(function(task) {
            try { task.run(); } catch (error) {
                console.log('Error with task ' + task.name + ': ' + error + ' \n' + error.stack); 
            } 
        }); 
    }
}
