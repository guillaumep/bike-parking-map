var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
    attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 0.7, attribution: [attr_osm, attr_overpass].join(', ')});

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
map.on("click", function(e) {
    map.openPopup($("#form").html(), e.latlng);
});
