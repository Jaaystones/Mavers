const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Task = require('../models/Task');


// Get a specific user by ID
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  //find a user by id
  const user = await User.findById(userId).select('-password').exec();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});


const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users
    const users = await User.find().select('-password').exec();
    
    //error handling
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }
  
    res.status(200).json(users);
  });


  const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { username, email, password, role } = req.body;

    // // error handling
    // if(!userId || !username || !email || !password || !role) {
    //     return res.status(404).json({ message: 'All fields except password are required' });
    // }
    
    // find user 
    const user = await User.findById(userId).select('-password').exec();
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
  
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role) user.role = role;
    
    const updatedUser = await user.save();
  
    res.status(200).json({ message: `${updatedUser.username} updated`, user: updatedUser });
  });


const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    // Does the user still have assigned notes?
    const task = await Task.findOne({ user: userId }).lean().exec()
    if (task) {
        return res.status(400).json({ message: 'User has assigned tasks' })
    }
    
    // find the user
    const user = await User.findById(userId).exec();
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`
  
    res.json(reply)
  });


module.exports = {  getUser,
                    getAllUsers,
                    updateUser,
                    deleteUser
}