<?php

/*
	Plugin Name: ALB Block Theme Type 1 Banner
	Description: Custom responsive banner image of full width on sites, templates or/and blog posts. On top of the image, you may add various other child-blocks.
	Version: 1.0.0
	Author: DELIHUI (Max), ALB Education
	Author URI: https://albedu.org
	Text Domain: alb-theme-type-1-banner-block-text-domain
	Domain Path: /languages
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class ALBThemeType1BannerBlock {
	const TABLET_MIN_WIDTH = 640;
	const DESKTOP_MIN_WIDTH = 990;
	const WIDE_DESKTOP_MIN_WIDTH = 1380;
	
	const TEXT_DOMAIN = "alb-theme-type-1-banner-block-text-domain";
	const EDITOR_SCRIPT_NAME = "alb-theme-type-1-banner-block-editor-js";
	
	function __construct() {
		add_action('init', array($this, 'onInit'));
	}
	
	function onInit() {
		//var_dump(ALBThemeType1BannerBlock::TEXT_DOMAIN);
		//var_dump(ALBThemeType1BannerBlock::EDITOR_SCRIPT_NAME);exit;
		load_plugin_textdomain(ALBThemeType1BannerBlock::TEXT_DOMAIN, false, dirname(plugin_basename(__FILE__)) . '/languages');
	
		add_image_size('wideDesktopType1BannerLowDPI', 1920, 654, false );
		//add_image_size('wideDesktopType1BannerLowDPI2', 1920, 654, true );
		add_image_size('desktopType1BannerLowDPI', 1380, 654, false );
		add_image_size('tabletType1BannerLowDPI', 990, 654, false );
		add_image_size('mobileType1BannerLowDPI', 640, 654, false );
		
		wp_register_style('alb-theme-type-1-banner-block-editor-style-css', plugin_dir_url(__FILE__) . 'build/index.css');
		wp_register_script(ALBThemeType1BannerBlock::EDITOR_SCRIPT_NAME, plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
		
		wp_set_script_translations(ALBThemeType1BannerBlock::EDITOR_SCRIPT_NAME, ALBThemeType1BannerBlock::TEXT_DOMAIN, plugin_dir_path(__FILE__) . '/languages');
		
		wp_localize_script(ALBThemeType1BannerBlock::EDITOR_SCRIPT_NAME, 'ALBThemeType1BannerBlockScriptData', array(
			'AssetRoot' => plugin_dir_url(__FILE__) . 'build/', 
			'fallbackImagePath' => plugin_dir_url(__FILE__) . 'images/', 
			'phpVersion' => phpversion(), 
			'wpVersion' => get_bloginfo('version'), 
			'themeName' => get_template(), 
		));
		
		register_block_type(__DIR__, array( //'alb-theme/type-1-banner-block', array(
		//register_block_type('alb-theme/type-1-banner-block', array(
			'editor_script' => ALBThemeType1BannerBlock::EDITOR_SCRIPT_NAME,
			'editor_style' => 'alb-theme-type-1-banner-block-editor-style-css',
			'render_callback' => array($this, 'renderCallback')
		));
	}
	
	function renderCallback($attributes, $content) {
		if (!is_admin()) {
			wp_enqueue_script('alb-theme-type-1-banner-block-front-end-init-js', plugin_dir_url(__FILE__) . 'build/front-end-init.js', array('wp-element'), '1.0.0', true);
			wp_enqueue_script('alb-theme-type-1-banner-block-front-end-js', plugin_dir_url(__FILE__) . 'build/front-end.js', array('wp-element'), '1.0.0', true);
			wp_enqueue_style('normalize-css', plugin_dir_url(__FILE__) . 'build/normalize.css');
			wp_enqueue_style('alb-theme-utils', plugin_dir_url(__FILE__) . 'build/alb-theme-utils.css');
			wp_enqueue_style('alb-theme-type-1-banner-block-front-end-css', plugin_dir_url(__FILE__) . 'build/front-end.css');
		}
		
		ob_start();
		require plugin_dir_path(__FILE__) . 'front-end.php';
		return ob_get_clean();
	}
}

$objALBThemeType1BannerBlock = new ALBThemeType1BannerBlock();