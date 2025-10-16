// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    category: "men",
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/61O9-Gg1rJL._SY741_.jpg",
    description:
      "Comfortable premium cotton t-shirt perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Gray"],
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    price: 79.99,
    category: "women",
    rating: 4.8,
    image: "👗",
    description: "Beautiful summer dress made from breathable fabric.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue", "Pink", "White", "Yellow"],
  },
  {
    id: 3,
    name: "Wireless Bluetooth Headphones",
    price: 149.99,
    category: "electronics",
    rating: 4.6,
    image: "🎧",
    description: "High-quality wireless headphones with noise cancellation.",
    colors: ["Black", "White", "Silver"],
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 199.99,
    category: "electronics",
    rating: 4.4,
    image: "⌚",
    description: "Advanced fitness tracking with heart rate monitor.",
    colors: ["Black", "Silver", "Rose Gold"],
  },
  {
    id: 5,
    name: "Designer Jeans",
    price: 89.99,
    category: "men",
    rating: 4.3,
    image: "👖",
    description: "Premium denim jeans with modern fit.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black"],
  },
  {
    id: 6,
    name: "Luxury Handbag",
    price: 159.99,
    category: "women",
    rating: 4.7,
    image: "👜",
    description: "Elegant leather handbag for any occasion.",
    colors: ["Black", "Brown", "Tan", "Red"],
  },
  {
    id: 7,
    name: "Gaming Laptop",
    price: 899.99,
    category: "electronics",
    rating: 4.5,
    image: "💻",
    description: "High-performance gaming laptop with latest graphics.",
    colors: ["Black", "Silver"],
  },
  {
    id: 8,
    name: "Casual Sneakers",
    price: 69.99,
    category: "men",
    rating: 4.2,
    image: "👟",
    description: "Comfortable sneakers for daily activities.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Gray", "Blue"],
  },
];

// Application state
let cart = [];
let wishlist = [];
let currentUser = null;
let filteredProducts = [...products];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  setupEventListeners();
  loadCartFromStorage();
  loadWishlistFromStorage();
});

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  // Filter functionality
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const ratingFilter = document.getElementById("ratingFilter");
  const sortSelect = document.getElementById("sortSelect");

  if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);
  if (priceFilter) priceFilter.addEventListener("change", applyFilters);
  if (ratingFilter) ratingFilter.addEventListener("change", applyFilters);
  if (sortSelect) sortSelect.addEventListener("change", applySorting);

  // Mega menu hover effects
  document.querySelectorAll(".group").forEach((group) => {
    const menu = group.querySelector(".mega-menu");
    if (menu) {
      group.addEventListener("mouseenter", () => {
        menu.classList.add("active");
      });
      group.addEventListener("mouseleave", () => {
        menu.classList.remove("active");
      });
    }
  });
}

function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  if (!productGrid) return;

  productGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className =
    "product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer";

  card.innerHTML = `
       <div class="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
  <img src="${product.image}" alt="${
    product.name
  }" class="object-cover w-full h-full" />
</div>

        <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2">${product.name}</h3>
            <div class="flex items-center mb-2">
                ${generateStars(product.rating)}
                <span class="text-sm text-gray-500 ml-2">(${
                  product.rating
                })</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-indigo-600">$${product.price.toFixed(
                  2
                )}</span>
                <div class="flex space-x-2">
                    <button onclick="addToWishlist(${
                      product.id
                    })" class="text-gray-400 hover:text-red-500 transition-colors">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button onclick="addToCart(${
                      product.id
                    })" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;

  card.addEventListener("click", (e) => {
    if (!e.target.closest("button")) {
      showProductModal(product);
    }
  });

  return card;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star text-yellow-400"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star text-yellow-400"></i>';
  }

  return stars;
}

function showProductModal(product) {
  const modal = document.getElementById("productModal");
  const content = document.getElementById("productModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="aspect-square bg-gray-100 flex items-center justify-center text-8xl rounded-lg">
                ${product.image}
            </div>
            <div>
                <h2 class="text-2xl font-bold mb-4">${product.name}</h2>
                <div class="flex items-center mb-4">
                    ${generateStars(product.rating)}
                    <span class="text-sm text-gray-500 ml-2">(${
                      product.rating
                    } stars)</span>
                </div>
                <p class="text-3xl font-bold text-indigo-600 mb-4">$${product.price.toFixed(
                  2
                )}</p>
                <p class="text-gray-600 mb-6">${product.description}</p>
                
                ${
                  product.sizes
                    ? `
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Size</label>
                        <div class="flex space-x-2">
                            ${product.sizes
                              .map(
                                (size) => `
                                <button class="size-option border border-gray-300 px-3 py-2 rounded-lg hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" data-size="${size}">
                                    ${size}
                                </button>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                `
                    : ""
                }
                
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div class="flex space-x-2">
                        ${product.colors
                          .map(
                            (color) => `
                            <button class="color-option border border-gray-300 px-3 py-2 rounded-lg hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" data-color="${color}">
                                ${color}
                            </button>
                        `
                          )
                          .join("")}
                    </div>
                </div>
                
                <div class="flex space-x-4">
                    <button onclick="addToCart(${
                      product.id
                    })" class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                        Add to Cart
                    </button>
                    <button onclick="addToWishlist(${
                      product.id
                    })" class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

  // Add event listeners for size and color selection
  content.querySelectorAll(".size-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      content
        .querySelectorAll(".size-option")
        .forEach((b) =>
          b.classList.remove("border-indigo-500", "bg-indigo-50")
        );
      btn.classList.add("border-indigo-500", "bg-indigo-50");
    });
  });

  content.querySelectorAll(".color-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      content
        .querySelectorAll(".color-option")
        .forEach((b) =>
          b.classList.remove("border-indigo-500", "bg-indigo-50")
        );
      btn.classList.add("border-indigo-500", "bg-indigo-50");
    });
  });

  modal.classList.add("active");
  document.getElementById("overlay").classList.remove("hidden");
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  const overlay = document.getElementById("overlay");
  if (modal) modal.classList.remove("active");
  if (overlay) overlay.classList.add("hidden");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  saveCartToStorage();
  showNotification("Product added to cart!", "success");
}

function addToWishlist(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = wishlist.find((item) => item.id === productId);

  if (!existingItem) {
    wishlist.push(product);
    updateWishlistUI();
    saveWishlistToStorage();
    showNotification("Product added to wishlist!", "success");
  } else {
    showNotification("Product already in wishlist!", "info");
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
  saveCartToStorage();
}

function updateCartQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
      saveCartToStorage();
    }
  }
}

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartCount || !cartItems || !cartTotal) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

  if (totalItems > 0) {
    cartCount.classList.remove("hidden");
  } else {
    cartCount.classList.add("hidden");
  }

  cartItems.innerHTML = "";
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className =
      "flex items-center space-x-4 p-4 border border-gray-200 rounded-lg";
    cartItem.innerHTML = `
            <div class="text-2xl">${item.image}</div>
            <div class="flex-1">
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-gray-600">$${item.price.toFixed(2)}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateCartQuantity(${
                  item.id
                }, -1)" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                    <i class="fas fa-minus text-xs"></i>
                </button>
                <span class="w-8 text-center">${item.quantity}</span>
                <button onclick="updateCartQuantity(${
                  item.id
                }, 1)" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                    <i class="fas fa-plus text-xs"></i>
                </button>
            </div>
            <button onclick="removeFromCart(${
              item.id
            })" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        `;
    cartItems.appendChild(cartItem);
  });
}

function updateWishlistUI() {
  const wishlistCount = document.getElementById("wishlistCount");
  if (!wishlistCount) return;

  wishlistCount.textContent = wishlist.length;

  if (wishlist.length > 0) {
    wishlistCount.classList.remove("hidden");
  } else {
    wishlistCount.classList.add("hidden");
  }
}

function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("overlay");

  if (cartSidebar) cartSidebar.classList.toggle("active");
  if (overlay) overlay.classList.toggle("hidden");
}

function toggleAccount() {
  const accountModal = document.getElementById("accountModal");
  const overlay = document.getElementById("overlay");

  if (accountModal) accountModal.classList.toggle("active");
  if (overlay) overlay.classList.toggle("hidden");
}

function toggleWishlist() {
  showNotification(
    `You have ${wishlist.length} items in your wishlist`,
    "info"
  );
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) mobileMenu.classList.toggle("hidden");
}

function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) loginForm.classList.remove("hidden");
  if (registerForm) registerForm.classList.add("hidden");
}

function showRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) loginForm.classList.add("hidden");
  if (registerForm) registerForm.classList.remove("hidden");
}

async function handleRegister(event) {
  event.preventDefault();
  const name = event.target.querySelector('input[type="text"]').value;
  const email = event.target.querySelector('input[type="email"]').value;
  const password = event.target.querySelector('input[type="password"]').value;

  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    showNotification("Account created successfully!", "success");
    currentUser = { name, email };
    toggleAccount();
  } else {
    showNotification(data.error || "Error creating account", "error");
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  const password = event.target.querySelector('input[type="password"]').value;

  const res = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    showNotification("Login successful!", "success");
    currentUser = data.user;
    toggleAccount();
  } else {
    showNotification(data.message, "error");
  }
}


function proceedToCheckout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error");
    return;
  }

  toggleCart();

  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (checkoutModal) checkoutModal.classList.add("active");
  if (checkoutTotal) checkoutTotal.textContent = `$${totalPrice.toFixed(2)}`;
  document.getElementById("overlay").classList.remove("hidden");
}

function closeCheckout() {
  const checkoutModal = document.getElementById("checkoutModal");
  const overlay = document.getElementById("overlay");

  if (checkoutModal) checkoutModal.classList.remove("active");
  if (overlay) overlay.classList.add("hidden");
}

function processOrder(event) {
  event.preventDefault();

  // Simulate order processing
  setTimeout(() => {
    cart = [];
    updateCartUI();
    saveCartToStorage();
    closeCheckout();
    showNotification("Order placed successfully! (Demo)", "success");
  }, 1000);
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase();
  filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
  renderProducts();
}

function applyFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const ratingFilter = document.getElementById("ratingFilter");

  if (!categoryFilter || !priceFilter || !ratingFilter) return;

  const categoryValue = categoryFilter.value;
  const priceValue = priceFilter.value;
  const ratingValue = ratingFilter.value;

  filteredProducts = products.filter((product) => {
    let matches = true;

    if (categoryValue && product.category !== categoryValue) {
      matches = false;
    }

    if (priceValue) {
      const [min, max] = priceValue.split("-").map((p) => p.replace("+", ""));
      if (max) {
        matches =
          matches &&
          product.price >= parseFloat(min) &&
          product.price <= parseFloat(max);
      } else {
        matches = matches && product.price >= parseFloat(min);
      }
    }

    if (ratingValue && product.rating < parseFloat(ratingValue)) {
      matches = false;
    }

    return matches;
  });

  renderProducts();
}

function applySorting() {
  const sortSelect = document.getElementById("sortSelect");
  if (!sortSelect) return;

  const sortBy = sortSelect.value;

  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    default:
      filteredProducts = [...products];
  }

  renderProducts();
}

function clearFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const ratingFilter = document.getElementById("ratingFilter");
  const sortSelect = document.getElementById("sortSelect");

  if (categoryFilter) categoryFilter.value = "";
  if (priceFilter) priceFilter.value = "";
  if (ratingFilter) ratingFilter.value = "";
  if (sortSelect) sortSelect.value = "featured";

  filteredProducts = [...products];
  renderProducts();
}

function subscribeNewsletter(event) {
  event.preventDefault();
  const emailInput = document.getElementById("newsletterEmail");
  if (emailInput) {
    showNotification("Successfully subscribed to newsletter!", "success");
    emailInput.value = "";
  }
}

function scrollToProducts() {
  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("active");
  });
  const cartSidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("overlay");

  if (cartSidebar) cartSidebar.classList.remove("active");
  if (overlay) overlay.classList.add("hidden");
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm slide-in ${
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500"
  }`;
  notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

function saveCartToStorage() {
  localStorage.setItem("modernshop_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem("modernshop_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

function saveWishlistToStorage() {
  localStorage.setItem("modernshop_wishlist", JSON.stringify(wishlist));
}

function loadWishlistFromStorage() {
  const savedWishlist = localStorage.getItem("modernshop_wishlist");
  if (savedWishlist) {
    wishlist = JSON.parse(savedWishlist);
    updateWishlistUI();
  }
}

// Make functions available globally
window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleCart = toggleCart;
window.toggleAccount = toggleAccount;
window.toggleWishlist = toggleWishlist;
window.toggleMobileMenu = toggleMobileMenu;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.proceedToCheckout = proceedToCheckout;
window.closeCheckout = closeCheckout;
window.processOrder = processOrder;
window.closeProductModal = closeProductModal;
window.showProductModal = showProductModal;
window.clearFilters = clearFilters;
window.subscribeNewsletter = subscribeNewsletter;
window.scrollToProducts = scrollToProducts;
window.closeAllModals = closeAllModals;
