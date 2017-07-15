/**
 * Album Class
 */
function Album (name) {
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
 * Removes photo to the Album
 */
Album.prototype.save = function() {
    db.push(this);
    this.id = db.length-1;
};


// Banco de dados
db = [];
