export default function getData(url, callback) {
    window.searchDataLoaded = function(resp) {
        if(callback) callback(resp);
    };
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script = document.createElement('script');
    script.src = url + '&callback=searchDataLoaded';
    target.parentNode.insertBefore(script, target);
}