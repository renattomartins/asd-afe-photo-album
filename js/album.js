/**
 * Album Class
 */
function Album(name) {
    this.id = undefined;
    this.name = name;
    this.photos = new Array();
}

/**
 * Get id
 */
Album.prototype.getId = function() {
    return this.id;
};

/**
 * Get name
 */
Album.prototype.getName = function() {
    return this.name;
};

/**
 * Get photos
 */
Album.prototype.getPhotos = function() {
    return this.photos;
};

/**
 * Get total photos
 */
Album.prototype.getTotalPhotos = function() {
    return this.photos.length;
};

/**
 * Adds photo to the Album
 */
Album.prototype.addPhoto = function(url) {
    this.photos.push(url);
};

/**
 * Removes photo to the Album
 */
Album.prototype.removePhoto = function(url) {
    var idx = this.photos.indexOf(url);
    this.photos.splice(idx, 1);
};

/**
 * Persist album
 */
Album.prototype.save = function() {
    this.id = nextId++;
    db.push(this);
};

/**
 * Load an album
 */
Album.prototype.load = function(id) {
    var album = db.find(findById, id);
    if (album == undefined) {
        this.id = undefined;
        this.name = undefined;
        return false;
    } else {
        this.id = album.id;
        this.name = album.name;
        this.photos = album.photos;
        return true;
    }
};

/**
 * Remove an album
 */
Album.prototype.remove = function(id) {
    var idx = db.findIndex(findById, id);
    if (idx == -1) {
        return false;
    } else {
        db.splice(idx, 1);
        return true;
    }
};


// Banco de dados
nextId = 1;
db = [];

function findById(currentValue) {
    return currentValue.getId() === parseInt(this.valueOf());
}
