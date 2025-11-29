import Task from '../models/Task.js';

// Create task
export const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, status, dueDate } = req.body;
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      category,
      priority,
      status,
      dueDate,
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks for user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Dashboard stats
export const getStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user.id });
    const completedTasks = await Task.countDocuments({ user: req.user.id, status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ user: req.user.id, status: 'Pending' });

    res.json({ totalTasks, completedTasks, pendingTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



//Task Pending Handling API
export const statusUpdate = async(req,res)=>{
  try{
    console.log(req.params)
      const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: {status:"Completed"} },
      { new: true }
    );
    console.log(task)
      res.json({message:"Working api status"})
  }
  catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error on StatusUpdate API' });
  }
}


export const testing=async(req,res)=>{
  try {
    res.json({"message":"Api running perfectly"})
    console.log("Api running")
  } catch (error) {
    console.log(error)
  }
}