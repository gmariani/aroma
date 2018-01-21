var NeDBProxy = function() {
	
	var defaultRecipe = [
		{ title:'Rainbow Slaw', author:'Jennifer Mariani', source:'Family Recipe', category:'Side Dish', yields:'4 Servings', rating:5, tags:[], directions:'Combine the salad, seeds, and fruit. Mix up the dressing (vinegar, canola oil, seasoning, sugar) and pour over the salad. DO NOT ADD the crushed noodles until about an hour ahead of serving time.', notes:'Test Note', ingredients:['2 pkg of rainbow salad or broccoli salad','2 pkg of Ramen noodles (chicken or oriental)','1 can of crushed pineapple (drained)','1 pkg of sunflower seeds (keep leftovers in freezer)','1/3C vinegar','3/4C of canola oil','2 seasoning packs from Ramen noodles','1/2C of sugar'], picture:null}
	];
	
	var pxy = new EventDispatcher(),
		Datastore = require('nedb'),
		fs = require('fs'),
		recipeDB = "C:/Users/Gabriel/Desktop/recipes.nedb",
		//path = require('path'),
		db = new Datastore({ filename: recipeDB, autoload: true }),
		sortDirection = 1,
		sortType = 'title';
	
	
	if ( ! fs.existsSync(recipeDB) ) {
		console.log('create file', recipeDB);
		fs.writeFileSync(recipeDB, '', 'utf8');
	}
		
	// Set default data
	console.log(db);
	db.count({}, function (err, count) {
		console.log('recipe count', count);
		if ( count < 1 ) {
			console.log('insert recipe');
			db.insert( defaultRecipe );
		}
	});

	////////////
	// Public //
	////////////
	pxy.sort = function(type, direction) {
		if ( type === Notifications.SORT_LABEL ) {
			sortType = 'title';
			if ( direction === Constants.DESCENDING ) {
				sortDirection = -1;
			} else {
				sortDirection = 1;
			}
		} else if ( type === Notifications.SORT_RATING ) {
			sortType = 'rating';
			if ( direction === Constants.DESCENDING ) {
				sortDirection = -1;
			} else {
				sortDirection = 1;
			}
		}
	}

	/*
	Get all recipes
	*/
	pxy.getRecipes = function() {
		console.log('get recipes');
		var arrRecipes = [];
		db.find( { } ).sort( { sortType: sortDirection } ).exec(function ( err, docs ) {
			arrRecipes = docs;
			console.log('callback', arrRecipes);
		});
		/*db.find( { }, function ( err, docs ) {
			arrRecipes = docs;
		});*/
		console.log('return', arrRecipes);
		return arrRecipes;
	}

	/* Get a recipe with a given ID
	*/
	pxy.getRecipe = function( id ) {
		var recipe = null;
		db.find( { _id:id }, function ( err, docs ) {
			recipe = docs[0];
		});
		return recipe;
	}

	/*
	Updated a recipe with a given ID
	*/
	pxy.setRecipe = function( id, recipe ) {
		// db.update(query, update, options, callback)
		db.update( { _id: id }, recipe, {}, function ( err, numReplaced ) {
			// numReplaced = 1
		});

		pxy.dispatchEvent( new Note( Notifications.RECIPE_CHANGE, recipe ) );
	}

	/*
	Add recipe(s)
	@param arr An array of recipe objects to be added
	@return An array of IDs for the added recipes
	*/
	pxy.addRecipes = function( arrRecipes ) {
		var arrResult = [];
		/*for (var i = 0, l = arr.length; i < l; i++) {
			var r = arr[i];
			r.id = KEY++;
			// todo: validate recipe
			arrRecipes.push(r);
			// todo: notifiy new recipe added
			// todo: return id or index
			arrResult.push(r.id);
		}*/
		
		db.insert( arrRecipes, function ( err, newDocs ) {
			// Two documents were inserted in the database
			// newDocs is an array with these documents, augmented with their _id
			arrResult = newDocs;
		});
		
		pxy.dispatchEvent( new Note( Notifications.RECIPE_ADD, arrRecipes ) );
		return arrResult;
	}

	/*
	Remove recipe(s)
	@param arr An array of recipe objects to be removed
	*/
	pxy.removeRecipes = function( arrRecipes ) {
		/*for (var i = 0, l = arr.length; i < l; i++) {
			for (var j = 0, l2 = arrRecipes.length; j < l2; j++) {
				if (arr[i] === arrRecipes[j].id) {
					arrRecipes.splice(j, 1);
					break;
				}
			}
		}*/
		
		var arrIDs = [];
		for ( var i in arrRecipes ) {
			arrIDs.push( arrRecipes[i]._id );
		}
		
		db.find( { _id: { $in: arrIDs } }, function ( err, docs ) {
			//
		});
		
		//dbStatement.text = "DELETE FROM recipes WHERE rowid IN (" + strIDs + ")";
		//sendNotification(ApplicationFacade.SQL_START, "Deleting Recipe...");
		//dbStatement.execute(-1, new Responder(updateDBHandler, errorDBHandler));
		pxy.dispatchEvent( new Note( Notifications.RECIPE_REMOVE, arrRecipes ) );
	}

	/////////////
	// Private //
	/////////////
	
	function onError( e ) {
		trace( e );
	}

	return pxy;
};