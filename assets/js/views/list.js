import View from 'lib/view';

export default class List extends View {
    render(data) {
        super.render();
        for(var i in data) {
            if(data.hasOwnProperty( i )) {
                let stream = data[i];


                // Container for content
                var itemContainer = document.createElement("div");
                itemContainer.setAttribute('class', 'item');

                //Img
                var img = document.createElement("img");
                img.setAttribute('class', 'preview-image');
                img.setAttribute('src', stream.preview.small);

                // Container for content
                var infoContainer = document.createElement("div");
                infoContainer.setAttribute('class', 'info-container');

                //Name
                var h3 = document.createElement("h3");
                h3.setAttribute('class', 'display-name');
                h3.innerHTML = stream.channel.display_name;

                //Game name
                var gameName = document.createElement("h4");
                gameName.setAttribute('class', 'game-name');
                gameName.innerHTML = stream.game;

                //Stream name
                var streamName = document.createElement("h4");
                streamName.setAttribute('class', 'stream-name');
                gameName.innerHTML = stream.channel.name;

                //Stream description
                var streamDescription = document.createElement("h5");
                streamName.setAttribute('class', 'stream-description');
                gameName.innerHTML = stream.channel.status;

                //Clearfix
                var clearfix = document.createElement("div");
                clearfix.setAttribute('class', 'clearfix');

                // Append to DOM
                itemContainer.appendChild(img);
                infoContainer.appendChild(h3);
                infoContainer.appendChild(gameName);
                infoContainer.appendChild(streamName);
                infoContainer.appendChild(streamDescription);
                itemContainer.appendChild(infoContainer);
                itemContainer.appendChild(clearfix);
                this.el.appendChild(itemContainer);
            }
        }
    }
}