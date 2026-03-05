<?php
/**
 * Theme Footer
 *
 * @package MPortiums
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

  <!-- ===================================================================
       OFFER MODAL
       =================================================================== -->
  <div class="modal-overlay" id="offerModal" style="display:none;" onclick="closeOfferModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <h2 class="form-card-title"><?php esc_html_e( 'Make an Offer', 'mporiums' ); ?></h2>
      <p class="text-muted"><?php esc_html_e( 'Send an offer for', 'mporiums' ); ?> <strong id="offerProductTitle"></strong></p>
      <p class="text-muted"><?php esc_html_e( 'Listed at', 'mporiums' ); ?> <strong class="text-primary" id="offerProductPrice"></strong></p>
      <div class="form-group" style="margin-top:1.25rem;">
        <label><?php esc_html_e( 'Your Offer ($)', 'mporiums' ); ?></label>
        <input type="number" id="offerAmount" placeholder="0" style="font-size:1.125rem;font-weight:600;" />
      </div>
      <div class="form-group">
        <label><?php esc_html_e( 'Message (optional)', 'mporiums' ); ?></label>
        <textarea rows="3" placeholder="<?php esc_attr_e( 'Add a message to the seller...', 'mporiums' ); ?>"></textarea>
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary btn-lg btn-flex" onclick="closeOfferModal()"><?php esc_html_e( 'Send Offer', 'mporiums' ); ?></button>
        <button class="btn btn-outline btn-lg" onclick="closeOfferModal()"><?php esc_html_e( 'Cancel', 'mporiums' ); ?></button>
      </div>
    </div>
  </div>

  <!-- ===================================================================
       FOOTER
       =================================================================== -->
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <img src="<?php echo esc_url( mporiums_get_logo_url() ); ?>" alt="<?php bloginfo( 'name' ); ?>" style="height:32px;margin-bottom:1rem;" />
          <p class="text-muted text-sm"><?php echo esc_html( get_bloginfo( 'description' ) ); ?></p>
        </div>
        <div>
          <h4 class="footer-heading"><?php esc_html_e( 'Marketplace', 'mporiums' ); ?></h4>
          <?php
          wp_nav_menu( array(
              'theme_location' => 'footer-1',
              'container'      => false,
              'menu_class'     => 'footer-links',
              'depth'          => 1,
              'fallback_cb'    => false,
          ) );
          ?>
        </div>
        <div>
          <h4 class="footer-heading"><?php esc_html_e( 'Support', 'mporiums' ); ?></h4>
          <?php
          wp_nav_menu( array(
              'theme_location' => 'footer-2',
              'container'      => false,
              'menu_class'     => 'footer-links',
              'depth'          => 1,
              'fallback_cb'    => false,
          ) );
          ?>
        </div>
        <div>
          <h4 class="footer-heading"><?php esc_html_e( 'Company', 'mporiums' ); ?></h4>
          <?php
          wp_nav_menu( array(
              'theme_location' => 'footer-3',
              'container'      => false,
              'menu_class'     => 'footer-links',
              'depth'          => 1,
              'fallback_cb'    => false,
          ) );
          ?>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'All rights reserved.', 'mporiums' ); ?>
      </div>
    </div>
  </footer>

  <?php wp_footer(); ?>
</body>
</html>
