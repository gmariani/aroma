var RecipeProxy = function() {
	var pxy = new EventDispatcher();
	var KEY = 4; // increment with each recipe
	// TEMP: Will be housed on SQL
	var arrRecipes = [
		new Recipe(0, 'Rainbow Slaw', 'Jennifer Mariani', 'Family Recipe', 'Side Dish', '4 Servings', 5, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', 'Test Note', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar']),
		new Recipe(1, 'ZRainbow Slaw', 'Jennifer Mariani', '', 'Side Dish', '4 Servings', 2, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar'], "151679.jpg"),
		new Recipe(2, 'FRainbow Slaw', '', 'Family Recipe', 'Side Dish', '4 Servings', 1, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar']),
		new Recipe(3, 'ARainbow Slaw', 'Jennifer Mariani', 'Family Recipe', 'Side Dish', '', 3, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar'])
	];

	////////////
	// Public //
	////////////
	pxy.sort = function(type, direction) {
		if (type === Notifications.SORT_LABEL) {
			if (direction === Constants.DESCENDING) {
				arrRecipes.sort(sortOnLabel);
				arrRecipes.reverse();
			} else {
				arrRecipes.sort(sortOnLabel);
			}
		} else if (type === Notifications.SORT_RATING) {
			if (direction === Constants.DESCENDING) {
				arrRecipes.sort(sortOnRating);
				arrRecipes.reverse();
			} else {
				arrRecipes.sort(sortOnRating);
			}
		}
	}

	/*
	Get all recipes
	*/
	pxy.getRecipes = function() {
		return arrRecipes;
	}

	/* Get a recipe with a given ID
	*/
	pxy.getRecipe = function(id) {
		for (var i in arrRecipes) {
			var r = arrRecipes[i];
			if (r.id === id) return r;
		}
		return null;
	}

	/*
	Updated a recipe with a given ID
	*/
	pxy.setRecipe = function(id, recipe) {
		for (var i = 0, l = arrRecipes.length; i < l; i++) {
			if (arrRecipes[i].id === id) {
				arrRecipes[i] = recipe;
			}
		}
		pxy.dispatchEvent(new Note(Notifications.RECIPE_CHANGE, recipe));
	}

	/*
	Add recipe(s)
	@param arr An array of recipe objects to be added
	@return An array of IDs for the added recipes
	*/
	pxy.addRecipes = function(arr) {
		var arrResult = [];
		for (var i = 0, l = arr.length; i < l; i++) {
			var r = arr[i];
			r.id = KEY++;
			// todo: validate recipe
			arrRecipes.push(r);
			// todo: notifiy new recipe added
			// todo: return id or index
			arrResult.push(r.id);
		}
		pxy.dispatchEvent(new Note(Notifications.RECIPE_ADD, arr));
		return arrResult;
	}

	/*
	Remove recipe(s)
	@param arr An array of recipe objects to be removed
	*/
	pxy.removeRecipes = function(arr) {
		for (var i = 0, l = arr.length; i < l; i++) {
			for (var j = 0, l2 = arrRecipes.length; j < l2; j++) {
				if (arr[i] === arrRecipes[j].id) {
					arrRecipes.splice(j, 1);
					break;
				}
			}
		}
		/*var arrIDs = [];
		for (var i in arr) {
			arrIDs.push(arr[i].rowid);
		}
		var strIDs = arrIDs.join(',');*/
		
		//dbStatement.text = "DELETE FROM recipes WHERE rowid IN (" + strIDs + ")";
		//sendNotification(ApplicationFacade.SQL_START, "Deleting Recipe...");
		//dbStatement.execute(-1, new Responder(updateDBHandler, errorDBHandler));
		pxy.dispatchEvent(new Note(Notifications.RECIPE_REMOVE, arr));
	}

	/////////////
	// Private //
	/////////////

	function sortOnRating(a, b) {
		var aRating = a.rating;
		var bRating = b.rating;
		
		if(aRating > bRating) {
			return 1;
		} else if(aRating < bRating) {
			return -1;
		} else  {
			//aRating == bRating
			return 0;
		}
	}

	function sortOnLabel(a, b) {
		return (a.title > b.title) - (a.title < b.title);
	}

	return pxy;
};