const Todo = require('../models/todo');


exports.getAllTodos = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};


exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};


exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    const todo = new Todo({
      title,
      description,
      status: status || 'pending',
    });
    
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    next(err);
  }
};


exports.updateTodo = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};


exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    next(err);
  }
};