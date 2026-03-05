<?php
/**
 * Template Name: Sell
 * Description: Create a new listing page.
 *
 * @package MPortiums
 */

get_header();
?>

<main class="page-main">
  <div class="container">
    <div class="sell-header">
      <h1 class="page-title"><?php esc_html_e( 'List Your Gear', 'mporiums' ); ?></h1>
      <p class="text-muted"><?php esc_html_e( 'Fill out the details below to create your listing.', 'mporiums' ); ?></p>
    </div>

    <div class="sell-layout">
      <!-- Left: Images & Details -->
      <div class="sell-main">
        <div class="form-group">
          <label class="label-with-icon">🖼️ <?php esc_html_e( 'Photos', 'mporiums' ); ?> <span class="text-muted text-xs">(0/8)</span></label>
          <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
            <span class="upload-icon">📤</span>
            <span class="upload-text"><?php esc_html_e( 'Click or drag to upload images', 'mporiums' ); ?></span>
          </div>
          <input type="file" id="fileInput" accept="image/*" multiple style="display:none;" onchange="handleImageUpload(event)" />
          <div class="upload-thumbs" id="uploadThumbs"></div>
        </div>

        <hr class="separator" />

        <div class="form-group">
          <label class="label-with-icon">🏷️ <?php esc_html_e( 'Title *', 'mporiums' ); ?></label>
          <input type="text" id="sellTitle" placeholder="<?php esc_attr_e( "e.g. Fender Stratocaster '62 Reissue", 'mporiums' ); ?>" />
        </div>
        <div class="form-group">
          <label class="label-with-icon">ℹ️ <?php esc_html_e( 'Description', 'mporiums' ); ?></label>
          <textarea id="sellDescription" rows="5" placeholder="<?php esc_attr_e( "Describe condition, history, what's included...", 'mporiums' ); ?>"></textarea>
        </div>
      </div>

      <!-- Right: Price, Category, Condition -->
      <div class="sell-sidebar">
        <div class="form-group">
          <label class="label-with-icon">💲 <?php esc_html_e( 'Price *', 'mporiums' ); ?></label>
          <div class="price-input-wrap">
            <span class="price-symbol">$</span>
            <input type="number" id="sellPrice" placeholder="0" />
          </div>
        </div>

        <div class="form-group">
          <label class="label-with-icon">📦 <?php esc_html_e( 'Category *', 'mporiums' ); ?></label>
          <div class="pill-group" id="sellCategoryPills"></div>
        </div>

        <div class="form-group">
          <label class="label-with-icon">⭐ <?php esc_html_e( 'Condition *', 'mporiums' ); ?></label>
          <div class="pill-group" id="sellConditionPills"></div>
        </div>

        <hr class="separator" />

        <!-- Seller Profile Preview -->
        <div class="seller-card">
          <h3 class="filter-title"><?php esc_html_e( 'Your Seller Profile', 'mporiums' ); ?></h3>
          <div class="seller-info">
            <div class="seller-avatar">
              <?php if ( is_user_logged_in() ) : ?>
                <?php echo esc_html( mb_substr( wp_get_current_user()->display_name, 0, 2 ) ); ?>
              <?php else : ?>
                👤
              <?php endif; ?>
            </div>
            <div>
              <?php if ( is_user_logged_in() ) : ?>
                <p class="seller-name"><?php echo esc_html( wp_get_current_user()->display_name ); ?></p>
              <?php else : ?>
                <p class="seller-name"><?php esc_html_e( 'Guest', 'mporiums' ); ?></p>
                <p class="text-muted text-xs"><?php esc_html_e( 'Sign in to build your reputation', 'mporiums' ); ?></p>
              <?php endif; ?>
            </div>
          </div>
        </div>

        <!-- Live Preview -->
        <div class="listing-preview" id="listingPreview" style="display:none;">
          <h3 class="filter-title text-primary"><?php esc_html_e( 'Listing Preview', 'mporiums' ); ?></h3>
          <p class="listing-preview-title" id="previewTitle"></p>
          <div class="listing-preview-meta">
            <span class="listing-preview-price" id="previewPrice"></span>
            <span class="badge badge-secondary" id="previewCondition" style="display:none;"></span>
          </div>
          <p class="text-muted text-xs" id="previewCategory"></p>
        </div>

        <button class="btn btn-primary btn-lg btn-full" onclick="handlePublishListing()"><?php esc_html_e( 'Publish Listing', 'mporiums' ); ?></button>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
