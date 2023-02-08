import "./front-end.scss";
import { getStyleSheetObject } from "./front-end-utils.js";

//console.log("extraBlockDataArray: ", extraBlockDataArray);

const pluginFrontEndStyleSheet = getStyleSheetObject(document.styleSheets, "alb-theme-type-1-banner-block-front-end-css-css");

//console.log("pluginFrontEndStyleSheet: " , pluginFrontEndStyleSheet);

window.extraBlockDataArray.map( extraBlockData => {
	
	if ( extraBlockData ) {
		if ( pluginFrontEndStyleSheet && extraBlockData.customStyles ) {
			extraBlockData.customStyles.map( customCSSRule => {
				pluginFrontEndStyleSheet.insertRule(customCSSRule);
			});
		}
		
		if ( extraBlockData.forceRemoveTopPaddingOfRootContainer ) {
			let rootContainerDOM = document.querySelector(".wp-site-blocks");
			
			//console.log(rootContainerDOM);
			//console.log(getComputedStyle(rootContainerDOM));
			//console.log(parseFloat( getComputedStyle(rootContainerDOM).getPropertyValue('padding-top') ));
			//console.log(rootContainerDOM.style);
			
			if ( rootContainerDOM ) {
				if ( window.getComputedStyle ) {
					if ( parseFloat( getComputedStyle(rootContainerDOM).getPropertyValue('padding-top') ) != 0 ) {
						rootContainerDOM.style.paddingTop = 0;
					}
				} else {
					if ( !rootContainerDOM.style.paddingTop || rootContainerDOM.style.paddingTop != 0 ) {
						rootContainerDOM.style.paddingTop = 0;
					}
				}
			}
		}
	}
});


//console.log(navigator.userAgent.toLowerCase())



var firefoxVersionInfoIndex = navigator.userAgent.toLowerCase().indexOf('firefox');

if ( firefoxVersionInfoIndex > 0 ) {
	var firefoxVersionNumber = parseFloat(navigator.userAgent.substring(firefoxVersionInfoIndex + 8));
	
	var bannerImageMaxWidth = "none";
	
	//The purpose of the following code is to display banner image nicely in "Fixed Height" mode mode on older Firefox browser
	if ( firefoxVersionNumber < 80 && parseInt(window.innerWidth) >= 990 ) {
		bannerImageMaxWidth = "100%";
	}
	
	document.querySelectorAll(".alb-theme-type-1-banner__image").forEach( bannerImageDOMElement => {
		bannerImageDOMElement.style.maxWidth = bannerImageMaxWidth;
	});
}