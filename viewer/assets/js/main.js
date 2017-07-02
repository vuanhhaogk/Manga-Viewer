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

App.show = function(ls){
    for (var i = 0; i < ls.length; i++){
        var image = new Image();
        image.src = 'images/' + ls[i];
        image.onclick = function(){
            if (this.style.maxWidth === 'unset')
                this.style.maxWidth = '100%'
            else
                this.style.maxWidth = 'unset';
        }
        document.body.appendChild(image);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    App.load();
});
