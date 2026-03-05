<?php
/**
 * Template Name: Cart
 * Description: Shopping cart page.
 *
 * @package MPortiums
 */

get_header();
?>

<main class="page-main">
  <div class="container">
    <div class="breadcrumb">
      <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="link-primary"><?php esc_html_e( '← Continue Shopping', 'mporiums' ); ?></a>
    </div>
    <h1 class="page-title"><?php esc_html_e( 'Shopping Cart', 'mporiums' ); ?> <span class="text-muted" id="cartItemCount"></span></h1>

    <!-- Empty State -->
    <div class="empty-state" id="cartEmpty" style="display:none;">
      <div class="empty-icon">🛍️</div>
      <h2 class="empty-title"><?php esc_html_e( 'Your cart is empty', 'mporiums' ); ?></h2>
      <p class="text-muted"><?php esc_html_e( 'Discover amazing deals on music gear, instruments, and audio equipment.', 'mporiums' ); ?></p>
      <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-primary btn-lg" style="margin-top:1.5rem;"><?php esc_html_e( 'Browse the Shop', 'mporiums' ); ?></a>
    </div>

    <!-- Cart Content -->
    <div class="cart-layout" id="cartContent" style="display:none;">
      <div class="cart-items" id="cartItems">
        <!-- Populated by JS -->
      </div>
      <div class="cart-summary">
        <div class="summary-card">
          <h2 class="summary-title"><?php esc_html_e( 'Order Summary', 'mporiums' ); ?></h2>
          <hr class="separator" />
          <div class="summary-row"><span><?php esc_html_e( 'Subtotal', 'mporiums' ); ?></span><span id="cartSubtotal">$0</span></div>
          <div class="summary-row"><span><?php esc_html_e( 'Shipping', 'mporiums' ); ?></span><span id="cartShipping">$0</span></div>
          <div class="summary-row"><span><?php esc_html_e( 'Estimated Tax', 'mporiums' ); ?></span><span id="cartTax">$0</span></div>
          <hr class="separator" />
          <div class="summary-total"><span><?php esc_html_e( 'Total', 'mporiums' ); ?></span><span id="cartTotal">$0</span></div>
          <p class="free-shipping-note" id="freeShippingNote" style="display:none;">🎉 <?php esc_html_e( 'You qualify for free shipping!', 'mporiums' ); ?></p>
          <a href="<?php echo esc_url( home_url( '/checkout/' ) ); ?>" class="btn btn-primary btn-lg btn-full" style="margin-top:1.5rem;"><?php esc_html_e( 'Proceed to Checkout', 'mporiums' ); ?></a>
          <div class="secure-note">🛡️ <?php esc_html_e( 'Secure checkout · Buyer protection included', 'mporiums' ); ?></div>
        </div>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
