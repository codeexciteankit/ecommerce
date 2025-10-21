# 🛒 ModernShop - E-commerce Platform

A modern, full-stack e-commerce web application built with vanilla JavaScript, Node.js, Express, and MongoDB.

![ModernShop](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-v6+-brightgreen)

## ✨ Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 👤 User authentication (Register/Login)
- 🛍️ Product catalog with filtering and sorting
- 🛒 Shopping cart functionality
- ❤️ Wishlist feature
- 🔍 Real-time product search
- 📱 Mobile-responsive design
- 💳 Checkout process (Demo)
- 📧 Newsletter subscription
- 🗄️ MongoDB database integration

## 🚀 Tech Stack

### Frontend
- HTML5
- CSS3 (Tailwind CSS)
- Vanilla JavaScript
- Font Awesome Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local) OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (Optional, for viewing database)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codeexciteankit/ecommerce.git
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/modernshop
   PORT=5000
   ```

4. **Start MongoDB** (if using local installation)
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

5. **Start the backend server**
   ```bash
   node server.js
   ```
   
   You should see:
   ```
   ✅ MongoDB Connected Successfully!
   🚀 ModernShop Server Started!
   📡 Server running on: http://localhost:5000
   ```

6. **Open the frontend**
   
   Open `index.html` in your browser or use a live server:
   ```bash
   # If you have Live Server VS Code extension, or
   # Use Python's built-in server:
   python -m http.server 8000
   ```
   
   Then visit: `http://localhost:8000`

## 📁 Project Structure

```
ecommerce/
├── node_modules/          # Dependencies
├── .env                   # Environment variables (not in git)
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── index.html            # Main HTML file
├── script.js             # Frontend JavaScript
├── styles.css            # Custom CSS styles
├── server.js             # Backend server
├── package.json          # Project dependencies
├── package-lock.json     # Dependency lock file
└── README.md            # This file
```

## 🔌 API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users

### Order Routes
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID

### Newsletter Routes
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscribers

### Health Check
- `GET /api/health` - Check server and database status

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  createdAt: Date
}
```

### Order Schema
```javascript
{
  userId: ObjectId,
  items: Array,
  totalAmount: Number,
  shippingInfo: Object,
  status: String,
  createdAt: Date
}
```

## 🎯 Usage

1. **Register/Login**: Click the user icon to create an account or login
2. **Browse Products**: Scroll through the product catalog
3. **Filter Products**: Use category, price, and rating filters
4. **Add to Cart**: Click "Add to Cart" on any product
5. **Wishlist**: Click the heart icon to add items to wishlist
6. **Checkout**: Click cart icon and proceed to checkout
7. **View Database**: Use MongoDB Compass to view users and orders

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

### Product Catalog
![Products](https://via.placeholder.com/800x400?text=Products)

### Shopping Cart
![Cart](https://via.placeholder.com/800x400?text=Shopping+Cart)

## 🛠️ Development

### Running in Development Mode

1. **Backend** (with auto-reload using nodemon):
   ```bash
   npm install -g nodemon
   nodemon server.js
   ```

2. **Frontend**: Use VS Code Live Server or similar

### Testing the API

Using curl:
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Get all users
curl http://localhost:5000/api/users
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ankit**
- GitHub: [@codeexciteankit](https://github.com/codeexciteankit)

## 🙏 Acknowledgments

- Tailwind CSS for styling
- Font Awesome for icons
- MongoDB for database
- Express.js for backend framework

## 📞 Support

If you have any questions or need help, please open an issue or contact me.

---

⭐ Star this repo if you find it helpful!
