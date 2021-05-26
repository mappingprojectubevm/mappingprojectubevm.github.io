// Kartenhintergründe definieren, provider ist leaflet : http://leaflet-extras.github.io/leaflet-providers/preview/index.html     http://leaflet-extras.github.io/leaflet-providers/preview/
let baselayers = {
    standard: L.tileLayer.provider("OpenStreetMap.Mapnik"),
    topographie: L.tileLayer.provider("OpenTopoMap"),
    imagery: L.tileLayer.provider("Esri.WorldImagery"),
};

//variable erstellen, und einstellungen für die Map hinzufügen:
let map = L.map('overviewmap', { //muss overviewmap heißen, weil das div element dazu im index html so definiert. ergebniskarte heißt map!
    center: [46.7699, 10.2405], //welcher kartenausschnitt u darunter welcher zoom
    zoom: 10, 
    fullscreenControl: true,//Fullscreen plugin
    layers: [baselayers.standard]
}) 

// Kartenhintergründe und Overlays zur Layer-Control hinzufügen -namen der karten, bzw. andre karten könnte man noch ausstauschen
let layerControl = L.control.layers({
    "Standard": baselayers.standard,
    "Topographie": baselayers.topographie,
    "Bildkarte": baselayers.imagery,
},
//{"Interviews": overlays.Comments,} //ausgeklammert, weil die karte damit nicht mehr ging, weil dieser layer nicht existiert

// { //Klammer erneut innerhalb der runden klammer öffnen, damit es eine visuelle abtrennung gibt, wo man dann andre sachen einblenden kann. 
//     // "Zonierung des Biosphärenreservates": , layer fehlt
// }
).addTo(map);

// Plugin hash
L.hash(map);

// Plugin Minimap
var miniMap = new L.Control.MiniMap(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
    toggleDisplay: true, //minimap ein und ausklappbar
    minimized: false //fangt im eingeklappten zustand an. diese einstellungen kann man alle in der leaflet/github davon nachlesen
}).addTo(map);




/* DROPDOWN FÜR LEGENDE
When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
  
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var d = 0; d < dropdowns.length; d++) {
        var openDropdown = dropdowns[d];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  
/* icons einfügen 



let drawComment = (geojsonData) => {
  L.geoJson(geojsonData, {
      onEachFeature: (feature, layer) => {
          layer.bindPopup(`<strong>${feature.properties.NAME}</strong>
          <hr>
          Comment: ${feature.properties.NAME}`)
      },
      pointToLayer: (geoJsonPoint, latlng) => {
          return L.marker(latlng, {
              icon: L.icon({
                  iconUrl: 'icons/comment-map-icon.png',
                  iconSize: [38, 38]
              })
          })
      },
      attribution: '<a href= "https://"> Stadt Wien</a>,<a href= "">Map Icons Collection<a/>'
  }).addTo(overlays.sightSeeing);
}*/