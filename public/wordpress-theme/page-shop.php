<?php
/**
 * Template Name: Shop
 * Description: Shop page with filters and product grid.
 *
 * @package MPortiums
 */

get_header();
?>

<main class="page-main">
  <div class="container">
    <div class="shop-header">
      <div>
        <h1 class="page-title" id="shopTitle"><?php esc_html_e( 'Shop Gear', 'mporiums' ); ?></h1>
        <p class="text-muted" id="shopCount"></p>
      </div>
      <div class="shop-controls">
        <select id="sortSelect" onchange="applyFilters()" class="select-control">
          <option><?php esc_html_e( 'Newest', 'mporiums' ); ?></option>
          <option><?php esc_html_e( 'Price: Low to High', 'mporiums' ); ?></option>
          <option><?php esc_html_e( 'Price: High to Low', 'mporiums' ); ?></option>
        </select>
      </div>
    </div>

    <div class="shop-layout">
      <!-- Sidebar Filters -->
      <aside class="shop-sidebar hide-mobile">
        <div class="filter-section">
          <h4 class="filter-title"><?php esc_html_e( 'Category', 'mporiums' ); ?></h4>
          <div class="filter-options" id="categoryFilters">
            <!-- Populated by JS -->
          </div>
        </div>
        <div class="filter-section">
          <h4 class="filter-title"><?php esc_html_e( 'Price Range', 'mporiums' ); ?></h4>
          <div class="filter-options" id="priceFilters">
            <!-- Populated by JS -->
          </div>
        </div>
        <div class="filter-section">
          <h4 class="filter-title"><?php esc_html_e( 'Condition', 'mporiums' ); ?></h4>
          <div class="filter-options" id="conditionFilters">
            <!-- Populated by JS -->
          </div>
        </div>
        <button class="btn btn-outline btn-sm btn-full" onclick="clearFilters()">✕ <?php esc_html_e( 'Clear Filters', 'mporiums' ); ?></button>
      </aside>

      <!-- Product Grid -->
      <div class="shop-grid-wrapper">
        <div class="listing-grid" id="shopGrid">
          <!-- Populated by JS -->
        </div>
        <div class="empty-state" id="shopEmpty" style="display:none;">
          <p class="empty-title"><?php esc_html_e( 'No items match your filters', 'mporiums' ); ?></p>
          <p class="text-muted"><?php esc_html_e( 'Try adjusting your criteria', 'mporiums' ); ?></p>
          <button class="btn btn-outline btn-sm" onclick="clearFilters()" style="margin-top:1rem;"><?php esc_html_e( 'Clear Filters', 'mporiums' ); ?></button>
        </div>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
