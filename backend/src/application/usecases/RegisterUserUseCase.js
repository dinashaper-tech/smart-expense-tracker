const jwt = require('jsonwebtoken');

class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const { name, email, password } = userData;

    // Validate input
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }

    if (!email || email.trim() === '') {
      throw new Error('Email is required');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.emailExists(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create user (password will be hashed in repository)
    const user = await this.userRepository.create({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      password 
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '7d' }
    );

    return { user, token };
  }
}

module.exports = RegisterUserUseCase;