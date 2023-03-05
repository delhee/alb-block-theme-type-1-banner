import { Button, ColorPalette, FontSizePicker, Dropdown, ColorIndicator, Flex, FlexItem, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, GradientPicker, RangeControl } from "@wordpress/components";
import { useState, useEffect } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"; 
import apiFetch from "@wordpress/api-fetch";
import { ScreenWidthRef, WPDOMSelectors, AssetInfo } from "./constants.js";
import debounce from "lodash/debounce";

const __ = wp.i18n.__

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

const predefinedGradient = [
	{
		name: 'JShine',
		gradient: 'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
		slug: 'jshine',
	},
	{
		name: 'Moonlit Asteroid',
		gradient: 'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
		slug: 'moonlit-asteroid',
	},
	{
		name: 'Rastafarie',
		gradient: 'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
		slug: 'rastafari',
	},
	{
		name: 'Predefined Blue',
		gradient: 'linear-gradient(#12518d, #0D3B66)',
		slug: 'predefined-blue',
	},
	{
		name: 'Predefined Yellow',
		gradient: 'linear-gradient(#F4D35E, #f0bb00)',
		slug: 'predefined-yellow',
	},
	{
		name: 'Predefined Dark Orange',
		gradient: 'linear-gradient(#F95738, #c62000)',
		slug: 'predefined-dark-orange',
	},
	{
		name: 'Predefined Orange',
		gradient: 'linear-gradient(#EE964B, #eb6c00)',
		slug: 'predefined-orange',
	},
]

const predefinedColors = [
  { name: __( "White", "alb-theme-type-1-banner-block-text-domain" ), slug: "white", color: "#FFF" }, 
  { name: __( "Blue", "alb-theme-type-1-banner-block-text-domain" ), slug: "blue", color: "#0d3b66" },
  { name: __( "Orange", "alb-theme-type-1-banner-block-text-domain" ), slug: "orange", color: "#ee964b" },
  { name: __( "Dark Orange", "alb-theme-type-1-banner-block-text-domain" ), slug: "dark-orange", color: "#f95738" }, 
  { name: __( "Yellow", "alb-theme-type-1-banner-block-text-domain" ), slug: "yellow", color: "#F4D35E" }, 
  { name: __( "Black", "alb-theme-type-1-banner-block-text-domain" ), slug: "black", color: "#000" }, 
]

const ColorType = {
	SOLID: { name: "Solid" }, 
	GRADIENT: { name: "Gradient" }
};

	
export function ColorUtilities(props) {
	if ( props.miscInfo.isInTestMode ) {
		console.log("@" + props.miscInfo.blockName + ", @ColorUtilities implementation, props: ", props);
	}
	
	const [tempColorType, setTempColorType] = useState( props.colorType );
	
	function getColorTypeToggleControl() {
		//return (
		//	<>
		//	<ToggleGroupControl 
		//		value={ props.attributes[targetAttributeName] } 
		//		onChange={ newValue => {
		//			console.log(this.getLogHeader() + "getColorTypeToggleControl onChange newValue: ", newValue);
		//			
		//			const newAttributeValue = {};
		//			
		//			newAttributeValue[targetAttributeName] = newValue;					
		//			
		//			props.setAttributes( newAttributeValue ) 
		//		}} 
		//		isBlock>
		//		<ToggleGroupControlOption value="SOLID" label={ __(ColorType["SOLID"]) } />
		//		<ToggleGroupControlOption value="GRADIENT" label={ __(ColorType["GRADIENT"]) } />
		//	</ToggleGroupControl>
		//	</>
		//);		
		
		return (
			<>
			<Flex className="margin-bottom-half-rem">
				<FlexItem isBlock>
					<Button 
						className="full-width"
						variant="secondary"
						isPressed={ tempColorType == "SOLID" } 
						onClick={ () => {
							setTempColorType( "SOLID" );
						}} 
					>
						{ColorType["SOLID"]["name"]}
					</Button>
				</FlexItem>
				<FlexItem isBlock>
					<Button 
						className="full-width"
						variant="secondary"
						isPressed={ tempColorType == "GRADIENT" } 
						onClick={ () => {
							setTempColorType( "GRADIENT" );
						}} 
					>
						{ColorType["GRADIENT"]["name"]}
					</Button>
				</FlexItem>
			</Flex>
			</>
		);
	}	
	
	function getColorPalette() {
		return (
			<>
			<ColorPalette 
				disableCustomColors={false} 
				clearable={true} 
				colors={predefinedColors} 
				value={ props.color } 
				enableAlpha={true}
				onChange={ newValue => {
					props.onChange("SOLID", newValue);
				}} 
			/>
			</>
		);
	}
	
	function getGradientPick() {
		return (
			<>
			<GradientPicker
				gradients={ predefinedGradient }
				value={ props.color }
				onChange={ newValue => { 
					props.onChange("GRADIENT", newValue);
				}}
			/>
			</>
		);
	}
	
	function getColorControlDropdownRenderContent() {
		//<Toolbar className="full-width margin-bottom-quarter-rem" label="Color Options">
		//	<ToolbarButton isPressed={true} className="half-width">Solid</ToolbarButton>
		//	<ToolbarButton isPressed={false} className="half-width">Gradient</ToolbarButton>
		//</Toolbar>
		
		if ( tempColorType ) {
			if ( tempColorType == "SOLID") {
				return [ getColorTypeToggleControl(), getColorPalette()];
			} else {
				return [ getColorTypeToggleControl(), getGradientPick()];
			}
		} else {
			return getColorPalette();
		}
	}
	
	function getColorControlDropdownRenderToggle( {isOpen, onToggle} ) {		
		return (
			<Button className="alb-theme-color-util-dropdown-toggle" variant="secondary" onClick={ onToggle } aria-expanded={ isOpen } >
				<Flex expanded={ true } justify={"left"} gap={0}>
					<FlexItem style={{height: "20px"}}>
						<ColorIndicator colorValue={props.color} />
					</FlexItem>
					<FlexItem>
						<p style={{marginLeft: "0.5rem", width: "12.5rem"}} className="alb-theme-block-label-wrapper">{props.label}</p>
					</FlexItem>
				</Flex>
			</Button>
		);
	}
	
	return (
		<>
		<Dropdown 
			className="full-width" 
			contentClassName={WPDOMSelectors["COLOR_UTIL_DROPDOWN__CONTENT"]}
			position="top right"
			renderToggle={ getColorControlDropdownRenderToggle } 
			renderContent={ getColorControlDropdownRenderContent }
		/>
		</>
	);
}


export function SizeUtilities(props) {
	const logHeader = "@" + props.miscInfo.blockName + ", @SizeUtilities implementation, ";
	
	if ( props.miscInfo.isInTestMode ) {
		console.log(logHeader + "props: ", props);
	}
	
	function getRangeControlComponent() {
		var componentValue = props.value;
		
		if ( typeof(componentValue) == "string" ) {
			if (props.rangeControlComponentUnit) { 
				const attributeValueParts = componentValue ? componentValue.split( /(\d+(?:\.\d+)?)/ ) : ["0", "0", props.rangeControlComponentUnit];
			
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader + "attributeValueParts: ", attributeValueParts);
				}
				
				componentValue = (attributeValueParts[2] == props.rangeControlComponentUnit) ?  Number(attributeValueParts[1]) : 0;
			} else {
				componentValue = Number(props.value);
			}
		}
		
		if (props.miscInfo.isInTestMode) {
			console.log(logHeader + "componentValue: ", componentValue);
		}
		
		return (
			<>
			<div>
			<RangeControl
				label={ props.label }
				className="range-control-full-width"
				allowReset={ false }
				value={ componentValue }
				onChange={ newValue => {
					if (props.miscInfo.isInTestMode) {
						console.log(logHeader + "RangeControl onChange newValue: ", newValue);
						console.log(logHeader + "RangeControl onChange props.rangeControlComponentUnit: ", props.rangeControlComponentUnit);
					}
										
					if ( props.rangeControlComponentUnit ) {
						props.onChange(newValue + props.rangeControlComponentUnit);
					} else {
						props.onChange(newValue);
					}
					
					//props.onChange(newValue);
				}}
				min={ props.min }
				max={ props.max }
				step={ props.step }
				withInputField={false}
				disabled={ false }
				renderTooltipContent={ value => {
					if (props.rangeControlComponentUnit) {
						return `${value}${props.rangeControlComponentUnit}`;
					}
					
					return `${value}`;
				}}
				/>
			</div>
			</>
		);
	}
	
	function getFontSizeControlComponent() {
		const isCustomFontSizesDisable = false;
		const isResetAllowed = true;
		
		return(
		<>
		<div className="alb-theme-size-control">
			<div>
			<Flex>
				<FlexItem isBlock={true}>
					{props.label}
					<FontSizePicker 
						value={ props.value ? props.value : "0rem" }
						fontSizes={ props.predefinedFontSizeArray }
						disableCustomFontSizes={ props.isCustomFontSizesDisable }
						step={0.0001}
						withReset={ props.isResetAllowed }
						onChange={ newValue => {
							if (props.miscInfo.isInTestMode) {
								console.log(logHeader + "FontSizePicker onChange newValue: ", newValue);
							}
							
							if( typeof(newValue) == "number" ) {
								props.onChange(newValue + "");
							} else {
								props.onChange(newValue);
							}
						}}
						/>
				</FlexItem>
			</Flex>
			</div>
		</div>
		</>
		);
	}
	
	if(props.type) {
		switch(props.type) {
			case "rc":
				return getRangeControlComponent();
			case "fsp": 
				return getFontSizeControlComponent();
			default:
				return [getRangeControlComponent(), getFontSizeControlComponent()];
		}
	} else {
		return [getRangeControlComponent(), getFontSizeControlComponent()];
	}
}

const SCREEN_WIDTH_TYPE_MOBILE       = "MOBILE";
const SCREEN_WIDTH_TYPE_TABLET       = "TABLET";
const SCREEN_WIDTH_TYPE_DESKTOP      = "DESKTOP";
const SCREEN_WIDTH_TYPE_WIDE_DESKTOP = "WIDE_DESKTOP";
const PREVIEW_DEVICE_MOBILE = "Mobile";
const PREVIEW_DEVICE_TABLET = "Tablet";
const PREVIEW_MODE_DESKTOP = "Desktop";
const POST_TYPE_WP_TEMPLATE = "wp_template";

function getPreviewDeviceType(currentPostType) {
	let previewDeviceType = undefined;
	
	//console.log("currentPostType: ", currentPostType);
	
	if ( currentPostType == POST_TYPE_WP_TEMPLATE ) {
		if ( wp.data.select("core/edit-post").__experimentalGetPreviewDeviceType ) {
			previewDeviceType = wp.data.select("core/edit-site").__experimentalGetPreviewDeviceType();
		}
	} else {
		if ( wp.data.select("core/edit-post").__experimentalGetPreviewDeviceType ) {
			previewDeviceType = wp.data.select("core/edit-post").__experimentalGetPreviewDeviceType();
		}
	}
	
	//console.log("previewDeviceType: ", previewDeviceType);
	
	return previewDeviceType;
}

function getScreenTypeByWidth(width) {
	if (width < ScreenWidthRef['TABLET_MIN']) {
		return SCREEN_WIDTH_TYPE_MOBILE;
	} else if (width < ScreenWidthRef['DESKTOP_MIN'] ) {
		return SCREEN_WIDTH_TYPE_TABLET;
	} else if (width < ScreenWidthRef['WIDE_DESKTOP_MIN'] ) {
		return SCREEN_WIDTH_TYPE_DESKTOP;
	} else {
		return SCREEN_WIDTH_TYPE_WIDE_DESKTOP;
	}
}

function getCurrentPostType() {
	let currentPostType = wp.data.select("core/editor").getCurrentPostType();
	
	if ( !currentPostType ) {
		currentPostType = wp.data.select("core/edit-site").getEditedPostType();
	}
	
	return currentPostType;
}

function _getPreviewWindow(currentPostType) {
	let previewWindow = undefined;
	
	if ( currentPostType == POST_TYPE_WP_TEMPLATE ) {
		let previewScreenFrame = document.querySelector(WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"]);
		
		if ( previewScreenFrame ) {
			previewWindow = previewScreenFrame.contentWindow;
		}
	} else {
		previewWindow = window;
	}
	
	return previewWindow;
}

export function getPreviewWindow() {
	return _getPreviewWindow(getCurrentPostType());
}

function getPreviewScreenParameters(currentPostType, currentPreviewDeviceType) {
	let previewScreenParameters = {};
	
	if ( currentPreviewDeviceType == PREVIEW_DEVICE_MOBILE ) {
			previewScreenParameters["width"] = parseFloat(ScreenWidthRef["WP_MOBILE"]);
			previewScreenParameters["height"] = parseFloat("768px");
			previewScreenParameters["screenWidthType"] = SCREEN_WIDTH_TYPE_MOBILE;
		} else if ( currentPreviewDeviceType == PREVIEW_DEVICE_TABLET ) {
			previewScreenParameters["width"] = parseFloat(ScreenWidthRef["WP_TABLET"]);
			previewScreenParameters["height"] = parseFloat("1024px");
			previewScreenParameters["screenWidthType"] = SCREEN_WIDTH_TYPE_TABLET;
		} else if ( currentPreviewDeviceType == PREVIEW_MODE_DESKTOP ) {
			let previewWindow = _getPreviewWindow(currentPostType);
			
			if ( previewWindow ) {
				let previewScreenWidth = parseFloat(previewWindow.innerWidth);
					
				previewScreenParameters["width"] = previewScreenWidth;
				previewScreenParameters["height"] = parseFloat(previewWindow.innerHeight);
				previewScreenParameters["screenWidthType"] = getScreenTypeByWidth(previewScreenWidth);
			}
		}
	
	//console.log("previewScreenFrame: ", previewScreenFrame);
	//console.log("previewScreenParameters: ", previewScreenParameters);	
	
	return previewScreenParameters;
}

export function PreviewWindowSizeMonitor(props) {
	const logHeader = function() {
		return Date().toLocaleString() + " " + "@" + props.miscInfo.blockName + ", @PreviewWindowSizeMonitor implementation, ";
	}
	
	const [currentPostType, setCurrentPostType] = useState( "" );
	const [currentPreviewDeviceType, setCurrentPreviewDeviceType] = useState( "" );
	const [currentPreviewScreenWidth, setCurrentPreviewScreenWidth] = useState( 0 );
			
	useEffect(function() {
		if (props.miscInfo.isInTestMode) {
			console.log(logHeader() + "useEffect(..., [currentPreviewDeviceType, ...]) fired");
		}
		
		let currentPostType = getCurrentPostType();
		
		if (props.miscInfo.isInTestMode) {
			console.log(logHeader() + "currentPostType: ", currentPostType);
		}
		
		const debounceOnWindowResize = debounce ( e => {
			if (props.miscInfo.isInTestMode) {
				console.log(logHeader() + "debounceOnWindowResize fired");
			}
			
			props.onUpdate(getPreviewScreenParameters(currentPostType, currentPreviewDeviceType));
		}, 333);
		
		if ( currentPostType ) {
			setCurrentPreviewDeviceType(getPreviewDeviceType(currentPostType));
			
			if (props.miscInfo.isInTestMode) {
				console.log(logHeader() + "currentPreviewDeviceType: ", currentPreviewDeviceType);
			}
				
			if ( currentPreviewDeviceType == PREVIEW_MODE_DESKTOP ) { 
				let currentPreviewScreenParameters = getPreviewScreenParameters(currentPostType, currentPreviewDeviceType);
				
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader() + "currentPreviewScreenParameters: ", currentPreviewScreenParameters);
					console.log(logHeader() + "currentPreviewScreenParameters[\"width\"]: ", currentPreviewScreenParameters["width"]);
				}
				
				setCurrentPreviewScreenWidth( parseFloat( currentPreviewScreenParameters["width"] ) );
				
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader() + "window.addEventListener(\"resize\", ...) ready");
				}
				
				window.addEventListener("resize", debounceOnWindowResize);//, true);
				
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader() + "window.addEventListener(\"resize\", ...) done");
				}
			}
		} else {
			console.warn(logHeader() + "Unable to get newPreviewDeviceType. ");
		}
		
		const functionUnsubscribeWPData = wp.data.subscribe(() => {
			//console.log("wp.data.subscribe, isInTestMode: ", props.miscInfo.isInTestMode);
			
			let newPreviewDeviceType = getPreviewDeviceType(currentPostType);
			
			if (props.miscInfo.isInTestMode) {
				console.log(logHeader() + "wp.data.subscribe, currentPreviewDeviceType: ", currentPreviewDeviceType);
				console.log(logHeader() + "wp.data.subscribe, newPreviewDeviceType: ", newPreviewDeviceType);
			}
			
			if ( newPreviewDeviceType ) {
				if ( currentPreviewDeviceType == PREVIEW_MODE_DESKTOP ) {
					if ( newPreviewDeviceType == PREVIEW_DEVICE_MOBILE || newPreviewDeviceType == PREVIEW_DEVICE_TABLET ) {
						//console.log(logHeader() + "wp.data.subscribe, currentPreviewDeviceType: ", currentPreviewDeviceType);
						//console.log(logHeader() + "wp.data.subscribe, newPreviewDeviceType: ", newPreviewDeviceType);
						
						setCurrentPreviewDeviceType(newPreviewDeviceType);
					} else if ( newPreviewDeviceType == PREVIEW_MODE_DESKTOP ) {
						if (props.miscInfo.isInTestMode) {
							console.log(logHeader() + "wp.data.subscribe, currentPostType: ", currentPostType);
							console.log(logHeader() + "wp.data.subscribe, newPreviewDeviceType: ", newPreviewDeviceType);
						}
						
						let newPreviewScreenParameters = getPreviewScreenParameters(currentPostType, newPreviewDeviceType);
						
						if (props.miscInfo.isInTestMode) {
							console.log(logHeader() + "wp.data.subscribe, newPreviewScreenParameters: ", newPreviewScreenParameters);
							console.log(logHeader() + "wp.data.subscribe, newPreviewScreenParameters[\"width\"]: ", newPreviewScreenParameters["width"]);
							console.log(logHeader() + "wp.data.subscribe, currentPreviewScreenWidth: ", currentPreviewScreenWidth);
						}
						
						if ( newPreviewScreenParameters["width"] != currentPreviewScreenWidth ) {
							setCurrentPreviewScreenWidth( parseFloat( newPreviewScreenParameters["width"] ) );
							
							if (props.miscInfo.isInTestMode) {
								console.log(logHeader() + "wp.data.subscribe, ready to execute onUpdate");
							}
							
							props.onUpdate(newPreviewScreenParameters);
						}
					}
				} else {
					if ( newPreviewDeviceType != currentPreviewDeviceType ) {
						setCurrentPreviewDeviceType(newPreviewDeviceType);
					}
				}
			} else {
				console.warn(logHeader() + "wp.data.subscribe, Unable to get newPreviewDeviceType. ");
			}
		});
		
		//if ( currentPostType && currentPreviewDeviceType && currentPreviewScreenWidth > 0 ) {
			if (props.miscInfo.isInTestMode) {
				console.log(logHeader() + "useEffect(..., [currentPreviewDeviceType, ...]), ready to execute onUpdate");
			}
			
			props.onUpdate(getPreviewScreenParameters(currentPostType, currentPreviewDeviceType));
		//} else {
		//	console.warn(logHeader() + "useEffect(..., [currentPreviewDeviceType, ...]), unable to execute onUpdate(), currentPostType: ", currentPostType, "currentPreviewDeviceType: ", currentPreviewDeviceType, "currentPreviewScreenWidth: ", currentPreviewScreenWidth);
		//}
		
		return () => {
			if (props.miscInfo.isInTestMode) {
				console.log(logHeader() + "useEffect(..., [currentPreviewDeviceType, ...]) returned");
				console.log(logHeader() + "return, currentPreviewDeviceType: ", currentPreviewDeviceType);
			}
			
			if ( currentPreviewDeviceType == PREVIEW_MODE_DESKTOP ) {
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader() + "window.removeEventListener(\"resize\", ...) ready");
				}
				
				if ( debounce.cancel ) {
					//https://stackoverflow.com/questions/61779470/cleaning-up-lodash-debounce-function-in-react-useeffect-hook
					debounce.cancel();
				} else {
					debounceOnWindowResize.cancel();
				}
				
				window.removeEventListener("resize", debounceOnWindowResize);//, true);
				
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader() + "window.removeEventListener(\"resize\", ...) done");
				}
			}
			
			functionUnsubscribeWPData();
		}
	}, [currentPreviewDeviceType, currentPreviewScreenWidth, props.miscInfo.isInTestMode]);
	
	
	
	return (<></>);
}

export function ImageUploadUtilities(props) {
	const STR_SIZE_NAME_INTACT = "intact";
	const logHeader = Date() + " @" + props.miscInfo.blockName + ", @ImageUploadUtilities implementation, ";
	const [tempImageId, setTempImageId] = useState(props.imageId);
	const [imageData, setImageData] = useState({});
	const [imageDataVersion, setImageDataVersion] = useState({});
	
	useEffect(function() {
		if (props.miscInfo.isInTestMode) {
			console.log(logHeader + "imageData updated. imageData: ", imageData, "imageDataVersion: ", imageDataVersion);
		}
		
		var isImageURLFetchComplete = true;
		
		for (var i = 0; i < props.sizes.length; i++) {
		//props.sizes.map( (requestedImageSize) => {
			if(!imageData[props.sizes[i]] || !imageData[props.sizes[i]].responseCode) {
				isImageURLFetchComplete = false;
				break;
			}
		}
		
		if(!imageData[STR_SIZE_NAME_INTACT] || !imageData[STR_SIZE_NAME_INTACT].responseCode) {
			isImageURLFetchComplete = false;
		}
		
		if (isImageURLFetchComplete) {
			props.onFinish(imageData);
		}
	}, [imageDataVersion]);
	
	useEffect(function() {
		if (props.miscInfo.isInTestMode) {
			console.log(logHeader + "tempImageId: ", tempImageId);
		}
		
		if (tempImageId) {
			const tempImageDataObject = {};
			tempImageDataObject["imageId"] = tempImageId;
			
			setImageData(tempImageDataObject);
			
			apiFetch({
				path: `/wp/v2/media/${tempImageId}`,
				method: "GET"
			}).then( (response0) => {
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader + "Success. imageId fetch response: ", response0);
					console.log(logHeader + "Ready to obtain requested URLs. Requested image sizes (i.e. props.sizes): ", props.sizes);
				}
				
				props.sizes.map( (requestedImageSize) => {
					if (props.miscInfo.isInTestMode) {
						console.log(logHeader + "Ready to obtain the URL of requestedImageSize: " + requestedImageSize);
					}
					
					tempImageDataObject[requestedImageSize] = {}
					
					if (response0.media_details.sizes[requestedImageSize] ) {
						const requestedImageURL = response0.media_details.sizes[requestedImageSize].source_url;
						
						if (props.miscInfo.isInTestMode) {
							console.log(logHeader + "requestedImageURL[" + requestedImageSize + "]: " + requestedImageURL);
						}
						
						
						if (requestedImageURL) {
							fetch(requestedImageURL).then( response => {
								if (response) {
									if (response.status !== 200) {
										console.error(logHeader + "Error fetching URL of " + requestedImageSize + ". Error message: ", response);
										
										tempImageDataObject[requestedImageSize].url = undefined;
										tempImageDataObject[requestedImageSize].errorMessage = response;
										tempImageDataObject[requestedImageSize].responseCode = "E";
									} else {
										if (props.miscInfo.isInTestMode) {
											console.log(logHeader + "URL of image size[" + requestedImageSize + "] is valid. ");
											//response.blob();
										}
										
										tempImageDataObject[requestedImageSize].url = requestedImageURL;
										tempImageDataObject[requestedImageSize]["errorMessage"] = response;
										tempImageDataObject[requestedImageSize]["responseCode"] = "S";
									}
									
									setImageData(tempImageDataObject);
									setImageDataVersion(requestedImageSize + "-" + Date.now());
								}
							});
						} else {
							const errorMessage = "Error fetching URL of " + requestedImageSize + ". requestedImageURL (" + requestedImageURL + ") does not exist. ";
							console.error(logHeader + errorMessage);
							
							tempImageDataObject[requestedImageSize].url = undefined;
							tempImageDataObject[requestedImageSize].errorMessage = response;
							tempImageDataObject[requestedImageSize].responseCode = "E";
							
							setImageData(tempImageDataObject);
							setImageDataVersion(requestedImageSize + "-" + Date.now());
						}
					} else {
						const errorMessage = "Error fetching URL of " + requestedImageSize + ". requestedImageSize (" + requestedImageSize + ") does not exist. "
						console.error(logHeader + errorMessage);
						
						tempImageDataObject[requestedImageSize].url = undefined;
						tempImageDataObject[requestedImageSize].errorMessage = errorMessage;
						tempImageDataObject[requestedImageSize].responseCode = "E";
						
						setImageData(tempImageDataObject);
						setImageDataVersion(requestedImageSize + "-" + Date.now());
					}
				});
				
				const intactImageURL = response0.guid.rendered;
				
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader + "intactImageURL: " + intactImageURL);
				}
				
				tempImageDataObject[STR_SIZE_NAME_INTACT] = {};
				
				fetch(intactImageURL).then( response => {
					if (response) {
						if (response.status !== 200) {
							console.error(logHeader + "Error fetching URL of " + requestedImageSize + ". Error message: ", response);
							
							tempImageDataObject[STR_SIZE_NAME_INTACT].url = undefined;
							tempImageDataObject[STR_SIZE_NAME_INTACT].errorMessage = response;
							tempImageDataObject[STR_SIZE_NAME_INTACT].responseCode = "E";
						} else {
							if (props.miscInfo.isInTestMode) {
								console.log(logHeader + "URL of image size[" + STR_SIZE_NAME_INTACT + "] is valid. ");
								//response.blob();
							}
							
							tempImageDataObject[STR_SIZE_NAME_INTACT]["url"] = intactImageURL;
							tempImageDataObject[STR_SIZE_NAME_INTACT]["errorMessage"] = response;
							tempImageDataObject[STR_SIZE_NAME_INTACT]["responseCode"] = "S";
						}
						
						setImageData(tempImageDataObject);
						setImageDataVersion(STR_SIZE_NAME_INTACT + "-" + Date.now());
					}
				});
				
				//props.onFinish(imageData);
			}).catch( (e) => {
				console.error(logHeader + "Error occured @imageId fetch. Error Message: ", e);
				
				props.onFinish(imageData);
			})
		} else {
			console.warn(logHeader + "tempImageId is not set. ");
		}
		
	}, [tempImageId]);
	
	return (
	<>
	<MediaUploadCheck>
		<MediaUpload
			value={tempImageId}
			onSelect={ (obj) => {
				if (props.miscInfo.isInTestMode) {
					console.log(logHeader + "ImageUploadUtilities implementation, onSelect, obj: ", obj);
					console.log(logHeader + "ImageUploadUtilities implementation, onSelect, obj.id: ", obj.id);
				}
				
				setTempImageId(obj.id);
			}}
			render={ ({ open }) => {
				return (
				<Button
					className="alb-theme-color-util-dropdown-toggle margin-bottom-half-rem"
					variant="secondary" 
					onClick={ open }>
					
					{props.componentLabel}
					
				</Button>
				);
			}}
		/>
	</MediaUploadCheck>
	</>
	);
	//return (<h1>hi</h1>);
}

export function loadAdditionalCSSIntoPreviewWindow(assetKey) {
	if (assetKey && typeof(assetKey) == "string") {
		const cssId = AssetInfo[assetKey]["ID"];
		if (cssId) {
			//console.log(getLogHeader() + "--------------------------------");
			//console.log(WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"]);
			//console.log(document.querySelector( WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"] ));
			//console.log(document.querySelector( WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"] ).contentWindow);
			//console.log(document.querySelector( WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"] ).contentWindow.document.head);
			const previewWindowFrame = document.querySelector( WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"] );
			if ( previewWindowFrame ) {
				if(!previewWindowFrame.contentWindow.document.getElementById(cssId)) {
					const cssLink = document.createElement("link");
					cssLink.href = ALBThemeType1BannerBlockScriptData.AssetRoot + AssetInfo[assetKey]["FILE_NAME"]; 
					cssLink.rel = "stylesheet"; 
					cssLink.type = "text/css"; 
					cssLink.id = cssId;
					previewWindowFrame.contentWindow.document.head.appendChild(cssLink);
					//console.log(document.querySelector( WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"] ).contentWindow.document.head);
				}
			}
			
			if(!document.getElementById(cssId)) {
				const cssLink = document.createElement("link");
				cssLink.href = ALBThemeType1BannerBlockScriptData.AssetRoot + AssetInfo[assetKey]["FILE_NAME"]; 
				cssLink.rel = "stylesheet"; 
				cssLink.type = "text/css"; 
				cssLink.id = cssId;
				document.head.appendChild(cssLink);
				//console.log(document.querySelector( WPDOMSelectors["PREVIEW_WINDOW_IFRAME_ON_EDITOR_PAGE"] ).contentWindow.document.head);
			}
		}
	}
}

export function sanatizeHTML(original) {
	var htmlObject = document.createElement('div');
	htmlObject.innerText  = original;
	
	return htmlObject.innerHTML;
}

export function getLabelJSXElement(labelText) {
	labelText = sanatizeHTML(labelText)
		.replace(/\${LINEBREAK}/g, "<br>")
		.replace(/\${BOLDBEGIN}/g, "<strong>")
		.replace(/\${BOLDEND}/g, "</strong>")
		.replace(/\${HIGHLIGHTBEGIN}/g, "<strong><i>")
		.replace(/\${HIGHLIGHTEND}/g, "</i></strong>");
		
	return <p className="alb-theme-block-label-wrapper" dangerouslySetInnerHTML={{__html: labelText}} />;
}

export function cssLengthToPx(cssLength) {
	//https://github.com/futurist/unit-to-px/blob/master/dist/index.umd.js
	let pxValue = 0;
	
    let con = document.createElement('div');
    con.style.position = 'absolute';
    con.style.width = 0;
    con.style.height = 0;
    con.style.visibility = 'hidden';
    con.style.overflow = 'hidden';

    let el = document.createElement('div');

    con.appendChild(el);
	
	el.style.width = cssLength;
	
	document.body.appendChild(con);
	
    pxValue = el.getBoundingClientRect().width;
	
    con.parentNode.removeChild(con);
	
	return pxValue;
}

//export default ColorUtilities;