var ModalImageMediator = function(node) {
	var med = new EventDispatcher();
	var content = node.find('div > div');
	var btnClose = node.find('.close');

	// Init
	btnClose.on('click', onClickClose);

	////////////
	// Public //
	////////////
	/*
	Switch between Display or Edit view
	*/
	med.init = function(url) {
		content.html("<img src='img/recipes/" + url + "'>");
	};

	med.open = function() {
		node.addClass('open');
	};

	med.close = function() {
		node.removeClass('open');
	};

	/////////////
	// Private //
	/////////////
	function onClickClose(e) {
		med.close();
	}

	return med;
};