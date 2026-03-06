<?php
/**
 * Standalone Header Template
 * Replicates the React Navbar component for WordPress without Elementor.
 *
 * Usage: <?php get_template_part( 'elementor-templates/header' ); ?>
 * Or:    <?php include get_template_directory() . '/elementor-templates/header.php'; ?>
 *
 * @package MPortiums
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<nav class="navbar" id="navbar" style="position:fixed;top:0;left:0;right:0;z-index:50;border-bottom:1px solid var(--border, #E5E7EB);background:rgba(255,255,255,0.8);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);">
  <div style="max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 16px;">

    <!-- Left: Logo + Nav Links -->
    <div style="display:flex;align-items:center;gap:32px;">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
        <img
          src="<?php echo esc_url( function_exists( 'mporiums_get_logo_url' ) ? mporiums_get_logo_url() : get_template_directory_uri() . '/assets/mporiums-logo.png' ); ?>"
          alt="<?php bloginfo( 'name' ); ?>"
          style="height:32px;"
        />
      </a>
      <div class="hide-mobile" style="display:flex;align-items:center;gap:24px;">
        <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;transition:color .2s;">Shop</a>
        <a href="<?php echo esc_url( home_url( '/sell/' ) ); ?>" style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;transition:color .2s;">Sell</a>
        <a href="#" style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;transition:color .2s;">Deals</a>
        <a href="#" style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;transition:color .2s;">Community</a>
      </div>
    </div>

    <!-- Center: Search -->
    <form class="hide-mobile" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" style="flex:1;max-width:448px;margin:0 32px;">
      <div style="position:relative;">
        <svg style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--muted-foreground, #6B7280);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          name="s"
          placeholder="<?php esc_attr_e( 'Search gear, instruments, brands...', 'mporiums' ); ?>"
          value="<?php echo get_search_query(); ?>"
          style="width:100%;border-radius:8px;border:1px solid var(--border, #E5E7EB);background:var(--secondary, #F3F4F6);padding:8px 12px 8px 40px;font-family:'Inter',sans-serif;font-size:14px;color:var(--foreground, #1A1A2E);outline:none;"
        />
      </div>
    </form>

    <!-- Right: Actions -->
    <div style="display:flex;align-items:center;gap:4px;">
      <!-- Theme Toggle -->
      <button class="icon-btn" id="themeToggle" onclick="toggleTheme()" title="<?php esc_attr_e( 'Toggle theme', 'mporiums' ); ?>" style="background:none;border:none;cursor:pointer;padding:8px;border-radius:6px;color:var(--muted-foreground, #6B7280);">
        <svg id="sunIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg id="moonIcon" style="display:none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>

      <!-- Cart -->
      <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" style="position:relative;background:none;border:none;cursor:pointer;padding:8px;border-radius:6px;color:var(--muted-foreground, #6B7280);text-decoration:none;display:inline-flex;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <span class="cart-badge" id="cartBadge" style="display:none;position:absolute;top:-2px;right:-2px;background:#E3232C;color:#fff;font-size:10px;font-weight:700;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;">0</span>
      </a>

      <!-- Sign In / My Account -->
      <?php if ( is_user_logged_in() ) : ?>
        <a href="<?php echo esc_url( home_url( '/account/' ) ); ?>" class="hide-mobile" style="display:inline-flex;align-items:center;padding:8px 16px;background:#E3232C;color:#fff;border-radius:6px;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;text-decoration:none;margin-left:4px;">My Account</a>
      <?php else : ?>
        <a href="<?php echo esc_url( wp_login_url( home_url() ) ); ?>" class="hide-mobile" style="display:inline-flex;align-items:center;padding:8px 16px;background:#E3232C;color:#fff;border-radius:6px;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;text-decoration:none;margin-left:4px;">Sign In</a>
      <?php endif; ?>

      <!-- Mobile Menu Toggle -->
      <button class="show-mobile" id="mobileMenuBtn" onclick="toggleMobileMenu()" style="background:none;border:none;cursor:pointer;padding:8px;border-radius:6px;color:var(--muted-foreground, #6B7280);display:none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobileMenu" style="display:none;border-top:1px solid var(--border, #E5E7EB);background:var(--background, #fff);padding:16px;">
    <form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" style="position:relative;margin-bottom:16px;">
      <svg style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--muted-foreground, #6B7280);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input
        type="text"
        name="s"
        placeholder="<?php esc_attr_e( 'Search gear...', 'mporiums' ); ?>"
        value="<?php echo get_search_query(); ?>"
        style="width:100%;border-radius:8px;border:1px solid var(--border, #E5E7EB);background:var(--secondary, #F3F4F6);padding:8px 12px 8px 40px;font-family:'Inter',sans-serif;font-size:14px;color:var(--foreground, #1A1A2E);outline:none;"
      />
    </form>
    <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" style="display:block;padding:8px 0;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;">Shop</a>
    <a href="<?php echo esc_url( home_url( '/sell/' ) ); ?>" style="display:block;padding:8px 0;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;">Sell</a>
    <a href="#" style="display:block;padding:8px 0;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;">Deals</a>
    <a href="#" style="display:block;padding:8px 0;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;">Community</a>
    <?php if ( is_user_logged_in() ) : ?>
      <a href="<?php echo esc_url( home_url( '/account/' ) ); ?>" style="display:block;padding:8px 0;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--muted-foreground, #6B7280);text-decoration:none;">My Account</a>
      <a href="<?php echo esc_url( wp_logout_url( home_url() ) ); ?>" style="display:block;padding:8px 0;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:#E3232C;text-decoration:none;">Sign Out</a>
    <?php else : ?>
      <a href="<?php echo esc_url( wp_login_url( home_url() ) ); ?>" style="display:block;padding:8px 0;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:#E3232C;text-decoration:none;">Sign In / Sign Up</a>
    <?php endif; ?>
  </div>
</nav>
<!-- Spacer to offset fixed navbar -->
<div style="height:64px;"></div>
