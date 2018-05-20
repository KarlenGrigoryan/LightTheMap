// Config
const config = require('../../config');
// MongoDb
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

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
        col.find({}).sort({rating: -1}).toArray((err, items) => {
            cb(err, items)
        });
    })
};

// Get Initiative details
exports.getnitiativeDetails = (params, cb) => {
    // Check if itiative ID is'n empty
    if (!params.id) {
        let err = {
            message: 'Please enter itiative id'
        };
        cb(err, undefined);
        return false;
    }

    // Find initiative by ID
    MongoClient.connect(url, (err, db) => {
        // Create a collection we want to drop later
        const col = db.collection('initiatives');
        col.find({"_id": ObjectId(params.id)}).toArray((err, items) => {
            cb(err, items)
        });
    });
};


//Get Tags
exports.getTags = (cb) => {
    MongoClient.connect(url, (err, db) => {
        // Create a collection we want to drop later
        const col = db.collection('tags');
        col.find({}).toArray((err, items) => {
            cb(err, items)
        });
    });
};

// Find Initiative
exports.findInitiative = (params, cb) => {
    MongoClient.connect(url, (err, db) => {
        // Create a collection we want to drop later
        const col = db.collection('initiatives');
        if (Object.keys(params).length !== 0) {

            function getnitiatives(documents) {
                let promise = new Promise((resolve, reject) => {
                    // Check if value is
                    if (params.value) {
                        // Check if tags is not empty and sort is empty
                        if (params.tags.length !== 0 && Object.keys(params.sort).length === 0) {
                            params.tags.forEach(function (tag) {
                                col.find({$and: [{$or: [{"address.city": params.value}, {"social_networks.email": params.value}]}, {$or: [{tags: {$all: [{"$elemMatch": {id: tag.id}}]}}]}]}).toArray((err, items) => {
                                    resolve(items)
                                });
                            });
                        } else if (Object.keys(params.sort).length !== 0 && params.tags.length === 0) { // Check if sort is not empty and tags is empty
                            // Check kind of sort
                            if (params.sort.release === 1 || params.sort.release === -1) {
                                col.find({$or: [{"address.city": params.value}, {"social_networks.email": params.value}]}).sort({crated: params.sort.release}).toArray((err, items) => {
                                    resolve(items)
                                });
                            } else {
                                col.find({$or: [{"address.city": params.value}, {"social_networks.email": params.value}]}).sort({rating: -1}).toArray((err, items) => {
                                    resolve(items)
                                });
                            }
                        } else if (params.tags.length !== 0 && Object.keys(params.sort).length !== 0) { // Check if tags is not empty and sort is empty
                            params.tags.forEach(function (tag) {
                                // Check kind of sort
                                if (params.sort.release === 1 || params.sort.release === -1) {
                                    col.find({$and: [{$or: [{"address.city": params.value}, {"social_networks.email": params.value}]}, {$or: [{tags: {$all: [{"$elemMatch": {id: tag.id}}]}}]}]}).sort({crated: params.sort.release}).toArray((err, items) => {
                                        resolve(items)
                                    });
                                } else {
                                    col.find({$and: [{$or: [{"address.city": params.value}, {"social_networks.email": params.value}]}, {$or: [{tags: {$all: [{"$elemMatch": {id: tag.id}}]}}]}]}).sort({rating: -1}).toArray((err, items) => {
                                        resolve(items)
                                    });
                                }

                            });
                        } else {
                            col.find({$or: [{"address.city": params.value}, {"social_networks.email": params.value}]}).toArray((err, items) => {
                                resolve(items)
                            });
                        }

                    } else { // if value is empty
                        if (params.tags.length !== 0 && Object.keys(params.sort).length === 0) { // Check if tags is not empty and sort is empty
                            params.tags.forEach(function (tag) {
                                col.find({tags: {$elemMatch: {id: tag.id}}}).toArray((err, items) => {
                                    resolve(items)
                                });
                            });
                        } else if (Object.keys(params.sort).length !== 0 && params.tags.length === 0) {  // Check if sort is not empty and tags is empty
                            // Check kind of sort
                            if (params.sort.release === 1 || params.sort.release === -1) {
                                col.find({}).sort({crated: params.sort.release}).toArray((err, items) => {
                                    resolve(items)
                                });
                            } else {
                                col.find({}).sort({rating: -1}).toArray((err, items) => {
                                    resolve(items)
                                });
                            }
                        } else if (params.tags.length !== 0 && Object.keys(params.sort).length !== 0) {// Check if tags is not empty and sort is empty
                            params.tags.forEach(function (tag) {
                                // Check kind of sort
                                if (params.sort.release === 1 || params.sort.release === -1) {
                                    col.find({}, {tags: {$all: [{"$elemMatch": {id: tag.id}}]}}).sort({crated: params.sort.release}).toArray((err, items) => {
                                        resolve(items)
                                    });
                                } else {
                                    col.find({}, {tags: {$all: [{"$elemMatch": {id: tag.id}}]}}).sort({rating: -1}).toArray((err, items) => {
                                        resolve(items)
                                    });
                                }

                            });
                        }
                    }

                });
                return promise
            }

            getnitiatives({}).then((res) => {
                cb(undefined, res)
            })

        } else {
            col.find({}).sort({rating: -1}).toArray((err, items) => {
                cb(err, items)
            });
        }
    })
};


// Add Initiative
exports.addInitiative = (params, cb) => {
    // Check if E-mail address is'n empty
    if (!params.email) {
        err = {
            message: 'Please enter E-mail address'
        };
        cb(err, undefined);
        return false;
    }
    // Add initiative on DB
    MongoClient.connect(url, (err, db) => {
        // Create a collection we want to drop later
        const col = db.collection('added_initiatives');
        col.insert({email: params.email}, (err, result) => {
            cb(err, result)
        })

    });
};