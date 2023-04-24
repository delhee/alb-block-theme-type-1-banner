import "./admin.scss"
import "./front-end.scss"
import { getStyleSheetObject } from "./front-end-utils.js"
import { ImageUploadUtilities, ColorUtilities, SizeUtilities, PreviewWindowSizeMonitor, loadAdditionalCSSIntoPreviewWindow, getLabelJSXElement, getPreviewWindow, cssLengthToPx } from "./utils"
import { ScreenWidthRef, BannerImageTypeArray, AlignmentType, BannerBottomBorderStyleArray, WPDOMSelectors, WordPressDefaultThemeArray } from "./constants"
import apiFetch from "@wordpress/api-fetch"
import { ToolbarGroup, ToolbarButton, Button, Icon, PanelBody, PanelRow, ColorPicker } from "@wordpress/components"
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, BlockControls, useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks";
import { useState, useEffect } from '@wordpress/element';
//import { __ } from '@wordpress/i18n';

//const esc_html__ = wp.i18n.esc_html__
const __ = wp.i18n.__

const BLOCK_NAME                              = "alb-theme/type-1-banner-block";
const EDITOR_STYLE_ID                         = "alb-theme-type-1-banner-block-editor-style-css-css";
const FALLBACK_MOBILE_IMAGE_FILE_NAME         = "fallback-mobile-banner-image.jpg";
const FALLBACK_MOBILE_LOW_DPI_IMAGE_FILE_NAME = "fallback-mobile-banner-image-low-dpi.jpg";
const FALLBACK_TABLET_IMAGE_FILE_NAME         = "fallback-tablet-banner-image.jpg";
const FALLBACK_TABLET_LOW_DPI_IMAGE_FILE_NAME = "fallback-tablet-banner-image-low-dpi.jpg";
const FALLBACK_DESKTOP_IMAGE_FILE_NAME = "fallback-desktop-banner-image.jpg";
const FALLBACK_DESKTOP_LOW_DPI_IMAGE_FILE_NAME = "fallback-desktop-banner-image-low-dpi.jpg";
const FALLBACK_WIDE_DESKTOP_IMAGE_FILE_NAME = "fallback-wide-desktop-banner-image.jpg";
const FALLBACK_WIDE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME = "fallback-wide-desktop-banner-image-low-dpi.jpg";
const SAMPLE_MOBILE_IMAGE_FILE_NAME_1 = "sample-1-mobile.jpg";
const SAMPLE_MOBILE_LOW_DPI_IMAGE_FILE_NAME_1 = "sample-1-mobile-low-dpi.jpg";
const SAMPLE_TABLET_IMAGE_FILE_NAME_1 = "sample-1-tablet.jpg";
const SAMPLE_TABLET_LOW_DPI_IMAGE_FILE_NAME_1 = "sample-1-tablet-low-dpi.jpg";
const SAMPLE_DESKTOP_IMAGE_FILE_NAME_1 = "sample-1-desktop.jpg";
const SAMPLE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME_1 = "sample-1-desktop-low-dpi.jpg";
const SAMPLE_WIDE_DESKTOP_IMAGE_FILE_NAME_1 = "sample-1-wide-desktop.jpg";
const SAMPLE_WIDE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME_1 = "sample-1-wide-desktop-low-dpi.jpg";
const SAMPLE_MOBILE_IMAGE_FILE_NAME_2 = "sample-2-mobile.jpg";
const SAMPLE_MOBILE_LOW_DPI_IMAGE_FILE_NAME_2 = "sample-2-mobile-low-dpi.jpg";
const SAMPLE_TABLET_IMAGE_FILE_NAME_2 = "sample-2-tablet.jpg";
const SAMPLE_TABLET_LOW_DPI_IMAGE_FILE_NAME_2 = "sample-2-tablet-low-dpi.jpg";
const SAMPLE_DESKTOP_IMAGE_FILE_NAME_2 = "sample-2-desktop.jpg";
const SAMPLE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME_2 = "sample-2-desktop-low-dpi.jpg";
const SAMPLE_WIDE_DESKTOP_IMAGE_FILE_NAME_2 = "sample-2-wide-desktop.jpg";
const SAMPLE_WIDE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME_2 = "sample-2-wide-desktop-low-dpi.jpg";
const ZERO_MARGIN_TOP_ICON_FILE_NAME = "zero-margin-top.svg";
const ZERO_MARGIN_BOTTOM_ICON_FILE_NAME = "zero-margin-bottom.svg";
const THEME_NAME_2019 = "twentynineteen";
const THEME_NAME_2020 = "twentytwenty";
const THEME_NAME_2021 = "twentytwentyone";
const THEME_NAME_2022 = "twentytwentytwo";
const THEME_NAME_2023 = "twentytwentythree";
const POST_TYPE_WP_TEMPLATE = "wp_template";

const blockAttributesV1_0 = {
	align: { type: "string" },
	instanceId: { type: "string", default: undefined }, 
	forceRemoveTopPaddingOfRootContainer: { type: "boolean", default: false }, 
	removeTopSpace: { type: "boolean", default: false }, 
	removeBottomSpace: { type: "boolean", default: false }, 
	isInTestMode: { type: "boolean", default: false }, 
	bannerImageType: { type: "string", default: "FI" }, 
	mobileBannerImageURL: { type: "string", default: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_MOBILE_IMAGE_FILE_NAME }, 
	mobileLowDPIBannerImageURL: { type: "string", default: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_MOBILE_LOW_DPI_IMAGE_FILE_NAME }, 
	tabletBannerImageURL: { type: "string", default: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_TABLET_IMAGE_FILE_NAME }, 
	tabletLowDPIBannerImageURL: { type: "string", default: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_TABLET_LOW_DPI_IMAGE_FILE_NAME },  
	desktopBannerImageURL: { type: "string", default: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_DESKTOP_IMAGE_FILE_NAME }, 
	desktopLowDPIBannerImageURL: { type: "string", default: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_DESKTOP_LOW_DPI_IMAGE_FILE_NAME },
	wideDesktopBannerImageURL: { type: "string", default: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_WIDE_DESKTOP_IMAGE_FILE_NAME },
	wideDesktopLowDPIBannerImageURL: { type: "string", default: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_WIDE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME },
	mobileBannerImageID: { type: "number" }, 
	tabletBannerImageID: { type: "number" }, 
	desktopBannerImageID: { type: "number" }, 
	wideDesktopBannerImageID: { type: "number" },
	bannerImageOpacity: { type: "number", default: 0.99 }, 
	bannerBackgroundColorType: { type: "string", default: "SOLID" }, 
	bannerBackgroundColor: { type: "string", default: "#000" }, 
	textContentHorizontalAlignment: {  type: "string", default: "C" }, 
	textContentVerticalAlignment: {  type: "string", default: "C" }, 
	textContentHorizontalPositionOffsetForMobile: { type: "string", default: "0rem" }, 
	textContentHorizontalPositionOffsetForTablet: { type: "string", default: "0rem" }, 
	textContentHorizontalPositionOffsetForDesktop: { type: "string", default: "0rem" }, 
	textContentHorizontalPositionOffsetForWideDesktop: { type: "string", default: "0rem" }, 
	textContentVerticalPositionOffsetForMobile: { type: "string", default: "0rem" }, 
	textContentVerticalPositionOffsetForTablet: { type: "string", default: "0rem" }, 
	textContentVerticalPositionOffsetForDesktop: { type: "string", default: "0rem" }, 
	textContentVerticalPositionOffsetForWideDesktop: { type: "string", default: "0rem" }, 
	mobileBannerHeight: { type: "string", default: "40rem" }, 
	tabletBannerHeight: { type: "string", default: "40rem" }, 
	desktopBannerHeight: { type: "string", default: "40rem" }, 
	wideDesktopBannerHeight: { type: "string", default: "40rem" }, 
	mobileBannerImageHorizontalPosition: { type: "string", default: "0rem" }, 
	tabletBannerImageHorizontalPosition: { type: "string", default: "0rem" },
	desktopBannerImageHorizontalPosition: { type: "string", default: "0rem" },  
	wideDesktopBannerImageHorizontalPosition: { type: "string", default: "0rem" }, 
	mobileBannerImageVerticalPosition: { type: "string", default: "0rem" },
	tabletBannerImageVerticalPosition: { type: "string", default: "0rem" }, 
	desktopBannerImageVerticalPosition: { type: "string", default: "0rem" },  
	wideDesktopBannerImageVerticalPosition: { type: "string", default: "0rem" }, 
	bottomBorderStyle: { type: "string", default: "solid" }, 
	bottomBorderColor: { type: "string", default: "#0d3b66" }, 
	mobileBottomBorderWidth: { type: "string", default: "0rem" }, 
	tabletBottomBorderWidth: { type: "string", default: "0rem" }, 
	desktopBottomBorderWidth: { type: "string", default: "0rem" }, 
	wideDesktopBottomBorderWidth: { type: "string", default: "0rem" }, 
};

registerBlockType(BLOCK_NAME, {
	title: "ALB Theme Type 1 Banner Block",
	icon: "cover-image",
	category: "common",
	supports: {
		align: ["full", "wide", "center"], //true, //
	}, 
	attributes: blockAttributesV1_0,
	description: "Type 1 Banner. Used mainly for front page",
	edit: EditComponent,
	save: function (props) {
		return <InnerBlocks.Content />
	}
});

function getLogHeader() {
	return Date().toLocaleString() + " " + "@" + BLOCK_NAME + ", "; 
}

const SCREEN_WIDTH_TYPE_MOBILE       = "MOBILE";
const SCREEN_WIDTH_TYPE_TABLET       = "TABLET";
const SCREEN_WIDTH_TYPE_DESKTOP      = "DESKTOP";
const SCREEN_WIDTH_TYPE_WIDE_DESKTOP = "WIDE_DESKTOP";

function getJSXStyleElement(props, miscParams) {
	const bannerBackgroundColor = props.attributes.bannerBackgroundColor;
	const mobileBannerHeight = props.attributes.bannerImageType == "CI" ? "100vh" : (
		props.attributes.bannerImageType == "FH" ? props.attributes.mobileBannerHeight : "auto"
	);
	const tabletBannerHeight = props.attributes.bannerImageType == "CI" ? "100vh" : (
		props.attributes.bannerImageType == "FH" ? props.attributes.tabletBannerHeight : "auto"
	);
	const desktopBannerHeight = props.attributes.bannerImageType == "CI" ? "100vh" : (
		props.attributes.bannerImageType == "FH" ? props.attributes.desktopBannerHeight : "auto"
	);
	const wideDesktopBannerHeight = props.attributes.bannerImageType == "CI" ? "100vh" : (
		props.attributes.bannerImageType == "FH" ? props.attributes.wideDesktopBannerHeight : "auto"
	);
	
	const bottomBorderStyle = props.attributes.bottomBorderStyle;
	const bottomBorderColor= props.attributes.bottomBorderColor;
	const mobileBottomBorderWidth = props.attributes.mobileBottomBorderWidth;
	const tabletBottomBorderWidth = props.attributes.tabletBottomBorderWidth;
	const desktopBottomBorderWidth = props.attributes.desktopBottomBorderWidth;
	const wideDesktopBottomBorderWidth = props.attributes.wideDesktopBottomBorderWidth;
	const bannerImageOpacity = props.attributes.bannerImageOpacity;
	const mobileBannerImageVerticalPosition = props.attributes.mobileBannerImageVerticalPosition;
	const mobileBannerImageHorizontalPosition = props.attributes.mobileBannerImageHorizontalPosition;
	const tabletBannerImageVerticalPosition = props.attributes.tabletBannerImageVerticalPosition;
	const tabletBannerImageHorizontalPosition = props.attributes.tabletBannerImageHorizontalPosition;
	const desktopBannerImageVerticalPosition = props.attributes.desktopBannerImageVerticalPosition;
	const desktopBannerImageHorizontalPosition = props.attributes.desktopBannerImageHorizontalPosition;
	const wideDesktopBannerImageVerticalPosition = props.attributes.wideDesktopBannerImageVerticalPosition;
	const wideDesktopBannerImageHorizontalPosition = props.attributes.wideDesktopBannerImageHorizontalPosition;
	const textContentHorizontalPositionOffsetForMobile = props.attributes.textContentHorizontalPositionOffsetForMobile;
	const textContentHorizontalPositionOffsetForTablet = props.attributes.textContentHorizontalPositionOffsetForTablet;
	const textContentHorizontalPositionOffsetForDesktop = props.attributes.textContentHorizontalPositionOffsetForDesktop;
	const textContentHorizontalPositionOffsetForWideDesktop = props.attributes.textContentHorizontalPositionOffsetForWideDesktop;
	
	return (`
		#${props.attributes.instanceId}.alb-theme-type-1-banner {
			background: ${bannerBackgroundColor};
			height: ${mobileBannerHeight};
			border-bottom-style: ${bottomBorderStyle};
			border-bottom-color: ${bottomBorderColor};
			border-bottom-width: ${mobileBottomBorderWidth};
		}
		#${props.attributes.instanceId} .alb-theme-type-1-banner__image {
			opacity: ${bannerImageOpacity};
			transform: translateY(${mobileBannerImageVerticalPosition}) translateX(${mobileBannerImageHorizontalPosition});
		}
		#${props.attributes.instanceId} .alb-theme-type-1-banner__full-image {
			opacity: ${bannerImageOpacity};
		}
		#${props.attributes.instanceId} .alb-theme-type-1-banner__text-content {
			top: ${miscParams.textContentTopPostion};
			text-align: ${miscParams.horizontalAlignmentCSSValue};
			transform: translateY(${miscParams.textContentTranslateYForMobile}) translateX(${textContentHorizontalPositionOffsetForMobile});
		}
		@media (min-width: ${ScreenWidthRef["TABLET_MIN"]}px) {
			#${props.attributes.instanceId}.alb-theme-type-1-banner {
				height: ${tabletBannerHeight};
				border-bottom-width: ${tabletBottomBorderWidth};
			}
			#${props.attributes.instanceId} .alb-theme-type-1-banner__image {
				transform: translateY(${tabletBannerImageVerticalPosition}) translateX(${tabletBannerImageHorizontalPosition});
			}
			#${props.attributes.instanceId} .alb-theme-type-1-banner__text-content {
				transform: translateY(${miscParams.textContentTranslateYForTablet}) translateX(${textContentHorizontalPositionOffsetForTablet});
			}
		}
		@media (min-width: ${ScreenWidthRef["DESKTOP_MIN"]}px) {
			#${props.attributes.instanceId}.alb-theme-type-1-banner {
				height: ${desktopBannerHeight};
				border-bottom-width: ${desktopBottomBorderWidth};
			}
			#${props.attributes.instanceId} .alb-theme-type-1-banner__image {
				transform: translateY(${desktopBannerImageVerticalPosition}) translateX(${desktopBannerImageHorizontalPosition});
			}
			#${props.attributes.instanceId} .alb-theme-type-1-banner__text-content {
				transform: translateY(${miscParams.textContentTranslateYForDesktop}) translateX(${textContentHorizontalPositionOffsetForDesktop});
			}
		}
		@media (min-width: ${ScreenWidthRef["WIDE_DESKTOP_MIN"]}px) {
			#${props.attributes.instanceId}.alb-theme-type-1-banner {
				height: ${wideDesktopBannerHeight};
				border-bottom-width: ${wideDesktopBottomBorderWidth};
			}
			#${props.attributes.instanceId} .alb-theme-type-1-banner__image {
				transform: translateY(${wideDesktopBannerImageVerticalPosition}) translateX(${wideDesktopBannerImageHorizontalPosition});
			}
			#${props.attributes.instanceId} .alb-theme-type-1-banner__text-content {
				transform: translateY(${miscParams.textContentTranslateYForWideDesktop}) translateX(${textContentHorizontalPositionOffsetForWideDesktop});
			}
		}
	`);
}

function EditComponent (props) {
	//loadAdditionalCSSIntoPreviewWindow("ADMIN_COMMON_CSS");
	//loadAdditionalCSSIntoPreviewWindow("ALB_THEME_UTILS");
	//loadAdditionalCSSIntoPreviewWindow("NORMALIZE");
	//loadAdditionalCSSIntoPreviewWindow("FONT_ROBOTO_CSS");
	
	//const [previewWindowWidth, setPreviewWindowWidth] = useState( "" );
	const blockProps = useBlockProps();
	
	const [allowedBlockArray, setAllowedBlockArray] = useState( ["core/paragraph", "core/buttons", "alb-theme/text-content-block", "alb-theme/type-1-text-content-block", "alb-theme/type-2-text-content-block", "alb-theme/type-3-text-content-block", "alb-theme/button-block", "alb-theme/type-1-button-block", "type-2-alb-theme/button-block", "type-3-alb-theme/button-block", "alb-theme/button-wrapper-block"] );
	
	const [screenWidthType, setScreenWidthType]                                         = useState( "" );
	const [previewScreenWidth, setPreviewScreenWidth]                                   = useState( "" );
	const [previewScreenHeight, setreviewScreenHeight]                                  = useState( "" );
	const [textContentTopPostion, setTextContentTopPostion]                             = useState( "50%" );
	const [textContentTranslateYForMobile, setTextContentTranslateYForMobile]           = useState( "50%" );
	const [textContentTranslateYForTablet, setTextContentTranslateYForTablet]           = useState( "50%" );
	const [textContentTranslateYForDesktop, setTextContentTranslateYForDesktop]         = useState( "50%" );
	const [textContentTranslateYForWideDesktop, setTextContentTranslateYForWideDesktop] = useState( "50%" );
	const [isWordPressTheme, setIsWordPressTheme]                                       = useState( false );
	
	const basicEnvInfo = "userAgent: " + navigator.userAgent + ", phpVersion: " + ALBThemeType1BannerBlockScriptData.phpVersion + ", wpVersion: " + ALBThemeType1BannerBlockScriptData.wpVersion + ", ";
	
	//const pluginFrontEndStyleSheet = getStyleSheetObject(document.querySelector( WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"] ).contentWindow.document.styleSheets, EDITOR_STYLE_ID);
	
	useEffect(function() {
		if (props.attributes.isInTestMode) {
			console.log(getLogHeader() + "useEffect fired[]");
		}
		
		loadAdditionalCSSIntoPreviewWindow("ADMIN_COMMON_CSS");
		loadAdditionalCSSIntoPreviewWindow("ALB_THEME_UTILS");
		loadAdditionalCSSIntoPreviewWindow("NORMALIZE");
		
		if (!props.attributes.instanceId) {
			props.setAttributes( { instanceId: "alb-theme-type-1-banner-" + Date.now() } );
			props.setAttributes( { removeTopSpace: true } );
			props.setAttributes( { removeBottomSpace: true} );
		}
		
		const currentPostType = wp.data.select("core/editor").getCurrentPostType();
		
		if ( currentPostType == "post" || currentPostType == "page" ) {
			let tempAllowedBlockArray = allowedBlockArray;
			tempAllowedBlockArray.push("core/post-title");
			
			setAllowedBlockArray(tempAllowedBlockArray);
		}
		
		const testWordPressDefaultTheme = WordPressDefaultThemeArray.filter(item => {
			return item == ALBThemeType1BannerBlockScriptData.themeName;
		});
		
		if ( testWordPressDefaultTheme ) {
			if ( testWordPressDefaultTheme.length > 0 ) {
				setIsWordPressTheme(true);
			}
		}
	}, []);
	
	useEffect(function() {
		if ( ALBThemeType1BannerBlockScriptData.themeName == THEME_NAME_2023 ) {
			let currentPostType = wp.data.select("core/editor").getCurrentPostType();
			
			if ( !currentPostType ) {
				currentPostType = wp.data.select("core/edit-site").getEditedPostType();
			}
			
			if ( currentPostType == POST_TYPE_WP_TEMPLATE ) {
				let previewScreenFrame = document.querySelector(WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"]);
					
				if ( previewScreenFrame ) {
					let previewWindow = previewScreenFrame.contentWindow;
					
					if ( previewWindow ) {
						//let previewWindowBody = previewWindow.document.getElementsByTagName("BODY");
						let previewWindowBody = previewWindow.document.querySelector(".editor-styles-wrapper");
						
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "previewWindowBody: ", previewWindowBody);
						}
						
						if ( previewWindowBody ) {
							if ( previewWindowBody.style ) {
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "previewWindowBody: ", previewWindowBody);
									console.log(getLogHeader() + "previewWindowBody.style: ", previewWindowBody.style);
									console.log(getLogHeader() + "typeof(previewWindowBody.style.paddingTop: ", typeof(previewWindowBody.style.paddingTop));
								}
								
								if ( props.attributes.forceRemoveTopPaddingOfRootContainer ) {
									previewWindowBody.style.paddingTop = 0;
								} else {
									previewWindowBody.style.paddingTop = "";
									previewWindowBody.style.paddingTop = undefined;
								}
							}
						}
					}
				}
			}
		}
	}, [props.attributes.forceRemoveTopPaddingOfRootContainer]);
	
	useEffect(function() {
		//console.log(props.attributes.bottomBorderStyle);
		
		if ( props.attributes.bottomBorderStyle != "NONE" ) {
			//console.log(props.attributes.mobileBottomBorderWidth);
			//console.log(parseFloat(props.attributes.mobileBottomBorderWidth));
			
			if ( parseFloat(props.attributes.mobileBottomBorderWidth) == 0 ) {
				props.setAttributes({ mobileBottomBorderWidth: "0.75rem" });
			}
			if ( parseFloat(props.attributes.tabletBottomBorderWidth) == 0 ) {
				props.setAttributes({ tabletBottomBorderWidth: "0.75rem" });
			}
			if ( parseFloat(props.attributes.desktopBottomBorderWidth) == 0 ) {
				props.setAttributes({ desktopBottomBorderWidth: "0.75rem" });
			}
			if ( parseFloat(props.attributes.wideDesktopBottomBorderWidth) == 0 ) {
				props.setAttributes({ wideDesktopBottomBorderWidth: "0.75rem" });
			}
		}
	}, [props.attributes.bottomBorderStyle]);
	
	useEffect(function() {
		switch (props.attributes.textContentVerticalAlignment) {
			case "T":
				setTextContentTopPostion("0");
				setTextContentTranslateYForMobile("calc( 0rem + " + (props.attributes.textContentVerticalPositionOffsetForMobile ? props.attributes.textContentVerticalPositionOffsetForMobile : "0rem") + " )");
				setTextContentTranslateYForTablet("calc( 0rem + " + (props.attributes.textContentVerticalPositionOffsetForTablet ? props.attributes.textContentVerticalPositionOffsetForTablet : "0rem") + " )");
				setTextContentTranslateYForDesktop("calc( 0rem + " + (props.attributes.textContentVerticalPositionOffsetForDesktop ? props.attributes.textContentVerticalPositionOffsetForDesktop : "0rem") + " )");
				setTextContentTranslateYForWideDesktop("calc( 0rem + " + (props.attributes.textContentVerticalPositionOffsetForWideDesktop ? props.attributes.textContentVerticalPositionOffsetForWideDesktop : "0rem") + " )");
				break;
			case "C":
				setTextContentTopPostion("50%");
				setTextContentTranslateYForMobile("calc( -50% + " + (props.attributes.textContentVerticalPositionOffsetForMobile ? props.attributes.textContentVerticalPositionOffsetForMobile : "0rem") + " )");
				setTextContentTranslateYForTablet("calc( -50% + " + (props.attributes.textContentVerticalPositionOffsetForTablet ? props.attributes.textContentVerticalPositionOffsetForTablet : "0rem") + " )");
				setTextContentTranslateYForDesktop("calc( -50% + " + (props.attributes.textContentVerticalPositionOffsetForDesktop ? props.attributes.textContentVerticalPositionOffsetForDesktop : "0rem") + " )");
				setTextContentTranslateYForWideDesktop("calc( -50% + " + (props.attributes.textContentVerticalPositionOffsetForWideDesktop ? props.attributes.textContentVerticalPositionOffsetForWideDesktop : "0rem") + " )");
				
				//settextContentTranslateY("-50%");
				break;
			case "B":
				setTextContentTopPostion("100%");
				setTextContentTranslateYForMobile("calc( -100% + " + (props.attributes.textContentVerticalPositionOffsetForMobile ? props.attributes.textContentVerticalPositionOffsetForMobile : "0rem") + " )");
				setTextContentTranslateYForTablet("calc( -100% + " + (props.attributes.textContentVerticalPositionOffsetForTablet ? props.attributes.textContentVerticalPositionOffsetForTablet : "0rem") + " )");
				setTextContentTranslateYForDesktop("calc( -100% + " + (props.attributes.textContentVerticalPositionOffsetForDesktop ? props.attributes.textContentVerticalPositionOffsetForDesktop : "0rem") + " )");
				setTextContentTranslateYForWideDesktop("calc( -100% + " + (props.attributes.textContentVerticalPositionOffsetForWideDesktop ? props.attributes.textContentVerticalPositionOffsetForWideDesktop : "0rem") + " )");
				
				//settextContentTranslateY("-100%");
				break;
		}			
	}, [
		props.attributes.textContentVerticalAlignment, 
		props.attributes.textContentVerticalPositionOffsetForMobile, 
		props.attributes.textContentVerticalPositionOffsetForTablet, 
		props.attributes.textContentVerticalPositionOffsetForDesktop, 
		props.attributes.textContentVerticalPositionOffsetForWideDesktop
	]);
	
	function BannerImageTypeDropdownList() {
		return (
			<>
			<p>{__("Banner Image Type:", "alb-theme-type-1-banner-block-text-domain")}</p>
			<select className="full-width" style={{maxWidth:"none"}} onChange={ (e) => { props.setAttributes( {bannerImageType: e.target.value} ) } }>
				{BannerImageTypeArray.map( item => {
					//console.log(item);
					return (
						<option value={item.code} selected={ item.code == props.attributes.bannerImageType } >{ item.name }</option>
					);
				})}
			</select>
			</>
		);
	}
	
	function ImageUploadButtons() {
		const imageUploadButtonLabelForMobile = getLabelJSXElement(__("Upload Image (for ${BOLDBEGIN}Mobile${BOLDEND})", "alb-theme-type-1-banner-block-text-domain"));
		const imageUploadButtonLabelForTablet = getLabelJSXElement(__("Upload Image (for ${BOLDBEGIN}Tablet${BOLDEND})", "alb-theme-type-1-banner-block-text-domain"));
		const imageUploadButtonLabelForDesktop = getLabelJSXElement(__("Upload Image (for ${BOLDBEGIN}Desktop${BOLDEND})", "alb-theme-type-1-banner-block-text-domain"));
		const imageUploadButtonLabelForWideDesktop = getLabelJSXElement(__("Upload Image (for ${BOLDBEGIN}Wide Desktop${BOLDEND})", "alb-theme-type-1-banner-block-text-domain"));
		
		//console.log(imageUploadButtonLabelForDesktop);
		//console.log(typeof(imageUploadButtonLabelForDesktop));
		//console.log(<div><p>aaabcd1234</p></div>);
		//console.log(typeof(<div><p>aaabcd1234</p></div>));
		
		if (props.attributes.isInTestMode) {
			return (
			<>
				<ImageUploadUtilities
					componentLabel={imageUploadButtonLabelForMobile}
					imageId={props.attributes.mobileBannerImageID}
					sizes={["mobileType1BannerLowDPI"]}
					onFinish={ (result) => {
						console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
						
						if(result && result.imageId && result["mobileType1BannerLowDPI"] && result["mobileType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
							props.setAttributes( { mobileBannerImageID: result.imageId } );
							props.setAttributes( { mobileBannerImageURL: result["intact"].url } );
							props.setAttributes( { mobileLowDPIBannerImageURL: result["mobileType1BannerLowDPI"].url } );
						}
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
				<ImageUploadUtilities
					componentLabel={imageUploadButtonLabelForTablet}
					imageId={props.attributes.tabletBannerImageID}
					sizes={["tabletType1BannerLowDPI"]}
					onFinish={ (result) => {
						console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
						
						if(result && result.imageId && result["tabletType1BannerLowDPI"] && result["tabletType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
							props.setAttributes( { tabletBannerImageID: result.imageId } );
							props.setAttributes( { tabletBannerImageURL: result["intact"].url } );
							props.setAttributes( { tabletLowDPIBannerImageURL: result["tabletType1BannerLowDPI"].url } );
						}
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
				<ImageUploadUtilities
					componentLabel={imageUploadButtonLabelForDesktop}
					imageId={props.attributes.desktopBannerImageID}
					sizes={["desktopType1BannerLowDPI"]}
					onFinish={ (result) => {
						console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
						
						if(result && result.imageId && result["desktopType1BannerLowDPI"] && result["desktopType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
							props.setAttributes( { desktopBannerImageID: result.imageId } );
							props.setAttributes( { desktopBannerImageURL: result["intact"].url } );
							props.setAttributes( { desktopLowDPIBannerImageURL: result["desktopType1BannerLowDPI"].url } );
						}
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
				<ImageUploadUtilities
					componentLabel={imageUploadButtonLabelForWideDesktop}
					imageId={props.attributes.wideDesktopBannerImageID}
					sizes={["wideDesktopType1BannerLowDPI"]}
					onFinish={ (result) => {
						console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
						
						if(result && result.imageId && result["wideDesktopType1BannerLowDPI"] && result["wideDesktopType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
							props.setAttributes( { wideDesktopBannerImageID: result.imageId } );
							props.setAttributes( { wideDesktopBannerImageURL: result["intact"].url } );
							props.setAttributes( { wideDesktopLowDPIBannerImageURL: result["wideDesktopType1BannerLowDPI"].url } );
						}
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</>
			);
		} else {
			switch (screenWidthType) {
				case SCREEN_WIDTH_TYPE_MOBILE:
					return (
					<ImageUploadUtilities
						componentLabel={imageUploadButtonLabelForMobile}
						imageId={props.attributes.mobileBannerImageID}
						sizes={["mobileType1BannerLowDPI"]}
						onFinish={ (result) => {
							if (props.attributes.isInTestMode) {
								console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
							}
							
							if(result && result.imageId && result["mobileType1BannerLowDPI"] && result["mobileType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
								props.setAttributes( { mobileBannerImageID: result.imageId } );
								props.setAttributes( { mobileBannerImageURL: result["intact"].url } );
								props.setAttributes( { mobileLowDPIBannerImageURL: result["mobileType1BannerLowDPI"].url } );
							}
						}}
						miscInfo={{
							blockName: BLOCK_NAME, 
							isInTestMode: props.attributes.isInTestMode
						}}
					/>
					);
				case SCREEN_WIDTH_TYPE_TABLET:
					return (
					<ImageUploadUtilities
						componentLabel={imageUploadButtonLabelForTablet}
						imageId={props.attributes.tabletBannerImageID}
						sizes={["tabletType1BannerLowDPI"]}
						onFinish={ (result) => {
							if (props.attributes.isInTestMode) {
								console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
							}
							
							if(result && result.imageId && result["tabletType1BannerLowDPI"] && result["tabletType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
								props.setAttributes( { tabletBannerImageID: result.imageId } );
								props.setAttributes( { tabletBannerImageURL: result["intact"].url } );
								props.setAttributes( { tabletLowDPIBannerImageURL: result["tabletType1BannerLowDPI"].url } );
							}
						}}
						miscInfo={{
							blockName: BLOCK_NAME, 
							isInTestMode: props.attributes.isInTestMode
						}}
					/>
					);
				case SCREEN_WIDTH_TYPE_DESKTOP:
					return (
					<ImageUploadUtilities
						componentLabel={imageUploadButtonLabelForDesktop}
						imageId={props.attributes.desktopBannerImageID}
						sizes={["desktopType1BannerLowDPI"]}
						onFinish={ (result) => {
							if (props.attributes.isInTestMode) {
								console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
							}
							
							if(result && result.imageId && result["desktopType1BannerLowDPI"] && result["desktopType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
								props.setAttributes( { desktopBannerImageID: result.imageId } );
								props.setAttributes( { desktopBannerImageURL: result["intact"].url } );
								props.setAttributes( { desktopLowDPIBannerImageURL: result["desktopType1BannerLowDPI"].url } );
							}
						}}
						miscInfo={{
							blockName: BLOCK_NAME, 
							isInTestMode: props.attributes.isInTestMode
						}}
					/>
					);
				case SCREEN_WIDTH_TYPE_WIDE_DESKTOP:
					return (
					<ImageUploadUtilities
						componentLabel={imageUploadButtonLabelForWideDesktop}
						imageId={props.attributes.wideDesktopBannerImageID}
						sizes={["wideDesktopType1BannerLowDPI"]}
						onFinish={ (result) => {
							if (props.attributes.isInTestMode) {
								console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
							}
							
							if(result && result.imageId && result["wideDesktopType1BannerLowDPI"] && result["wideDesktopType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
								props.setAttributes( { wideDesktopBannerImageID: result.imageId } );
								props.setAttributes( { wideDesktopBannerImageURL: result["intact"].url } );
								props.setAttributes( { wideDesktopLowDPIBannerImageURL: result["wideDesktopType1BannerLowDPI"].url } );
							}
						}}
						miscInfo={{
							blockName: BLOCK_NAME, 
							isInTestMode: props.attributes.isInTestMode
						}}
					/>
					);
				default: 
					//console.warn(getLogHeader() + "ImageUploadButtons, unknown screenWidthType: ", screenWidthType);
					
					return (
					<>
						<ImageUploadUtilities
							componentLabel={imageUploadButtonLabelForMobile}
							imageId={props.attributes.mobileBannerImageID}
							sizes={["mobileType1BannerLowDPI"]}
							onFinish={ (result) => {
								if (props.attributes.isInTestMode) {
									console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
								}
								
								if(result && result.imageId && result["mobileType1BannerLowDPI"] && result["mobileType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
									props.setAttributes( { mobileBannerImageID: result.imageId } );
									props.setAttributes( { mobileBannerImageURL: result["intact"].url } );
									props.setAttributes( { mobileLowDPIBannerImageURL: result["mobileType1BannerLowDPI"].url } );
								}
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
						<ImageUploadUtilities
							componentLabel={imageUploadButtonLabelForTablet}
							imageId={props.attributes.tabletBannerImageID}
							sizes={["tabletType1BannerLowDPI"]}
							onFinish={ (result) => {
								if (props.attributes.isInTestMode) {
									console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
								}
								
								if(result && result.imageId && result["tabletType1BannerLowDPI"] && result["tabletType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
									props.setAttributes( { tabletBannerImageID: result.imageId } );
									props.setAttributes( { tabletBannerImageURL: result["intact"].url } );
									props.setAttributes( { tabletLowDPIBannerImageURL: result["tabletType1BannerLowDPI"].url } );
								}
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
						<ImageUploadUtilities
							componentLabel={imageUploadButtonLabelForDesktop}
							imageId={props.attributes.desktopBannerImageID}
							sizes={["desktopType1BannerLowDPI"]}
							onFinish={ (result) => {
								if (props.attributes.isInTestMode) {
									console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
								}
								
								if(result && result.imageId && result["desktopType1BannerLowDPI"] && result["desktopType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
									props.setAttributes( { desktopBannerImageID: result.imageId } );
									props.setAttributes( { desktopBannerImageURL: result["intact"].url } );
									props.setAttributes( { desktopLowDPIBannerImageURL: result["desktopType1BannerLowDPI"].url } );
								}
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
						<ImageUploadUtilities
							componentLabel=<p className="alb-theme-block-label-wrapper">{imageUploadButtonLabelForWideDesktop}</p>
							imageId={props.attributes.wideDesktopBannerImageID}
							sizes={["wideDesktopType1BannerLowDPI"]}
							onFinish={ (result) => {
								if (props.attributes.isInTestMode) {
									console.log(getLogHeader() + "ImageUploadUtilities onFinish result: ", result);
								}
								
								if(result && result.imageId && result["wideDesktopType1BannerLowDPI"] && result["wideDesktopType1BannerLowDPI"].url && result["intact"] && result["intact"].url) {
									props.setAttributes( { wideDesktopBannerImageID: result.imageId } );
									props.setAttributes( { wideDesktopBannerImageURL: result["intact"].url } );
									props.setAttributes( { wideDesktopLowDPIBannerImageURL: result["wideDesktopType1BannerLowDPI"].url } );
								}
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</>
					);//[ mobileFontSizeControl, tabletFontSizeControl, desktopFontSizeControl, wideDesktopFontSizeControl ];
			}
		}
	}
	
	function TextContentHorizontalAlignmentControl() {
		return (
			<>
			<p>{__("Text Content Horizontal Alignment:", "alb-theme-type-1-banner-block-text-domain")}</p>
			<select className="full-width" style={{maxWidth:"none"}} onChange={ (e) => { props.setAttributes( {textContentHorizontalAlignment: e.target.value} ) } }>
				{AlignmentType.H.map( item => {
					return (
						<option value={item.code} selected={ item.code == props.attributes.textContentHorizontalAlignment } >{ item.name }</option>
					);
				})}
			</select>
			</>
		);
	}
	
	function TextContentVerticalAlignmentControl() {
		return (
			<>
			<p>{__("Text Content Vertical Alignment:", "alb-theme-type-1-banner-block-text-domain")}</p>
			<select className="full-width" style={{maxWidth:"none"}} onChange={ (e) => { props.setAttributes( {textContentVerticalAlignment: e.target.value} ) } }>
				{AlignmentType.V.map( item => {
					return (
						<option value={item.code} selected={ item.code == props.attributes.textContentVerticalAlignment } >{ item.name }</option>
					);
				})}
			</select>
			</>
		);
	}
	
	function BannerBottomBorderStyleDropdown() {
		return (
			<>
			<p>{__("Banner Bottom Border Styles:", "alb-theme-type-1-banner-block-text-domain")}</p>
			<select 
				className="full-width" 
				style={{maxWidth:"none"}} 
				onChange={ (e) => {
					let newBottomBorder = e.target.value;
					
					props.setAttributes({ bottomBorderStyle: newBottomBorder });
				}}>
				{BannerBottomBorderStyleArray.map( item => {
					return (
						<option value={item.code} selected={ item.code == props.attributes.bottomBorderStyle } >{ item.name }</option>
					);
				})}
			</select>
			</>
		);
	}
	
	function BannerBottomBorderColorControl() {
		return (
		<ColorUtilities
			label={__("Bottom Border Color", "alb-theme-type-1-banner-block-text-domain")}
			colorType={ undefined }
			color={ props.attributes.bottomBorderColor }
			onChange={ (colorType, color) => {
				if ( props.attributes.isInTestMode ) {
					console.log(getLogHeader() + "ColorUtilities onChange bottomBorderColor: ", color);
				}
				
				props.setAttributes({
					bottomBorderColor: color
				});
			}}
			miscInfo={{
				blockName: BLOCK_NAME, 
				isInTestMode: props.attributes.isInTestMode
			}}
		/>
		);
	}
	
	function BannerBottomBorderColorControlBannerRow() {	
		if (props.attributes.bottomBorderStyle == "none") {
			return <></>;
		}
			
		return (
		<>
		<PanelRow className="add-margin-bottom">
			{BannerBottomBorderColorControl()}
		</PanelRow>
		</>
		);
	}
	
	function BannerBottomBorderWidthControl() {
		if (props.attributes.bottomBorderStyle == "none") {
			return <></>;
		}
		
		const bottomBorderWidthLabelForMobile      = getLabelJSXElement(__("Bottom Border Width (for ${BOLDBEGIN}Mobile${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bottomBorderWidthLabelForTablet      = getLabelJSXElement(__("Bottom Border Width (for ${BOLDBEGIN}Tablet${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bottomBorderWidthLabelForDesktop     = getLabelJSXElement(__("Bottom Border Width (for ${BOLDBEGIN}Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bottomBorderWidthLabelForWideDesktop = getLabelJSXElement(__("Bottom Border Width (for ${BOLDBEGIN}Wide Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		
		if (props.attributes.isInTestMode) {
			return (
			<>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bottomBorderWidthLabelForMobile}
					value={ props.attributes.mobileBottomBorderWidth }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange mobileBottomBorderWidth newValue: ", newValue);
						}
						
						props.setAttributes( { mobileBottomBorderWidth: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bottomBorderWidthLabelForTablet}
					value={ props.attributes.tabletBottomBorderWidth }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange tabletBottomBorderWidth newValue: ", newValue);
						}
						
						props.setAttributes( { tabletBottomBorderWidth: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bottomBorderWidthLabelForDesktop}
					value={ props.attributes.desktopBottomBorderWidth }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange desktopBottomBorderWidth newValue: ", newValue);
						}
						
						props.setAttributes( { desktopBottomBorderWidth: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bottomBorderWidthLabelForWideDesktop}
					value={ props.attributes.wideDesktopBottomBorderWidth }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBottomBorderWidth newValue: ", newValue);
						}
						
						props.setAttributes( { wideDesktopBottomBorderWidth: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			</>
			);
		} else {
			switch (screenWidthType) {
				case SCREEN_WIDTH_TYPE_MOBILE:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bottomBorderWidthLabelForMobile}
							value={ props.attributes.mobileBottomBorderWidth }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange mobileBottomBorderWidth newValue: ", newValue);
								}
								
								props.setAttributes( { mobileBottomBorderWidth: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_TABLET:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bottomBorderWidthLabelForTablet}
							value={ props.attributes.tabletBottomBorderWidth }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange tabletBottomBorderWidth newValue: ", newValue);
								}
								
								props.setAttributes( { tabletBottomBorderWidth: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_DESKTOP:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bottomBorderWidthLabelForDesktop}
							value={ props.attributes.desktopBottomBorderWidth }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange desktopBottomBorderWidth newValue: ", newValue);
								}
								
								props.setAttributes( { desktopBottomBorderWidth: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_WIDE_DESKTOP:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bottomBorderWidthLabelForWideDesktop}
							value={ props.attributes.wideDesktopBottomBorderWidth }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBottomBorderWidth newValue: ", newValue);
								}
								
								props.setAttributes( { wideDesktopBottomBorderWidth: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				default: 
					//console.warn(getLogHeader() + "BannerBottomBorderWidthControl, unknown screenWidthType: ", screenWidthType);
					
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bottomBorderWidthLabelForMobile}
							value={ props.attributes.mobileBottomBorderWidth }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange mobileBottomBorderWidth newValue: ", newValue);
								}
								
								props.setAttributes( { mobileBottomBorderWidth: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bottomBorderWidthLabelForTablet}
							value={ props.attributes.tabletBottomBorderWidth }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange tabletBottomBorderWidth newValue: ", newValue);
								}
								
								props.setAttributes( { tabletBottomBorderWidth: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bottomBorderWidthLabelForDesktop}
							value={ props.attributes.desktopBottomBorderWidth }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange desktopBottomBorderWidth newValue: ", newValue);
								}
								
								props.setAttributes( { desktopBottomBorderWidth: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bottomBorderWidthLabelForWideDesktop}
							value={ props.attributes.wideDesktopBottomBorderWidth }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBottomBorderWidth newValue: ", newValue);
								}
								
								props.setAttributes( { wideDesktopBottomBorderWidth: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
			}
		}
	}
	
	function BannerBackgroundColorControl() {
		return (
		<ColorUtilities
			label={__("Banner Background Color", "alb-theme-type-1-banner-block-text-domain")}
			colorType={ props.attributes.bannerBackgroundColorType }
			color={ props.attributes.bannerBackgroundColor }
			onChange={ (colorType, color) => {
				if ( props.attributes.isInTestMode ) {
					console.log(getLogHeader() + "ColorUtilities onChange: bannerBackgroundColorType: ", colorType, "bannerBackgroundColor: ", color);
				}
				
				props.setAttributes({
					bannerBackgroundColorType: colorType,
					bannerBackgroundColor: color
				});
			}}
			miscInfo={{
				blockName: BLOCK_NAME, 
				isInTestMode: props.attributes.isInTestMode
			}}
		/>
		);
	}
	
	function BannerImageOpacityControl() {
		return (
		<SizeUtilities
			type="rc"
			label={__("Banner Image Opacity:", "alb-theme-type-1-banner-block-text-domain")}
			value={ props.attributes.bannerImageOpacity }
			rangeControlComponentUnit={undefined}
			min={0}
			max={1}
			step={0.01}
			onChange={ (newValue) => {							
				if ( props.attributes.isInTestMode ) {
					console.log(getLogHeader() + "SizeUtilities onChange: newValue: ", newValue);
				}
				
				props.setAttributes( { bannerImageOpacity: newValue } );
			}}
			miscInfo={{
				blockName: BLOCK_NAME, 
				isInTestMode: props.attributes.isInTestMode
			}}
		/>
		);
	}
	
	function BannerImagePositionControl() {
		if (props.attributes.bannerImageType == "FI") {
			return <></>
		}		
		
		const bannerImageHorizontalPositionLabelForMobile      = getLabelJSXElement(__("Banner Image ${BOLDBEGIN}Horizontal${BOLDEND} Position (for ${BOLDBEGIN}Mobile${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerImageVerticalPositionLabelForMobile        = getLabelJSXElement(__("Banner Image ${BOLDBEGIN}Vertical${BOLDEND} Position (for ${BOLDBEGIN}Mobile${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerImageHorizontalPositionLabelForTablet      = getLabelJSXElement(__("Banner Image ${BOLDBEGIN}Horizontal${BOLDEND} Position (for ${BOLDBEGIN}Tablet${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerImageVerticalPositionLabelForTablet        = getLabelJSXElement(__("Banner Image ${BOLDBEGIN}Vertical${BOLDEND} Position (for ${BOLDBEGIN}Tablet${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerImageHorizontalPositionLabelForDesktop     = getLabelJSXElement(__("Banner Image ${BOLDBEGIN}Horizontal${BOLDEND} Position (for ${BOLDBEGIN}Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerImageVerticalPositionLabelForDesktop       = getLabelJSXElement(__("Banner Image ${BOLDBEGIN}Vertical${BOLDEND} Position (for ${BOLDBEGIN}Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerImageHorizontalPositionLabelForWideDesktop = getLabelJSXElement(__("Banner Image ${BOLDBEGIN}Horizontal${BOLDEND} Position (for ${BOLDBEGIN}Wide Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerImageVerticalPositionLabelForWideDesktop   = getLabelJSXElement(__("Banner Image ${BOLDBEGIN}Vertical${BOLDEND} Position (for ${BOLDBEGIN}Wide Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		
		if (props.attributes.isInTestMode) {
			return (
			<>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerImageHorizontalPositionLabelForMobile}
					value={ props.attributes.mobileBannerImageHorizontalPosition }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange mobileBannerImageHorizontalPosition newValue: ", newValue);
						}
						
						props.setAttributes( { mobileBannerImageHorizontalPosition: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerImageVerticalPositionLabelForMobile}
					value={ props.attributes.mobileBannerImageVerticalPosition }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange mobileBannerImageVerticalPosition newValue: ", newValue);
						}
						
						props.setAttributes( { mobileBannerImageVerticalPosition: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerImageHorizontalPositionLabelForTablet}
					value={ props.attributes.tabletBannerImageHorizontalPosition }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange tabletBannerImageHorizontalPosition newValue: ", newValue);
						}
						
						props.setAttributes( { tabletBannerImageHorizontalPosition: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerImageVerticalPositionLabelForTablet}
					value={ props.attributes.tabletBannerImageVerticalPosition }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange tabletBannerImageVerticalPosition newValue: ", newValue);
						}
						
						props.setAttributes( { tabletBannerImageVerticalPosition: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerImageHorizontalPositionLabelForDesktop}
					value={ props.attributes.desktopBannerImageHorizontalPosition }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange desktopBannerImageHorizontalPosition newValue: ", newValue);
						}
						
						props.setAttributes( { desktopBannerImageHorizontalPosition: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerImageVerticalPositionLabelForDesktop}
					value={ props.attributes.desktopBannerImageVerticalPosition }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange desktopBannerImageVerticalPosition newValue: ", newValue);
						}
						
						props.setAttributes( { desktopBannerImageVerticalPosition: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerImageHorizontalPositionLabelForWideDesktop}
					value={ props.attributes.wideDesktopBannerImageHorizontalPosition }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerImageHorizontalPosition newValue: ", newValue);
						}
						
						props.setAttributes( { wideDesktopBannerImageHorizontalPosition: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerImageVerticalPositionLabelForWideDesktop}
					value={ props.attributes.wideDesktopBannerImageVerticalPosition }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerImageVerticalPosition newValue: ", newValue);
						}
						
						props.setAttributes( { wideDesktopBannerImageVerticalPosition: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			</>
			);
		} else {
			switch (screenWidthType) {
				case SCREEN_WIDTH_TYPE_MOBILE:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageHorizontalPositionLabelForMobile}
							value={ props.attributes.mobileBannerImageHorizontalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange mobileBannerImageHorizontalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { mobileBannerImageHorizontalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageVerticalPositionLabelForMobile}
							value={ props.attributes.mobileBannerImageVerticalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange mobileBannerImageVerticalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { mobileBannerImageVerticalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_TABLET:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageHorizontalPositionLabelForTablet}
							value={ props.attributes.tabletBannerImageHorizontalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange tabletBannerImageHorizontalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { tabletBannerImageHorizontalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageVerticalPositionLabelForTablet}
							value={ props.attributes.tabletBannerImageVerticalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange tabletBannerImageVerticalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { tabletBannerImageVerticalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_DESKTOP:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageHorizontalPositionLabelForDesktop}
							value={ props.attributes.desktopBannerImageHorizontalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange desktopBannerImageHorizontalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { desktopBannerImageHorizontalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageVerticalPositionLabelForDesktop}
							value={ props.attributes.desktopBannerImageVerticalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange desktopBannerImageVerticalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { desktopBannerImageVerticalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_WIDE_DESKTOP:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageHorizontalPositionLabelForWideDesktop}
							value={ props.attributes.wideDesktopBannerImageHorizontalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerImageHorizontalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { wideDesktopBannerImageHorizontalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageVerticalPositionLabelForWideDesktop}
							value={ props.attributes.wideDesktopBannerImageVerticalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerImageVerticalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { wideDesktopBannerImageVerticalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				default: 
					//console.warn(getLogHeader() + "BannerImagePositionControl, unknown screenWidthType: ", screenWidthType);
					
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageHorizontalPositionLabelForMobile}
							value={ props.attributes.mobileBannerImageHorizontalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange mobileBannerImageHorizontalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { mobileBannerImageHorizontalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageVerticalPositionLabelForMobile}
							value={ props.attributes.mobileBannerImageVerticalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange mobileBannerImageVerticalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { mobileBannerImageVerticalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageHorizontalPositionLabelForTablet}
							value={ props.attributes.tabletBannerImageHorizontalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange tabletBannerImageHorizontalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { tabletBannerImageHorizontalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageVerticalPositionLabelForTablet}
							value={ props.attributes.tabletBannerImageVerticalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange tabletBannerImageVerticalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { tabletBannerImageVerticalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageHorizontalPositionLabelForDesktop}
							value={ props.attributes.desktopBannerImageHorizontalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange desktopBannerImageHorizontalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { desktopBannerImageHorizontalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageVerticalPositionLabelForDesktop}
							value={ props.attributes.desktopBannerImageVerticalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange desktopBannerImageVerticalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { desktopBannerImageVerticalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageHorizontalPositionLabelForWideDesktop}
							value={ props.attributes.wideDesktopBannerImageHorizontalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerImageHorizontalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { wideDesktopBannerImageHorizontalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerImageVerticalPositionLabelForWideDesktop}
							value={ props.attributes.wideDesktopBannerImageVerticalPosition }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerImageVerticalPosition newValue: ", newValue);
								}
								
								props.setAttributes( { wideDesktopBannerImageVerticalPosition: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
			}
		}
	}
	
	function BannerTextContentPositionControl() {
		const bannerTextContentHorizontalPositionLabelForMobile      = getLabelJSXElement(__("Banner Text Content ${BOLDBEGIN}Horizontal${BOLDEND} Position (for ${BOLDBEGIN}Mobile${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerTextContentVerticalPositionLabelForMobile        = getLabelJSXElement(__("Banner Text Content ${BOLDBEGIN}Vertical${BOLDEND} Position (for ${BOLDBEGIN}Mobile${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerTextContentHorizontalPositionLabelForTablet      = getLabelJSXElement(__("Banner Text Content ${BOLDBEGIN}Horizontal${BOLDEND} Position (for ${BOLDBEGIN}Tablet${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerTextContentVerticalPositionLabelForTablet        = getLabelJSXElement(__("Banner Text Content ${BOLDBEGIN}Vertical${BOLDEND} Position (for ${BOLDBEGIN}Tablet${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerTextContentHorizontalPositionLabelForDesktop     = getLabelJSXElement(__("Banner Text Content ${BOLDBEGIN}Horizontal${BOLDEND} Position (for ${BOLDBEGIN}Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerTextContentVerticalPositionLabelForDesktop       = getLabelJSXElement(__("Banner Text Content ${BOLDBEGIN}Vertical${BOLDEND} Position (for ${BOLDBEGIN}Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerTextContentHorizontalPositionLabelForWideDesktop = getLabelJSXElement(__("Banner Text Content ${BOLDBEGIN}Horizontal${BOLDEND} Position (for ${BOLDBEGIN}Wide Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		const bannerTextContentVerticalPositionLabelForWideDesktop   = getLabelJSXElement(__("Banner Text Content ${BOLDBEGIN}Vertical${BOLDEND} Position (for ${BOLDBEGIN}Wide Desktop${BOLDEND}):", "alb-theme-type-1-banner-block-text-domain"));
		
		if (props.attributes.isInTestMode) {
			return (
			<>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerTextContentHorizontalPositionLabelForMobile}
					value={ props.attributes.textContentHorizontalPositionOffsetForMobile }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForMobile newValue: ", newValue);
						}
						
						props.setAttributes( { textContentHorizontalPositionOffsetForMobile: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerTextContentVerticalPositionLabelForMobile}
					value={ props.attributes.textContentVerticalPositionOffsetForMobile }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForMobile newValue: ", newValue);
						}
						
						props.setAttributes( { textContentVerticalPositionOffsetForMobile: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerTextContentHorizontalPositionLabelForTablet}
					value={ props.attributes.textContentHorizontalPositionOffsetForTablet }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForTablet newValue: ", newValue);
						}
						
						props.setAttributes( { textContentHorizontalPositionOffsetForTablet: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerTextContentVerticalPositionLabelForTablet}
					value={ props.attributes.textContentVerticalPositionOffsetForTablet }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForTablet newValue: ", newValue);
						}
						
						props.setAttributes( { textContentVerticalPositionOffsetForTablet: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerTextContentHorizontalPositionLabelForDesktop}
					value={ props.attributes.textContentHorizontalPositionOffsetForDesktop }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForDesktop newValue: ", newValue);
						}
						
						props.setAttributes( { textContentHorizontalPositionOffsetForDesktop: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerTextContentVerticalPositionLabelForDesktop}
					value={ props.attributes.textContentVerticalPositionOffsetForDesktop }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForDesktop newValue: ", newValue);
						}
						
						props.setAttributes( { textContentVerticalPositionOffsetForDesktop: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerTextContentHorizontalPositionLabelForWideDesktop}
					value={ props.attributes.textContentHorizontalPositionOffsetForWideDesktop }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForWideDesktop newValue: ", newValue);
						}
						
						props.setAttributes( { textContentHorizontalPositionOffsetForWideDesktop: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerTextContentVerticalPositionLabelForWideDesktop}
					value={ props.attributes.textContentVerticalPositionOffsetForWideDesktop }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForWideDesktop newValue: ", newValue);
						}
						
						props.setAttributes( { textContentVerticalPositionOffsetForWideDesktop: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			</>
			);
		} else {
			switch (screenWidthType) {
				case SCREEN_WIDTH_TYPE_MOBILE:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentHorizontalPositionLabelForMobile}
							value={ props.attributes.textContentHorizontalPositionOffsetForMobile }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForMobile newValue: ", newValue);
								}
								
								props.setAttributes( { textContentHorizontalPositionOffsetForMobile: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentVerticalPositionLabelForMobile}
							value={ props.attributes.textContentVerticalPositionOffsetForMobile }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForMobile newValue: ", newValue);
								}
								
								props.setAttributes( { textContentVerticalPositionOffsetForMobile: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_TABLET:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentHorizontalPositionLabelForTablet}
							value={ props.attributes.textContentHorizontalPositionOffsetForTablet }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForTablet newValue: ", newValue);
								}
								
								props.setAttributes( { textContentHorizontalPositionOffsetForTablet: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentVerticalPositionLabelForTablet}
							value={ props.attributes.textContentVerticalPositionOffsetForTablet }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForTablet newValue: ", newValue);
								}
								
								props.setAttributes( { textContentVerticalPositionOffsetForTablet: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_DESKTOP:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentHorizontalPositionLabelForDesktop}
							value={ props.attributes.textContentHorizontalPositionOffsetForDesktop }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForDesktop newValue: ", newValue);
								}
								
								props.setAttributes( { textContentHorizontalPositionOffsetForDesktop: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentVerticalPositionLabelForDesktop}
							value={ props.attributes.textContentVerticalPositionOffsetForDesktop }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForDesktop newValue: ", newValue);
								}
								
								props.setAttributes( { textContentVerticalPositionOffsetForDesktop: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_WIDE_DESKTOP:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentHorizontalPositionLabelForWideDesktop}
							value={ props.attributes.textContentHorizontalPositionOffsetForWideDesktop }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForWideDesktop newValue: ", newValue);
								}
								
								props.setAttributes( { textContentHorizontalPositionOffsetForWideDesktop: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentVerticalPositionLabelForWideDesktop}
							value={ props.attributes.textContentVerticalPositionOffsetForWideDesktop }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForWideDesktop newValue: ", newValue);
								}
								
								props.setAttributes( { textContentVerticalPositionOffsetForWideDesktop: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				default: 
					//console.warn(getLogHeader() + "BannerTextContentPositionControl, unknown screenWidthType: ", screenWidthType);
					
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentHorizontalPositionLabelForMobile}
							value={ props.attributes.textContentHorizontalPositionOffsetForMobile }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForMobile newValue: ", newValue);
								}
								
								props.setAttributes( { textContentHorizontalPositionOffsetForMobile: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentVerticalPositionLabelForMobile}
							value={ props.attributes.textContentVerticalPositionOffsetForMobile }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForMobile newValue: ", newValue);
								}
								
								props.setAttributes( { textContentVerticalPositionOffsetForMobile: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentHorizontalPositionLabelForTablet}
							value={ props.attributes.textContentHorizontalPositionOffsetForTablet }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForTablet newValue: ", newValue);
								}
								
								props.setAttributes( { textContentHorizontalPositionOffsetForTablet: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentVerticalPositionLabelForTablet}
							value={ props.attributes.textContentVerticalPositionOffsetForTablet }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForTablet newValue: ", newValue);
								}
								
								props.setAttributes( { textContentVerticalPositionOffsetForTablet: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentHorizontalPositionLabelForDesktop}
							value={ props.attributes.textContentHorizontalPositionOffsetForDesktop }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForDesktop newValue: ", newValue);
								}
								
								props.setAttributes( { textContentHorizontalPositionOffsetForDesktop: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentVerticalPositionLabelForDesktop}
							value={ props.attributes.textContentVerticalPositionOffsetForDesktop }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForDesktop newValue: ", newValue);
								}
								
								props.setAttributes( { textContentVerticalPositionOffsetForDesktop: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentHorizontalPositionLabelForWideDesktop}
							value={ props.attributes.textContentHorizontalPositionOffsetForWideDesktop }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentHorizontalPositionOffsetForWideDesktop newValue: ", newValue);
								}
								
								props.setAttributes( { textContentHorizontalPositionOffsetForWideDesktop: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerTextContentVerticalPositionLabelForWideDesktop}
							value={ props.attributes.textContentVerticalPositionOffsetForWideDesktop }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange textContentVerticalPositionOffsetForWideDesktop newValue: ", newValue);
								}
								
								props.setAttributes( { textContentVerticalPositionOffsetForWideDesktop: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
			}
		}
	}
	
	function BannerHeightControl() {
		if (props.attributes.bannerImageType != "FH") {
			return <></>
		}
		
		const bannerHeightLabelForMobile = getLabelJSXElement(__("${BOLDBEGIN}Mobile${BOLDEND} Banner Height:", "alb-theme-type-1-banner-block-text-domain"));
		const bannerHeightLabelForTablet = getLabelJSXElement(__("${BOLDBEGIN}Tablet${BOLDEND} Banner Height:", "alb-theme-type-1-banner-block-text-domain"));
		const bannerHeightLabelForDesktop = getLabelJSXElement(__("${BOLDBEGIN}Desktop${BOLDEND} Banner Height:", "alb-theme-type-1-banner-block-text-domain"));
		const bannerHeightLabelForWideDesktop = getLabelJSXElement(__("${BOLDBEGIN}Wide Desktop${BOLDEND} Banner Height:", "alb-theme-type-1-banner-block-text-domain"));
		
		if (props.attributes.isInTestMode) {
			return (
			<>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerHeightLabelForMobile}
					value={ props.attributes.mobileBannerHeight }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange mobileBannerHeight newValue: ", newValue);
						}
						
						props.setAttributes( { mobileBannerHeight: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerHeightLabelForTablet}
					value={ props.attributes.tabletBannerHeight }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange tabletBannerHeight newValue: ", newValue);
						}
						
						props.setAttributes( { tabletBannerHeight: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerHeightLabelForDesktop}
					value={ props.attributes.desktopBannerHeight }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange desktopBannerHeight newValue: ", newValue);
						}
						
						props.setAttributes( { desktopBannerHeight: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			<PanelRow className="display--block">
				<SizeUtilities
					type="fsp"
					label={bannerHeightLabelForWideDesktop}
					value={ props.attributes.wideDesktopBannerHeight }
					isCustomFontSizesDisable={ false }
					isResetAllowed={ false }
					onChange={ (newValue) => {							
						if ( props.attributes.isInTestMode ) {
							console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerHeight newValue: ", newValue);
						}
						
						props.setAttributes( { wideDesktopBannerHeight: newValue } );
					}}
					miscInfo={{
						blockName: BLOCK_NAME, 
						isInTestMode: props.attributes.isInTestMode
					}}
				/>
			</PanelRow>
			</>
			);
		} else {
			switch (screenWidthType) {
				case SCREEN_WIDTH_TYPE_MOBILE:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerHeightLabelForMobile}
							value={ props.attributes.mobileBannerHeight }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange mobileBannerHeight newValue: ", newValue);
								}
								
								props.setAttributes( { mobileBannerHeight: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_TABLET:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerHeightLabelForTablet}
							value={ props.attributes.tabletBannerHeight }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange tabletBannerHeight newValue: ", newValue);
								}
								
								props.setAttributes( { tabletBannerHeight: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_DESKTOP:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerHeightLabelForDesktop}
							value={ props.attributes.desktopBannerHeight }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange desktopBannerHeight newValue: ", newValue);
								}
								
								props.setAttributes( { desktopBannerHeight: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				case SCREEN_WIDTH_TYPE_WIDE_DESKTOP:
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerHeightLabelForWideDesktop}
							value={ props.attributes.wideDesktopBannerHeight }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerHeight newValue: ", newValue);
								}
								
								props.setAttributes( { wideDesktopBannerHeight: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
				default: 
					//console.warn(getLogHeader() + "BannerHeightControl, unknown screenWidthType: ", screenWidthType);
					
					return (
					<>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerHeightLabelForMobile}
							value={ props.attributes.mobileBannerHeight }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange mobileBannerHeight newValue: ", newValue);
								}
								
								props.setAttributes( { mobileBannerHeight: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerHeightLabelForTablet}
							value={ props.attributes.tabletBannerHeight }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange tabletBannerHeight newValue: ", newValue);
								}
								
								props.setAttributes( { tabletBannerHeight: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerHeightLabelForDesktop}
							value={ props.attributes.desktopBannerHeight }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange desktopBannerHeight newValue: ", newValue);
								}
								
								props.setAttributes( { desktopBannerHeight: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					<PanelRow className="display--block">
						<SizeUtilities
							type="fsp"
							label={bannerHeightLabelForWideDesktop}
							value={ props.attributes.wideDesktopBannerHeight }
							isCustomFontSizesDisable={ false }
							isResetAllowed={ false }
							onChange={ (newValue) => {							
								if ( props.attributes.isInTestMode ) {
									console.log(getLogHeader() + "SizeUtilities onChange wideDesktopBannerHeight newValue: ", newValue);
								}
								
								props.setAttributes( { wideDesktopBannerHeight: newValue } );
							}}
							miscInfo={{
								blockName: BLOCK_NAME, 
								isInTestMode: props.attributes.isInTestMode
							}}
						/>
					</PanelRow>
					</>
					);
			}
		}
	}
	
	
	const horizontalAlignmentCSSValue = AlignmentType["H"].filter( function(item) {
		return item["code"] == props.attributes.textContentHorizontalAlignment;
	})[0]["slug"];
	
	function getCurrentBannerImageAspectRatio() {
		let currentBannerImageAspectRatio = 0;
		
		if ( props.attributes.bannerImageType == "CI" ) {
			currentBannerImageAspectRatio = parseFloat( previewScreenWidth ) / parseFloat( previewScreenHeight );
		} else if ( props.attributes.bannerImageType == "FH" ) {
			let computedBannerHeight = 0;
			
			switch (screenWidthType) {
				case SCREEN_WIDTH_TYPE_MOBILE:
					computedBannerHeight = cssLengthToPx(props.attributes.mobileBannerHeight);
					break;
				case SCREEN_WIDTH_TYPE_TABLET:
					computedBannerHeight = cssLengthToPx(props.attributes.tabletBannerHeight);
					break;
				case SCREEN_WIDTH_TYPE_DESKTOP:
					computedBannerHeight = cssLengthToPx(props.attributes.desktopBannerHeight);
					break;
				case SCREEN_WIDTH_TYPE_WIDE_DESKTOP:
					computedBannerHeight = cssLengthToPx(props.attributes.wideDesktopBannerHeight);
					break;
				default:
					//console.warn(getLogHeader() + "getCurrentBannerImageAspectRatio() implementation, unknown screenWidthType: ", screenWidthType);
					
					break;
			}
			
			if ( computedBannerHeight > 0 ) {
				currentBannerImageAspectRatio = parseFloat( previewScreenWidth ) / parseFloat( computedBannerHeight );
			} else {
				console.warn(getLogHeader() + "getCurrentBannerImageAspectRatio() implementation, error. computedBannerHeight: ", computedBannerHeight);
				
				currentBannerImageAspectRatio = 0;
			}
		} else {
			console.warn(getLogHeader() + "getCurrentBannerImageAspectRatio() implementation, error. props.attributes.bannerImageType: ", props.attributes.bannerImageType);
			
			currentBannerImageAspectRatio = 0;
		}
		
		return currentBannerImageAspectRatio;
	}
	
	function PreviewBlock() {
		if (props.attributes.bannerImageType == "CI" || props.attributes.bannerImageType == "FH") {
			let firefoxVersionInfoIndex = navigator.userAgent.toLowerCase().indexOf('firefox');
			
			let bannerImageInlineStyleObject = {};
			
			let currentBannerImageAspectRatio = getCurrentBannerImageAspectRatio();
			
			if ( props.attributes.isInTestMode ) {
				console.log( getLogHeader() + "PreviewBlock, currentBannerImageAspectRatio: ", currentBannerImageAspectRatio );
			}
			
			if ( currentBannerImageAspectRatio > 3 ) {
				bannerImageInlineStyleObject["maxWidth"] = "100%";
			} else {
				bannerImageInlineStyleObject["maxWidth"] = "none";
			}
			
			return (
			<>
			<style jsx>
			{getJSXStyleElement(props, {
				textContentTopPostion: textContentTopPostion, 
				horizontalAlignmentCSSValue: horizontalAlignmentCSSValue, 
				textContentTranslateYForMobile: textContentTranslateYForMobile, 
				textContentTranslateYForTablet: textContentTranslateYForTablet,
				textContentTranslateYForDesktop: textContentTranslateYForDesktop, 
				textContentTranslateYForWideDesktop: textContentTranslateYForWideDesktop, 
			})}
			</style>
			<div id={props.attributes.instanceId} className="alb-theme-type-1-banner">
				<div className="alb-theme-type-1-banner__wrapper">
					<picture>
						<source 
							srcset={ props.attributes.wideDesktopLowDPIBannerImageURL + " 1920w, " + props.attributes.wideDesktopBannerImageURL + " 3840w" } 
							media={"(min-width: " + ScreenWidthRef['WIDE_DESKTOP_MIN'] + "px)"}/>
						<source 
							srcset={ props.attributes.desktopLowDPIBannerImageURL + " 1380w, " + props.attributes.desktopBannerImageURL + " 2760w" }  
							media={"(min-width: " + ScreenWidthRef['DESKTOP_MIN'] + "px)"}/>
						<source 
							srcset={ props.attributes.tabletLowDPIBannerImageURL + " 990w,  " + props.attributes.tabletBannerImageURL + " 1980w" }  
							media={"(min-width: " + ScreenWidthRef['TABLET_MIN'] + "px)"}/>
						<img 
							srcset={ props.attributes.mobileLowDPIBannerImageURL + " 640w, " + props.attributes.mobileBannerImageURL + " 1280w"} 
							alt="alb education, alb block theme" 
							className="alb-theme-type-1-banner__image" 
							style = { bannerImageInlineStyleObject }/>
					</picture>
					<div className="alb-theme-type-1-banner__text-content">
						<div className="wrapper">
							<InnerBlocks allowedBlocks={ allowedBlockArray } />
						</div>
					</div>
				</div>
			</div>
			</>
			);
		} else if (props.attributes.bannerImageType == "FI") {
			return (
			<>
			<style jsx>
			{getJSXStyleElement(props, {
				textContentTopPostion: textContentTopPostion, 
				horizontalAlignmentCSSValue: horizontalAlignmentCSSValue, 
				textContentTranslateYForMobile: textContentTranslateYForMobile, 
				textContentTranslateYForTablet: textContentTranslateYForTablet,
				textContentTranslateYForDesktop: textContentTranslateYForDesktop, 
				textContentTranslateYForWideDesktop: textContentTranslateYForWideDesktop, 
			})}
			</style>
			<div id={props.attributes.instanceId} className="alb-theme-type-1-banner">
				<picture>
					<source 
						srcset={ props.attributes.wideDesktopLowDPIBannerImageURL + " 1920w, " + props.attributes.wideDesktopBannerImageURL + " 3840w" } 
						media={"(min-width: " + ScreenWidthRef['WIDE_DESKTOP_MIN'] + "px)"}/>
					<source 
						srcset={ props.attributes.desktopLowDPIBannerImageURL + " 1380w, " + props.attributes.desktopBannerImageURL + " 2760w" }  
						media={"(min-width: " + ScreenWidthRef['DESKTOP_MIN'] + "px)"}/>
					<source 
						srcset={ props.attributes.tabletLowDPIBannerImageURL + " 990w,  " + props.attributes.tabletBannerImageURL + " 1980w" }
						media={"(min-width: " + ScreenWidthRef['TABLET_MIN'] + "px)"}/>
					<img 
						srcset={ props.attributes.mobileLowDPIBannerImageURL + " 640w, " + props.attributes.mobileBannerImageURL + " 1280w"} 
						alt="alb education, alb block theme, custom banner" 
						className="alb-theme-type-1-banner__full-image" />
				</picture>
				<div className="alb-theme-type-1-banner__text-content">
					<div className="wrapper">
						<InnerBlocks allowedBlocks={ allowedBlockArray } />
					</div>
				</div>
			</div>
			</>
			);
		} else {
			var errorMessage;
			
			if (!props.attributes.bannerImageType) {
				errorMessage = __("Please select the banner image type.", "alb-theme-type-1-banner-block-text-domain");
			} else {
				errorMessage = __("Unknown banner image type", "alb-theme-type-1-banner-block-text-domain") + ": " + BannerImageTypeArray.filter( function(item) {
					return item["code"] == props.attributes.bannerImageType;
				})[0]["name"] + ", code: " + props.attributes.bannerImageType;
			}
			
			return <div className="alb-theme-type-1-banner-block-error"><div>{errorMessage}</div></div>
		}
	}
	
	function trySample1() {
		props.setAttributes({ 
			isInTestMode: false, 
			bannerImageType: "CI", 
			mobileBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_MOBILE_IMAGE_FILE_NAME_1, 
			mobileLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_MOBILE_LOW_DPI_IMAGE_FILE_NAME_1, 
			tabletBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_TABLET_IMAGE_FILE_NAME_1, 
			tabletLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_TABLET_LOW_DPI_IMAGE_FILE_NAME_1,  
			desktopBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_DESKTOP_IMAGE_FILE_NAME_1, 
			desktopLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME_1,
			wideDesktopBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_WIDE_DESKTOP_IMAGE_FILE_NAME_1,
			wideDesktopLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_WIDE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME_1,
			mobileBannerImageID: undefined, 
			tabletBannerImageID: undefined, 
			desktopBannerImageID: undefined, 
			wideDesktopBannerImageID: undefined,
			bannerImageOpacity: 0.9, 
			bannerBackgroundColorType: "SOLID", 
			bannerBackgroundColor: "#F4D35E", 
			textContentHorizontalAlignment: "C", 
			textContentVerticalAlignment: "C", 
			textContentHorizontalPositionOffsetForMobile: "0rem", 
			textContentHorizontalPositionOffsetForTablet: "0rem", 
			textContentHorizontalPositionOffsetForDesktop: "0rem", 
			textContentHorizontalPositionOffsetForWideDesktop: "0rem", 
			textContentVerticalPositionOffsetForMobile: "0rem", 
			textContentVerticalPositionOffsetForTablet: "0rem", 
			textContentVerticalPositionOffsetForDesktop: "0rem", 
			textContentVerticalPositionOffsetForWideDesktop: "0rem", 
			mobileBannerHeight: "30rem", 
			tabletBannerHeight: "30rem", 
			desktopBannerHeight: "30rem", 
			wideDesktopBannerHeight: "30rem", 
			mobileBannerImageHorizontalPosition: "0rem", 
			tabletBannerImageHorizontalPosition: "0rem",
			desktopBannerImageHorizontalPosition: "0rem",  
			wideDesktopBannerImageHorizontalPosition: "0rem", 
			mobileBannerImageVerticalPosition: "0rem",
			tabletBannerImageVerticalPosition: "0rem", 
			desktopBannerImageVerticalPosition: "0rem",  
			wideDesktopBannerImageVerticalPosition: "0rem", 
			bottomBorderStyle: "solid", 
			bottomBorderColor: "#0d3b66", 
			mobileBottomBorderWidth: "0.75rem", 
			tabletBottomBorderWidth: "0.75rem", 
			desktopBottomBorderWidth: "0.75rem", 
			wideDesktopBottomBorderWidth: "0.75rem", 
		});
	}
	
	function trySample2() {
		props.setAttributes({ 
			isInTestMode: false, 
			bannerImageType: "FI", 
			mobileBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_MOBILE_IMAGE_FILE_NAME_2, 
			mobileLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_MOBILE_LOW_DPI_IMAGE_FILE_NAME_2, 
			tabletBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_TABLET_IMAGE_FILE_NAME_2, 
			tabletLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_TABLET_LOW_DPI_IMAGE_FILE_NAME_2,  
			desktopBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_DESKTOP_IMAGE_FILE_NAME_2, 
			desktopLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME_2,
			wideDesktopBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_WIDE_DESKTOP_IMAGE_FILE_NAME_2,
			wideDesktopLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + SAMPLE_WIDE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME_2,
			mobileBannerImageID: undefined, 
			tabletBannerImageID: undefined, 
			desktopBannerImageID: undefined, 
			wideDesktopBannerImageID: undefined,
			bannerImageOpacity: 1, 
			bannerBackgroundColorType: "SOLID", 
			bannerBackgroundColor: "#F4D35E00", 
			textContentHorizontalAlignment: "C", 
			textContentVerticalAlignment: "C", 
			textContentHorizontalPositionOffsetForMobile: "0rem", 
			textContentHorizontalPositionOffsetForTablet: "0rem", 
			textContentHorizontalPositionOffsetForDesktop: "0rem", 
			textContentHorizontalPositionOffsetForWideDesktop: "0rem", 
			textContentVerticalPositionOffsetForMobile: "0rem", 
			textContentVerticalPositionOffsetForTablet: "0rem", 
			textContentVerticalPositionOffsetForDesktop: "0rem", 
			textContentVerticalPositionOffsetForWideDesktop: "0rem", 
			mobileBannerHeight: "30rem", 
			tabletBannerHeight: "30rem", 
			desktopBannerHeight: "30rem", 
			wideDesktopBannerHeight: "30rem", 
			mobileBannerImageHorizontalPosition: "0rem", 
			tabletBannerImageHorizontalPosition: "0rem",
			desktopBannerImageHorizontalPosition: "0rem",  
			wideDesktopBannerImageHorizontalPosition: "0rem", 
			mobileBannerImageVerticalPosition: "0rem",
			tabletBannerImageVerticalPosition: "0rem", 
			desktopBannerImageVerticalPosition: "0rem",  
			wideDesktopBannerImageVerticalPosition: "0rem", 
			bottomBorderStyle: "none", 
			bottomBorderColor: "#0d3b66", 
			mobileBottomBorderWidth: "0.75rem", 
			tabletBottomBorderWidth: "0.75rem", 
			desktopBottomBorderWidth: "0.75rem", 
			wideDesktopBottomBorderWidth: "0.75rem", 
		});
	}
	
	function reset() {
		props.setAttributes({ 
			isInTestMode: false, 
			bannerImageType: "FI", 
			mobileBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_MOBILE_IMAGE_FILE_NAME, 
			mobileLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_MOBILE_LOW_DPI_IMAGE_FILE_NAME, 
			tabletBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_TABLET_IMAGE_FILE_NAME, 
			tabletLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_TABLET_LOW_DPI_IMAGE_FILE_NAME,  
			desktopBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_DESKTOP_IMAGE_FILE_NAME, 
			desktopLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_DESKTOP_LOW_DPI_IMAGE_FILE_NAME,
			wideDesktopBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_WIDE_DESKTOP_IMAGE_FILE_NAME,
			wideDesktopLowDPIBannerImageURL: ALBThemeType1BannerBlockScriptData.fallbackImagePath + FALLBACK_WIDE_DESKTOP_LOW_DPI_IMAGE_FILE_NAME,
			mobileBannerImageID: undefined, 
			tabletBannerImageID: undefined, 
			desktopBannerImageID: undefined, 
			wideDesktopBannerImageID: undefined,
			bannerImageOpacity: 0.99, 
			bannerBackgroundColorType: "SOLID", 
			bannerBackgroundColor: "#000", 
			textContentHorizontalAlignment: "C", 
			textContentVerticalAlignment: "C", 
			textContentHorizontalPositionOffsetForMobile: "0rem", 
			textContentHorizontalPositionOffsetForTablet: "0rem", 
			textContentHorizontalPositionOffsetForDesktop: "0rem", 
			textContentHorizontalPositionOffsetForWideDesktop: "0rem", 
			textContentVerticalPositionOffsetForMobile: "0rem", 
			textContentVerticalPositionOffsetForTablet: "0rem", 
			textContentVerticalPositionOffsetForDesktop: "0rem", 
			textContentVerticalPositionOffsetForWideDesktop: "0rem", 
			mobileBannerHeight: "40rem", 
			tabletBannerHeight: "40rem", 
			desktopBannerHeight: "40rem", 
			wideDesktopBannerHeight: "40rem", 
			mobileBannerImageHorizontalPosition: "0rem", 
			tabletBannerImageHorizontalPosition: "0rem",
			desktopBannerImageHorizontalPosition: "0rem",  
			wideDesktopBannerImageHorizontalPosition: "0rem", 
			mobileBannerImageVerticalPosition: "0rem",
			tabletBannerImageVerticalPosition: "0rem", 
			desktopBannerImageVerticalPosition: "0rem",  
			wideDesktopBannerImageVerticalPosition: "0rem", 
			bottomBorderStyle: "solid", 
			bottomBorderColor: "#0d3b66", 
			mobileBottomBorderWidth: "0.75rem", 
			tabletBottomBorderWidth: "0.75rem", 
			desktopBottomBorderWidth: "0.75rem", 
			wideDesktopBottomBorderWidth: "0.75rem", 
		});
	}
	
	const inlineStyleObject = {};
	
	if ( props.attributes.removeTopSpace ) {
		inlineStyleObject["marginTop"] = 0;
	}
	
	if ( props.attributes.removeBottomSpace ) {
		inlineStyleObject["marginBottom"] = 0;
	}
	
	if (!props.attributes.bannerImageType) {
		return (
		<div {...blockProps}>
			<InspectorControls>	
				<PanelBody title={__("Basic Settings", "alb-theme-type-1-banner-block-text-domain")} initialOpen={true}>
					<PanelRow className="add-margin-bottom">
						{BannerImageTypeDropdownList()}
					</PanelRow>
				</PanelBody>	
			</InspectorControls>
			{PreviewBlock()}
		</div>
		);
	} else {
		return (
		<>
		<div {...blockProps} style={inlineStyleObject}>
			<PreviewWindowSizeMonitor 
				onUpdate={ (previewScreenParameters) => {
					if (props.attributes.isInTestMode) {
						console.log(getLogHeader() + "PreviewWindowSizeMonitor onUpdate previewScreenParameters[\"width\"]: ", previewScreenParameters["width"]);
						console.log(getLogHeader() + "PreviewWindowSizeMonitor onUpdate previewScreenParameters[\"height\"]: ", previewScreenParameters["height"]);
						console.log(getLogHeader() + "PreviewWindowSizeMonitor onUpdate previewScreenParameters[\"screenWidthType\"]: ", previewScreenParameters["screenWidthType"]);
					}
					
					setPreviewScreenWidth( previewScreenParameters["width"] );
					setreviewScreenHeight( previewScreenParameters["height"] );
					setScreenWidthType(previewScreenParameters["screenWidthType"]);
				}} 
				miscInfo={{
					blockName: BLOCK_NAME, 
					isInTestMode: props.attributes.isInTestMode
				}}
			/>
			
			<BlockControls>
				{isWordPressTheme && ( <ToolbarGroup>
					<ToolbarButton title={__("CLick here to try keeping / removing the top margin of the block.", "alb-theme-type-1-banner-block-text-domain")} isPressed={ props.attributes.removeTopSpace } onClick={ () => props.setAttributes( {removeTopSpace: !props.attributes.removeTopSpace} ) } >
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 89 74">
							<path d="M 0 0 L 89 0 L 89 8 L 0 8 L 0 0 M 19 9 L 37 27 L 24 24 L 24 65 L 14 65 L 14 24 L 2 27 L 19 9 M 0 66 L 89 66 L 89 74 L 0 74 L 0 66 M 58 26 C 70 27 71 55 58 56 V 64 C 84 64 84 17 58 17 C 33 17 33 64 58 64 V 56 C 45 54 45 27 58 26"/>
						</svg>
					</ToolbarButton>
					<ToolbarButton title={__("CLick here to try keeping / removing the bottom margin of the block.", "alb-theme-type-1-banner-block-text-domain")} isPressed={ props.attributes.removeBottomSpace } onClick={ () => props.setAttributes( {removeBottomSpace: !props.attributes.removeBottomSpace} ) } >
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 89 74">
							<path d="M 0 0 L 89 0 L 89 8 L 0 8 L 0 0 M 19 66 L 37 47 L 24 50 L 24 9 L 14 9 L 14 50 L 2 47 L 19 66 M 0 66 L 89 66 L 89 74 L 0 74 L 0 66 M 58 26 C 70 27 71 55 58 56 V 64 C 84 64 84 17 58 17 C 33 17 33 64 58 64 V 56 C 45 54 45 27 58 26"/>
						</svg>
					</ToolbarButton>
				</ToolbarGroup>
				)}
				{( ALBThemeType1BannerBlockScriptData.themeName == THEME_NAME_2023 ) && ( <ToolbarGroup>
					<ToolbarButton title={__("CLick here to try keeping / removing the top padding of the page.", "alb-theme-type-1-banner-block-text-domain")} isPressed={ props.attributes.forceRemoveTopPaddingOfRootContainer } onClick={ () => props.setAttributes( {forceRemoveTopPaddingOfRootContainer: !props.attributes.forceRemoveTopPaddingOfRootContainer} ) } >
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 89 74">
							<path d="M 0 0 L 89 0 L 89 8 L 0 8 L 0 0 M 19 9 L 37 27 L 24 24 L 24 65 L 14 65 L 14 24 L 2 27 L 19 9 M 58 26 C 70 27 71 55 58 56 V 64 C 84 64 84 17 58 17 C 33 17 33 64 58 64 V 56 C 45 54 45 27 58 26"/>
						</svg>
					</ToolbarButton>
				</ToolbarGroup>
				)}
				<ToolbarGroup>
					<ToolbarButton isPressed={ props.attributes.isInTestMode } onClick={ () => props.setAttributes( {isInTestMode: !props.attributes.isInTestMode} ) } >
						{__("Debug", "alb-theme-type-1-banner-block-text-domain")}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			
			<InspectorControls>			
				<PanelBody title={__("Basic Settings", "alb-theme-type-1-banner-block")} initialOpen={true}>
					<PanelRow>
						<Button variant="secondary" className="add-margin-bottom full-width" onClick={ trySample1 } style={{height: "auto"}}><p className="alb-theme-block-label-wrapper">{__("Try Sample 1", "alb-theme-type-1-banner-block-text-domain")}</p></Button>
					</PanelRow>
					<PanelRow>
						<Button variant="secondary" className="add-margin-bottom full-width" onClick={ trySample2 } style={{height: "auto"}}><p className="alb-theme-block-label-wrapper">{__("Try Sample 2", "alb-theme-type-1-banner-block-text-domain")}</p></Button>
					</PanelRow>
					<PanelRow className="display--block add-margin-bottom">
						{BannerImageTypeDropdownList()}
					</PanelRow>
					<PanelRow className="add-margin-bottom">
						<div className="full-width">
							{ImageUploadButtons()}
						</div>
					</PanelRow>
					
					{BannerHeightControl()}
					
					<PanelRow className="display--block add-margin-bottom">
						{TextContentHorizontalAlignmentControl()}
					</PanelRow>
					<PanelRow className="display--block add-margin-bottom">
						{TextContentVerticalAlignmentControl()}
					</PanelRow>
					<PanelRow className="display--block add-margin-bottom">
						{BannerBottomBorderStyleDropdown()}
					</PanelRow>
					
					{BannerBottomBorderColorControlBannerRow()}
					{BannerBottomBorderWidthControl()}
				</PanelBody>
				
				<PanelBody title={__("More Options", "alb-theme-type-1-banner-block-text-domain")} initialOpen={props.attributes.isInTestMode ? true: false}>
					<PanelRow className="add-margin-bottom">
						{BannerBackgroundColorControl()}
					</PanelRow>
					<PanelRow className="display--block add-margin-bottom">
						{BannerImageOpacityControl()}
					</PanelRow>
					{BannerTextContentPositionControl()}
					{BannerImagePositionControl()}
					
					<PanelRow>
						<Button variant="primary" className="add-margin-bottom full-width" onClick={ reset }>{__("Reset", "alb-theme-type-1-banner-block-text-domain")}</Button>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			
			{PreviewBlock()}
		</div>
		</>
		);
	}
}