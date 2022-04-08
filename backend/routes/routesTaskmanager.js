const express = require('express');
const router = express.Router();

//Load in the mongoose models
const { List, Task } = require('../models');

// get all lists
router.get('/', async(req, res) => {
    const allLists = await List.find();
    res.send(allLists);
});

// get one list via id
router.get('/:id', async(req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        res.send(list);
    } catch {
        res.status(404);
        res.send({
            error: "List does not exist!"
        });
    }
})

// post one list --> purpose create a list
router.post('/', async(req, res) => {
    const newList = new List({
        title: req.body.title
    })
    await newList.save();
    res.send(newList);
});
 
// update one list
router.patch('/:id', async(req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id })

        if (req.body.title) {
            list.title = req.body.title
        }

        await List.updateOne({ _id: req.params.id }, list);
        res.send(list)
    } catch {
        res.status(404)
        res.send({ error: "List does not exist!" })
    }
});

// delete one list via id
router.delete('/:id', async(req, res) => {
    try {
        await List.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "List does not exist!" })
    }
});

// return all tasks that belong to a specific list (via listId) 
router.get('/:listId/tasks', async(req, res) => {
    const allTasks = await Task.find({
        _listId: req.params.listId });
        res.send(allTasks);   
});

// return one specific task (via taskId)
router.get('/:listId/tasks/:taskId', async(req, res) => {
    try {
        const task = await Task.findOne({ 
            _id: req.params.taskId, 
            _listId: req.params.listId });
        res.send(task);
    } catch {
        res.status(404);
        res.send({
            error: "Task does not exist!"
        });
    }
})

// create a new task in a list specified by listId
router.post('/:listId/tasks', async(req, res) => {
    const newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })
    await newTask.save();
    res.send(newTask);
});

// update an existing task (via taskId)
router.patch('/:listId/tasks/:taskId', async(req, res) => {
    
        Task.findOneAndUpdate({
            _id: req.params.taskId,
            _listId: req.params.listId
        }, {
            $set: req.body
        }).then(() => {
            res.send({message: 'Updated successfully.'})
        }) 
});

// delete an existing task
router.delete('/:listId/tasks/:taskId', async(req, res) => {
    try {
        await Task.deleteOne({ 
            _id: req.params.taskId,
            _listId: req.params.listId })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Task does not exist!" })
    }
});


module.exports = router;