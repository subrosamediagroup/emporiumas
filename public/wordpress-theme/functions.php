<?php
/**
 * M.Poriums Theme Functions
 *
 * @package MPortiums
 * @version 2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme Setup
 */
function mporiums_setup() {
    // Add title tag support
    add_theme_support( 'title-tag' );

    // Add custom logo support
    add_theme_support( 'custom-logo', array(
        'height'      => 64,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );

    // Add post thumbnails
    add_theme_support( 'post-thumbnails' );

    // Add HTML5 support
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Register navigation menus
    register_nav_menus( array(
        'primary'    => __( 'Primary Menu', 'mporiums' ),
        'mobile'     => __( 'Mobile Menu', 'mporiums' ),
        'footer-1'   => __( 'Footer Marketplace', 'mporiums' ),
        'footer-2'   => __( 'Footer Support', 'mporiums' ),
        'footer-3'   => __( 'Footer Company', 'mporiums' ),
    ) );
}
add_action( 'after_setup_theme', 'mporiums_setup' );

/**
 * Enqueue Scripts & Styles
 */
function mporiums_scripts() {
    // Main stylesheet
    wp_enqueue_style( 'mporiums-style', get_stylesheet_uri(), array(), '2.0' );

    // jQuery is bundled with WordPress – just declare dependency
    wp_enqueue_script(
        'mporiums-main',
        get_template_directory_uri() . '/js/script.js',
        array( 'jquery' ),
        '2.0',
        true // load in footer
    );

    // Pass WordPress data to JS
    wp_localize_script( 'mporiums-main', 'mporiums_data', array(
        'ajax_url'   => admin_url( 'admin-ajax.php' ),
        'theme_url'  => get_template_directory_uri(),
        'home_url'   => home_url( '/' ),
        'nonce'      => wp_create_nonce( 'mporiums_nonce' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'mporiums_scripts' );

/**
 * Custom image sizes
 */
function mporiums_image_sizes() {
    add_image_size( 'listing-card', 800, 800, true );
    add_image_size( 'listing-thumb', 160, 160, true );
    add_image_size( 'hero-bg', 1920, 1080, true );
}
add_action( 'after_setup_theme', 'mporiums_image_sizes' );

/**
 * Register widget areas
 */
function mporiums_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Shop Sidebar', 'mporiums' ),
        'id'            => 'shop-sidebar',
        'description'   => __( 'Sidebar displayed on the shop page.', 'mporiums' ),
        'before_widget' => '<div class="filter-section">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="filter-title">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'mporiums_widgets_init' );

/**
 * Helper: Get custom logo URL or fallback
 */
function mporiums_get_logo_url() {
    $custom_logo_id = get_theme_mod( 'custom_logo' );
    if ( $custom_logo_id ) {
        return wp_get_attachment_image_url( $custom_logo_id, 'full' );
    }
    return get_template_directory_uri() . '/assets/mporiums-logo.png';
}
