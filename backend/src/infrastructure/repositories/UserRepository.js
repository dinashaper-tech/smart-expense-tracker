const UserModel = require('../database/models/UserModel');
const bcrypt = require('bcryptjs');

class UserRepository {
  
  // Create new user with hashed password
  async create(userData) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Create user with hashed password
      const user = new UserModel({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
      });
      
      // Save to database
      const savedUser = await user.save();
      
      // Return safe user (without password)
      return this._mapToSafeUser(savedUser);
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Find user by email (returns full user document for password comparison)
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  // Find user by ID
  async findById(id) {
    const user = await UserModel.findById(id);
    return user ? this._mapToSafeUser(user) : null;
  }

  // Check if email exists
  async emailExists(email) {
    const count = await UserModel.countDocuments({ email });
    return count > 0;
  }

  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Map to safe user object (without password)
  _mapToSafeUser(user) {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}

module.exports = new UserRepository();