export function getStyleSheetObject(styleSheetArray, id) {
	if ( styleSheetArray ) {
		const styleSheetArraySize = styleSheetArray.length;
		
		//console.log(styleSheetArray);
		//console.log(styleSheetArraySize);
		//console.log(id);
		for (var i = 0; i < styleSheetArraySize; i++) {
			let styleSheet = styleSheetArray[i];
			
			//console.log(i);
			//console.log(styleSheet);
			//console.log(styleSheet.ownerNode);
			//console.log(styleSheet.ownerNode.id);
			
			if (styleSheet.ownerNode) {
				if (styleSheet.ownerNode.id == id) {
					return styleSheet;
				}
			}
		}
	}
}