//KARTE ERSTELLEN
// Kartenhintergründe definieren, der Provider ist Leaflet: http://leaflet-extras.github.io/leaflet-providers/preview/
let baselayers = {
  standard: L.tileLayer.provider("OpenStreetMap.Mapnik"),
  topographie: L.tileLayer.provider("OpenTopoMap"),
  imagery: L.tileLayer.provider("Esri.WorldImagery"),
};

//Variable "map" erstellen und Einstellungen für die Map hinzufügen:
let map = L.map('overviewmap', { //muss Overviewmap heißen, weil das Div-Element dazu im index.html so definiert ist. Die ID der Ergebniskarte heißt "map"!
  center: [46.5916, 10.2611], //welcher Kartenausschnitt gezeigt werden soll
  zoom: 10,// Zoomeinstellung bei Start
  fullscreenControl: true, //Fullscreen Plugin
  layers: [baselayers.standard]
})
let overlays = {
  geometry: L.featureGroup(), //Overlay für das Hinzufügen der Zonierung definieren
}

//Zusätzliche Quellenangaben für die Karte über attribution von L.tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '<a target="_blank" href= "https://www.geocat.ch/geonetwork/srv/ger/md.viewer#/full_view/c212a19c-6e06-4ca4-bdee-3ec62ccd7b1e/tab/complete">Zonierung<a/>, <a target="_blank" href="https://pixabay.com/vectors/arrow-map-north-orienteering-152596/">Nordpfeil</a>'
}).addTo(map);

//Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "Standard": baselayers.standard,
    "Topographie": baselayers.topographie,
    "Bildkarte": baselayers.imagery,
  },
  { //Klammer erneut innerhalb der runden Klammer öffnen, damit es eine visuelle Abtrennung gibt zwischen den verschiedenen Overlays 
    "Zonierung des Biosphärenreservates": overlays.geometry,
  }).addTo(map);

overlays.geometry.addTo(map) //Overlays in der Karte anzeigen lassen

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
//For-Schleife machen, die über die ganzen GeoJSON-Daten Läuft
for (let config of ZONE) {
  fetch(config.data)
    .then(response => response.json()) //innere runde Klammer: Funktionsaufruf, damit es gestartet/ausgeführt wird 
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
      let col = COLORS[feature.properties.Zone];
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

//PLUGINS
// Plugin hash
L.hash(map);

// Plugin Minimap
var miniMap = new L.Control.MiniMap(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
  toggleDisplay: true, //Minimap ein- und ausklappbar
  minimized: false //false: Anzeige im eingeklappten Zustand.
}).addTo(map);

//Maßstab siehe: https://leafletjs.com/reference-1.7.1.html#control-scale
L.control.scale({
  imperial: false, //löscht Meilen raus
}).addTo(map)

/*Nordpfeil einfügen: https://stackoverflow.com/questions/22325460/how-can-i-add-a-north-arrow-to-a-leaflet-js-map  */
var north = L.control({position: "bottomleft"});
north.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src="images/arrowkl.png">';
    return div;
}
north.addTo(map);   

//Legende:
var legend = L.control({ 
  position: "bottomleft",
  collapsed: true,
});

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Zonierung</h4>";
  div.innerHTML += '<i style="background: darkred"></i><span>Kernzone</span><br>';
  div.innerHTML += '<i style="background: darkgreen"></i><span>Pflegezone</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>Entwicklungszone</span><br>';  
    return div;
};
legend.addTo(map);


/* DROPDOWN für Quellenangaben - über Klick öffnen*/
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
// Dropdown schließen, wenn man außerhalb klickt
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

