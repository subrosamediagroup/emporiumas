/* =============================================
   M.Poriums – Script.js
   All JavaScript for the standalone HTML template
   ============================================= */

// =============================================
// PRODUCT DATA
// =============================================
var products = [
  { id: "1", title: "Fender Stratocaster '62 Reissue", price: 1450, condition: "Excellent", category: "Guitars & Basses", seller: "VintageAxes", rating: 4.9, verified: true, description: "A stunning reissue of the legendary 1962 Fender Stratocaster. Alder body, maple neck with rosewood fingerboard, three vintage-style single-coil pickups.", images: ["https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=800&fit=crop","https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=800&fit=crop"], sellerAvatar: "VA", sellerRating: 4.9, sellerListings: 34, memberSince: "2023" },
  { id: "2", title: "Roland Juno-106 Synthesizer", price: 2800, condition: "Good", category: "Synthesizers", seller: "SynthWizard", rating: 5.0, verified: true, description: "Classic analog polysynth in good working condition. All voice chips tested and functioning perfectly.", images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=800&fit=crop","https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop"], sellerAvatar: "SW", sellerRating: 5.0, sellerListings: 12, memberSince: "2022" },
  { id: "3", title: "Sennheiser HD 650 Headphones", price: 280, condition: "Like New", category: "Headphones", seller: "AudioPhile99", rating: 4.8, verified: false, description: "Open-back audiophile headphones in like-new condition. Used for less than 20 hours.", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop","https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop"], sellerAvatar: "AP", sellerRating: 4.8, sellerListings: 8, memberSince: "2024" },
  { id: "4", title: "Yamaha HS8 Studio Monitors (Pair)", price: 520, condition: "Excellent", category: "Speakers & Monitors", seller: "StudioGear", rating: 4.7, verified: true, description: "A pair of Yamaha HS8 monitors in excellent condition. Flat frequency response, perfect for mixing and mastering.", images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop","https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop"], sellerAvatar: "SG", sellerRating: 4.7, sellerListings: 21, memberSince: "2023" },
  { id: "5", title: "Shure SM7B Microphone", price: 340, condition: "Like New", category: "Microphones", seller: "ProAudioDeals", rating: 4.9, verified: true, description: "Industry-standard dynamic microphone. Perfect for vocals, podcasting, and broadcasting.", images: ["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop","https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=800&fit=crop"], sellerAvatar: "PA", sellerRating: 4.9, sellerListings: 45, memberSince: "2021" },
  { id: "6", title: "Pioneer CDJ-2000NXS2", price: 1600, condition: "Good", category: "DJ Equipment", seller: "DJDepot", rating: 4.6, verified: false, description: "Professional DJ multi-player in good condition. Fully functional with minor wear from club use.", images: ["https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800&h=800&fit=crop","https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop"], sellerAvatar: "DD", sellerRating: 4.6, sellerListings: 15, memberSince: "2023" }
];

var categories = ["All", "Guitars & Basses", "Synthesizers", "Headphones", "Speakers & Monitors", "Microphones", "DJ Equipment"];
var conditions = ["All", "Like New", "Excellent", "Good", "Fair"];
var priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $250", min: 0, max: 250 },
  { label: "$250 – $500", min: 250, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "$1,000 – $2,000", min: 1000, max: 2000 },
  { label: "$2,000+", min: 2000, max: Infinity }
];

// =============================================
// STATE
// =============================================
var cart = [];
var currentPage = "home";
var currentProduct = null;
var currentImageIndex = 0;
var selectedCategory = "All";
var selectedCondition = "All";
var selectedPriceRange = priceRanges[0];
var searchQuery = "";
var isLoginMode = true;

// Sell page state
var sellCategory = "";
var sellCondition = "";
var uploadedImages = [];

// =============================================
// PAGE NAVIGATION
// =============================================
function showPage(page) {
  document.querySelectorAll(".page").forEach(function(p) { p.classList.remove("active"); });
  var el = document.getElementById("page-" + page);
  if (el) {
    el.classList.add("active");
    currentPage = page;
  }
  window.scrollTo(0, 0);

  // Show/hide footer on specific pages
  document.getElementById("footer").style.display = (page === "404") ? "none" : "";

  if (page === "shop") renderShop();
  if (page === "cart") renderCart();
  if (page === "checkout") renderCheckout();
  if (page === "sell") initSellPage();

  return false;
}

// =============================================
// THEME TOGGLE
// =============================================
function toggleTheme() {
  document.body.classList.toggle("dark");
  var isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.getElementById("sunIcon").style.display = isDark ? "none" : "";
  document.getElementById("moonIcon").style.display = isDark ? "" : "none";
}

function initTheme() {
  var saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
    document.getElementById("sunIcon").style.display = "none";
    document.getElementById("moonIcon").style.display = "";
  }
}

// =============================================
// MOBILE MENU
// =============================================
function toggleMobileMenu() {
  var menu = document.getElementById("mobileMenu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

// =============================================
// SEARCH
// =============================================
function handleNavSearch(e) {
  e.preventDefault();
  var input = e.target.querySelector("input");
  searchQuery = (input.value || "").trim();
  if (searchQuery) {
    showPage("shop");
    input.value = "";
    toggleMobileMenu();
  }
}

function handleHeroSearch(e) {
  e.preventDefault();
  searchQuery = (document.getElementById("heroSearchInput").value || "").trim();
  if (searchQuery) {
    document.getElementById("heroSearchInput").value = "";
    showPage("shop");
  }
}

// =============================================
// LISTING CARD RENDERING
// =============================================
function renderListingCard(product) {
  return '<a href="#" onclick="openProduct(\'' + product.id + '\')" class="card listing-card">' +
    '<div class="listing-image">' +
      '<img src="' + product.images[0] + '" alt="' + product.title + '" loading="lazy" />' +
      '<span class="listing-badge">' + product.condition + '</span>' +
      '<button class="listing-heart" onclick="event.preventDefault();event.stopPropagation();">♥</button>' +
    '</div>' +
    '<div class="listing-body">' +
      '<p class="listing-category">' + product.category + '</p>' +
      '<h3 class="listing-title">' + product.title + '</h3>' +
      '<p class="listing-price">$' + product.price.toLocaleString() + '</p>' +
      '<div class="listing-meta">' +
        '<span>' + (product.verified ? '🛡️ ' : '') + product.seller + '</span>' +
        (product.rating > 0 ? '<span>⭐ ' + product.rating + '</span>' : '') +
      '</div>' +
    '</div>' +
  '</a>';
}

// =============================================
// FEATURED GRID (Home Page)
// =============================================
function renderFeatured() {
  var grid = document.getElementById("featuredGrid");
  if (!grid) return;
  grid.innerHTML = products.map(renderListingCard).join("");
}

// =============================================
// SHOP PAGE
// =============================================
function renderShop() {
  renderFilters();
  applyFilters();
}

function renderFilters() {
  // Category
  var catEl = document.getElementById("categoryFilters");
  if (catEl) {
    catEl.innerHTML = categories.map(function(c) {
      return '<button class="filter-btn' + (selectedCategory === c ? ' active' : '') + '" onclick="selectedCategory=\'' + c.replace(/'/g, "\\'") + '\';renderShop()">' + c + '</button>';
    }).join("");
  }

  // Price
  var priceEl = document.getElementById("priceFilters");
  if (priceEl) {
    priceEl.innerHTML = priceRanges.map(function(r, i) {
      return '<button class="filter-btn' + (selectedPriceRange.label === r.label ? ' active' : '') + '" onclick="selectedPriceRange=priceRanges[' + i + '];renderShop()">' + r.label + '</button>';
    }).join("");
  }

  // Condition
  var condEl = document.getElementById("conditionFilters");
  if (condEl) {
    condEl.innerHTML = conditions.map(function(c) {
      return '<button class="filter-btn' + (selectedCondition === c ? ' active' : '') + '" onclick="selectedCondition=\'' + c.replace(/'/g, "\\'") + '\';renderShop()">' + c + '</button>';
    }).join("");
  }
}

function applyFilters() {
  var sortBy = document.getElementById("sortSelect") ? document.getElementById("sortSelect").value : "Newest";
  var results = products.filter(function(p) {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (selectedCondition !== "All" && p.condition !== selectedCondition) return false;
    if (p.price < selectedPriceRange.min || p.price > selectedPriceRange.max) return false;
    if (searchQuery) {
      var q = searchQuery.toLowerCase();
      if (p.title.toLowerCase().indexOf(q) === -1 && p.category.toLowerCase().indexOf(q) === -1 && p.seller.toLowerCase().indexOf(q) === -1) return false;
    }
    return true;
  });

  if (sortBy === "Price: Low to High") results.sort(function(a, b) { return a.price - b.price; });
  if (sortBy === "Price: High to Low") results.sort(function(a, b) { return b.price - a.price; });

  var grid = document.getElementById("shopGrid");
  var empty = document.getElementById("shopEmpty");
  var title = document.getElementById("shopTitle");
  var count = document.getElementById("shopCount");

  if (title) title.textContent = searchQuery ? 'Results for "' + searchQuery + '"' : "Shop Gear";
  if (count) count.textContent = results.length + " items found";

  if (results.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "";
  } else {
    empty.style.display = "none";
    grid.innerHTML = results.map(renderListingCard).join("");
  }
}

function clearFilters() {
  selectedCategory = "All";
  selectedCondition = "All";
  selectedPriceRange = priceRanges[0];
  searchQuery = "";
  renderShop();
}

function filterByCategory(cat) {
  selectedCategory = cat;
  searchQuery = "";
  showPage("shop");
}

// =============================================
// PRODUCT DETAIL
// =============================================
function openProduct(id) {
  currentProduct = products.find(function(p) { return p.id === id; });
  if (!currentProduct) return;
  currentImageIndex = 0;

  document.getElementById("productMainImg").src = currentProduct.images[0];
  document.getElementById("productTitle").textContent = currentProduct.title;
  document.getElementById("productCondition").textContent = currentProduct.condition;
  document.getElementById("productCategory").textContent = currentProduct.category;
  document.getElementById("productCategorySub").textContent = currentProduct.category;
  document.getElementById("productPrice").textContent = "$" + currentProduct.price.toLocaleString();
  document.getElementById("productDescription").textContent = currentProduct.description;

  var ratingEl = document.getElementById("productRating");
  ratingEl.innerHTML = currentProduct.rating > 0 ? "⭐ " + currentProduct.rating : "";

  // Seller
  document.getElementById("sellerAvatar").textContent = currentProduct.sellerAvatar;
  document.getElementById("sellerName").textContent = currentProduct.seller;
  document.getElementById("sellerVerified").style.display = currentProduct.verified ? "" : "none";
  document.getElementById("sellerRating").textContent = currentProduct.sellerRating > 0 ? "⭐ " + currentProduct.sellerRating : "";
  document.getElementById("sellerListings").textContent = currentProduct.sellerListings + " listings";
  document.getElementById("sellerSince").textContent = "Since " + currentProduct.memberSince;

  // Thumbs
  var thumbs = document.getElementById("productThumbs");
  thumbs.innerHTML = currentProduct.images.map(function(img, i) {
    return '<button class="product-thumb' + (i === 0 ? ' active' : '') + '" onclick="selectProductImage(' + i + ')">' +
      '<img src="' + img + '" alt="Thumbnail ' + (i + 1) + '" />' +
    '</button>';
  }).join("");

  showPage("product");
  return false;
}

function selectProductImage(i) {
  if (!currentProduct) return;
  currentImageIndex = i;
  document.getElementById("productMainImg").src = currentProduct.images[i];
  document.querySelectorAll(".product-thumb").forEach(function(t, idx) {
    t.classList.toggle("active", idx === i);
  });
}

function nextProductImage() {
  if (!currentProduct || currentProduct.images.length <= 1) return;
  selectProductImage((currentImageIndex + 1) % currentProduct.images.length);
}

function prevProductImage() {
  if (!currentProduct || currentProduct.images.length <= 1) return;
  selectProductImage((currentImageIndex - 1 + currentProduct.images.length) % currentProduct.images.length);
}

// =============================================
// OFFER MODAL
// =============================================
function openOfferModal() {
  if (!currentProduct) return;
  document.getElementById("offerProductTitle").textContent = currentProduct.title;
  document.getElementById("offerProductPrice").textContent = "$" + currentProduct.price.toLocaleString();
  document.getElementById("offerAmount").placeholder = Math.round(currentProduct.price * 0.9);
  document.getElementById("offerModal").style.display = "";
}

function closeOfferModal(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById("offerModal").style.display = "none";
}

// =============================================
// CART
// =============================================
function addToCart() {
  if (!currentProduct) return;
  var existing = cart.find(function(item) { return item.id === currentProduct.id; });
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: currentProduct.id,
      title: currentProduct.title,
      price: currentProduct.price,
      condition: currentProduct.condition,
      image: currentProduct.images[0],
      seller: currentProduct.seller,
      quantity: 1
    });
  }
  updateCartBadge();
  alert(currentProduct.title + " added to cart!");
}

function removeFromCart(id) {
  cart = cart.filter(function(item) { return item.id !== id; });
  updateCartBadge();
  renderCart();
}

function updateQty(id, delta) {
  var item = cart.find(function(i) { return i.id === id; });
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) { removeFromCart(id); return; }
  renderCart();
}

function clearCartAll() {
  cart = [];
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  var total = cart.reduce(function(s, i) { return s + i.quantity; }, 0);
  var badge = document.getElementById("cartBadge");
  badge.textContent = total;
  badge.style.display = total > 0 ? "" : "none";
}

function getCartTotals() {
  var subtotal = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
  var shipping = subtotal > 500 ? 0 : 14.99;
  var tax = subtotal * 0.08;
  var total = subtotal + shipping + tax;
  return { subtotal: subtotal, shipping: shipping, tax: tax, total: total, items: cart.reduce(function(s, i) { return s + i.quantity; }, 0) };
}

function renderCart() {
  var emptyEl = document.getElementById("cartEmpty");
  var contentEl = document.getElementById("cartContent");
  var countEl = document.getElementById("cartItemCount");

  if (cart.length === 0) {
    emptyEl.style.display = "";
    contentEl.style.display = "none";
    countEl.textContent = "";
    return;
  }

  emptyEl.style.display = "none";
  contentEl.style.display = "";

  var t = getCartTotals();
  countEl.textContent = "(" + t.items + ")";

  // Items
  var itemsEl = document.getElementById("cartItems");
  itemsEl.innerHTML = cart.map(function(item) {
    return '<div class="cart-item">' +
      '<a href="#" onclick="openProduct(\'' + item.id + '\')" class="cart-item-image"><img src="' + item.image + '" alt="' + item.title + '" /></a>' +
      '<div class="cart-item-info">' +
        '<div>' +
          '<a href="#" onclick="openProduct(\'' + item.id + '\')" class="cart-item-title">' + item.title + '</a>' +
          '<p class="cart-item-meta">' + item.condition + ' · Sold by ' + item.seller + '</p>' +
        '</div>' +
        '<div class="cart-item-bottom">' +
          '<div class="qty-control">' +
            '<button class="qty-btn" onclick="updateQty(\'' + item.id + '\',-1)">−</button>' +
            '<span class="qty-value">' + item.quantity + '</span>' +
            '<button class="qty-btn" onclick="updateQty(\'' + item.id + '\',1)">+</button>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:0.75rem;">' +
            '<button class="remove-btn" onclick="removeFromCart(\'' + item.id + '\')">🗑️</button>' +
            '<span class="cart-item-price">$' + (item.price * item.quantity).toLocaleString() + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join("");

  // Summary
  document.getElementById("cartSubtotal").textContent = "$" + t.subtotal.toLocaleString();
  document.getElementById("cartShipping").textContent = t.shipping === 0 ? "Free" : "$" + t.shipping.toFixed(2);
  document.getElementById("cartTax").textContent = "$" + t.tax.toFixed(2);
  document.getElementById("cartTotal").textContent = "$" + t.total.toFixed(2);
  document.getElementById("freeShippingNote").style.display = t.shipping === 0 ? "" : "none";
}

// =============================================
// CHECKOUT
// =============================================
function renderCheckout() {
  var t = getCartTotals();

  var itemsEl = document.getElementById("checkoutItems");
  itemsEl.innerHTML = cart.map(function(item) {
    return '<div class="checkout-item">' +
      '<img src="' + item.image + '" alt="' + item.title + '" />' +
      '<div class="checkout-item-info">' +
        '<p class="checkout-item-title">' + item.title + '</p>' +
        '<p class="checkout-item-qty">Qty: ' + item.quantity + '</p>' +
      '</div>' +
      '<span class="checkout-item-price">$' + (item.price * item.quantity).toLocaleString() + '</span>' +
    '</div>';
  }).join("");

  document.getElementById("checkoutSubtotal").textContent = "$" + t.subtotal.toLocaleString();
  document.getElementById("checkoutShipping").textContent = t.shipping === 0 ? "Free" : "$" + t.shipping.toFixed(2);
  document.getElementById("checkoutTax").textContent = "$" + t.tax.toFixed(2);
  document.getElementById("checkoutTotal").textContent = "$" + t.total.toFixed(2);
}

function handleCheckout(e) {
  e.preventDefault();
  // In a real app, this would redirect to Stripe
  alert("In production, you would be redirected to Stripe for secure payment.");
  cart = [];
  updateCartBadge();
  showPage("payment-success");
}

// =============================================
// AUTH
// =============================================
function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  document.getElementById("authTitle").textContent = isLoginMode ? "Welcome Back" : "Create Account";
  document.getElementById("authSubtitle").textContent = isLoginMode ? "Sign in to manage your listings" : "Join the marketplace and start selling";
  document.getElementById("authSubmitBtn").textContent = isLoginMode ? "Sign In" : "Sign Up";
  document.getElementById("authToggleText").textContent = isLoginMode ? "Don't have an account?" : "Already have an account?";
  document.getElementById("authToggleBtn").textContent = isLoginMode ? "Sign up" : "Sign in";
  document.getElementById("signupFields").style.display = isLoginMode ? "none" : "";
}

function handleAuth(e) {
  e.preventDefault();
  alert(isLoginMode ? "Sign in functionality requires backend integration." : "Sign up functionality requires backend integration.");
}

// =============================================
// ACCOUNT
// =============================================
function handleSaveProfile(e) {
  e.preventDefault();
  alert("Profile saved! (Requires backend integration)");
}

// =============================================
// SELL PAGE
// =============================================
function initSellPage() {
  // Category pills
  var catPills = document.getElementById("sellCategoryPills");
  if (catPills) {
    var sellCategories = ["Guitars & Basses", "Synthesizers", "Headphones", "Speakers & Monitors", "Microphones", "DJ Equipment"];
    catPills.innerHTML = sellCategories.map(function(c) {
      return '<button class="pill-btn' + (sellCategory === c ? ' active' : '') + '" onclick="selectSellCategory(\'' + c.replace(/'/g, "\\'") + '\')">' + c + '</button>';
    }).join("");
  }

  // Condition pills
  var condPills = document.getElementById("sellConditionPills");
  if (condPills) {
    var sellConditions = ["Like New", "Excellent", "Good", "Fair"];
    condPills.innerHTML = sellConditions.map(function(c) {
      return '<button class="pill-btn' + (sellCondition === c ? ' active' : '') + '" onclick="selectSellCondition(\'' + c + '\')">' + c + '</button>';
    }).join("");
  }

  updateListingPreview();
}

function selectSellCategory(c) {
  sellCategory = c;
  initSellPage();
}

function selectSellCondition(c) {
  sellCondition = c;
  initSellPage();
}

function handleImageUpload(e) {
  var files = e.target.files;
  if (!files) return;
  for (var i = 0; i < files.length && uploadedImages.length < 8; i++) {
    if (!files[i].type.startsWith("image/")) continue;
    uploadedImages.push(URL.createObjectURL(files[i]));
  }
  renderUploadThumbs();
}

function removeUploadedImage(i) {
  uploadedImages.splice(i, 1);
  renderUploadThumbs();
}

function renderUploadThumbs() {
  var el = document.getElementById("uploadThumbs");
  el.innerHTML = uploadedImages.map(function(src, i) {
    return '<div class="upload-thumb">' +
      '<img src="' + src + '" alt="Upload ' + (i + 1) + '" />' +
      '<button class="upload-thumb-remove" onclick="removeUploadedImage(' + i + ')">✕</button>' +
    '</div>';
  }).join("");
}

function updateListingPreview() {
  var title = document.getElementById("sellTitle") ? document.getElementById("sellTitle").value : "";
  var price = document.getElementById("sellPrice") ? document.getElementById("sellPrice").value : "";
  var preview = document.getElementById("listingPreview");

  if (title || price) {
    preview.style.display = "";
    document.getElementById("previewTitle").textContent = title || "";
    document.getElementById("previewPrice").textContent = price ? "$" + Number(price).toLocaleString() : "";
    document.getElementById("previewCondition").textContent = sellCondition;
    document.getElementById("previewCondition").style.display = sellCondition ? "" : "none";
    document.getElementById("previewCategory").textContent = sellCategory || "";
  } else {
    preview.style.display = "none";
  }
}

function handlePublishListing() {
  var title = document.getElementById("sellTitle").value.trim();
  var price = document.getElementById("sellPrice").value;

  if (!title || !price || !sellCategory || !sellCondition) {
    alert("Please fill in all required fields (title, price, category, condition).");
    return;
  }

  alert("Listing published! (Requires backend integration)");
  showPage("shop");
}

// =============================================
// LIVE PREVIEW LISTENERS (Sell Page)
// =============================================
document.addEventListener("input", function(e) {
  if (e.target.id === "sellTitle" || e.target.id === "sellPrice") {
    updateListingPreview();
  }
});

// =============================================
// INIT
// =============================================
document.addEventListener("DOMContentLoaded", function() {
  initTheme();
  renderFeatured();
  updateCartBadge();
});
