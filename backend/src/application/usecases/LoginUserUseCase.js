const jwt = require('jsonwebtoken');

class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(credentials) {
    const { email, password } = credentials;

    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user by email (returns full user document with password)
    const user = await this.userRepository.findByEmail(email.toLowerCase());
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await this.userRepository.verifyPassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '7d' }
    );

    // Get safe user data (without password)
    const safeUser = await this.userRepository.findById(user._id);

    return { user: safeUser, token };
  }
}

module.exports = LoginUserUseCase;