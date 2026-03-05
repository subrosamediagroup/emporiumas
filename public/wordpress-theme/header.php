<?php
/**
 * Theme Header
 *
 * @package MPortiums
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- ========== NAVBAR ========== -->
  <nav class="navbar" id="navbar">
    <div class="container navbar-inner">
      <div class="navbar-left">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
          <img src="<?php echo esc_url( mporiums_get_logo_url() ); ?>" alt="<?php bloginfo( 'name' ); ?>" style="height:32px;" />
        </a>
        <div class="nav-links hide-mobile">
          <?php
          wp_nav_menu( array(
              'theme_location' => 'primary',
              'container'      => false,
              'items_wrap'     => '%3$s',
              'link_before'    => '',
              'link_after'     => '',
              'fallback_cb'    => false,
              'depth'          => 1,
              'walker'         => new Mporiums_Nav_Walker(),
          ) );
          ?>
        </div>
      </div>

      <form class="search-bar hide-mobile" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="s" id="navSearchInput" placeholder="<?php esc_attr_e( 'Search gear, instruments, brands...', 'mporiums' ); ?>" value="<?php echo get_search_query(); ?>" />
      </form>

      <div class="navbar-right">
        <button class="btn btn-ghost icon-btn" id="themeToggle" onclick="toggleTheme()" title="<?php esc_attr_e( 'Toggle theme', 'mporiums' ); ?>">
          <svg id="sunIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg id="moonIcon" style="display:none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" class="btn btn-ghost icon-btn cart-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <span class="cart-badge" id="cartBadge" style="display:none;">0</span>
        </a>
        <?php if ( is_user_logged_in() ) : ?>
          <a href="<?php echo esc_url( home_url( '/account/' ) ); ?>" class="btn btn-primary hide-mobile"><?php esc_html_e( 'My Account', 'mporiums' ); ?></a>
        <?php else : ?>
          <a href="<?php echo esc_url( wp_login_url( home_url() ) ); ?>" class="btn btn-primary hide-mobile"><?php esc_html_e( 'Sign In', 'mporiums' ); ?></a>
        <?php endif; ?>
        <button class="btn btn-ghost icon-btn show-mobile" id="mobileMenuBtn" onclick="toggleMobileMenu()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu" style="display:none;">
      <form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mobile-search">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" name="s" placeholder="<?php esc_attr_e( 'Search gear...', 'mporiums' ); ?>" value="<?php echo get_search_query(); ?>" />
      </form>
      <?php
      wp_nav_menu( array(
          'theme_location' => 'mobile',
          'container'      => false,
          'items_wrap'     => '%3$s',
          'fallback_cb'    => false,
          'depth'          => 1,
          'walker'         => new Mporiums_Mobile_Nav_Walker(),
      ) );
      ?>
      <?php if ( ! is_user_logged_in() ) : ?>
        <a href="<?php echo esc_url( wp_login_url( home_url() ) ); ?>" class="mobile-link" style="color:var(--primary);"><?php esc_html_e( 'Sign In / Sign Up', 'mporiums' ); ?></a>
      <?php endif; ?>
    </div>
  </nav>

<?php
/**
 * Custom Nav Walker for primary menu
 */
class Mporiums_Nav_Walker extends Walker_Nav_Menu {
    function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $output .= '<a href="' . esc_url( $item->url ) . '" class="nav-link">' . esc_html( $item->title ) . '</a>';
    }
}

/**
 * Custom Nav Walker for mobile menu
 */
class Mporiums_Mobile_Nav_Walker extends Walker_Nav_Menu {
    function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $output .= '<a href="' . esc_url( $item->url ) . '" class="mobile-link">' . esc_html( $item->title ) . '</a>';
    }
}
?>
