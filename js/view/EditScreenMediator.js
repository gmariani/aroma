var EditScreenMediator = function(node) {
	var ulIngredients = node.find('.ingredient-list');
	var txtName = node.find('#recipe-name');
	var ddCategory = node.find('#recipe-category');
	var starRating = new StarRating('#recipe-rating');
	var txtAuthor = node.find('#recipe-author');
	var txtSource = node.find('#recipe-source');
	var txtYields = node.find('#recipe-yields');
	var txtDirections = node.find('#recipe-directions');
	var txtNotes = node.find('#recipe-notes');
	var txtPictureBrowse = node.find('#recipe-image-browse');
	var divPicture = node.find('#recipe-image');
	var med = new EventDispatcher();
	var curRecipe;

	// Add change listeners
	txtName.on('change', onModified);
	ddCategory.on('change', onModified);
	txtAuthor.on('change', onModified);
	txtSource.on('change', onModified);
	txtYields.on('change', onModified);
	txtDirections.on('change', onModified);
	txtNotes.on('change', onModified);
	ulIngredients.on('change', onModified);
	ulIngredients.on('click', onRemoveIngredient);
	starRating.source.on('click', onModified);

	// Init Image Drag-n-Drop
	if (typeof window.FileReader === 'undefined') {
		// Show file browse button
	} else {
		// File API available
		divPicture.on('dragenter', function(e) {
			$(this).addClass('hover');
			e.preventDefault();
		});
		divPicture.on('dragover', function(e) {
			e.preventDefault();
		});
		divPicture.on('dragleave dragend', function(e) {
			$(this).removeClass('hover');
			e.preventDefault();
		});
		divPicture.on('drop', function(e) {
			$(this).removeClass('hover');
			e.preventDefault();
			med.isModified = true;
			var reader = new FileReader();
			reader.onload = function(event) {
				divPicture.css('background-image', 'url(' + event.target.result + ') no-repeat center');
			};
			reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
		});
	};

	////////////
	// Public //
	////////////
	med.reset = function() {
		ulIngredients.empty();
		txtName.val('');
		ddCategory.val(1);
		starRating.setStars(1);
		txtAuthor.val('');
		txtSource.val('');
		txtYields.val('');
		txtDirections.val('');
		txtNotes.val('');
		this.isModified = false;
	};

	med.load = function(recipe) {
		// Is a new recipe
		if (!recipe) {
			med.reset();
			curRecipe = new Recipe();
		} else {
			// Draw ingredients
			var strIng = '';
			for (var i = 0, l = recipe.ingredients.length; i < l; i++) {
				strIng += '<li><input type="text" value="' + unescape(recipe.ingredients[i]) + '" /><button class="recipe-button-remove ingredient-button-remove" title="' + s("REMOVE_ING") + '">' + s("REMOVE_ING") + '</button></li>';
			}
			ulIngredients.html(strIng);

			txtName.val(recipe.title);
			ddCategory.val(recipe.category);
			starRating.setStars(recipe.rating);
			txtAuthor.val(recipe.author);
			txtSource.val(recipe.source);
			txtYields.val(recipe.yields);
			txtDirections.val(recipe.directions);
			txtNotes.val(recipe.notes);
			//txtPictureBrowse.val(recipe.picture);
			curRecipe = recipe;
		}
		this.isModified = false;
	};

	med.unload = function() {
		var arr = [];
		var children = ulIngredients[0].getElementsByTagName("input");
		for (var i = 0, l = children.length; i < l; i++) {
			var str = children[i].value;
			if (validateString(str)) arr.push(str);
		}
		curRecipe.ingredients = arr;

		curRecipe.title = txtName.val();
		curRecipe.category = ddCategory.val();
		curRecipe.rating = starRating.getStars();
		curRecipe.author = txtAuthor.val();
		curRecipe.source = txtSource.val();
		curRecipe.yields = txtYields.val();
		curRecipe.directions = txtDirections.val();
		curRecipe.notes = txtNotes.val();

		return curRecipe;
	}

	// Ensure that all required items have some value
	med.validate = function() {
		var children = ulIngredients[0].getElementsByTagName("input");
		if (!validateString(txtName.val())) {
			med.dispatchEvent(new Note(Notifications.ALERT, {title:"Warning", icon:Constants.ALERT_WARNING, message:s("NEED_RECIPE_TITLE") }));
			return false;
		}
		if (!validateString(txtDirections.val())) {
			med.dispatchEvent(new Note(Notifications.ALERT, {title:"Warning", icon:Constants.ALERT_WARNING, message:s("NEED_RECIPE_DIR") }));
			return false;
		}
		if (children.length <= 0) {
			med.dispatchEvent(new Note(Notifications.ALERT, {title:"Warning", icon:Constants.ALERT_WARNING, message:s("NEED_RECIPE_ING") }));
			return false;
		}
		if (!validateString($(children[0]).val())) {
			med.dispatchEvent(new Note(Notifications.ALERT, {title:"Warning", icon:Constants.ALERT_WARNING, message:s("NEED_RECIPE_ING2") }));
			return false;
		}
		return true;
	}

	med.addIngredient = function() {
		ulIngredients.append('<li><input type="text" value="" /><button class="recipe-button-remove ingredient-button-remove" title="' + s("REMOVE_ING") + '">' + s("REMOVE_ING") + '</button></li>');
	}

	med.isModified = false;

	/////////////
	// Private //
	/////////////
	function onModified(e) {
		med.isModified = true;
	};

	// Remove the ingredient from the edit screen list
	function onRemoveIngredient(e) {
		var btnRemove = $(e.target);
		if (btnRemove.hasClass('ingredient-button-remove')) {
			var liNode = btnRemove.parent();
			liNode.remove();
			onModified();
		}
	}

	return med;
};