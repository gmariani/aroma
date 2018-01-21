var HeaderMediator = function(node) {
	var med = new EventDispatcher();
	var nav = node;//node.find('nav');
	
	// Display
	var btnAdd = nav.find('.nav-button-add');
	var btnEdit = nav.find('.nav-button-edit');
	var btnDelete = nav.find('.nav-button-delete');
	var btnPrint = nav.find('.nav-button-print');
	var btnImport = nav.find('.nav-button-import');
	var btnExport = nav.find('.nav-button-export');
	
	// Edit
	var btnCancel = nav.find('.nav-button-cancel');
	var btnSave = nav.find('.nav-button-save');
	var btnAddIng = nav.find('.nav-button-add-ing');

	// Init
	console.log(btnEdit);
	node.find('#logo').click(onClickLogo);
	btnAdd.click(onClickAdd);
	btnEdit.click(onClickEdit);
	btnDelete.click(onClickDelete);
	btnPrint.click(onClickPrint);
	btnImport.click(onClickImport);
	btnExport.click(onClickExport);
	btnCancel.click(onClickCancel);
	btnSave.click(onClickSave);
	btnAddIng.click(onClickAddIng);

	////////////
	// Public //
	////////////
	/*
	Switch between Display or Edit view
	*/
	med.setScreen = function(screen) {
		if (typeof screen !== 'string') screen = Constants.DISPLAY_SCREEN;

		if (screen === Constants.DISPLAY_SCREEN) {
			nav.removeClass('nav-edit');
			nav.addClass('nav-display');
		} else {
			nav.removeClass('nav-display');
			nav.addClass('nav-edit');
		}
	};

	/*
	Update buttons based on the number of recipes selected
	*/
	med.updateButtons = function(numSelected) {
		if (numSelected < 1) {
			// isNone
			disableButton(btnEdit);
			disableButton(btnDelete);
			disableButton(btnPrint);
			disableButton(btnImport);
			disableButton(btnExport);
		} else if (numSelected > 1) {
			// !isNone && isMulti
			disableButton(btnEdit);
			disableButton(btnExport);
		} else if (numSelected === 1) {
			// !isNone && !isMulti
			enableButton(btnEdit);
			enableButton(btnDelete);
			enableButton(btnPrint);
			enableButton(btnImport);
			enableButton(btnExport);
		} else {
			// disable all except add
			disableButton(btnEdit);
			disableButton(btnDelete);
			disableButton(btnPrint);
			disableButton(btnImport);
			disableButton(btnExport);
		}
	};

	/////////////
	// Private //
	/////////////
	function disableButton(btn) {
		btn.parent().addClass('hidden-w');
	};

	function enableButton(btn) {
		btn.parent().removeClass('hidden-w');
	};

	function onClickAdd(e) {
		med.dispatchEvent(new Note(Notifications.ADD_RECIPE));
	};

	function onClickEdit(e) {
		med.dispatchEvent(new Note(Notifications.EDIT_RECIPE));
	};

	function onClickDelete(e) {
		med.dispatchEvent(new Note(Notifications.DELETE_RECIPE));
	};

	function onClickPrint(e) {
		med.dispatchEvent(new Note(Notifications.PRINT_RECIPE));
	};

	function onClickImport(e) {
		//var allFilter:FileFilter = new FileFilter("All Files", "*.*;");
		//var recipeFilter:FileFilter = new FileFilter("Recipes", "*.rcpe;");
		//fileDir.browseForOpenMultiple("Select a recipe", [recipeFilter, allFilter]);
	};

	function onClickExport(e) {
		//fileRecipe.browseForSave("Save As");
	};

	function onClickCancel(e) {
		med.dispatchEvent(new Note(Notifications.CANCEL_EDIT));
	};

	function onClickSave(e) {
		med.dispatchEvent(new Note(Notifications.SAVE_EDIT));
	};

	function onClickLogo(e) {
		med.dispatchEvent(new Note(Notifications.SHOW_ABOUT));
	};

	function onClickAddIng(e) {
		med.dispatchEvent(new Note(Notifications.ADD_ING));
	}

	return med;
};