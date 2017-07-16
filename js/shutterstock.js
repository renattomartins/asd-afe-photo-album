var clientId = '81f0d84c5dee8b11eeee';
var authorizationCode = '';
var access_token = '';
var state = 'test_localhost';
var API_URL = 'https://api.shutterstock.com/v2';
var APP_URL = 'http://localhost:8888/';

// Verifica se o authorizationCode foi passada na URL, senão
// desvia para o shutterstock para pegar tal código
authorizationCode = getShuttestocktVariable('code');
if (!authorizationCode)
    window.location = API_URL + '/oauth/authorize?client_id=' + clientId + '&response_type=code&redirect_uri=' + APP_URL + '&state=' + state;
else {
    // Pega access_token
    var jqxhr = $.ajax({
            type: "POST",
            url: API_URL + '/oauth/access_token',
            data: {
                client_id: clientId,
                client_secret: '36f38e305acf88ffd1aba4821865261f0c1fe626',
                code: authorizationCode,
                grant_type: 'authorization_code'
            }
        })
        .done(function(data) {
            console.log('Usuário autenticado e autorizado');
            access_token = data.access_token;
        })
        .fail(function(xhr, status, err) {
            console.log('Failed to authorize user');
            window.location = APP_URL;
        });
}

// Função para obter parametros passados via Query String
function getShuttestocktVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

// Search images
function search(opts) {
    if (!access_token) return;
    authorization = 'Bearer ' + access_token;
    var jqxhr = $.ajax({
            url: API_URL + '/images/search',
            data: opts,
            headers: {
                Authorization: authorization
            }
        })
        .done(function(data) {
            searchArea.fillResults(data);
        })
        .fail(function(xhr, status, err) {
            alert('Failed to retrieve image search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));
        });
    return jqxhr;
}

/* Render functions */
// Create image wrapper component
function renderImageComponent(image, minHeightCSS) {
    if (!image || !image.assets || !image.assets.large_thumb || !image.assets.large_thumb.url) return;
    var wrapper = $('<div>');
    var thumbWrapper = $('<div>');
    var thumbnail = $('<img>');
    var description = $('<p>');
    $(thumbnail)
        .click(fetchDetails)
        .attr('id', image.id)
        .attr('src', image.assets.large_thumb.url)
        .attr('title', image.description);
    $(thumbWrapper)
        .addClass('thumbnail-crop')
        .css('height', image.assets.large_thumb.height)
        .css('width', image.assets.large_thumb.width)
        .append(thumbnail);
    $(wrapper)
        .addClass('image-float-wrapper image ' + minHeightCSS)
        .append(thumbWrapper);
    return wrapper;
}
