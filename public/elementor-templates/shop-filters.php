<?php
/**
 * Shop Filters – Category & Price Range
 * Clickable links that navigate to the shop page with the selected filter applied.
 *
 * @package MPortiums
 */

$categories = array(
  'Guitars & Basses',
  'Synthesizers',
  'Headphones',
  'Speakers & Monitors',
  'Microphones',
  'DJ Equipment',
);

$price_ranges = array(
  array( 'label' => 'Under $250',         'min' => 0,      'max' => 25000  ),
  array( 'label' => '$250 – $500',         'min' => 25000,  'max' => 50000  ),
  array( 'label' => '$500 – $1,000',       'min' => 50000,  'max' => 100000 ),
  array( 'label' => '$1,000 – $2,000',     'min' => 100000, 'max' => 200000 ),
  array( 'label' => '$2,000+',             'min' => 200000, 'max' => 0      ),
);

$conditions = array( 'Like New', 'Excellent', 'Good', 'Fair' );

$current_category  = isset( $_GET['category'] )  ? sanitize_text_field( $_GET['category'] )  : '';
$current_price_min = isset( $_GET['price_min'] )  ? intval( $_GET['price_min'] )              : '';
$current_price_max = isset( $_GET['price_max'] )  ? intval( $_GET['price_max'] )              : '';
$current_condition = isset( $_GET['condition'] )   ? sanitize_text_field( $_GET['condition'] ) : '';
$shop_url          = home_url( '/shop/' );
?>

<aside class="shop-sidebar">

  <!-- Categories -->
  <div class="filter-section">
    <h4 class="filter-title"><?php esc_html_e( 'Category', 'mporiums' ); ?></h4>
    <ul class="filter-list">
      <li>
        <a href="<?php echo esc_url( $shop_url ); ?>"
           class="filter-link<?php echo empty( $current_category ) ? ' active' : ''; ?>">
          <?php esc_html_e( 'All', 'mporiums' ); ?>
        </a>
      </li>
      <?php foreach ( $categories as $cat ) :
        $url = add_query_arg( 'category', urlencode( $cat ), $shop_url );
      ?>
        <li>
          <a href="<?php echo esc_url( $url ); ?>"
             class="filter-link<?php echo ( $current_category === $cat ) ? ' active' : ''; ?>">
            <?php echo esc_html( $cat ); ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>

  <!-- Price Range -->
  <div class="filter-section">
    <h4 class="filter-title"><?php esc_html_e( 'Price Range', 'mporiums' ); ?></h4>
    <ul class="filter-list">
      <li>
        <a href="<?php echo esc_url( remove_query_arg( array( 'price_min', 'price_max' ), $shop_url ) ); ?>"
           class="filter-link<?php echo ( $current_price_min === '' ) ? ' active' : ''; ?>">
          <?php esc_html_e( 'All', 'mporiums' ); ?>
        </a>
      </li>
      <?php foreach ( $price_ranges as $range ) :
        $url = add_query_arg( array(
          'price_min' => $range['min'],
          'price_max' => $range['max'],
        ), $shop_url );
      ?>
        <li>
          <a href="<?php echo esc_url( $url ); ?>"
             class="filter-link<?php echo ( $current_price_min !== '' && intval( $current_price_min ) === $range['min'] ) ? ' active' : ''; ?>">
            <?php echo esc_html( $range['label'] ); ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>

  <!-- Condition -->
  <div class="filter-section">
    <h4 class="filter-title"><?php esc_html_e( 'Condition', 'mporiums' ); ?></h4>
    <ul class="filter-list">
      <li>
        <a href="<?php echo esc_url( remove_query_arg( 'condition', $shop_url ) ); ?>"
           class="filter-link<?php echo empty( $current_condition ) ? ' active' : ''; ?>">
          <?php esc_html_e( 'All', 'mporiums' ); ?>
        </a>
      </li>
      <?php foreach ( $conditions as $cond ) :
        $url = add_query_arg( 'condition', urlencode( $cond ), $shop_url );
      ?>
        <li>
          <a href="<?php echo esc_url( $url ); ?>"
             class="filter-link<?php echo ( $current_condition === $cond ) ? ' active' : ''; ?>">
            <?php echo esc_html( $cond ); ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>

  <!-- Clear Filters -->
  <a href="<?php echo esc_url( $shop_url ); ?>" class="btn btn-outline btn-sm btn-full">
    ✕ <?php esc_html_e( 'Clear Filters', 'mporiums' ); ?>
  </a>

</aside>

<style>
  .filter-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
  }
  .filter-link {
    display: block;
    padding: 6px 12px;
    border-radius: 6px;
    color: #5C6370;
    text-decoration: none;
    font-size: 14px;
    transition: background .15s, color .15s;
  }
  .filter-link:hover {
    background: rgba(198, 40, 40, .08);
    color: #C62828;
  }
  .filter-link.active {
    background: rgba(198, 40, 40, .12);
    color: #C62828;
    font-weight: 600;
  }
  .filter-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: .5rem;
  }
  .filter-section {
    margin-bottom: 1.5rem;
  }
</style>
