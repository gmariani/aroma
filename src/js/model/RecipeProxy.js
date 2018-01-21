var RecipeProxy = function() {
	/*
	cv-aroma
	cv_admin
	!mLy8s%#A$z$PBY%
	*/
	var pxy = new EventDispatcher();
	var KEY = 4; // increment with each recipe
	// TEMP: Will be housed on SQL
	var arrRecipes = [
		new Recipe(0, 'Rainbow Slaw', 'Jennifer Mariani', 'Family Recipe', 'Side Dish', '4 Servings', 5, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', 'Test Note', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar']),
		new Recipe(1, 'ZRainbow Slaw', 'Jennifer Mariani', '', 'Side Dish', '4 Servings', 2, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar'], "151679.jpg"),
		new Recipe(2, 'FRainbow Slaw', '', 'Family Recipe', 'Side Dish', '4 Servings', 1, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar']),
		new Recipe(3, 'ARainbow Slaw', 'Jennifer Mariani', 'Family Recipe', 'Side Dish', '', 3, null, 'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', '', ['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar'])
	];
	
	
	var fs = require("fs");
	var file = "C:\Users\Gabriel\Desktop\recipes.ckbk";
	var exists = fs.existsSync(file);
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database(file);
	
	db.serialize(function() {
		if (!exists) {
			//db.run("CREATE TABLE Stuff (thing TEXT)");
		}

		/*var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

		// Insert random data
		var rnd;
		for (var i = 0; i < 10; i++) {
		rnd = Math.floor(Math.random() * 10000000);
		stmt.run("Thing #" + rnd);
		}

		stmt.finalize();*/

		db.each("SELECT rowid, * FROM recipes", function(err, row) {
			console.log(row.id + ": " + row.thing);
		});
	});
	db.close();
	
	
	// Open DB
	var dbVersion = 1;
	var db = null;
	var request = indexedDB.open("recipes");
	request.onsuccess = function(e) {
		db = e.target.result;

		// We can only create Object stores in a setVersion transaction;
		if (dbVersion != db.version) {
			var setVrequest = db.setVersion(dbVersion);

			// onsuccess is the only place we can create Object Stores
			setVrequest.onerror = onError;
			setVrequest.onsuccess = function(e) {
				// Reformat DB
				// TODO: Read this data in first to reformat it
				if (db.objectStoreNames.contains("recipes")) {
					db.deleteObjectStore("recipes");
				}

				var store = db.createObjectStore("recipes", {keyPath: "id"});
				e.target.transaction.oncomplete = function() {
					//getAllTodoItems();
				};
			};
		} else {
			request.transaction.oncomplete = function() {
				//getAllTodoItems();
			};
		}
	};
	request.onerror = onError;

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
		
		  var db = html5rocks.indexedDB.db;
  var trans = db.transaction(["todo"], "readwrite");
  var store = trans.objectStore("todo");

  // Get everything in the store;
  var cursorRequest = store.openCursor();

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    renderTodo(result.value);
    result.continue();
  };

  cursorRequest.onerror = html5rocks.indexedDB.onerror;
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
	
	function onError(e) {
		trace(e);
	}

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