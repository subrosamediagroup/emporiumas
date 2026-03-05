<?php
/**
 * Template Name: Payment Success
 * Description: Order confirmation page after successful payment.
 *
 * @package MPortiums
 */

get_header();
?>

<main class="page-main center-content">
  <div class="success-content animate-fade-in">
    <div class="success-icon">✅</div>
    <h1 class="page-title"><?php esc_html_e( 'Payment Successful!', 'mporiums' ); ?></h1>
    <p class="text-muted" style="max-width:28rem;"><?php esc_html_e( "Thank you for your purchase. You'll receive a confirmation email shortly with your order details.", 'mporiums' ); ?></p>
    <div class="success-actions">
      <a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" class="btn btn-primary">🛍️ <?php esc_html_e( 'Continue Shopping', 'mporiums' ); ?></a>
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-outline"><?php esc_html_e( 'Back to Home', 'mporiums' ); ?></a>
    </div>
  </div>
</main>

<?php get_footer(); ?>
