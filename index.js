var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
    attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});

var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(45.51947, -73.56017), 15);

var clientId = '951575559952.apps.googleusercontent.com';
var apiKey = 'AIzaSyB48YglC00Y2SGMRoOmfXu1RFcrUC3xb5k';


//OverPassAPI overlay
var opl = new L.OverPassLayer({
    query: "http://overpass-api.de/api/interpreter?data=[out:json];node(BBOX)[amenity=bicycle_parking];out;",
    callback: function(data) {
        for(i=0;i<data.elements.length;i++) {
            e = data.elements[i];

            if (e.id in this.instance._ids) return;
            this.instance._ids[e.id] = true;
            var pos = new L.LatLng(e.lat, e.lon);
            var popup = this.instance._poiInfo(e.tags,e.id);
            var icon = L.icon({
                iconUrl: 'velo.png',
                //shadowUrl: 'leaf-shadow.png',

                iconSize:     [30, 30], // size of the icon
                //shadowSize:   [50, 64], // size of the shadow
                //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                //shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
            });
            marker = L.marker(pos, {icon: icon}).bindPopup(popup);

            this.instance.addLayer(marker);
        }
    },
});

map.addLayer(opl);

function initialize() {
    gapi.client.setApiKey(apiKey);
}


// Execute the client request.
function runClientRequest(request, callback) {
    var restRequest = gapi.client.request(request);
    restRequest.execute(callback);
}


var callback = function(element) {
    return function(resp) {
        var output = JSON.stringify(resp);
        alert(output);
    };
}


// Send an SQL query to Fusion Tables.
function query(query) {
    var lowerCaseQuery = query.toLowerCase();
    var path = '/fusiontables/v1/query';
    var callback = function(element) {
        return function(resp) {
            var output = JSON.stringify(resp);
            document.getElementById(element).innerHTML = output;
        };
    }
    if (lowerCaseQuery.indexOf('select') != 0 &&
        lowerCaseQuery.indexOf('show') != 0 &&
        lowerCaseQuery.indexOf('describe') != 0) {

        var body = 'sql=' + encodeURIComponent(query);
        runClientRequest({
            path: path,
            body: body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': body.length
            },
            method: 'POST'
        }, callback('insert-data-output'));

    } else {
        runClientRequest({
            path: path,
            params: { 'sql': query }
        }, callback());
    }
}


function submitValue(values) {
    var tableId = "1mTHq1dSxMRNHgCuViHyhi9RiNBv681c7LZdlaVU";
    var path = '/fusiontables/v1/query';

    var insert = [];
    insert.push('INSERT INTO ');
    insert.push(tableId);
    insert.push(' (Purpose, Comments) VALUES (');
    insert.push(values);
    insert.push(')');
    query(insert.join(''));
}


map.on("click", function(e) {
    map.openPopup($("#form").html(), e.latlng);
    $("#submit-button").on("click", function(e) {
        submitValue(($(this).serialize()));
        return false;
    });
});
