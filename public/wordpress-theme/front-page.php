<?php
/**
 * Template Name: Front Page
 * Description: Homepage with hero, categories, featured listings, and how-it-works.
 *
 * @package MPortiums
 */

get_header();
?>

<main style="padding-top:64px;">

  <!-- Hero -->
  <section class="hero">
    <div class="hero-bg">
      <?php
      $hero_image = get_template_directory_uri() . '/assets/hero-bg.jpg';
      if ( has_post_thumbnail() ) {
          $hero_image = get_the_post_thumbnail_url( get_the_ID(), 'hero-bg' );
      }
      ?>
      <img src="<?php echo esc_url( $hero_image ); ?>" alt="<?php esc_attr_e( 'Audio equipment and musical instruments', 'mporiums' ); ?>" loading="eager" />
      <div class="hero-overlay-lr"></div>
      <div class="hero-overlay-bt"></div>
    </div>
    <div class="container hero-content">
      <div class="hero-text">
        <span class="hero-badge"><?php esc_html_e( 'THE #1 MARKETPLACE FOR USED AUDIO GEAR', 'mporiums' ); ?></span>
        <h1 class="hero-title"><?php esc_html_e( 'Buy & Sell', 'mporiums' ); ?><br /><span class="text-primary"><?php esc_html_e( 'Premium Gear', 'mporiums' ); ?></span></h1>
        <p class="hero-desc"><?php esc_html_e( 'The trusted marketplace for audio hardware, synths, guitars, and studio equipment. Thousands of listings from verified sellers.', 'mporiums' ); ?></p>
        <div class="hero-actions">
          <form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="hero-search">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" name="s" id="heroSearchInput" placeholder="<?php esc_attr_e( 'What gear are you looking for?', 'mporiums' ); ?>" />
          </form>
          <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-primary btn-lg"><?php esc_html_e( 'Browse Gear →', 'mporiums' ); ?></a>
        </div>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="section">
    <div class="container text-center">
      <h2 class="section-title"><?php esc_html_e( 'Browse by Category', 'mporiums' ); ?></h2>
      <p class="section-subtitle"><?php esc_html_e( 'Find exactly what you\'re looking for', 'mporiums' ); ?></p>
      <div class="category-grid">
        <?php
        $categories = array(
            array( 'icon' => '🎸', 'name' => 'Guitars & Basses',    'count' => '8,200+', 'slug' => 'guitars-basses' ),
            array( 'icon' => '🎹', 'name' => 'Synthesizers',        'count' => '4,100+', 'slug' => 'synthesizers' ),
            array( 'icon' => '🎧', 'name' => 'Headphones',          'count' => '6,500+', 'slug' => 'headphones' ),
            array( 'icon' => '🔊', 'name' => 'Speakers & Monitors', 'count' => '3,800+', 'slug' => 'speakers-monitors' ),
            array( 'icon' => '🎙️', 'name' => 'Microphones',         'count' => '2,900+', 'slug' => 'microphones' ),
            array( 'icon' => '🎵', 'name' => 'DJ Equipment',        'count' => '3,400+', 'slug' => 'dj-equipment' ),
        );
        foreach ( $categories as $cat ) :
        ?>
          <a href="<?php echo esc_url( home_url( '/shop/?category=' . $cat['slug'] ) ); ?>" class="card category-card">
            <div class="category-icon"><?php echo $cat['icon']; ?></div>
            <div>
              <p class="category-name"><?php echo esc_html( $cat['name'] ); ?></p>
              <p class="category-count"><?php echo esc_html( $cat['count'] ); ?></p>
            </div>
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Featured Listings -->
  <section class="section section-muted">
    <div class="container">
      <div class="section-header">
        <div>
          <h2 class="section-title"><?php esc_html_e( 'Trending Gear', 'mporiums' ); ?></h2>
          <p class="section-subtitle"><?php esc_html_e( 'Hot listings picked for you', 'mporiums' ); ?></p>
        </div>
        <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="link-primary"><?php esc_html_e( 'View all →', 'mporiums' ); ?></a>
      </div>
      <div class="listing-grid" id="featuredGrid">
        <!-- Populated by JS or via WP_Query in production -->
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="section">
    <div class="container text-center">
      <h2 class="section-title"><?php esc_html_e( 'How It Works', 'mporiums' ); ?></h2>
      <p class="section-subtitle"><?php esc_html_e( 'Simple, secure, and built for gear lovers', 'mporiums' ); ?></p>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3 class="step-title"><?php esc_html_e( 'List or Browse', 'mporiums' ); ?></h3>
          <p class="step-desc"><?php esc_html_e( 'Snap a photo, set your price, and list in minutes. Or explore thousands of listings from verified sellers.', 'mporiums' ); ?></p>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <h3 class="step-title"><?php esc_html_e( 'Connect & Negotiate', 'mporiums' ); ?></h3>
          <p class="step-desc"><?php esc_html_e( 'Chat with buyers or sellers, make offers, and negotiate the best deal.', 'mporiums' ); ?></p>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <h3 class="step-title"><?php esc_html_e( 'Secure Transaction', 'mporiums' ); ?></h3>
          <p class="step-desc"><?php esc_html_e( 'Pay securely through Stripe. Buyer protection included on every transaction.', 'mporiums' ); ?></p>
        </div>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>
