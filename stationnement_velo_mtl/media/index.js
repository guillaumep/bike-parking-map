var osm_attrib = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
    cycle_attrib = 'OpenCycleMap',
    mtl_attrib = 'Ville de Montréal, Stationnement Montréal';
var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, 
                            attribution: [osm_attrib, mtl_attrib].join(', ')});
var openCycleMapLayer = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {opacity: 0.7,
                            attribution: [osm_attrib, cycle_attrib, mtl_attrib].join(', ')});

var map = L.map('map', {
    center: new L.LatLng(45.51947, -73.56017),
    zoom: 15,
    layers: [osmLayer, openCycleMapLayer]
});

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
sm_layer = L.geoJson(parcometres, {pointToLayer: parco_point_to_layer}).addTo(map);

support_point_to_layer = function (feature, latlng) {
    var icon = L.icon({
        iconUrl: '/media/icon_bike_green.png',
        iconSize:     [25, 32], // size of the icon
        popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
    });
    return L.marker(latlng, {icon: icon});
}
vdm_layer = L.geoJson(support_velo_sigs, {pointToLayer: support_point_to_layer}).addTo(map);


var baseLayers = {
    "OpenStreetMap": osmLayer,
    "OpenCycleMap": openCycleMapLayer
};

var overlays = {
    "Données d'OpenStreetMap": opl,
    "Données de la Ville de Montréal": vdm_layer,
    "Données de Stationnement Montréal": sm_layer
};

L.control.layers(baseLayers, overlays).addTo(map);



function submitValue(data) {
    $.post("/submit", data, function(data) {
        console.log(data);
    });
}


map.on("click", function(e) {
    map.openPopup($("#form").html(), e.latlng);
    $("#submit-button").on("click", function(e) {
        submitValue($(this).parent().serializeArray());
        return false;
    });
});
