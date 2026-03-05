<?php
/**
 * 404 Template
 *
 * @package MPortiums
 */

get_header();
?>

<main class="page-main center-content">
  <div class="text-center">
    <h1 style="font-size:4rem;font-weight:700;">404</h1>
    <p class="text-muted" style="font-size:1.25rem;margin-bottom:1rem;"><?php esc_html_e( 'Oops! Page not found', 'mporiums' ); ?></p>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="link-primary"><?php esc_html_e( 'Return to Home', 'mporiums' ); ?></a>
  </div>
</main>

<?php get_footer(); ?>
