<?php
/**
 * Template Name: Account
 * Description: User account management page.
 *
 * @package MPortiums
 */

// Redirect to login if not authenticated
if ( ! is_user_logged_in() ) {
    wp_redirect( wp_login_url( get_permalink() ) );
    exit;
}

$current_user = wp_get_current_user();

get_header();
?>

<main class="page-main">
  <div class="container narrow">
    <h1 class="page-title"><?php esc_html_e( 'My Account', 'mporiums' ); ?></h1>
    <p class="text-muted"><?php esc_html_e( 'Manage your profile, payment info, and view purchase history', 'mporiums' ); ?></p>

    <form onsubmit="handleSaveProfile(event)" class="account-form">
      <!-- Profile -->
      <div class="form-card">
        <h2 class="form-card-title">👤 <?php esc_html_e( 'Profile', 'mporiums' ); ?></h2>
        <hr class="separator" />
        <div class="form-group">
          <label><?php esc_html_e( 'Email', 'mporiums' ); ?></label>
          <input type="email" value="<?php echo esc_attr( $current_user->user_email ); ?>" disabled class="input-disabled" />
          <p class="text-xs text-muted"><?php esc_html_e( 'Email cannot be changed here', 'mporiums' ); ?></p>
        </div>
        <div class="form-group">
          <label><?php esc_html_e( 'Display Name', 'mporiums' ); ?></label>
          <input type="text" name="display_name" value="<?php echo esc_attr( $current_user->display_name ); ?>" placeholder="<?php esc_attr_e( 'Your seller name', 'mporiums' ); ?>" />
        </div>
        <div class="form-group">
          <label><?php esc_html_e( 'Phone Number', 'mporiums' ); ?></label>
          <input type="tel" name="phone" value="<?php echo esc_attr( get_user_meta( $current_user->ID, 'phone', true ) ); ?>" placeholder="(555) 123-4567" />
        </div>
      </div>

      <!-- Address -->
      <div class="form-card">
        <h2 class="form-card-title">📍 <?php esc_html_e( 'Address', 'mporiums' ); ?></h2>
        <hr class="separator" />
        <div class="form-group">
          <label><?php esc_html_e( 'Street Address', 'mporiums' ); ?></label>
          <input type="text" name="address" value="<?php echo esc_attr( get_user_meta( $current_user->ID, 'address', true ) ); ?>" placeholder="123 Main St" />
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label><?php esc_html_e( 'City', 'mporiums' ); ?></label>
            <input type="text" name="city" value="<?php echo esc_attr( get_user_meta( $current_user->ID, 'city', true ) ); ?>" placeholder="Los Angeles" />
          </div>
          <div class="form-group">
            <label><?php esc_html_e( 'State', 'mporiums' ); ?></label>
            <input type="text" name="state" value="<?php echo esc_attr( get_user_meta( $current_user->ID, 'state', true ) ); ?>" placeholder="California" />
          </div>
        </div>
        <div class="form-group half">
          <label><?php esc_html_e( 'ZIP Code', 'mporiums' ); ?></label>
          <input type="text" name="zip" value="<?php echo esc_attr( get_user_meta( $current_user->ID, 'zip', true ) ); ?>" placeholder="90001" />
        </div>
      </div>

      <!-- Payment Info -->
      <div class="form-card">
        <h2 class="form-card-title">💳 <?php esc_html_e( 'Payment Information', 'mporiums' ); ?></h2>
        <hr class="separator" />
        <div class="info-box">
          <span>💳</span>
          <div>
            <p class="info-box-title"><?php esc_html_e( 'Payments handled by Stripe', 'mporiums' ); ?></p>
            <p class="text-xs text-muted"><?php esc_html_e( 'Your card details are securely managed by Stripe during checkout. We never store your payment information.', 'mporiums' ); ?></p>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-lg">💾 <?php esc_html_e( 'Save Changes', 'mporiums' ); ?></button>
    </form>

    <!-- Purchase History -->
    <div class="purchase-history" id="purchaseHistory">
      <div class="form-card">
        <h2 class="form-card-title">📦 <?php esc_html_e( 'Purchase History', 'mporiums' ); ?></h2>
        <hr class="separator" />
        <div class="empty-state" id="ordersEmpty">
          <div class="empty-icon">🛍️</div>
          <p class="empty-title"><?php esc_html_e( 'No purchases yet', 'mporiums' ); ?></p>
          <p class="text-muted text-xs"><?php esc_html_e( 'Your order history will appear here after your first purchase.', 'mporiums' ); ?></p>
          <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-outline btn-sm" style="margin-top:1rem;"><?php esc_html_e( 'Browse Shop', 'mporiums' ); ?></a>
        </div>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>
