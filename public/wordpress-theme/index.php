<?php
/**
 * Main Template (fallback)
 *
 * @package MPortiums
 */

get_header();
?>

<main class="page-main">
  <div class="container">
    <?php if ( have_posts() ) : ?>
      <div class="listing-grid">
        <?php while ( have_posts() ) : the_post(); ?>
          <a href="<?php the_permalink(); ?>" class="card listing-card">
            <?php if ( has_post_thumbnail() ) : ?>
              <div class="listing-image">
                <?php the_post_thumbnail( 'listing-card', array( 'loading' => 'lazy' ) ); ?>
              </div>
            <?php endif; ?>
            <div class="listing-body">
              <h3 class="listing-title"><?php the_title(); ?></h3>
              <p class="listing-category text-muted"><?php the_excerpt(); ?></p>
            </div>
          </a>
        <?php endwhile; ?>
      </div>

      <?php the_posts_pagination( array(
          'mid_size'  => 2,
          'prev_text' => '← Previous',
          'next_text' => 'Next →',
      ) ); ?>

    <?php else : ?>
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h2 class="empty-title"><?php esc_html_e( 'Nothing found', 'mporiums' ); ?></h2>
        <p class="text-muted"><?php esc_html_e( 'Try a different search or browse categories.', 'mporiums' ); ?></p>
      </div>
    <?php endif; ?>
  </div>
</main>

<?php get_footer(); ?>
