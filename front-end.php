<?php
if (!$attributes["bannerBackgroundColor"]) {
	$attributes["bannerBackgroundColor"] = "#000";
}

if (!$attributes["bannerImageType"]) {
	$attributes["bannerImageType"] = "FI";
}

if (!$attributes['wideDesktopLowDPIBannerImageURL']) {
	$attributes['wideDesktopLowDPIBannerImageURL'] = plugin_dir_url(__FILE__) . 'images/' . 'fallback-wide-desktop-banner-image-low-dpi.jpg';
}

if (!$attributes['wideDesktopBannerImageURL']) {
	$attributes['wideDesktopBannerImageURL'] = plugin_dir_url(__FILE__) . 'images/' . 'fallback-wide-desktop-banner-image.jpg';
}

if (!$attributes['desktopLowDPIBannerImageURL']) {
	$attributes['desktopLowDPIBannerImageURL'] = plugin_dir_url(__FILE__) . 'images/' . 'fallback-desktop-banner-image-low-dpi.jpg';
}

if (!$attributes['desktopBannerImageURL']) {
	$attributes['desktopBannerImageURL'] = plugin_dir_url(__FILE__) . 'images/' . 'fallback-desktop-banner-image.jpg';
}

if (!$attributes['tabletLowDPIBannerImageURL']) {
	$attributes['tabletLowDPIBannerImageURL'] = plugin_dir_url(__FILE__) . 'images/' . 'fallback-tablet-banner-image-low-dpi.jpg';
}

if (!$attributes['tabletBannerImageURL']) {
	$attributes['tabletBannerImageURL'] = plugin_dir_url(__FILE__) . 'images/' . 'fallback-tablet-banner-image.jpg';
}

if (!$attributes['mobileLowDPIBannerImageURL']) {
	$attributes['mobileLowDPIBannerImageURL'] = plugin_dir_url(__FILE__) . 'images/' . 'fallback-mobile-banner-image-low-dpi.jpg';
}

if (!$attributes['mobileBannerImageURL']) {
	$attributes['mobileBannerImageURL'] = plugin_dir_url(__FILE__) . 'images/' . 'fallback-mobile-banner-image.jpg';
}

if (!$attributes['bottomBorderStyle']) {
	$attributes['bottomBorderStyle'] = "solid";
}

if (!$attributes['bottomBorderColor']) {
	$attributes['bottomBorderColor'] = "#0D3B66";
}

if (!$attributes['mobileBottomBorderWidth']) {
	$attributes['mobileBottomBorderWidth'] = "0";
}

if (!$attributes['tabletBottomBorderWidth']) {
	$attributes['tabletBottomBorderWidth'] = "0";
}

if (!$attributes['desktopBottomBorderWidth']) {
	$attributes['desktopBottomBorderWidth'] = "0";
}

if (!$attributes['wideDesktopBottomBorderWidth']) {
	$attributes['wideDesktopBottomBorderWidth'] = "0";
}

if (!$attributes["textContentVerticalAlignment"]) {
	$attributes["textContentVerticalAlignment"] = "C";
}

if (!$attributes["textContentVerticalPositionOffsetForMobile"]) {
	$attributes["textContentVerticalPositionOffsetForMobile"] = "0rem";
}

if (!$attributes["textContentVerticalPositionOffsetForTablet"]) {
	$attributes["textContentVerticalPositionOffsetForTablet"] = "0rem";
}

if (!$attributes["textContentVerticalPositionOffsetForDesktop"]) {
	$attributes["textContentVerticalPositionOffsetForDesktop"] = "0rem";
}

if (!$attributes["textContentVerticalPositionOffsetForWideDesktop"]) {
	$attributes["textContentVerticalPositionOffsetForWideDesktop"] = "0rem";
}

if (!$attributes["textContentHorizontalAlignment"]) {
	$attributes["textContentHorizontalAlignment"] = "C";
}

if (!$attributes["textContentHorizontalPositionOffsetForMobile"]) {
	$attributes["textContentHorizontalPositionOffsetForMobile"] = "0rem";
}

if (!$attributes["textContentHorizontalPositionOffsetForTablet"]) {
	$attributes["textContentHorizontalPositionOffsetForTablet"] = "0rem";
}

if (!$attributes["textContentHorizontalPositionOffsetForDesktop"]) {
	$attributes["textContentHorizontalPositionOffsetForDesktop"] = "0rem";
}

if (!$attributes["textContentHorizontalPositionOffsetForWideDesktop"]) {
	$attributes["textContentHorizontalPositionOffsetForWideDesktop"] = "0rem";
}

if (!$attributes["mobileBannerImageVerticalPosition"]) {
	$attributes["mobileBannerImageVerticalPosition"] = "0rem";
}

if (!$attributes["mobileBannerImageHorizontalPosition"]) {
	$attributes["mobileBannerImageHorizontalPosition"] = "0rem";
}

if (!$attributes["tabletBannerImageVerticalPosition"]) {
	$attributes["tabletBannerImageVerticalPosition"] = "0rem";
}

if (!$attributes["tabletBannerImageHorizontalPosition"]) {
	$attributes["tabletBannerImageHorizontalPosition"] = "0rem";
}

if (!$attributes["desktopBannerImageVerticalPosition"]) {
	$attributes["desktopBannerImageVerticalPosition"] = "0rem";
}

if (!$attributes["desktopBannerImageHorizontalPosition"]) {
	$attributes["desktopBannerImageHorizontalPosition"] = "0rem";
}

if (!$attributes["wideDesktopBannerImageVerticalPosition"]) {
	$attributes["wideDesktopBannerImageVerticalPosition"] = "0rem";
}

if (!$attributes["wideDesktopBannerImageHorizontalPosition"]) {
	$attributes["wideDesktopBannerImageHorizontalPosition"] = "0rem";
}

if (!$attributes["mobileBannerHeight"]) {
	$attributes["mobileBannerHeight"] = "40rem";
}

if (!$attributes["tabletBannerHeight"]) {
	$attributes["tabletBannerHeight"] = "40rem";
}

if (!$attributes["desktopBannerHeight"]) {
	$attributes["desktopBannerHeight"] = "40rem";
}

if (!$attributes["wideDesktopBannerHeight"]) {
	$attributes["wideDesktopBannerHeight"] = "40rem";
}


switch ($attributes["textContentVerticalAlignment"]) {
	case "T":
		$textContentTopPostion = "0";
		$textContentTranslateYForMobile = "calc( 0rem + " . $attributes["textContentVerticalPositionOffsetForMobile"] . " )";
		$textContentTranslateYForTablet = "calc( 0rem + " . $attributes["textContentVerticalPositionOffsetForTablet"] . " )";
		$textContentTranslateYForDesktop = "calc( 0rem + " . $attributes["textContentVerticalPositionOffsetForDesktop"] . " )";
		$textContentTranslateYForWideDesktop = "calc( 0rem + " . $attributes["textContentVerticalPositionOffsetForWideDesktop"] . " )";
		break;
	case "C":
		$textContentTopPostion = "50%";
		$textContentTranslateYForMobile = "calc( -50% + " . $attributes["textContentVerticalPositionOffsetForMobile"] . " )";
		$textContentTranslateYForTablet = "calc( -50% + " . $attributes["textContentVerticalPositionOffsetForTablet"] . " )";
		$textContentTranslateYForDesktop = "calc( -50% + " . $attributes["textContentVerticalPositionOffsetForDesktop"] . " )";
		$textContentTranslateYForWideDesktop = "calc( -50% + " . $attributes["textContentVerticalPositionOffsetForWideDesktop"] . " )";
		break;
	case "B":
		$textContentTopPostion = "100%";
		$textContentTranslateYForMobile = "calc( -100% + " . $attributes["textContentVerticalPositionOffsetForMobile"] . " )";
		$textContentTranslateYForTablet = "calc( -100% + " . $attributes["textContentVerticalPositionOffsetForTablet"] . " )";
		$textContentTranslateYForDesktop = "calc( -100% + " . $attributes["textContentVerticalPositionOffsetForDesktop"] . " )";
		$textContentTranslateYForWideDesktop = "calc( -100% + " . $attributes["textContentVerticalPositionOffsetForWideDesktop"] . " )";
		break;
}

switch ($attributes["textContentHorizontalAlignment"]) {
	case "L":
		$horizontalAlignmentCSSValue = "left";
		break;
	case "C":
		$horizontalAlignmentCSSValue = "center";
		break;
	case "R":
		$horizontalAlignmentCSSValue = "right";
		break;
}


if ($attributes["bannerImageType"] == "CI") {
	$bannerHeightMobile      = "100vh";
	$bannerHeightTablet      = "100vh";
	$bannerHeightDesktop     = "100vh";
	$bannerHeightWideDesktop = "100vh";
} else if ($attributes["bannerImageType"] == "FH") {
	$bannerHeightMobile      = $attributes["mobileBannerHeight"];
	$bannerHeightTablet      = $attributes["tabletBannerHeight"];
	$bannerHeightDesktop     = $attributes["desktopBannerHeight"];
	$bannerHeightWideDesktop = $attributes["wideDesktopBannerHeight"];
} else if ($attributes["bannerImageType"] == "FI") {
	$bannerHeightMobile      = "auto";
	$bannerHeightTablet      = "auto";
	$bannerHeightDesktop     = "auto";
	$bannerHeightWideDesktop = "auto";
}

$customStyles = array(
	"@media(min-width:" . ALBThemeType1BannerBlock::WIDE_DESKTOP_MIN_WIDTH . "px){" . 
		"#" . $attributes["instanceId"] . ".alb-theme-type-1-banner{"
		. "height:" . $bannerHeightWideDesktop . ";"
		. "border-bottom-width:" . $attributes["wideDesktopBottomBorderWidth"] . "; "
		. "}" . 
		
		"#" . $attributes["instanceId"] . " .alb-theme-type-1-banner__image{"
		. "transform:" . "translateY(" . $attributes["wideDesktopBannerImageVerticalPosition"] . ")" . " " . "translateX(" . $attributes["wideDesktopBannerImageHorizontalPosition"] . ");"
		. "}" .
		
		"#" . $attributes["instanceId"] . " " . ".alb-theme-type-1-banner__text-content{"
		. "transform:" . "translateY(" . $textContentTranslateYForWideDesktop . ")" . " " . "translateX(" . $attributes["textContentHorizontalPositionOffsetForWideDesktop"] . ");" .
		"}" . 
	"}", 
	
	"@media(min-width:" . ALBThemeType1BannerBlock::DESKTOP_MIN_WIDTH . "px){" . 
		"#" . $attributes["instanceId"] . ".alb-theme-type-1-banner{"
		. "height:" . $bannerHeightDesktop . ";"
		. "border-bottom-width:" . $attributes["desktopBottomBorderWidth"] . "; "
		. "}" . 
		
		"#" . $attributes["instanceId"] . " .alb-theme-type-1-banner__image{"
		. "transform:" . "translateY(" . $attributes["desktopBannerImageVerticalPosition"] . ")" . " " . "translateX(" . $attributes["desktopBannerImageHorizontalPosition"] . ");"
		. "}" .
		
		"#" . $attributes["instanceId"] . " " . ".alb-theme-type-1-banner__text-content{"
		. "transform:" . "translateY(" . $textContentTranslateYForDesktop . ")" . " " . "translateX(" . $attributes["textContentHorizontalPositionOffsetForDesktop"] . ");" .
		"}" . 
	"}", 
	
	"@media(min-width:" . ALBThemeType1BannerBlock::TABLET_MIN_WIDTH . "px){" . 
		"#" . $attributes["instanceId"] . ".alb-theme-type-1-banner{"
		. "height:" . $bannerHeightTablet . ";"
		. "border-bottom-width:" . $attributes["tabletBottomBorderWidth"] . "; " .
		"}" . 
		
		"#" . $attributes["instanceId"] . " .alb-theme-type-1-banner__image{"
		. "transform:" . "translateY(" . $attributes["tabletBannerImageVerticalPosition"] . ")" . " " . "translateX(" . $attributes["tabletBannerImageHorizontalPosition"] . ");" . 
		"}" .
		
		"#" . $attributes["instanceId"] . " " . ".alb-theme-type-1-banner__text-content{"
		. "transform:" . "translateY(" . $textContentTranslateYForTablet . ")" . " " . "translateX(" . $attributes["textContentHorizontalPositionOffsetForTablet"] . ");" .
		"}" . 
	"}", 
	
	"#" . $attributes["instanceId"] . ".alb-theme-type-1-banner{"
	. "background:" . $attributes["bannerBackgroundColor"] . ";"
	. "height:" . $bannerHeightMobile . ";"
	. "border-bottom-style:" . $attributes["bottomBorderStyle"] . "; " 
	. "border-bottom-color:" . $attributes["bottomBorderColor"] . "; "
	. "border-bottom-width:" . $attributes["mobileBottomBorderWidth"] . "; " .
	"}",
	
	"#" . $attributes["instanceId"] . " " . ".alb-theme-type-1-banner__image{"
	. "opacity:" . $attributes["bannerImageOpacity"] . ";"
	. "transform:" . "translateY(" . $attributes["mobileBannerImageVerticalPosition"] . ")" . " " . "translateX(" . $attributes["mobileBannerImageHorizontalPosition"] . ");" .
	"}", 
	
	"#" . $attributes["instanceId"] . " " . ".alb-theme-type-1-banner__full-image{"
	. "opacity:" . $attributes["bannerImageOpacity"] . ";" . 
	"}", 
	
	"#" . $attributes["instanceId"] . " " . ".alb-theme-type-1-banner__text-content{"
	. "top:" . $textContentTopPostion . ";"
	. "text-align:" . $horizontalAlignmentCSSValue . ";"
	. "transform:" . "translateY(" . $textContentTranslateYForMobile . ")" . " " . "translateX(" . $attributes["textContentHorizontalPositionOffsetForMobile"] . ");" .
	"}", 
);

if ( !$attributes["forceRemoveTopPaddingOfRootContainer"] ) {
	$attributes["forceRemoveTopPaddingOfRootContainer"] = false;
}

$extraBlockData = array( 
	"customStyles" => $customStyles, 
	"forceRemoveTopPaddingOfRootContainer" => $attributes["forceRemoveTopPaddingOfRootContainer"], 
);

if ( !$attributes["removeTopSpace"] ) {
	$attributes["removeTopSpace"] = false;
}

if ( !$attributes["removeBottomSpace"] ) {
	$attributes["removeBottomSpace"] = false;
}

$rootElementStyle = ""; 

if ( $attributes["removeTopSpace"] ) {
	$rootElementStyle = $rootElementStyle . "margin-top: 0;";
}

if ( $attributes["removeBottomSpace"] ) {
	$rootElementStyle = $rootElementStyle . "margin-bottom: 0;";
}


$alignClass = "";

if ( $attributes["align"] ) {
	$alignClass = "align" . $attributes["align"];
}

//removing unwanted spaces of inline-block elements
$content = preg_replace('/\>\s+\</m', '><', $content);

wp_add_inline_script( 'alb-theme-type-1-banner-block-front-end-js', ' extraBlockDataArray.push( ' . wp_json_encode( $extraBlockData ) . ' ) ', 'before' );

?>

<?php

if ($attributes["bannerImageType"] == "CI" || $attributes["bannerImageType"] == "FH") {

?>

<div id=<?php echo esc_attr($attributes["instanceId"]); ?> class="alb-theme-type-1-banner <?php echo esc_attr($alignClass); ?>" style="<?php echo esc_attr($rootElementStyle); ?>">
	<div class="alb-theme-type-1-banner__wrapper">
		<picture>
			<source srcset="<?php echo esc_url($attributes['wideDesktopLowDPIBannerImageURL']); ?> 1920w, <?php echo esc_url($attributes['wideDesktopBannerImageURL']); ?> 3840w" media="(min-width: 1380px)">
			<source srcset="<?php echo esc_url($attributes['desktopLowDPIBannerImageURL']); ?> 1380w, <?php echo esc_url($attributes['desktopBannerImageURL']); ?> 2760w" media="(min-width: 990px)">
			<source srcset="<?php echo esc_url($attributes['tabletLowDPIBannerImageURL']); ?> 990w, <?php echo esc_url($attributes['tabletBannerImageURL']); ?> 1980w" media="(min-width: 640px)">
			<img srcset="<?php echo esc_url($attributes['mobileLowDPIBannerImageURL']); ?> 640w, <?php echo esc_url($attributes['mobileBannerImageURL']); ?> 1280w" alt="alb education, alb block theme, custom banner" class="alb-theme-type-1-banner__image">
		</picture>
		<div class="alb-theme-type-1-banner__text-content">
			<div class="wrapper">				
				<?php echo wp_kses_post($content);//echo $content; ?>
			</div>
		</div>
	</div>
</div>

<?php

} else if ($attributes["bannerImageType"] == "FI") { 

?>

<div id=<?php echo esc_attr($attributes["instanceId"]); ?> class="alb-theme-type-1-banner <?php echo esc_attr($alignClass); ?>" style="<?php echo esc_attr($rootElementStyle); ?>">
	<picture>
		<source srcset="<?php echo esc_url($attributes['wideDesktopLowDPIBannerImageURL']); ?> 1920w, <?php echo esc_url($attributes['wideDesktopBannerImageURL']); ?> 3840w" media="(min-width: 1380px)">
		<source srcset="<?php echo esc_url($attributes['desktopLowDPIBannerImageURL']); ?> 1380w, <?php echo esc_url($attributes['desktopBannerImageURL']); ?> 2760w" media="(min-width: 990px)">
		<source srcset="<?php echo esc_url($attributes['tabletLowDPIBannerImageURL']); ?> 990w, <?php echo esc_url($attributes['tabletBannerImageURL']); ?> 1980w" media="(min-width: 640px)">
		<img srcset="<?php echo esc_url($attributes['mobileLowDPIBannerImageURL']); ?> 640w, <?php echo esc_url($attributes['mobileBannerImageURL']); ?> 1280w" alt="alb education, alb block theme, custom banner" class="alb-theme-type-1-banner__full-image">
	</picture>
	<div class="alb-theme-type-1-banner__text-content">
		<div class="wrapper">				
			<?php echo wp_kses_post($content); ?>
		</div>
	</div>
</div>

<?php 
} 
?>