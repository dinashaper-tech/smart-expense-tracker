const RegisterUserUseCase = require('../../application/usecases/RegisterUserUseCase');
const LoginUserUseCase = require('../../application/usecases/LoginUserUseCase');
const userRepository = require('../../infrastructure/repositories/UserRepository');

class AuthController {
  constructor() {
    this.registerUseCase = new RegisterUserUseCase(userRepository);
    this.loginUseCase = new LoginUserUseCase(userRepository);
  }

  // POST /api/auth/register
  async register(req, res) {
    try {
      console.log(' Register request received:', req.body);
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
        console.log(' Missing fields');
        return res.status(400).json({
          success: false,
          error: 'Please provide name, email, and password'
        });
      }
      console.log('Calling register use case');
      const result = await this.registerUseCase.execute({ name, email, password });
      
      console.log('Registration successful')
      res.status(201).json({
        success: true,
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Please provide email and password'
        });
      }

      const result = await this.loginUseCase.execute({ email, password });

      res.json({
        success: true,
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET /api/auth/me
  async getMe(req, res) {
    try {
      const user = await userRepository.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new AuthController();