/*global YUI_config:true */
YUI_config = {
	//filter:'raw',
	// combine:false
    //    base: 'yui/',
	groups: {
		js: {
			base: 'build',
			modules: {
				'model-list-zope': {
					path: '/model-list-zope/model-list-zope.js',
					requires: ["array-extras", "array-invoke", "arraylist", "base-build", "escape", "json-parse", "model"]
				},
				'zecalendar': {
					path: '/zecalendar/zecalendar.js',
					requires: ["calendar", "base-build", "datatype-date", "event-outside", "event-focus"]
				},
				'modelsyncZope': {
					path: '/modelsyncZope/modelsyncZope.js',
					requires: ["io", "json"]
				},
				'zeView': {
					path: '/zeView/zeView.js',
					requires: ["base"]
				},
				'contentSwapper': {
					path: '/contentSwapper/contentSwapper.js',
					requires: ["zeView"]
				},
				'clearView': {
					path: '/clearView/clearView.js',
					requires: ["zeView"]
				},
				'anotherNewView': {
					path: '/anotherNewView/anotherNewView.js',
					requires: ["zeView"]
				},
				'newView': {
					path: '/newView/newView.js',
					requires: ["zeView"]
				},
				'mypanelView': {
					path: '/mypanelView/mypanelView.js',
					requires: ["zeView"]
				},
				'modalView': {
					path: '/modalView/modalView.js',
					requires: ["zeView"]
				},
				'memsearchView': {
					path: '/memsearchView/memsearchView.js',
					requires: ["zeView"]
				},
				'multipleTabs': {
					path: '/multipleTabs/multipleTabs.js',
					requires: ["zeView", "datatable", "contentSwapper", "autocomplete", "autocomplete-highlighters", "panel", "resize-plugin" , "dd-plugin", "overlay"]
				}
			}
		}
	}
};
