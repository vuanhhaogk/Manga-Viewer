var App = {};

App.load = function(){
    var that = this;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200){
            that.show(JSON.parse(xhttp.responseText));
        }
    }

    xhttp.open('GET', '/get-list', true);
    xhttp.send();
}

App.voteImage = function(){
    let data = this.getAttribute('data')


    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', '/vote?name=' + data, true);
    xhttp.send();
}

App.show = function(ls){
    for (var i = 0; i < ls.length; i++){
        var box = document.createElement('div')
        box.className = 'box'

        var image = new Image();
        image.src = 'images/' + ls[i];
        image.onclick = function(){
            if (this.style.maxWidth === 'unset')
                this.style.maxWidth = '100%'
            else
                this.style.maxWidth = 'unset';
        }

        var star = document.createElement('button')
        star.className = 'fa fa-star'
        star.setAttribute('data', ls[i])
        star.onclick = this.voteImage;

        box.appendChild(image)
        box.appendChild(star)
        document.body.appendChild(box);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    App.load();
});
