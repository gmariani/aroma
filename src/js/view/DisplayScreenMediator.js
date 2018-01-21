var DisplayScreenMediator = function(node) {
	var isSortAZ = true;
	var isSortStar = false;
	var starRatingHolder = node.find('.recipe-rating');
	var starRating = new StarRating('.recipe-rating span');
	var starRatingTemp = new StarRating(null);
	var sortTypeLabel = node.find('#sortTypeLabel');
	var sortStar = node.find('#sortStar');
	var sortType = node.find('#sortType');
	var recipeList = node.find('.recipe-list');
	var recipeImage = node.find('.recipe-detail img');
	var recipeLink = node.find('.recipe-detail a');
	var recipeNote = '';
	var recipeImageURL = '';
	var btnNotes = node.find('#btnNotes');
	var _numSelected = 0;
	var med = new EventDispatcher();
	var _selected = [];

	sortStar.on('click', onClickSort);
	sortType.on('click', onClickSort);
	node.find('#btnRandom').on('click', onClickRandom);
	recipeList.children().on('click', onItemClickList);
	btnNotes.on('click', onClickNote);
	recipeImage.on('click', onClickImage);

	// Init Splitter
	$('#screen-display').split({orientation:'vertical', limit:2, position:'30%'});

	////////////
	// Public //
	////////////

	// Returns selected recipe ID
	med.getSelectedRecipe = function() {
		return _selected.length > 0 ? _selected[0] : null;
	}

	// Selects a recipe in the list by index
	med.selectRecipeAt = function(idx) {
		var liAll = recipeList.children();
		liAll.removeClass('selected');
		_selected = [];

		if (typeof idx === 'number') {
			var li = $(liAll[idx]);
			li.addClass('selected');
			_selected.push(li.data("recipe-id"));
		}
		
		selectRecipe();
	};

	// Selects a recipe in the list by ID
	med.selectRecipeById = function(id) {
		var liAll = recipeList.children();
		liAll.removeClass('selected');
		_selected = [];

		var li = recipeList.find("li[data-recipe-id='" + id + "']");
		if (li) {
			li.addClass('selected');
			_selected.push(li.data("recipe-id"));
		}
		//recipeList.find("li[data-recipe-id='" + id + "']").addClass('selected');
		selectRecipe();
	};
	
	// Return an array of all recipe IDs that are selected
	med.getSelectedRecipes = function() {
		/*var arr = recipeList.find('li.selected').map(function() {
			return $(this).data('recipe-id');
		}).get();
		return arr;*/
		return _selected;
	};

	med.getNumSelected = function() {
		//return _numSelected;
		return _selected.length;
	};

	med.displayRecipe = function(recipe) {
		// Show/hide notes if available
		if (validateString(recipe.notes)) {
			btnNotes.removeClass('hidden-h');
		} else {
			btnNotes.addClass('hidden-h');
		}
		
		// Populate recipe
		var str;
		var recipeDiv = $('#recipe');
		recipeDiv.find('h1').text(recipe.title);
		str = s("COURTESY_OF") + displayString(recipe.author, s("COURTESY_UNKNOWN"));
		if (validateString(recipe.source)) str += ' (' + recipe.source + ')';
		recipeDiv.find('h2').text(str);
		str = recipe.category;
		if (validateString(recipe.yields)) str += s("YIELDS") + recipe.yields;
		recipeDiv.find('h3').text(str);

		// Set rating
		starRating.setStars(recipe.rating);
		
		// Draw ingredients
		var strRecipe = '';
		for (var i = 0, l = recipe.ingredients.length; i < l; i++) {
			strRecipe += '<li>' + unescape(recipe.ingredients[i]) + '</li>';
		}
		recipeDiv.children('ul').html(strRecipe);

		// Set note
		recipeNote = displayString(recipe.notes, '');
		
		// Show Picture
		if (recipe.picture != "" && recipe.picture) {
			recipeImageURL = recipe.picture;
			recipeLink.attr('href', 'img/recipes/' + recipe.picture);
			recipeImage.attr('src', 'img/recipes/' + recipe.picture);
			recipeImage.removeClass('hidden-h');
		} else {
			recipeImageURL = '';
			recipeImage.addClass('hidden-h');
		}
		
		recipeDiv.children('p').text(recipe.directions);
		med.dispatchEvent(new Note(Notifications.SHADOWBOX));
	};

	// expensive
	med.updateList = function(arrRecipes) {
		var strHTML = '';
		for (var i = 0, l = arrRecipes.length; i < l; i++) {
			var r = arrRecipes[i];
			strHTML += '<li data-recipe-id="' + r.id + '">';
			// Create Rating Radiobuttons
			strHTML += '<span class="rating">';
			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-5" name="rating-input-' + i + '" value="5"' + (r.rating == 5 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-5" class="rating-star"></label>';

			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-4" name="rating-input-' + i + '" value="4"' + (r.rating == 4 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-4" class="rating-star"></label>';

			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-3" name="rating-input-' + i + '" value="3"' + (r.rating == 3 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-3" class="rating-star"></label>';

			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-2" name="rating-input-' + i + '" value="2"' + (r.rating == 2 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-2" class="rating-star"></label>';

			strHTML += '	<input type="radio" disabled="true" class="rating-input" id="rating-input-' + i + '-1" name="rating-input-' + i + '" value="1"' + (r.rating == 1 ? ' checked="checked"':'') + '>';
			strHTML += '	<label for="rating-input-' + i + '-1" class="rating-star"></label>';
			strHTML += '</span>';
			strHTML += '<p>' + r.title + '</p>';
			strHTML += '</li>';
		}
		
		recipeList.children().off('click', onItemClickList);
		recipeList.html(strHTML);
		recipeList.children().on('click', onItemClickList);
	};

	med.updateSelected = function(recipe) {
		var selected = $(recipeList.find('li.selected')[0]);
		starRatingTemp.source = selected.find('.rating');
		starRatingTemp.setStars(recipe.rating);

		selected.find('p').text(recipe.title);
	}

	/////////////
	// Private //
	/////////////
	function onClickNote(e) {
		med.dispatchEvent(new Note(Notifications.ALERT, {title:"Notes", icon:Constants.ALERT_INFORMATION, message:recipeNote }));
	};

	function onClickImage(e) {
		med.dispatchEvent(new Note(Notifications.MODAL, recipeImageURL));
	}

	function onClickSort(e) {
		updateSort();
	};

	function onItemClickList(e) {
		if (!e.shiftKey) {
			recipeList.children().removeClass('selected');
			_selected = [];
		}

		$(this).addClass('selected');
		_selected.push($(this).data('recipe-id'));

		selectRecipe();
	};

	function onClickRandom() {
		var li = recipeList.children(),
			l = li.length,
			idx = null;

		if (l > 0) {
			idx = parseInt(l * Math.random());
			if (idx == l) idx = l - 1;
			if (idx < 0) idx = 0;
		}

		med.selectRecipeAt(idx);
	};

	function updateSort() {
		isSortAZ = sortType.is(':checked');
		isSortStar = sortStar.is(':checked');
		
		// Determine Sort Icon
		if (isSortAZ) {
			if (isSortStar) {
				sortTypeLabel.text('1-5');
			} else {
				sortTypeLabel.text('A-Z');
			}
		} else {
			if (isSortStar) {
				sortTypeLabel.text('5-1');
			} else {
				sortTypeLabel.text('Z-A');
			}
		}

		// Sort
		if (isSortAZ) {
			if (isSortStar) {
				med.dispatchEvent(new Note(Notifications.SORT_RATING, Constants.ASCENDING));
			} else {
				med.dispatchEvent(new Note(Notifications.SORT_LABEL, Constants.ASCENDING));
			}
		} else {
			if (isSortStar) {
				med.dispatchEvent(new Note(Notifications.SORT_RATING, Constants.DESCENDING));
			} else {
				med.dispatchEvent(new Note(Notifications.SORT_LABEL, Constants.DESCENDING));
			}
		}
	};

	/*function sortOnRating(a, b) {
		var aRating = a.data.rating;
		var bRating = b.data.rating;
		
		if(aRating > bRating) {
			return 1;
		} else if(aRating < bRating) {
			return -1;
		} else  {
			//aRating == bRating
			return 0;
		}
	}*/

	function displayMessage(msg) {
		btnNotes.addClass('hidden-h');
		recipeImage.addClass('hidden-h');
		
		var recipe = $('#recipe');
		recipe.find('h1').text(msg);
		recipe.find('h2').text('');
		recipe.find('h3').text('');
		recipe.children('ul').html('');
		recipe.children('p').text('');
		starRating.setStars(0);
	};

	function selectRecipe() {
		var startY = 0;
		var arrRecipes = med.getSelectedRecipes();
		_numSelected = arrRecipes.length;

		var isSearch = false;
		
		if (_numSelected < 1) {
			// If no recipe, hide notes button and rating
			btnNotes.addClass('hidden-h');
			starRatingHolder.addClass('hidden-h');
			displayMessage(((isSearch == true) ? s("NO_RECIPE_FOUND") : s("NO_RECIPE_SEL")));
		} else if (_numSelected > 1) {
			// If multiple recipe, hide notes button
			btnNotes.addClass('hidden-h');
			starRatingHolder.addClass('hidden-h');
			displayMessage(s("MULT_RECIPE_SEL"));
		} else {
			starRatingHolder.removeClass('hidden-h');
			btnNotes.removeClass('hidden-h');
			recipeImage.removeClass('hidden-h');
		}

		med.dispatchEvent(new Note(Notifications.CHANGE));
	};

	return med;
};