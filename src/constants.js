const __ = wp.i18n.__;

const REF_TABLET_MIN_WIDTH       = 640;
const REF_DESKTOP_MIN_WIDTH      = 990;
const REF_WIDE_DESKTOP_MIN_WIDTH = 1380;
const WP_PREDEFINED_MOBILE_WIDTH = "360px";
const WP_PREDEFINED_TABLET_WIDTH = "780px";

export const ScreenWidthRef = {};
Object.defineProperty( ScreenWidthRef, "TABLET_MIN", {
	value: 640, writable: false, enumerable: false, configurable: false
});

Object.defineProperty( ScreenWidthRef, "DESKTOP_MIN", {
	value: 990, writable: false, enumerable: false, configurable: false
});

Object.defineProperty( ScreenWidthRef, "WIDE_DESKTOP_MIN", {
	value: 1380, writable: false, enumerable: false, configurable: false
});

Object.defineProperty( ScreenWidthRef, "WP_MOBILE", {
	value: "360px", writable: false, enumerable: false, configurable: false
});

Object.defineProperty( ScreenWidthRef, "WP_TABLET", {
	value: "780px", writable: false, enumerable: false, configurable: false
});


export const WPDOMSelectors = {
	AVAILABLE_BLOCKS_ON_EDITOR_PAGE: ".is-root-container > .block-editor-block-list__block.wp-block", 
	ROOT_BLOCK_CONTAINER_ON_EDITOR_PAGE: ".is-root-container", 
	PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE: ".edit-site-visual-editor__editor-canvas", 
	PREVIEW_WINDOW_IFRAME_ON_POST_EDITOR_PAGE: "editor-canvas", 
	PREVIEW_WINDOW_CONTENT_AREA_ON_POST_EDITOR_PAGE: ".edit-post-visual-editor__content-area", 
	BLOCK_CONTROL_TOOLBAR: ".components-accessible-toolbar.block-editor-block-contextual-toolbar", 
	COLOR_UTIL_DROPDOWN__CONTENT: "block-editor-panel-color-gradient-settings__dropdown-content"
}

export const BannerImageTypeArray = [
	{code: "CI", name: __("Cover", "alb-theme-type-1-banner-block-text-domain"), description: "Browser window is covered initially. You can upload 4 different banner images for different screen sizes. "}, 
	{code: "FH", name: __("Fixed Height", "alb-theme-type-1-banner-block-text-domain"), description: "Banner's height is fixed. For different screen sizes, you can upload 4 different banner images and adjust banner heights. "}, 
	{code: "FI", name: __("Full Image", "alb-theme-type-1-banner-block-text-domain"), description: "Full image is displayed. For different screen sizes, you can upload 4 different banner images. "}
]

export const AssetInfo = {
	FONT_ROBOTO_CSS: { 
		ID: "font-roboto-css", 
		FILE_NAME: "font-roboto.css"
	}, 
	FRONT_END_CSS: { 
		ID: "alb-theme-type-1-banner-front-end-css", 
		FILE_NAME: "front-end.css"
	}, 
	ADMIN_COMMON_CSS: { 
		ID: "alb-theme-admin-common", 
		FILE_NAME: "alb-theme-admin-common.css"
	}, 
	ALB_THEME_UTILS: { 
		ID: "alb-theme-utils", 
		FILE_NAME: "alb-theme-utils.css"
	}, 
	NORMALIZE: { 
		ID: "normalize-css", 
		FILE_NAME: "normalize.css"
	}, 
};

export const AlignmentType = {
	H: [
		{code: "C", name: __("Center", "alb-theme-type-1-banner-block-text-domain"), slug: "center"}, 
		{code: "L", name: __("Left", "alb-theme-type-1-banner-block-text-domain"), slug: "left"}, 
		{code: "R", name: __("Right", "alb-theme-type-1-banner-block-text-domain"), slug: "right"}, 
	], 
	V: [
		{code: "C", name: __("Center", "alb-theme-type-1-banner-block-text-domain") }, 
		{code: "T", name: __("Top", "alb-theme-type-1-banner-block-text-domain") }, 
		{code: "B", name: __("Bottom", "alb-theme-type-1-banner-block-text-domain") }, 
	]
}

export const BannerBottomBorderStyleArray = [
	{ code: "none", name: __("None", "alb-theme-type-1-banner-block-text-domain") }, 
	{ code: "solid", name: __("Solid", "alb-theme-type-1-banner-block-text-domain") }, 
	{ code: "dashed", name: __("Dashed", "alb-theme-type-1-banner-block-text-domain") }, 
];

export const WordPressDefaultThemeArray = [
	"twentynineteen", 
	"twentytwenty", 
	"twentytwentyone", 
	"twentytwentytwo", 
	"twentytwentythree", 
];