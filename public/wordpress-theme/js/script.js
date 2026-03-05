/* =============================================
   M.Poriums – WordPress Theme Script
   jQuery-based, enqueued via functions.php
   ============================================= */

(function($) {
  'use strict';

  // =============================================
  // PRODUCT DATA (mock – replace with WP REST API or wp_localize_script)
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
  var currentProduct = null;
  var currentImageIndex = 0;
  var selectedCategory = "All";
  var selectedCondition = "All";
  var selectedPriceRange = priceRanges[0];
  var searchQuery = "";

  // Sell page state
  var sellCategory = "";
  var sellCondition = "";
  var uploadedImages = [];

  // =============================================
  // THEME TOGGLE
  // =============================================
  window.toggleTheme = function() {
    $("body").toggleClass("dark");
    var isDark = $("body").hasClass("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    $("#sunIcon").toggle(!isDark);
    $("#moonIcon").toggle(isDark);
  };

  function initTheme() {
    var saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      $("body").addClass("dark");
      $("#sunIcon").hide();
      $("#moonIcon").show();
    }
  }

  // =============================================
  // MOBILE MENU
  // =============================================
  window.toggleMobileMenu = function() {
    $("#mobileMenu").slideToggle(200);
  };

  // =============================================
  // LISTING CARD RENDERING
  // =============================================
  function renderListingCard(product) {
    var url = mporiums_data.home_url + 'product/?id=' + product.id;
    return '<a href="' + url + '" class="card listing-card" data-product-id="' + product.id + '">' +
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
    var $grid = $("#featuredGrid");
    if ($grid.length === 0) return;
    var html = $.map(products, function(p) { return renderListingCard(p); }).join("");
    $grid.html(html);
  }

  // =============================================
  // SHOP PAGE
  // =============================================
  window.applyFilters = function() {
    var sortBy = $("#sortSelect").val() || "Newest";
    var results = $.grep(products, function(p) {
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

    $("#shopTitle").text(searchQuery ? 'Results for "' + searchQuery + '"' : "Shop Gear");
    $("#shopCount").text(results.length + " items found");

    if (results.length === 0) {
      $("#shopGrid").empty();
      $("#shopEmpty").show();
    } else {
      $("#shopEmpty").hide();
      $("#shopGrid").html($.map(results, function(p) { return renderListingCard(p); }).join(""));
    }
  };

  window.clearFilters = function() {
    selectedCategory = "All";
    selectedCondition = "All";
    selectedPriceRange = priceRanges[0];
    searchQuery = "";
    renderShop();
  };

  function renderFilters() {
    var catHtml = $.map(categories, function(c) {
      return '<button class="filter-btn' + (selectedCategory === c ? ' active' : '') + '" data-filter="category" data-value="' + c + '">' + c + '</button>';
    }).join("");
    $("#categoryFilters").html(catHtml);

    var priceHtml = $.map(priceRanges, function(r, i) {
      return '<button class="filter-btn' + (selectedPriceRange.label === r.label ? ' active' : '') + '" data-filter="price" data-index="' + i + '">' + r.label + '</button>';
    }).join("");
    $("#priceFilters").html(priceHtml);

    var condHtml = $.map(conditions, function(c) {
      return '<button class="filter-btn' + (selectedCondition === c ? ' active' : '') + '" data-filter="condition" data-value="' + c + '">' + c + '</button>';
    }).join("");
    $("#conditionFilters").html(condHtml);
  }

  function renderShop() {
    renderFilters();
    applyFilters();
  }

  // Event delegation for filters
  $(document).on("click", "[data-filter]", function() {
    var type = $(this).data("filter");
    if (type === "category") { selectedCategory = $(this).data("value"); }
    if (type === "condition") { selectedCondition = $(this).data("value"); }
    if (type === "price") { selectedPriceRange = priceRanges[$(this).data("index")]; }
    renderShop();
  });

  // =============================================
  // PRODUCT DETAIL
  // =============================================
  function loadProduct() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    if (!id) return;

    currentProduct = $.grep(products, function(p) { return p.id === id; })[0];
    if (!currentProduct) return;
    currentImageIndex = 0;

    $("#productMainImg").attr("src", currentProduct.images[0]);
    $("#productTitle").text(currentProduct.title);
    $("#productCondition").text(currentProduct.condition);
    $("#productCategory").text(currentProduct.category);
    $("#productCategorySub").text(currentProduct.category);
    $("#productPrice").text("$" + currentProduct.price.toLocaleString());
    $("#productDescription").text(currentProduct.description);
    $("#productRating").html(currentProduct.rating > 0 ? "⭐ " + currentProduct.rating : "");

    $("#sellerAvatar").text(currentProduct.sellerAvatar);
    $("#sellerName").text(currentProduct.seller);
    $("#sellerVerified").toggle(currentProduct.verified);
    $("#sellerRating").text(currentProduct.sellerRating > 0 ? "⭐ " + currentProduct.sellerRating : "");
    $("#sellerListings").text(currentProduct.sellerListings + " listings");
    $("#sellerSince").text("Since " + currentProduct.memberSince);

    var thumbHtml = $.map(currentProduct.images, function(img, i) {
      return '<button class="product-thumb' + (i === 0 ? ' active' : '') + '" data-thumb-index="' + i + '">' +
        '<img src="' + img + '" alt="Thumbnail ' + (i + 1) + '" />' +
      '</button>';
    }).join("");
    $("#productThumbs").html(thumbHtml);
  }

  $(document).on("click", "[data-thumb-index]", function() {
    var i = parseInt($(this).data("thumb-index"), 10);
    if (!currentProduct) return;
    currentImageIndex = i;
    $("#productMainImg").attr("src", currentProduct.images[i]);
    $(".product-thumb").removeClass("active").eq(i).addClass("active");
  });

  window.prevProductImage = function() {
    if (!currentProduct || currentProduct.images.length <= 1) return;
    currentImageIndex = (currentImageIndex - 1 + currentProduct.images.length) % currentProduct.images.length;
    $("#productMainImg").attr("src", currentProduct.images[currentImageIndex]);
    $(".product-thumb").removeClass("active").eq(currentImageIndex).addClass("active");
  };

  window.nextProductImage = function() {
    if (!currentProduct || currentProduct.images.length <= 1) return;
    currentImageIndex = (currentImageIndex + 1) % currentProduct.images.length;
    $("#productMainImg").attr("src", currentProduct.images[currentImageIndex]);
    $(".product-thumb").removeClass("active").eq(currentImageIndex).addClass("active");
  };

  // =============================================
  // OFFER MODAL
  // =============================================
  window.openOfferModal = function() {
    if (!currentProduct) return;
    $("#offerProductTitle").text(currentProduct.title);
    $("#offerProductPrice").text("$" + currentProduct.price.toLocaleString());
    $("#offerAmount").attr("placeholder", Math.round(currentProduct.price * 0.9));
    $("#offerModal").fadeIn(200);
  };

  window.closeOfferModal = function(e) {
    if (e && e.target !== e.currentTarget) return;
    $("#offerModal").fadeOut(200);
  };

  // =============================================
  // CART
  // =============================================
  window.addToCart = function() {
    if (!currentProduct) return;
    var existing = $.grep(cart, function(item) { return item.id === currentProduct.id; })[0];
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
  };

  function removeFromCart(id) {
    cart = $.grep(cart, function(item) { return item.id !== id; });
    updateCartBadge();
    renderCart();
  }

  function updateQty(id, delta) {
    var item = $.grep(cart, function(i) { return i.id === id; })[0];
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) { removeFromCart(id); return; }
    renderCart();
  }

  function updateCartBadge() {
    var total = 0;
    $.each(cart, function(i, item) { total += item.quantity; });
    $("#cartBadge").text(total).toggle(total > 0);
  }

  function getCartTotals() {
    var subtotal = 0, items = 0;
    $.each(cart, function(i, item) {
      subtotal += item.price * item.quantity;
      items += item.quantity;
    });
    var shipping = subtotal > 500 ? 0 : 14.99;
    var tax = subtotal * 0.08;
    return { subtotal: subtotal, shipping: shipping, tax: tax, total: subtotal + shipping + tax, items: items };
  }

  function renderCart() {
    if (cart.length === 0) {
      $("#cartEmpty").show();
      $("#cartContent").hide();
      $("#cartItemCount").text("");
      return;
    }

    $("#cartEmpty").hide();
    $("#cartContent").show();

    var t = getCartTotals();
    $("#cartItemCount").text("(" + t.items + ")");

    var itemsHtml = $.map(cart, function(item) {
      return '<div class="cart-item">' +
        '<div class="cart-item-image"><img src="' + item.image + '" alt="' + item.title + '" /></div>' +
        '<div class="cart-item-info">' +
          '<div>' +
            '<span class="cart-item-title">' + item.title + '</span>' +
            '<p class="cart-item-meta">' + item.condition + ' · Sold by ' + item.seller + '</p>' +
          '</div>' +
          '<div class="cart-item-bottom">' +
            '<div class="qty-control">' +
              '<button class="qty-btn" data-qty-id="' + item.id + '" data-qty-delta="-1">−</button>' +
              '<span class="qty-value">' + item.quantity + '</span>' +
              '<button class="qty-btn" data-qty-id="' + item.id + '" data-qty-delta="1">+</button>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:0.75rem;">' +
              '<button class="remove-btn" data-remove-id="' + item.id + '">🗑️</button>' +
              '<span class="cart-item-price">$' + (item.price * item.quantity).toLocaleString() + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join("");
    $("#cartItems").html(itemsHtml);

    $("#cartSubtotal").text("$" + t.subtotal.toLocaleString());
    $("#cartShipping").text(t.shipping === 0 ? "Free" : "$" + t.shipping.toFixed(2));
    $("#cartTax").text("$" + t.tax.toFixed(2));
    $("#cartTotal").text("$" + t.total.toFixed(2));
    $("#freeShippingNote").toggle(t.shipping === 0);
  }

  // Cart event delegation
  $(document).on("click", "[data-qty-id]", function() {
    updateQty($(this).data("qty-id"), parseInt($(this).data("qty-delta"), 10));
  });
  $(document).on("click", "[data-remove-id]", function() {
    removeFromCart($(this).data("remove-id"));
  });

  // =============================================
  // CHECKOUT
  // =============================================
  function renderCheckout() {
    var t = getCartTotals();

    var itemsHtml = $.map(cart, function(item) {
      return '<div class="checkout-item">' +
        '<img src="' + item.image + '" alt="' + item.title + '" />' +
        '<div class="checkout-item-info">' +
          '<p class="checkout-item-title">' + item.title + '</p>' +
          '<p class="checkout-item-qty">Qty: ' + item.quantity + '</p>' +
        '</div>' +
        '<span class="checkout-item-price">$' + (item.price * item.quantity).toLocaleString() + '</span>' +
      '</div>';
    }).join("");
    $("#checkoutItems").html(itemsHtml);

    $("#checkoutSubtotal").text("$" + t.subtotal.toLocaleString());
    $("#checkoutShipping").text(t.shipping === 0 ? "Free" : "$" + t.shipping.toFixed(2));
    $("#checkoutTax").text("$" + t.tax.toFixed(2));
    $("#checkoutTotal").text("$" + t.total.toFixed(2));
  }

  window.handleCheckout = function(e) {
    e.preventDefault();
    alert("In production, you would be redirected to Stripe for secure payment.");
    cart = [];
    updateCartBadge();
    window.location.href = mporiums_data.home_url + 'payment-success/';
  };

  // =============================================
  // ACCOUNT
  // =============================================
  window.handleSaveProfile = function(e) {
    e.preventDefault();
    // In production, submit via AJAX to WordPress
    alert("Profile saved!");
  };

  // =============================================
  // SELL PAGE
  // =============================================
  function initSellPage() {
    var sellCategories = ["Guitars & Basses", "Synthesizers", "Headphones", "Speakers & Monitors", "Microphones", "DJ Equipment"];
    var catHtml = $.map(sellCategories, function(c) {
      return '<button class="pill-btn' + (sellCategory === c ? ' active' : '') + '" data-sell-cat="' + c + '">' + c + '</button>';
    }).join("");
    $("#sellCategoryPills").html(catHtml);

    var sellConditions = ["Like New", "Excellent", "Good", "Fair"];
    var condHtml = $.map(sellConditions, function(c) {
      return '<button class="pill-btn' + (sellCondition === c ? ' active' : '') + '" data-sell-cond="' + c + '">' + c + '</button>';
    }).join("");
    $("#sellConditionPills").html(condHtml);

    updateListingPreview();
  }

  $(document).on("click", "[data-sell-cat]", function() {
    sellCategory = $(this).data("sell-cat");
    initSellPage();
  });

  $(document).on("click", "[data-sell-cond]", function() {
    sellCondition = $(this).data("sell-cond");
    initSellPage();
  });

  window.handleImageUpload = function(e) {
    var files = e.target.files;
    if (!files) return;
    for (var i = 0; i < files.length && uploadedImages.length < 8; i++) {
      if (!files[i].type.startsWith("image/")) continue;
      uploadedImages.push(URL.createObjectURL(files[i]));
    }
    renderUploadThumbs();
  };

  function renderUploadThumbs() {
    var html = $.map(uploadedImages, function(src, i) {
      return '<div class="upload-thumb">' +
        '<img src="' + src + '" alt="Upload ' + (i + 1) + '" />' +
        '<button class="upload-thumb-remove" data-remove-upload="' + i + '">✕</button>' +
      '</div>';
    }).join("");
    $("#uploadThumbs").html(html);
  }

  $(document).on("click", "[data-remove-upload]", function() {
    uploadedImages.splice($(this).data("remove-upload"), 1);
    renderUploadThumbs();
  });

  function updateListingPreview() {
    var title = $("#sellTitle").val() || "";
    var price = $("#sellPrice").val() || "";
    var $preview = $("#listingPreview");

    if (title || price) {
      $preview.slideDown(200);
      $("#previewTitle").text(title);
      $("#previewPrice").text(price ? "$" + Number(price).toLocaleString() : "");
      $("#previewCondition").text(sellCondition).toggle(!!sellCondition);
      $("#previewCategory").text(sellCategory || "");
    } else {
      $preview.slideUp(200);
    }
  }

  $(document).on("input", "#sellTitle, #sellPrice", function() {
    updateListingPreview();
  });

  window.handlePublishListing = function() {
    var title = $.trim($("#sellTitle").val());
    var price = $("#sellPrice").val();

    if (!title || !price || !sellCategory || !sellCondition) {
      alert("Please fill in all required fields (title, price, category, condition).");
      return;
    }

    // In production, submit via AJAX with nonce: mporiums_data.nonce
    alert("Listing published!");
    window.location.href = mporiums_data.home_url + 'shop/';
  };

  // =============================================
  // INIT
  // =============================================
  $(function() {
    initTheme();
    renderFeatured();
    updateCartBadge();

    // Page-specific init
    if ($("#shopGrid").length) renderShop();
    if ($("#cartItems").length) renderCart();
    if ($("#checkoutItems").length) renderCheckout();
    if ($("#sellCategoryPills").length) initSellPage();
    if ($("#productMainImg").length) loadProduct();
  });

})(jQuery);
