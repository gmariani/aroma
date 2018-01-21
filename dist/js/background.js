chrome.app.runtime.onLaunched.addListener(function() {
	// http://developer.chrome.com/apps/app_window.html#method-create
	chrome.app.window.create('../index.html', {
		bounds: {
			width: 750,
			height: 500
		},
		//frame: 'none',
		minWidth: 700,
		minHeight: 350
	});
});