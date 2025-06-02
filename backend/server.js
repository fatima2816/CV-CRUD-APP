// app.js
const express = require('express');
const cors = require('cors');
require('./Models')
const Signup = require('./Models/signup'); 
const CV=require('./Models/CV')
const Employee=require('./Models/Employee')

const app = express();

app.use(cors());
app.use(express.json());

// Sync database (use force: false in production to avoid dropping table)
Signup.sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

  
CV.sync({force:false})
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));
  
Employee.sync({force:false})
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

// Signup route
app.post('/signup', async (req, res) => {
  const { fullname, email, password } = req.body;

  // Validate input
  if (!fullname || !email || !password) {
    return res.status(400).json({ error: 'Please provide fullname, email, and password' });
  }

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Signup.create({ fullname, email, password: hashedPassword });
    res.json({ message: 'User signed up successfully!', userId: newUser.id });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    const user = await Signup.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email ' });
    }

const isPasswordValid = password === user.password;
    console.log('isPasswordValid:', isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful!', userId: user.id, fullname: user.fullname });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await Signup.findAll({
      attributes: ['id', 'fullname', 'email','password'], // Exclude password
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get request for employees
app.get('/employee', async (req, res) => {
  try {
    const employee = await Employee.findAll({
      attributes: ['name', 'position', 'email','phone'], 
    });
    res.json(employee);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// cv,employee post request 
app.post('/employees', async (req, res) => {
  const { name, position, email, phone, degree, university, company, role } = req.body;

  try {
    // Step 1: Create employee
    const employee = await Employee.create({ name, position, email, phone });

    // Step 2: Create CV with foreign key
    const cv = await CV.create({
      degree,
      university,
      company,
      role,
      employeeId: employee.id // associate with employee
    });

    res.status(201).json({ employee, cv });
    console.log('added entry')
  } catch (error) {
    console.error('Error creating employee and CV:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 8081;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));