var attribution = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors, Ville de Montréal, Stationnement Montréal';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attribution].join(', ')});

var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(45.51947, -73.56017), 15);

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
                iconUrl: '/media/icon_bike_blue.png',
                //shadowUrl: 'leaf-shadow.png',

                iconSize:     [25, 32], // size of the icon
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

//GeoJSON layers

parco_point_to_layer = function (feature, latlng) {
    var icon = L.icon({
        iconUrl: '/media/icon_parking.png',
        iconSize:     [25, 32], // size of the icon
        popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
    });
    return L.marker(latlng, {icon: icon});
}
L.geoJson(parcometres, {pointToLayer: parco_point_to_layer}).addTo(map);

support_point_to_layer = function (feature, latlng) {
    var icon = L.icon({
        iconUrl: '/media/icon_bike_green.png',
        iconSize:     [25, 32], // size of the icon
        popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
    });
    return L.marker(latlng, {icon: icon});
}
L.geoJson(support_velo_sigs, {pointToLayer: support_point_to_layer}).addTo(map);


function submitValue(data, popup) {
    $.post("/submit", data, function(data) {
        popup.closePopup();
    });
}


map.on("click", function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    var popup = map.openPopup($("#form").html(), e.latlng);
    $("#submit-button").on("click", function(e) {
        var data = $(this).parent().serializeArray();
        data[2] = {name: "lat", value: lat.toString()};
        data[3] = {name: "lng", value: lng.toString()};
        submitValue(data, popup);
        return false;
    });
});
