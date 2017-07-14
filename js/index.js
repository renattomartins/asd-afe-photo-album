/**
 * Main file with just some little JavaScript things for now.
 */
$(document).ready(function() {

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
    $('.btn-view-album').on('click', function(e) { e.preventDefault(); });
    $('.btn-delete-album').on('click', function(e) { e.preventDefault(); });
    $('.btn-delete-photo').on('click', function(e) { e.preventDefault(); });
    $('.btn-add-album').on('click', function(e) { e.preventDefault(); });
    $('.carousel-control').on('click', function(e) { e.preventDefault(); });
});
