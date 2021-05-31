// https://leafletjs.com/
const map = L.map('map', { //map heißen, weil das div element dazu im index html so definiert. ergebniskarte heißt map!
  center: [46.7699, 10.2405],
  zoom: 10,
  fullscreenControl: true, //Fullscreen plugin
})
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const ZONE = [{
  title: "Zonierung des UBEVM",
  data: "data/UBEVM_Zonierung_Perimeter.json",
}]

//Variable erstellen in der die Zonierungen unterschiedlihce Farben bekommen (kann hier angepasst werden). Braucht kein eigenes skript, weil nur wenig inhalt
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
  }).addTo(map)
}

//Icon download: https://icons8.de/icons 
//müssen Link auf die Seite setzen für die Icons die wir verwenden: <a target="_blank" href="https://icons8.de/icon/114091/minus">Minus</a> Icon von <a target="_blank" href="https://icons8.de">Icons8</a>
//<a target="_blank" href="https://icons8.de/icon/zddfYtvTqQmM/volle-batterie">Volle Batterie</a> Icon von <a target="_blank" href="https://icons8.de">Icons8</a>
//<a target="_blank" href="https://icons8.de/icon/78189/leere-batterie">Leere Batterie</a> Icon von <a target="_blank" href="https://icons8.de">Icons8</a>

//Icons für die verschiedenen Bereiche definieren (noch bessere suchen)
let icons = {
  "Entwickelt": "entwickelt.png",
  "Entwicklungsbedarf": "entwicklungsbedarf.png",
  "Vorteil": "vorteil.png",
  "Nachteil": "nachteil.png",
  "keineZuordnung": "comment-map-icon.png"
}

console.log(COMMENTS) //Schauen ob die erknüpfung funktioniert und etwas geloged wird
for (let entry of COMMENTS) { //marker müssen noch an id angepasst werden. entry wird hier als begriff für die einzelnen Variablen bzw keys in COMMENTS definiert  
  //console.log(entry);
  //wählen wann welches Icon zum einsatz kommt
  if (icons[entry.id == "Entwickelt"]) {}
  if (icons[entry.id == "Enwicklungsbedarf"]) {}
  if (icons[entry.id == "Vorteil"]) {}
  if (icons[entry.id == "Nachteil"]) {}
  if (icons[entry.id == "keineZuordnung"]) {} //in der Legende vlt als Beschriebung / Kommentar benennen

//Icons einsetzen:
let mrk = L.marker([entry.lat, entry.lng], {
  icon: L.icon({
    iconUrl: `icons/${icons[entry.id]}`,
    iconSize: [37, 37], //array höhe u breite, kann ich im img anschauen. mit der size ist der icon mittig, aber die iconspitze liegt nicht auf koordinate. also;
    //iconAnchor: [16, 37], //damit richitg positioniert, aber verdeckt durchpopup, deswegen siehe nächste zeile:
    popupAnchor: [0, -19], //mitte passt =0, dann nach oben verschieben um halbeicongröße, dann gehts oberhalb auf
  })
}).addTo(map);
mrk.bindPopup(`
      <strong> ${entry.ort}:</strong>
      <hr>${entry.txt}
      `);
}

//Maßstab siehe: https://leafletjs.com/reference-1.7.1.html#control-scale
L.control.scale({
  imperial: false
}).addTo(map)

// hash: zeigt in der URL leiste die Koordinaten und den #zoom des kartenausschnittes an 
var hash = new L.Hash(map); //Var hash steht hier nur weil man eine neue Var erstellt, falls man sie später noch mal braucht. new  --> nach L muss großbuchstabe sein.

//Minimap
var miniMap = new L.Control.MiniMap(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
  toggleDisplay: true, //minimap ein und ausklappbar
  minimized: true //fangt im eingeklappten zustand an. diese einstellungen kann man alle in der leaflet/github davon nachlesen
}).addTo(map);


//Legende: https://github.com/ptma/Leaflet.Legend 

L.control.Legend({
position: "bottomleft",
legends: [{
  label: "Marker1",
  type: "image",
  url: "marker/marker-red.png",
}]
}).addTo(map);

/* DROPDOWN FÜR QUELLE
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