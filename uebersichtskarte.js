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
  fullscreenControl: true, //Fullscreen plugin
  layers: [baselayers.standard]
})
let overlays = {
  geometry: L.featureGroup(), //overlay für die Zonierung definieren
}

// Kartenhintergründe und Overlays zur Layer-Control hinzufügen -namen der karten, bzw. andre karten könnte man noch ausstauschen
let layerControl = L.control.layers({
    "Standard": baselayers.standard,
    "Topographie": baselayers.topographie,
    "Bildkarte": baselayers.imagery,
  },
  //{"Interviews": overlays.Comments,} //ausgeklammert, weil die karte damit nicht mehr ging, weil dieser layer nicht existiert
  { //Klammer erneut innerhalb der runden klammer öffnen, damit es eine visuelle abtrennung gibt, wo man dann andre sachen einblenden kann. 
    "Zonierung des Biosphärenreservates": overlays.geometry,
  }).addTo(map);


overlays.geometry.addTo(map) //Overlays anzeigen lassen

//Konst erstellen, über die wir auf die daten der zonierung zugreifen
const ZONE = [{
  title: "Zonierung des UBEVM",
  data: "data/UBEVM_Zonierung_Perimeter.json",
}]

//VAriabel erstellen in der die Zonierungen unterschiedlihce Farben bekommen. Braucht kein eigenes skript, weil nur wenig inhalt
const COLORS = {
  "Kernzone": "darkred",
  "Pflegezone": "green",
  "Entwicklungszone": "orange"
}
//Forschleife machen, die über die ganzen geojson daten Läuft
for (let config of ZONE) {
  fetch(config.data)
    .then(response => response.json()) //innere runde klammer: Funktionsaufruf, damit es gestartet / ausgeführt wird ! 
    .then(geojsonData => {
      //console.log("Data: ", geojsonData);
      if (config.title == "Zonierung des UBEVM") {
        drawGeometry(geojsonData);
      }
    });
};
//Zonierung "zeichnen" + hinzufügen
let drawGeometry = (geojsonData) => {
  //console.log("Geometry", geojsonData);
  L.geoJson(geojsonData, {
    style: (feature) => {
      let col = COLORS[feature.properties.Zone]; //Eckige Klammern weil ich in einem Objekt auf einen wert/Schlüssel zureifen will, der ein Leerzeichen aht
      return {
          color: col,
          fillOpacity: 0.2,      
      }
    }, //Popups einbinden und beschriften, damit man auf die Zone klicken kann, wenn wir das wollen
    onEachFeature: (features, layer) => {
      layer.bindPopup(`<strong>Zonierung des UBEVM</strong>
      <hr>
      ${features.properties.Zone || ""}<br>
      Gesamtgröße: ${features.properties.Area_ha|| ""} ha
      `);
    },
  }).addTo(overlays.geometry)
}



// Plugin hash
L.hash(map);

// Plugin Minimap
var miniMap = new L.Control.MiniMap(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
  toggleDisplay: true, //minimap ein und ausklappbar
  minimized: false //fangt im eingeklappten zustand an. diese einstellungen kann man alle in der leaflet/github davon nachlesen
}).addTo(map);

//Maßstab siehe: https://leafletjs.com/reference-1.7.1.html#control-scale
L.control.scale({
  imperial: false //löscht meilen raus
}).addTo(map)


/* DROPDOWN FÜR Quellenangaben
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