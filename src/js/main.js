'use strict';

/* ========================================================================= */
/*                                UTILITY                                    */
/* ========================================================================= */

Shadowbox.init();

function EventDispatcher() {
	this.listeners = {};
};

EventDispatcher.prototype = {
	constructor: EventDispatcher,

	addEventListener: function(type, listener) {
		if (typeof this.listeners[type] == 'undefined') {
			this.listeners[type] = [];
		}
		this.listeners[type].push(listener);
	},

	dispatchEvent: function(event) {
		if (!event.target) {
			event.target = this;
		}
		if (this.listeners[event.type] instanceof Array) {
			var listeners = this.listeners[event.type];
			for (var i = 0, len = listeners.length; i < len; i++) {
				listeners[i](event);
			}
		}
	},

	removeEventListener: function(type, listener) {
		if (this.listeners[type] instanceof Array) {
			var listeners = this.listeners[type];
			for (var i = 0, len = listeners.length; i < len; i++) {
				if (listeners[i] === listener) {
					break;
				}
			}

			listeners.splice(i,1);
		}
	},

	hasEventListener: function(type) {
		if (this.listeners[type] instanceof Array) {
			var listeners = this.listeners[type];
			return (listeners.length > 0);
		}

		return false;
	}
};

var trace = function () {
	console.log.apply(console, arguments);
}

// Validates that a string exists
function validateString(str) {
	return (typeof str == 'string' && str.length > 0);
};

// Display a string or a default value if not passed
function displayString(str, strDefault) {
	if (typeof strDefault != 'string') throw Error('displayString() - strDefault must be a string. (' + strDefault + ')');
	if (typeof str != 'string' || str.length <= 0) return strDefault;
	return str;
};

// Pull a localized string
function s(type) {
	return STRINGS[lang][type] || STRINGS['en_us'][type];
}

/* ========================================================================= */
/*                                CONTROLLER                                 */
/* ========================================================================= */

var Constants = {
	DISPLAY_SCREEN : 'DISPLAY_SCREEN',
	DISPLAY_EDIT : 'DISPLAY_EDIT',
	ALERT_WARNING: 'warning',
	ALERT_INFORMATION: 'information',
	ALERT_ERROR: 'error',
	ALERT_CONFIRM: 'confirm',
	ALERT_NONE: 'none',
	ASCENDING: 'ASCENDING',
	DESCENDING: 'DESCENDING'
};

var Notifications = {
	SHADOWBOX: 'SHADOWBOX',
	ALERT: 'ALERT',
	CONFIRM: 'CONFIRM',
	MODAL: 'MODAL',
	ADD_RECIPE: 'ADD_RECIPE',
	EDIT_RECIPE: 'EDIT_RECIPE',
	DELETE_RECIPE: 'DELETE_RECIPE',
	PRINT_RECIPE: 'PRINT_RECIPE',
	CANCEL_EDIT: 'CANCEL_EDIT',
	SAVE_EDIT: 'SAVE_EDIT',
	SHOW_ABOUT: 'SHOW_ABOUT',
	CHANGE: 'CHANGE',
	ADD_ING: 'ADD_ING',
	RECIPE_CHANGE: 'RECIPE_CHANGE',
	RECIPE_ADD: 'RECIPE_ADD',
	RECIPE_REMOVE: 'RECIPE_REMOVE',
	SORT_RATING: 'SORT_RATING',
	SORT_LABEL: 'SORT_LABEL'
};

var STRINGS = {
	en_us : {
		NEED_RECIPE_TITLE: 'Please enter a recipe name.',
		NEED_RECIPE_DIR: 'Please enter the recipe directions.',
		NEED_RECIPE_ING: 'Please add at-least one ingredient.',
		NEED_RECIPE_ING2: 'Please enter atleast one ingredient.',
		NO_RECIPE_FOUND: 'No recipes found.',
		NO_RECIPE_SEL: 'No recipes selected.',
		MULT_RECIPE_SEL: 'Multiple recipes selected.',
		REMOVE_ING: 'Remove Ingredient',
		REMOVE_PIC: 'Remove Picture',
		DELETE_WARN: 'You are about to delete recipes: \n\n',
		COURTESY_OF: 'Courtesy of ',
		COURTESY_UNKNOWN: 'Unknown',
		YIELDS: ' - Yields: '
	}
};

var lang = 'en_us';

var pxyRecipe = null;
var medHeader = null;
var medDisplayScreen = null;
var medEditScreen = null;
//var medModal = null;
//var medModalImage = null;

// Application startup
$().ready(function() {
	init();
});

function init() {
	//--------------------------------------
	//  Model
	//--------------------------------------
	pxyRecipe = new NeDBProxy();
	//pxyRecipe = new RecipeProxy();
	pxyRecipe.addEventListener(Notifications.RECIPE_CHANGE, commandHandler);
	pxyRecipe.addEventListener(Notifications.RECIPE_ADD, commandHandler);
	pxyRecipe.addEventListener(Notifications.RECIPE_REMOVE, commandHandler);

	//--------------------------------------
	//  View
	//--------------------------------------
	medHeader = new HeaderMediator($('.header'));
	medHeader.addEventListener(Notifications.ADD_RECIPE, commandHandler);
	medHeader.addEventListener(Notifications.EDIT_RECIPE, commandHandler);
	medHeader.addEventListener(Notifications.DELETE_RECIPE, commandHandler);
	medHeader.addEventListener(Notifications.PRINT_RECIPE, commandHandler);
	medHeader.addEventListener(Notifications.CANCEL_EDIT, commandHandler);
	medHeader.addEventListener(Notifications.SAVE_EDIT, commandHandler);
	medHeader.addEventListener(Notifications.SHOW_ABOUT, commandHandler);
	medHeader.addEventListener(Notifications.ADD_ING, commandHandler);

	medDisplayScreen = new DisplayScreenMediator($('#screen-display'));
	medDisplayScreen.addEventListener(Notifications.CHANGE, commandHandler);
	medDisplayScreen.addEventListener(Notifications.ALERT, commandHandler);
	medDisplayScreen.addEventListener(Notifications.CONFIRM, commandHandler);
	medDisplayScreen.addEventListener(Notifications.SORT_RATING, commandHandler);
	medDisplayScreen.addEventListener(Notifications.SORT_LABEL, commandHandler);
	medDisplayScreen.addEventListener(Notifications.MODAL, commandHandler);
	medDisplayScreen.addEventListener(Notifications.SHADOWBOX, commandHandler);
	
	medEditScreen = new EditScreenMediator($('#screen-edit'));

	//medModal = new ModalMediator($('.modalDialog'));
	//medModalImage = new ModalImageMediator($('.modalImage'));

	// Init
	medDisplayScreen.updateList(pxyRecipe.getRecipes());
	medDisplayScreen.selectRecipeAt(0);
	setScreen(Constants.DISPLAY_SCREEN);
};

function commandHandler(note) {
	switch(note.type) {
		case Notifications.SHADOWBOX :
			Shadowbox.clearCache();
			var asdf = $('.recipe-detail img');
			Shadowbox.setup();
			break;
		case Notifications.MODAL :
			trace('main.js::commandHandler() - Image popup');
			//medModalImage.init(note.body);
			//medModalImage.open();
			/*Shadowbox.open({
                    content: 'img/recipes/' + note.body,
                    player:     'img',
            });*/
			break;
		case Notifications.ALERT :
			$.confirm({
				'title' : note.body.title,
				'message': note.body.message,
				'buttons' : {
					'Ok' : {
						'class'	: 'select',
						'action': function(){}
					}
				}
			});
			break;
		case Notifications.CONFIRM :
			$.confirm({
				'title' : note.body.title,
				'message' : note.body.message,
				'buttons'	: {
				'Yes'	: {
					'class'	: 'select',
					'action': note.body.callbackYes
				},
				'No'	: {
					'class'	: '',
					'action': note.body.callbackNo
					}
				}
			});
			break;
		case Notifications.ADD_RECIPE :
			// Reset edit screen
			medEditScreen.load(null);
			medEditScreen.isModified = true;

			// Goto edit screen
			setScreen(Constants.DISPLAY_EDIT);
			break;
		case Notifications.EDIT_RECIPE :
			// Get selected recipe
			var numSelected = medDisplayScreen.getNumSelected();
			if (numSelected === 1) {
				var selectedRecipe = medDisplayScreen.getSelectedRecipe();
				var recipe = pxyRecipe.getRecipe(selectedRecipe);

				// Set recipe in edit screen
				medEditScreen.load(recipe);

				// Goto edit screen
				setScreen(Constants.DISPLAY_EDIT);
			}
			break;
		case Notifications.DELETE_RECIPE :
			var str = s('DELETE_WARN');
			var selectedRecipes = medDisplayScreen.getSelectedRecipes();
			for (var i = 0, l = selectedRecipes.length; i < l; i++) {
				var recipe = pxyRecipe.getRecipe(selectedRecipes[i]);
				str += recipe.title + '\n';
			}
			commandHandler(new Note(Notifications.CONFIRM, {
				title:'Delete Confirmation', 
				icon:Constants.ALERT_WARNING, 
				message:str, 
				callbackYes: function() {
					pxyRecipe.removeRecipes(selectedRecipes);
					//medDisplayScreen.updateList(pxyRecipe.getRecipes());
					//medDisplayScreen.selectRecipeAt(0);
				}, 
				callbackNo: function() {} 
			}));
			/*$.confirm({
				'title' : 'Delete Confirmation',
				'message': str,
				'buttons' : {
					'Yes' : {
						'class' : 'blue',
						'action': function() {
							pxyRecipe.removeRecipes(selectedRecipes);
							//medDisplayScreen.updateList(pxyRecipe.getRecipes());
							//medDisplayScreen.selectRecipeAt(0);
						}
					},
					'No' : {
						'class'	: 'gray',
						'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
					}
				}
			});*/
			/*if (confirm(str)) {
				pxyRecipe.removeRecipes(selectedRecipes);
				//medDisplayScreen.updateList(pxyRecipe.getRecipes());
				//medDisplayScreen.selectRecipeAt(0);
			}*/
			break;
		// Print
		// Import
		// Export

		case Notifications.CANCEL_EDIT :
			if (medEditScreen.isModified) {
				commandHandler(new Note(Notifications.CONFIRM, {
					title:'Save Confirmation', 
					icon:Constants.ALERT_WARNING, 
					message:'Would you like to save changes?', 
					callbackYes: function() {
						if (saveRecipe()) setScreen(Constants.DISPLAY_SCREEN);
					}, 
					callbackNo: function() {
						setScreen(Constants.DISPLAY_SCREEN);
					} 
				}));
				/*$.confirm({
					'title' : 'Save Confirmation',
					'message': 'Would you like to save changes?',
					'buttons' : {
						'Yes' : {
							'class' : 'blue',
							'action': function() {
								if (saveRecipe()) setScreen(Constants.DISPLAY_SCREEN);
							}
						},
						'No' : {
							'class'	: 'gray',
							'action': function(){
								setScreen(Constants.DISPLAY_SCREEN);
							}
						}
					}
				});*/
				/*if (confirm('Would you like to save changes?')) {
					if (saveRecipe()) setScreen(Constants.DISPLAY_SCREEN);
				} else {
					setScreen(Constants.DISPLAY_SCREEN);
				}*/
			} else {
				setScreen(Constants.DISPLAY_SCREEN);
			}
			break;
		case Notifications.SAVE_EDIT :
			// Skip saving if nothing changed
			if (medEditScreen.isModified) {
				if (saveRecipe()) setScreen(Constants.DISPLAY_SCREEN);
			} else {
				setScreen(Constants.DISPLAY_SCREEN);
			}			
			break;
		case Notifications.ADD_ING :
			medEditScreen.addIngredient();
			break;
		
		case Notifications.CHANGE :
			var numSelected = medDisplayScreen.getNumSelected();
			medHeader.updateButtons(numSelected);

			if (numSelected === 1) {
				var selectedRecipe = medDisplayScreen.getSelectedRecipe();
				var recipe = pxyRecipe.getRecipe(selectedRecipe);
				medDisplayScreen.displayRecipe(recipe);
			}
			break;
		case Notifications.SORT_LABEL :
		case Notifications.SORT_RATING	:
			if (note.body === Constants.DESCENDING) {
				pxyRecipe.sort(note.type, Constants.DESCENDING);
			} else {
				pxyRecipe.sort(note.type, Constants.ASCENDING);
			}
			medDisplayScreen.updateList(pxyRecipe.getRecipes());
			break;
		case Notifications.DISPLAY_CHANGE :
			setScreen(note.body);
			break;
		case Notifications.RECIPE_CHANGE :
			medDisplayScreen.displayRecipe(note.body);
			medDisplayScreen.updateSelected(note.body);
			break;
		case Notifications.RECIPE_ADD :
			medDisplayScreen.updateList(pxyRecipe.getRecipes());
			medDisplayScreen.selectRecipeById(note.body[0].id);
			break;
		case Notifications.RECIPE_REMOVE :
			medDisplayScreen.updateList(pxyRecipe.getRecipes());
			medDisplayScreen.selectRecipeAt(0);
			break;
	};
};

function saveRecipe() {
	if (medEditScreen.validate()) {
		var recipe = medEditScreen.unload();
		// Save edited recipe
		if (!isNaN(recipe.id)) {
			trace('main.js::saveRecipe() - ' + recipe.id + ' recipe saved');
			//var recipeId = medDisplayScreen.getSelectedRecipe();
			pxyRecipe.setRecipe(recipe.id, recipe);
		}
		// Save new recipe
		else {
			trace('main.js::saveRecipe() - New recipe saved');
			pxyRecipe.addRecipes([recipe]);
		}
		return true;
	}
	return false;
}

function setScreen(screen) {
	if (typeof screen !== 'string') screen = Constants.DISPLAY_SCREEN;

	medHeader.setScreen(screen);
	if (screen == Constants.DISPLAY_SCREEN) {
		$('#content').removeClass('screen-edit').addClass('screen-display');
	} else {
		$('#content').removeClass('screen-display').addClass('screen-edit');
	}
};

/* ========================================================================= */
/*                                   MODEL                                   */
/* ========================================================================= */

function Note(type, body) {
	this.type = type;
	this.body = body;
};

var Recipe = function(id, title, author, source, category, yields, rating, tags, directions, notes, ingredients, picture) {
	this.id = id >= 0 ? id : NaN;
	this.title = displayString(title, ''); // String
	this.author = displayString(author, ''); // String
	this.source = displayString(source, ''); // String
	this.category = displayString(category, ''); // String
	this.yields = displayString(yields, ''); // String
	this.rating = rating || 0; // Int
	this.tags = tags || []; // Array
	this.directions = displayString(directions, ''); // String
	this.notes = displayString(notes, ''); // String
	this.ingredients = ingredients || []; // Array
	this.picture = displayString(picture, ''); // URL-String
	
	return this;
};

var StarRating = function(id) {
	var t = this;
	this.source = id ? $(id) : null;
	this.setStars = function(num) {
		if (t.source) {
			var radios = t.source.find('input:checked');
			radios.prop('checked', false);

			var radio = t.source.find('input[value=' + num +']');
			radio.prop('checked', true);
		}
	};
	this.getStars = function() {
		if (t.source) {
			var radio = t.source.find('input:checked');
			var num = radio.val();
			console.log(num);
			return num;
		}
		return 0;
	};
	this.reset = function() {
		t.setStars(1);
	}
};