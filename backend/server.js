const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const User = require('./models/User');
const CropListing = require('./models/CropListing');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/crops/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'crop-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Add CORS BEFORE other middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Then add your other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gramin_mitra';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({
      message: 'Account created successfully! Please login.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ==================== CROP LISTING ROUTES ====================

// Create new crop listing (with image upload)
app.post('/crop-listings', upload.array('images', 5), async (req, res) => {
  try {
    const { farmerId, farmerName, cropName, quantity, unit, truckNetWeight, pricePerUnit, description, location } = req.body;

    // Validate required fields
    if (!farmerId || !farmerName || !cropName || !quantity || !truckNetWeight || !pricePerUnit || !location) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one crop image is required' });
    }

    // Get image paths
    const imagePaths = req.files.map(file => `/uploads/crops/${file.filename}`);

    // Create new crop listing
    const newListing = new CropListing({
      farmerId,
      farmerName,
      cropName,
      quantity: Number(quantity),
      unit: unit || 'kg',
      truckNetWeight: Number(truckNetWeight),
      pricePerUnit: Number(pricePerUnit),
      images: imagePaths,
      description,
      location,
      status: 'available'
    });

    await newListing.save();

    res.status(201).json({
      message: 'Crop listing created successfully',
      listing: newListing
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get all available crop listings
app.get('/crop-listings', async (req, res) => {
  try {
    const listings = await CropListing.find({ status: 'available' })
      .sort({ createdAt: -1 });

    res.status(200).json({ listings });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get listings by farmer ID
app.get('/crop-listings/farmer/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const listings = await CropListing.find({ farmerId })
      .sort({ createdAt: -1 });

    res.status(200).json({ listings });
  } catch (error) {
    console.error('Get farmer listings error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get single listing by ID
app.get('/crop-listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await CropListing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({ listing });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Update listing status (for marking as sold)
app.patch('/crop-listings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['available', 'sold', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const listing = await CropListing.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({
      message: 'Listing status updated',
      listing
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Update crop listing (full update)
app.put('/crop-listings/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { id } = req.params;
    const { farmerId, cropName, quantity, unit, truckNetWeight, pricePerUnit, description, location, existingImages } = req.body;

    // Find existing listing
    const existingListing = await CropListing.findById(id);
    if (!existingListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Verify ownership
    if (existingListing.farmerId.toString() !== farmerId) {
      return res.status(403).json({ message: 'Unauthorized to update this listing' });
    }

    // Handle images
    let imagePaths = [];
    if (existingImages) {
      // Keep existing images that weren't removed
      imagePaths = Array.isArray(existingImages) ? existingImages : [existingImages];
    }

    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(file => `/uploads/crops/${file.filename}`);
      imagePaths = [...imagePaths, ...newImagePaths];
    }

    // Ensure at least one image
    if (imagePaths.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Update listing
    const updatedListing = await CropListing.findByIdAndUpdate(
      id,
      {
        cropName,
        quantity: Number(quantity),
        unit: unit || 'kg',
        truckNetWeight: Number(truckNetWeight),
        pricePerUnit: Number(pricePerUnit),
        images: imagePaths,
        description,
        location
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Listing updated successfully',
      listing: updatedListing
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Delete crop listing
app.delete('/crop-listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { farmerId } = req.query;

    // Find listing
    const listing = await CropListing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Verify ownership
    if (listing.farmerId.toString() !== farmerId) {
      return res.status(403).json({ message: 'Unauthorized to delete this listing' });
    }

    // Delete listing
    await CropListing.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ==================== PRODUCT ROUTES (Simple Farmer Inventory) ====================

// Get all products from all farmers
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get products by farmer
app.get('/products/farmer/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const products = await Product.find({ farmerId }).sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Create product
app.post('/products', async (req, res) => {
  try {
    const { farmerId, farmerName, name, type, quantity, price, image } = req.body;

    if (!farmerId || !farmerName || !name || !type || !quantity || !price) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newProduct = new Product({
      farmerId,
      farmerName,
      name,
      type,
      quantity: Number(quantity),
      price: Number(price),
      image: image || ''
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Update product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { farmerId, name, type, quantity, price, image } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.farmerId.toString() !== farmerId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, type, quantity: Number(quantity), price: Number(price), image },
      { new: true }
    );

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Delete product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { farmerId } = req.query;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.farmerId.toString() !== farmerId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ==================== ORDER ROUTES ====================

// Create new order
app.post('/orders', async (req, res) => {
  try {
    const {
      farmerId,
      farmerName,
      wholesalerId,
      wholesalerName,
      cropListingId,
      cropName,
      quantity,
      unit,
      pricePerUnit,
      deliveryType,
      location
    } = req.body;

    if (!farmerId || !wholesalerId || !cropName || !quantity || !pricePerUnit) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const totalPrice = Number(quantity) * Number(pricePerUnit);

    const newOrder = new Order({
      farmerId,
      farmerName: farmerName || 'Farmer',
      wholesalerId,
      wholesalerName: wholesalerName || 'Wholesaler',
      cropListingId: cropListingId || null,
      cropName,
      quantity: Number(quantity),
      unit: unit || 'kg',
      pricePerUnit: Number(pricePerUnit),
      totalPrice,
      deliveryType: deliveryType || 'Delivery',
      status: 'Pending',
      location: location || ''
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get orders by farmer ID
app.get('/orders/farmer/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const orders = await Order.find({ farmerId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Get farmer orders error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get orders by wholesaler ID
app.get('/orders/wholesaler/:wholesalerId', async (req, res) => {
  try {
    const { wholesalerId } = req.params;
    const orders = await Order.find({ wholesalerId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Get wholesaler orders error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Update order status
app.patch('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated',
      order
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});