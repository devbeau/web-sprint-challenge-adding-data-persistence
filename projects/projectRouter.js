const express = require('express');

const Projects = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.findProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to get projects'});
        })
})

router.get('/:id/tasks', (req, res) => {
    Projects.findTasksByProject(req.params.id)
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to get tasks'});
        })
})

router.get('/resources', (req, res) => {
    Projects.findResources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to get resources'});
        })
})

router.post('/', (req, res) => {
    Projects.addProject(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to add project'});
        })
})

router.post('/:id/tasks', (req, res) => {
    Projects.addTask({...req.body, project_id: req.params.id})
        .then(task => {
            res.status(200).json(task)
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to add task.'});
        })
})

router.post('/:id/resources', (req, res) => {
    Projects.addResource(req.body)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to add resource.'});
        })
})

module.exports = router;