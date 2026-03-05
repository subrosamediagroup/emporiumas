<?php
/**
 * Template Name: Product Detail
 * Description: Single product/listing detail page.
 *
 * @package MPortiums
 */

get_header();
?>

<main class="page-main">
  <div class="container">
    <div class="breadcrumb">
      <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="link-primary"><?php esc_html_e( '← Back to Shop', 'mporiums' ); ?></a>
      <span>/</span>
      <span id="productCategory"><?php esc_html_e( 'Category', 'mporiums' ); ?></span>
    </div>

    <div class="product-layout">
      <!-- Image Gallery -->
      <div class="product-gallery">
        <div class="product-main-image">
          <img id="productMainImg" src="" alt="<?php esc_attr_e( 'Product image', 'mporiums' ); ?>" />
          <button class="gallery-nav gallery-prev" onclick="prevProductImage()">‹</button>
          <button class="gallery-nav gallery-next" onclick="nextProductImage()">›</button>
        </div>
        <div class="product-thumbs" id="productThumbs">
          <!-- Populated by JS -->
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <span class="badge badge-secondary" id="productCondition"><?php esc_html_e( 'Condition', 'mporiums' ); ?></span>
        <h1 class="product-title" id="productTitle"><?php esc_html_e( 'Product Title', 'mporiums' ); ?></h1>
        <p class="text-muted" id="productCategorySub"><?php esc_html_e( 'Category', 'mporiums' ); ?></p>
        <p class="product-price" id="productPrice">$0</p>
        <div class="product-rating" id="productRating"></div>

        <hr class="separator" />
        <p class="product-description" id="productDescription"></p>
        <hr class="separator" />

        <!-- Seller Card -->
        <div class="seller-card">
          <h3 class="filter-title"><?php esc_html_e( 'Seller', 'mporiums' ); ?></h3>
          <div class="seller-info">
            <div class="seller-avatar" id="sellerAvatar">VA</div>
            <div>
              <div class="seller-name">
                <span id="sellerName"><?php esc_html_e( 'Seller', 'mporiums' ); ?></span>
                <span id="sellerVerified" style="display:none;">🛡️</span>
              </div>
              <div class="seller-meta">
                <span id="sellerRating"></span>
                <span id="sellerListings"></span>
                <span id="sellerSince"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="product-actions">
          <button class="btn btn-primary btn-lg btn-flex" onclick="addToCart()">🛒 <?php esc_html_e( 'Add to Cart', 'mporiums' ); ?></button>
          <button class="btn btn-outline btn-lg" onclick="openOfferModal()">💬 <?php esc_html_e( 'Make Offer', 'mporiums' ); ?></button>
          <button class="btn btn-outline btn-lg">♥ <?php esc_html_e( 'Save', 'mporiums' ); ?></button>
          <button class="btn btn-outline btn-lg">↗ <?php esc_html_e( 'Share', 'mporiums' ); ?></button>
        </div>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
