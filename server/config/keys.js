//when you run in Heroku, env.NODE_ENV will be set automatically 
//go to heroku console, run env hahahhahah....
if (process.env.NODE_ENV === 'production'){
    //in production
    module.exports = require('./prod');
} else {
    //in dev
    module.exports = require('./dev');
}