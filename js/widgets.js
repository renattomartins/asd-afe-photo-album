/**
 * AlbumListWidget Class
 */
function AlbumListWidget() {
    this.$elem = $('.panel-albums-list');
}

/**
 * Get DOM element
 */
AlbumListWidget.prototype.getElem = function() {
    return this.$elem;
};

/**
 * Add album item to the view
 */
AlbumListWidget.prototype.addAlbum = function(albumWidget, albumModel) {
    this.$elem.find('.panel-albums-items').append(albumWidget.getElem());
    this.$elem.find('.panel-albums-select').append('<option value="' + albumModel.getId() + '">' + albumModel.getName() + '</option>');
    this.updateCounter();
};

/**
 * Remove album item to the view
 */
AlbumListWidget.prototype.removeAlbum = function($elem) {
    $elem.slideUp(200, function() {
        $(this).remove();
    });
    this.updateCounter();
};

/**
 * Update counter at bottom and state of the widget (has-items)
 */
AlbumListWidget.prototype.updateCounter = function() {

    // state
    if (db.length == 0) {
        this.$elem.removeClass('has-items');
    } else {
        this.$elem.addClass('has-items');
    }

    // counter
    this.$elem.children('.panel-footer').text(db.length + (db.length == 1 ? ' álbum' : ' álbuns'));
};

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
 * Get selected album id
 */
PanelPhotosWidget.prototype.getSelectedAlbumId = function() {
    return parseInt(this.$elem.attr('data-id'));
};

/**
 * Select an album
 */
PanelPhotosWidget.prototype.selectAlbum = function(albumId) {
    var currentAlbum = new Album();
    currentAlbum.load(albumId);

    this.$elem.addClass('album-selected').attr('data-id', albumId);
    if (currentAlbum.getTotalPhotos() > 0) {
        this.$elem.addClass('has-photos');
    }
    this.$elem.find('.panel-photos-title').text(currentAlbum.getName());
    this.$elem.find('.search-area').hide().removeClass('hidden').slideDown();
    $('.panel-albums-select').val(albumId);
};


/**
 * Deselect an album
 */
PanelPhotosWidget.prototype.deselectAlbum = function() {
    this.$elem.removeClass('album-selected has-photos').attr('data-id', '');

    this.$elem.find('.panel-photos-title').text("(nenhum álbum selecionado)");
    this.$elem.find('.search-area').addClass('hidden');
};



/**
 * SearchAreaWidget Class
 */
function SearchAreaWidget() {
    this.$elem = $('.search-area');
}

/**
 * Get DOM element
 */
SearchAreaWidget.prototype.getElem = function() {
    return this.$elem;
};

SearchAreaWidget.prototype.fillResults = function(data) {
    var $searchAreaResults = $('.search-area-results');
    var $searchAreaResultsRow = $('.search-area-results > .row');
    $searchAreaResults.removeClass('hidden');
    $searchAreaResultsRow.empty();

    if (data.total_count === 0) {
        $searchAreaResults.append('<p class="search-area-results-no-results">Nenhum resultado para a busca realizada.</p>');
    }
    else {
        $.each(data.data, function(i, item) {
            var $thumb = $('#template-photo-result').clone();
            $thumb.find('img').attr('src', item.assets.large_thumb.url);
            $thumb.find('img').attr('data-img-src', item.assets.preview.url);
            $thumb.appendTo($searchAreaResultsRow);
        });
    }
};
