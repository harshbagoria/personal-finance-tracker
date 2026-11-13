const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  // Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  // Check password length
  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  
  next();
};

export default validateSignup;