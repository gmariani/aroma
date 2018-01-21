var ModalMediator = function(node) {
	var med = new EventDispatcher();
	var title = node.find('h1');
	var content = node.find('#modal-content');
	var icon = node.find('#modal-icon');
	var btnClose = node.find('.close');

	// Init
	btnClose.on('click', onClickClose);

	////////////
	// Public //
	////////////
	/*
	Switch between Display or Edit view
	*/
	med.init = function(note) {
		title.text(note.title);
		content.html(note.message);
		icon.removeClass();
		if (note.icon !== Constants.ALERT_WARNING &&
			note.icon !== Constants.ALERT_NONE &&
			note.icon !== Constants.ALERT_INFORMATION &&
			note.icon !== Constants.ALERT_ERROR) {
			note.icon = Constants.ALERT_INFORMATION;
		}
		icon.addClass(note.icon);
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