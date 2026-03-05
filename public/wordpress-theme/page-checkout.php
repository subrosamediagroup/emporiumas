<?php
/**
 * Template Name: Checkout
 * Description: Checkout page with shipping form and order summary.
 *
 * @package MPortiums
 */

get_header();
?>

<main class="page-main">
  <div class="container">
    <div class="breadcrumb">
      <a href="<?php echo esc_url( home_url( '/cart/' ) ); ?>" class="link-primary"><?php esc_html_e( '← Back to Cart', 'mporiums' ); ?></a>
    </div>
    <h1 class="page-title"><?php esc_html_e( 'Checkout', 'mporiums' ); ?></h1>

    <form id="checkoutForm" onsubmit="handleCheckout(event)" class="checkout-layout">
      <div class="checkout-form">
        <!-- Shipping -->
        <div class="form-card">
          <h2 class="form-card-title"><?php esc_html_e( 'Shipping Address', 'mporiums' ); ?></h2>
          <hr class="separator" />
          <div class="form-grid-2">
            <div class="form-group"><label><?php esc_html_e( 'First Name', 'mporiums' ); ?></label><input type="text" name="firstName" required placeholder="John" /></div>
            <div class="form-group"><label><?php esc_html_e( 'Last Name', 'mporiums' ); ?></label><input type="text" name="lastName" required placeholder="Doe" /></div>
          </div>
          <div class="form-group"><label><?php esc_html_e( 'Email', 'mporiums' ); ?></label><input type="email" name="email" required placeholder="john@example.com" /></div>
          <div class="form-group"><label><?php esc_html_e( 'Street Address', 'mporiums' ); ?></label><input type="text" name="address" required placeholder="123 Main St" /></div>
          <div class="form-grid-2">
            <div class="form-group"><label><?php esc_html_e( 'City', 'mporiums' ); ?></label><input type="text" name="city" required placeholder="Los Angeles" /></div>
            <div class="form-group"><label><?php esc_html_e( 'State', 'mporiums' ); ?></label><input type="text" name="state" required placeholder="California" /></div>
          </div>
          <div class="form-grid-2">
            <div class="form-group"><label><?php esc_html_e( 'ZIP Code', 'mporiums' ); ?></label><input type="text" name="zip" required placeholder="90001" /></div>
            <div class="form-group"><label><?php esc_html_e( 'Phone', 'mporiums' ); ?></label><input type="tel" name="phone" required placeholder="(555) 123-4567" /></div>
          </div>
        </div>

        <!-- Payment Info -->
        <div class="form-card">
          <h2 class="form-card-title"><?php esc_html_e( 'Payment', 'mporiums' ); ?></h2>
          <hr class="separator" />
          <div class="info-box">
            <span>💳</span>
            <div>
              <p class="info-box-title"><?php esc_html_e( 'Secure Card Payment via Stripe', 'mporiums' ); ?></p>
              <p class="text-muted text-xs"><?php esc_html_e( "You'll be redirected to Stripe's secure checkout to complete payment.", 'mporiums' ); ?></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout Summary -->
      <div class="checkout-summary">
        <div class="summary-card sticky">
          <h2 class="summary-title"><?php esc_html_e( 'Order Summary', 'mporiums' ); ?></h2>
          <hr class="separator" />
          <div id="checkoutItems" class="checkout-items"></div>
          <hr class="separator" />
          <div class="summary-row"><span><?php esc_html_e( 'Subtotal', 'mporiums' ); ?></span><span id="checkoutSubtotal">$0</span></div>
          <div class="summary-row"><span><?php esc_html_e( 'Shipping', 'mporiums' ); ?></span><span id="checkoutShipping">$0</span></div>
          <div class="summary-row"><span><?php esc_html_e( 'Estimated Tax', 'mporiums' ); ?></span><span id="checkoutTax">$0</span></div>
          <hr class="separator" />
          <div class="summary-total"><span><?php esc_html_e( 'Total', 'mporiums' ); ?></span><span id="checkoutTotal">$0</span></div>
          <button type="submit" class="btn btn-primary btn-lg btn-full" style="margin-top:1.5rem;"><?php esc_html_e( 'Proceed to Payment', 'mporiums' ); ?></button>
          <div class="secure-note">🛡️ <?php esc_html_e( 'Secure checkout · Buyer protection included', 'mporiums' ); ?></div>
        </div>
      </div>
    </form>
  </div>
</main>

<?php get_footer(); ?>
