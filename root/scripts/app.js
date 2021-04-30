const button = document.getElementById('getQuote');
button.addEventListener('click', function (e) {
    console.log('button was clicked');

    fetch('/clicked', { method: 'POST' })
        .then(function (response) {
            if (response.ok) {
                console.log('click was recorded');
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function (error) {
            console.log(error);
        });
});

setInterval(function () {
    fetch('/clicks', { method: 'GET' })
        .then(function (response) {
            if (response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function (data) {

            document.getElementById('total').value = document.getElementById('price').value * document.getElementById('gallonsRequested').value;
        })
        .catch(function (error) {
            console.log(error);
        });
}, 1000);
