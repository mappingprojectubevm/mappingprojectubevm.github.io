// Kartenhintergründe definieren, provider ist leaflet : http://leaflet-extras.github.io/leaflet-providers/preview/index.html     http://leaflet-extras.github.io/leaflet-providers/preview/
let baselayers = {
  standard: L.tileLayer.provider("OpenStreetMap.Mapnik"),
  topographie: L.tileLayer.provider("OpenTopoMap"),
  imagery: L.tileLayer.provider("Esri.WorldImagery"),
};

//variable "map" erstellen und Einstellungen für die Map hinzufügen:
let map = L.map('overviewmap', { //muss overviewmap heißen, weil das div element dazu im index html so definiert ist. Die ID der Ergebniskarte heißt "map"!
  center: [46.7699, 10.2405], //welcher Kartenausschnitt
  zoom: 10,//welcher Zoom
  fullscreenControl: true, //Fullscreen Plugin
  layers: [baselayers.standard]
})
let overlays = {
  geometry: L.featureGroup(), //Overlay für das Hinzufügen der Zonierung definieren
}

//Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "Standard": baselayers.standard,
    "Topographie": baselayers.topographie,
    "Bildkarte": baselayers.imagery,
  },
  { //Klammer erneut innerhalb der runden klammer öffnen, damit es eine visuelle Abtrennung gibt zwischen den verschiedenen Overlays 
    "Zonierung des Biosphärenreservates": overlays.geometry,
  }).addTo(map);

overlays.geometry.addTo(map) //Overlays anzeigen lassen

//Konstante erstellen, über die wir auf die Daten der Zonierung zugreifen
const ZONE = [{
  title: "Zonierung des UBEVM",
  data: "data/UBEVM_Zonierung_Perimeter.json",
}]

//Variable erstellen in der die Zonierungen unterschiedliche Farben bekommen. Braucht kein eigenes Skript, weil nur wenig Inhalt. Farben können hier angepasst werden:
const COLORS = {
  "Kernzone": "darkred",
  "Pflegezone": "green",
  "Entwicklungszone": "orange"
}
//For-Schleife machen, die über die ganzen Geojson-Daten Läuft
for (let config of ZONE) {
  fetch(config.data)
    .then(response => response.json()) //innere runde Klammer: Funktionsaufruf, damit es gestartet / ausgeführt wird 
    .then(geojsonData => {
      if (config.title == "Zonierung des UBEVM") {
        drawGeometry(geojsonData);
      }
    });
};
//Zonierung "zeichnen" + hinzufügen
let drawGeometry = (geojsonData) => {
  //console.log("Geometry", geojsonData); //schauen ob es bisher geklappt hat
  L.geoJson(geojsonData, {
    style: (feature) => {
      let col = COLORS[feature.properties.Zone]; //Eckige Klammern weil ich in einem Objekt auf einen Wert/Schlüssel zureifen will, der ein Leerzeichen hat
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
  toggleDisplay: true, //Minimap ein- und ausklappbar
  minimized: false //false: Anzeige im eingeklappten Zustand.
}).addTo(map);

//Maßstab siehe: https://leafletjs.com/reference-1.7.1.html#control-scale
L.control.scale({
  imperial: false //löscht Meilen raus
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

var north = L.control({position: "bottomright"});
north.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<icons src="north-arrow.png">';
    return div;
}
north.addTo(map);

/*https://stackoverflow.com/questions/22325460/how-can-i-add-a-north-arrow-to-a-leaflet-js-map Skript, */
