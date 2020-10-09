const db = require('../db-config');


module.exports = {
    findProjects,
    findTasks,
    findResources,
    findResourceById,
    findTaskById,
    findProjectById,
    findResourcesByProject,
    findTasksByProject,
    addResource,
    addTask,
    addProject,
}

function findProjects () {
    return db('projects');
}

function findTasks (){
    return db('tasks');
}

function findResources(){
    return db('resources');
}
function findProjectById (id) {
    return db('projects').where({id}).first();
}

function findTaskById (id) {
    return db('tasks').where({id}).first();
}

function findResourceById (id) {
    return db('resources').where({id}).first();
}

function findTasksByProject(id) {
    return db('tasks').where({project_id: id})
        .join('projects', 'projects.id', '=', 'tasks.project_id')
        .then(project => {
            if (project) return project;
            return null;
        })
}

function findResourcesByProject(id) {
    return db('projects').where(id)
        .join('resources', 'resources.id', '=', 'projects.resource_id')
        .then(projects => {
            if (projects) return project;
            return null;
        })
}

function addProject(project){
    return db('projects').insert(project, 'id')
        .then(id => {
            findProjectById(id);
        })
}

function addTask(task){
    return db('tasks').insert(task, 'id')
        .then(id => {
            findTaskById(id);
        })
}

function addResource(resource){
    return db('resources').insert(resource, 'id')
        .then(id => {
            findResourceById(id);
        })
}