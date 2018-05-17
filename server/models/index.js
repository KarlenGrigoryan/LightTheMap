// Config
const config = require('../../config');
// MongoDb
const MongoClient = require('mongodb').MongoClient;

// Connection url
const url = config.db.url;

// Get cities
exports.getCities = (cb) => {
	MongoClient.connect(url, (err, db) => {
		  // Create a collection we want to drop later
		  const col = db.collection('cities');
		  col.find({}).toArray((err, items) => {
		    cb(err, items)
		  });
		 
	});
};

// Get most popular cities
exports.getPopularCities = (cb) => {
	MongoClient.connect(url, (err, db) => {
		// Create a collection we want to drop later
	  	const col = db.collection('cities');
	  	col.find({}).sort( { rating: -1 } ).toArray((err, items) => {
    		cb(err, items)
	  	});
	})
};

// Find Initiative
exports.findInitiative = (params, cb) => {
	MongoClient.connect(url, (err, db) => {
		// Create a collection we want to drop later
	  	const col = db.collection('initiatives');
	  	if(params) {
			var itiativeArr;

	  		for(let tag of params.tags) {
	  			col.find({$and: [{$or : [{ city: params.value }, { mail: params.value }]},{$or : [{tags: {$all: [{"$elemMatch":{id: tag.id}}] } }] }] }).toArray((err, items) => {
					itiativeArr = items.concat(items)
		  		});
	  		}
	  		setTimeout(() => {
		  		cb(undefined,itiativeArr)
	  		}, 1000)

	  		// db.close();
	  	}else {
	  		col.find({}).toArray((err, items) => {
	    		cb(err, items)
		  	});
	  	}
	})
}