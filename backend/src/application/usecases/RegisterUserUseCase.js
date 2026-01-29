const jwt = require('jsonwebtoken');

class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await this.userRepository.emailExists(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Validate password length
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Create user
    const user = await this.userRepository.create({ name, email, password });

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