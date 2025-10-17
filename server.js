const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// MongoDB Connection
const DB_NAME = process.env.DB_NAME || 'modernshop';
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${DB_NAME}`;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/modernshop';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Database Name:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    quantity: Number
  }],
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingInfo: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    zipCode: String
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

// Routes
// Register User
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('✅ New user registered:', email);
    res.status(201).json({ 
      message: 'User registered successfully',
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Error registering user' });
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ User logged in:', email);
    res.json({ 
      message: 'Login successful',
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
// Simple authentication middleware for testing endpoints
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  // In production, use JWT or session-based authentication
  if (auth === `Bearer ${process.env.ADMIN_TOKEN}`) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

// Get all users (for testing, protected)
app.get('/api/users', requireAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});
  }
});
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingInfo, status } = req.body;

    // Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must include at least one item.' });
    }
    if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({ error: 'Total amount must be a positive number.' });
    }
    if (!shippingInfo || !shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city || !shippingInfo.zipCode) {
      return res.status(400).json({ error: 'Shipping information is incomplete.' });
    }

    // Sanitize items
    const sanitizedItems = items.map(item => ({
      productId: Number(item.productId),
      name: String(item.name),
      price: Number(item.price),
      quantity: Number(item.quantity)
    }));

    const order = new Order({
      userId,
      items: sanitizedItems,
      totalAmount,
      shippingInfo: {
        firstName: String(shippingInfo.firstName),
        lastName: String(shippingInfo.lastName),
        email: String(shippingInfo.email),
        address: String(shippingInfo.address),
        city: String(shippingInfo.city),
        zipCode: String(shippingInfo.zipCode)
      },
      status: status && ['pending', 'processing', 'shipped', 'delivered'].includes(status) ? status : undefined
    });
    await order.save();
    
    console.log('✅ New order created:', order._id);
    res.status(201).json({ 
      message: 'Order created successfully',
      orderId: order._id
    });
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});
    await order.save();
    
    console.log('✅ New order created:', order._id);
    res.status(201).json({ 
      message: 'Order created successfully',
      orderId: order._id
    });
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});