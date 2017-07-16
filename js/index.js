/**
 * Main file with just some little JavaScript things for now.
 */
$(document).ready(function() {

    // Instancia o widget PanelPhotosWidget
    panelPhotos = new PanelPhotosWidget();

    // Botão abrir modal Novo Álbum
    $('.btn-add-album').on('click', function(e) {
        $('#album-name').val('');
        setTimeout(function(){$('#album-name').focus()}, 500);
    });

    // Botão salvar Novo Álbum
    $('.btn-add-album-save').on('click', function(e) {
        e.preventDefault();

        // Cria novo objeto Album
        var albumName = $('#album-name').val();
        var albumModel = new Album(albumName);
        albumModel.save();

        // Cria novo widget AlbumWidget
        var albumWidget = new AlbumWidget(albumModel);

        $('.panel-albums-items').append(albumWidget.getElem());
        $('.panel-albums-select').append('<option value="' + albumModel.getId() + '">' + albumModel.getName() + '</option>');
        $('.panel-albums-list').addClass('has-items');
        $('.panel-albums-list > .panel-footer').text(db.length + (db.length == 1 ? ' álbum' : ' álbuns'));
        $('#modal-add-album').modal('hide');

        // Seleciona álbum no painel de fotos
        panelPhotos.selectAlbum(albumModel.getId());
    });

    // Display slide-show
    $('.btn-slide-show').on('click', function(e) {
        e.preventDefault();
        $('.slide-show').show();
    });

    // Hide slide-show
    $('.btn-close-slide-show').on('click', function(e) {
        e.preventDefault();
        $('.slide-show').hide();
    });


    // Display search-area-results
    $('.btn-do-search').on('click', function(e) {
        e.preventDefault();
        $('.search-area-results').toggleClass('hidden');
    });

    // Prevent default to other links
    $('.btn-view-album').on('click', function(e) {
        e.preventDefault();
    });
    $('.btn-delete-album').on('click', function(e) {
        e.preventDefault();
    });
    $('.btn-delete-photo').on('click', function(e) {
        e.preventDefault();
    });
    $('.carousel-control').on('click', function(e) {
        e.preventDefault();
    });
});
