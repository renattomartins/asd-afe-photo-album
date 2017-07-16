/**
 * AlbumWidget Class
 */
function AlbumWidget(albumModel) {
    this.model = albumModel;
    this.$elem = $('#template-album-item').clone();

    // Populate
    this.$elem.removeAttr('id');
    this.$elem.find('.btn-view-album').attr('href', function(i, val) {
        $(this).attr('href', val.replace('{0}', albumModel.getId()));
    });

    this.$elem.find('.btn-view-album').attr('title', function(i, val) {
        $(this).attr('title', val.replace('{1}', albumModel.getName()));
    });

    this.$elem.find('.album-item-img').attr('src', 'imgs/default.png');
    this.$elem.find('.album-item-details-name').text(albumModel.getName());
    this.$elem.find('.album-item-details-total').text('(0 fotos)');
    this.$elem.find('.btn-delete-album').attr('data-href', function(i, val) {
        $(this).attr('data-href', val.replace('{0}', albumModel.getId()));
    });
}

/**
 * Get DOM element
 */
AlbumWidget.prototype.getElem = function() {
    return this.$elem;
};



/**
 * PanelPhotosWidget Class
 */
function PanelPhotosWidget() {
    this.$elem = $('.panel-photos');
}

/**
 * Get DOM element
 */
PanelPhotosWidget.prototype.getElem = function() {
    return this.$elem;
};

/**
 * Select an album
 */
PanelPhotosWidget.prototype.selectAlbum = function(albumId) {

    var currentAlbum = db[albumId];

    this.$elem.addClass('album-selected').attr('data-id', albumId);
    if (currentAlbum.photos.length > 0) {
        this.$elem.addClass('has-photos');
    }
    this.$elem.find('.panel-photos-title').text(currentAlbum.name);

    this.$elem.find('.search-area').hide().removeClass('hidden').slideDown();
    setTimeout(function() {
        $('.search-area-input').focus();
    }, 600);
};