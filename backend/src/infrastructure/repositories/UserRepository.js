const UserModel = require('../database/models/UserModel');

class UserRepository {
  
  // Create new user
  async create(userData) {
    const user = new UserModel(userData);
    await user.save();
    return this._mapToSafeUser(user);
  }

  // Find user by email
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
    const user = await UserModel.findOne({ email });
    return !!user;
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