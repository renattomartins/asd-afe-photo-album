/**
 * Main file with just some little JavaScript things for now.
 */
$(document).ready(function() {

    // Instancia o widgets AlbumListWidget e PanelPhotosWidget
    albumList = new AlbumListWidget();
    panelPhotos = new PanelPhotosWidget();
    searchArea = new SearchAreaWidget();

    // Botão abrir modal Novo Álbum
    $('.btn-add-album').on('click', function(e) {
        $('#album-name').val('');
        setTimeout(function() {
            $('#album-name').focus()
        }, 500);
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
        albumList.addAlbum(albumWidget, albumModel);

        // Fecha modal
        $('#modal-add-album').modal('hide');

        // Seleciona álbum no painel de fotos
        panelPhotos.selectAlbum(albumModel.getId());
    });

    // Seleciona álbum
    $('.panel-albums-list').delegate('.btn-view-album', 'click', function(e) {
        e.preventDefault();

        var albumId = $(this).attr('href').replace('#/album/', '').replace('/view', '');
        panelPhotos.selectAlbum(albumId);
    });

    // Seleciona álbum (mobile)
    $('.panel-albums-select').on('change', function(e) {
        panelPhotos.selectAlbum($(this).val());
    });

    // Exclui álbum
    $('.panel-albums-list').delegate('.btn-delete-album', 'click', function(e) {
        e.preventDefault();

        var albumId = $(this).attr('data-href').replace('#/album/', '').replace('/delete', '');
        var album = new Album();
        album.load(albumId);
        var isToExclude = confirm('Tem ceteza que deseja excluir o álbum "' + album.getName() + '"');

        if (isToExclude) {
            album.remove(albumId);
            albumList.removeAlbum($(this).parent());
            if (panelPhotos.getSelectedAlbumId() == albumId)
                panelPhotos.deselectAlbum();
        }
    });

    // Realiza pesquisa
    $('.btn-do-search').on('click', function(e) {
        e.preventDefault();

        var searchInput = $('.search-area-input').val();
        search('per_page=18&width=400&height=400&query=' + searchInput);
    });

    // Adiciona foto ao álbum pessoal
    $('.panel-photos').delegate('.btn-add-photo', 'click', function(e) {
        e.preventDefault();

        var imgSrc = $(this).attr('data-img-src');
        var album = new Album();
        album.load(panelPhotos.getSelectedAlbumId());
        album.addPhoto(imgSrc);

        var $album = $('#album-item-' + album.getId());
        var albumImage = $album.find('.album-item-img').attr('src');
        if (albumImage == 'imgs/default.png') {
            $album.find('.album-item-img').attr('src', imgSrc);
        }

        $('#album-item-' + album.getId() + ' .album-item-details-total')
            .text('(' + album.getTotalPhotos() + (album.getTotalPhotos() == 1 ? ' foto)' : ' fotos)'));

        panelPhotos.addPhoto(imgSrc);
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



    // Prevent default to other links
    $('.btn-delete-photo').on('click', function(e) {
        e.preventDefault();
    });
    $('.carousel-control').on('click', function(e) {
        e.preventDefault();
    });
});
