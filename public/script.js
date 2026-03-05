/* =============================================
   M.Poriums – Script.js
   WordPress-compatible jQuery version
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
  jQuery(".page").removeClass("active");
  jQuery("#page-" + page).addClass("active");
  currentPage = page;
  jQuery("html, body").scrollTop(0);

  // Show/hide footer on specific pages
  jQuery("#footer").toggle(page !== "404");

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
  jQuery("body").toggleClass("dark");
  var isDark = jQuery("body").hasClass("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  jQuery("#sunIcon").toggle(!isDark);
  jQuery("#moonIcon").toggle(isDark);
}

function initTheme() {
  var saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    jQuery("body").addClass("dark");
    jQuery("#sunIcon").hide();
    jQuery("#moonIcon").show();
  }
}

// =============================================
// MOBILE MENU
// =============================================
function toggleMobileMenu() {
  jQuery("#mobileMenu").slideToggle(200);
}

// =============================================
// SEARCH
// =============================================
function handleNavSearch(e) {
  e.preventDefault();
  var $input = jQuery(e.target).find("input");
  searchQuery = jQuery.trim($input.val());
  if (searchQuery) {
    showPage("shop");
    $input.val("");
    toggleMobileMenu();
  }
}

function handleHeroSearch(e) {
  e.preventDefault();
  searchQuery = jQuery.trim(jQuery("#heroSearchInput").val());
  if (searchQuery) {
    jQuery("#heroSearchInput").val("");
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
  var html = jQuery.map(products, function(p) { return renderListingCard(p); }).join("");
  jQuery("#featuredGrid").html(html);
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
  var catHtml = jQuery.map(categories, function(c) {
    return '<button class="filter-btn' + (selectedCategory === c ? ' active' : '') + '" onclick="selectedCategory=\'' + c.replace(/'/g, "\\'") + '\';renderShop()">' + c + '</button>';
  }).join("");
  jQuery("#categoryFilters").html(catHtml);

  // Price
  var priceHtml = jQuery.map(priceRanges, function(r, i) {
    return '<button class="filter-btn' + (selectedPriceRange.label === r.label ? ' active' : '') + '" onclick="selectedPriceRange=priceRanges[' + i + '];renderShop()">' + r.label + '</button>';
  }).join("");
  jQuery("#priceFilters").html(priceHtml);

  // Condition
  var condHtml = jQuery.map(conditions, function(c) {
    return '<button class="filter-btn' + (selectedCondition === c ? ' active' : '') + '" onclick="selectedCondition=\'' + c.replace(/'/g, "\\'") + '\';renderShop()">' + c + '</button>';
  }).join("");
  jQuery("#conditionFilters").html(condHtml);
}

function applyFilters() {
  var sortBy = jQuery("#sortSelect").val() || "Newest";
  var results = jQuery.grep(products, function(p) {
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

  jQuery("#shopTitle").text(searchQuery ? 'Results for "' + searchQuery + '"' : "Shop Gear");
  jQuery("#shopCount").text(results.length + " items found");

  if (results.length === 0) {
    jQuery("#shopGrid").empty();
    jQuery("#shopEmpty").show();
  } else {
    jQuery("#shopEmpty").hide();
    jQuery("#shopGrid").html(jQuery.map(results, function(p) { return renderListingCard(p); }).join(""));
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
  currentProduct = jQuery.grep(products, function(p) { return p.id === id; })[0];
  if (!currentProduct) return;
  currentImageIndex = 0;

  jQuery("#productMainImg").attr("src", currentProduct.images[0]);
  jQuery("#productTitle").text(currentProduct.title);
  jQuery("#productCondition").text(currentProduct.condition);
  jQuery("#productCategory").text(currentProduct.category);
  jQuery("#productCategorySub").text(currentProduct.category);
  jQuery("#productPrice").text("$" + currentProduct.price.toLocaleString());
  jQuery("#productDescription").text(currentProduct.description);
  jQuery("#productRating").html(currentProduct.rating > 0 ? "⭐ " + currentProduct.rating : "");

  // Seller
  jQuery("#sellerAvatar").text(currentProduct.sellerAvatar);
  jQuery("#sellerName").text(currentProduct.seller);
  jQuery("#sellerVerified").toggle(currentProduct.verified);
  jQuery("#sellerRating").text(currentProduct.sellerRating > 0 ? "⭐ " + currentProduct.sellerRating : "");
  jQuery("#sellerListings").text(currentProduct.sellerListings + " listings");
  jQuery("#sellerSince").text("Since " + currentProduct.memberSince);

  // Thumbs
  var thumbHtml = jQuery.map(currentProduct.images, function(img, i) {
    return '<button class="product-thumb' + (i === 0 ? ' active' : '') + '" onclick="selectProductImage(' + i + ')">' +
      '<img src="' + img + '" alt="Thumbnail ' + (i + 1) + '" />' +
    '</button>';
  }).join("");
  jQuery("#productThumbs").html(thumbHtml);

  showPage("product");
  return false;
}

function selectProductImage(i) {
  if (!currentProduct) return;
  currentImageIndex = i;
  jQuery("#productMainImg").attr("src", currentProduct.images[i]);
  jQuery(".product-thumb").removeClass("active").eq(i).addClass("active");
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
  jQuery("#offerProductTitle").text(currentProduct.title);
  jQuery("#offerProductPrice").text("$" + currentProduct.price.toLocaleString());
  jQuery("#offerAmount").attr("placeholder", Math.round(currentProduct.price * 0.9));
  jQuery("#offerModal").fadeIn(200);
}

function closeOfferModal(e) {
  if (e && e.target !== e.currentTarget) return;
  jQuery("#offerModal").fadeOut(200);
}

// =============================================
// CART
// =============================================
function addToCart() {
  if (!currentProduct) return;
  var existing = jQuery.grep(cart, function(item) { return item.id === currentProduct.id; })[0];
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
  cart = jQuery.grep(cart, function(item) { return item.id !== id; });
  updateCartBadge();
  renderCart();
}

function updateQty(id, delta) {
  var item = jQuery.grep(cart, function(i) { return i.id === id; })[0];
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
  var total = 0;
  jQuery.each(cart, function(i, item) { total += item.quantity; });
  jQuery("#cartBadge").text(total).toggle(total > 0);
}

function getCartTotals() {
  var subtotal = 0;
  var items = 0;
  jQuery.each(cart, function(i, item) {
    subtotal += item.price * item.quantity;
    items += item.quantity;
  });
  var shipping = subtotal > 500 ? 0 : 14.99;
  var tax = subtotal * 0.08;
  var total = subtotal + shipping + tax;
  return { subtotal: subtotal, shipping: shipping, tax: tax, total: total, items: items };
}

function renderCart() {
  if (cart.length === 0) {
    jQuery("#cartEmpty").show();
    jQuery("#cartContent").hide();
    jQuery("#cartItemCount").text("");
    return;
  }

  jQuery("#cartEmpty").hide();
  jQuery("#cartContent").show();

  var t = getCartTotals();
  jQuery("#cartItemCount").text("(" + t.items + ")");

  // Items
  var itemsHtml = jQuery.map(cart, function(item) {
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
  jQuery("#cartItems").html(itemsHtml);

  // Summary
  jQuery("#cartSubtotal").text("$" + t.subtotal.toLocaleString());
  jQuery("#cartShipping").text(t.shipping === 0 ? "Free" : "$" + t.shipping.toFixed(2));
  jQuery("#cartTax").text("$" + t.tax.toFixed(2));
  jQuery("#cartTotal").text("$" + t.total.toFixed(2));
  jQuery("#freeShippingNote").toggle(t.shipping === 0);
}

// =============================================
// CHECKOUT
// =============================================
function renderCheckout() {
  var t = getCartTotals();

  var itemsHtml = jQuery.map(cart, function(item) {
    return '<div class="checkout-item">' +
      '<img src="' + item.image + '" alt="' + item.title + '" />' +
      '<div class="checkout-item-info">' +
        '<p class="checkout-item-title">' + item.title + '</p>' +
        '<p class="checkout-item-qty">Qty: ' + item.quantity + '</p>' +
      '</div>' +
      '<span class="checkout-item-price">$' + (item.price * item.quantity).toLocaleString() + '</span>' +
    '</div>';
  }).join("");
  jQuery("#checkoutItems").html(itemsHtml);

  jQuery("#checkoutSubtotal").text("$" + t.subtotal.toLocaleString());
  jQuery("#checkoutShipping").text(t.shipping === 0 ? "Free" : "$" + t.shipping.toFixed(2));
  jQuery("#checkoutTax").text("$" + t.tax.toFixed(2));
  jQuery("#checkoutTotal").text("$" + t.total.toFixed(2));
}

function handleCheckout(e) {
  e.preventDefault();
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
  jQuery("#authTitle").text(isLoginMode ? "Welcome Back" : "Create Account");
  jQuery("#authSubtitle").text(isLoginMode ? "Sign in to manage your listings" : "Join the marketplace and start selling");
  jQuery("#authSubmitBtn").text(isLoginMode ? "Sign In" : "Sign Up");
  jQuery("#authToggleText").text(isLoginMode ? "Don't have an account?" : "Already have an account?");
  jQuery("#authToggleBtn").text(isLoginMode ? "Sign up" : "Sign in");
  jQuery("#signupFields").toggle(!isLoginMode);
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
  var sellCategories = ["Guitars & Basses", "Synthesizers", "Headphones", "Speakers & Monitors", "Microphones", "DJ Equipment"];
  var catHtml = jQuery.map(sellCategories, function(c) {
    return '<button class="pill-btn' + (sellCategory === c ? ' active' : '') + '" onclick="selectSellCategory(\'' + c.replace(/'/g, "\\'") + '\')">' + c + '</button>';
  }).join("");
  jQuery("#sellCategoryPills").html(catHtml);

  var sellConditions = ["Like New", "Excellent", "Good", "Fair"];
  var condHtml = jQuery.map(sellConditions, function(c) {
    return '<button class="pill-btn' + (sellCondition === c ? ' active' : '') + '" onclick="selectSellCondition(\'' + c + '\')">' + c + '</button>';
  }).join("");
  jQuery("#sellConditionPills").html(condHtml);

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
  var html = jQuery.map(uploadedImages, function(src, i) {
    return '<div class="upload-thumb">' +
      '<img src="' + src + '" alt="Upload ' + (i + 1) + '" />' +
      '<button class="upload-thumb-remove" onclick="removeUploadedImage(' + i + ')">✕</button>' +
    '</div>';
  }).join("");
  jQuery("#uploadThumbs").html(html);
}

function updateListingPreview() {
  var title = jQuery("#sellTitle").val() || "";
  var price = jQuery("#sellPrice").val() || "";
  var $preview = jQuery("#listingPreview");

  if (title || price) {
    $preview.slideDown(200);
    jQuery("#previewTitle").text(title);
    jQuery("#previewPrice").text(price ? "$" + Number(price).toLocaleString() : "");
    jQuery("#previewCondition").text(sellCondition).toggle(!!sellCondition);
    jQuery("#previewCategory").text(sellCategory || "");
  } else {
    $preview.slideUp(200);
  }
}

function handlePublishListing() {
  var title = jQuery.trim(jQuery("#sellTitle").val());
  var price = jQuery("#sellPrice").val();

  if (!title || !price || !sellCategory || !sellCondition) {
    alert("Please fill in all required fields (title, price, category, condition).");
    return;
  }

  alert("Listing published! (Requires backend integration)");
  showPage("shop");
}

// =============================================
// EVENT DELEGATION (jQuery .on())
// =============================================
jQuery(document).on("input", "#sellTitle, #sellPrice", function() {
  updateListingPreview();
});

// =============================================
// INIT
// =============================================
jQuery(function() {
  initTheme();
  renderFeatured();
  updateCartBadge();
});
