//KARTE ERSTELLEN
// Siehe Anleitung: https://leafletjs.com/
const map = L.map('map', { //muss Map heißen, weil das DIV-Element dazu im Index.html so definiert ist.
  center: [46.7159,10.2526],
  zoom: 10,
  fullscreenControl: true, //Fullscreen Plugin
})
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a target="_blank" href= "https://www.geocat.ch/geonetwork/srv/ger/md.viewer#/full_view/c212a19c-6e06-4ca4-bdee-3ec62ccd7b1e/tab/complete">Zonierung<a/>, <a target="_blank" href="https://pixabay.com/vectors/arrow-map-north-orienteering-152596/">Nordpfeil</a>, Icons von <a target="_blank" href="https://icons8.de">Icons8</a>: <a target="_blank" href="https://icons8.de/icon/61876/gef%C3%BCllte-sprechblase">Sprechblase</a>,  <a target="_blank" href="https://icons8.de/icon/DigGIRktG1KK/minus">Minus</a>, <a target="_blank" href="https://icons8.de/icon/zddfYtvTqQmM/volle-batterie">Volle Batterie</a>, <a target="_blank" href="https://icons8.de/icon/2d4uwoSaZeKO/batterie-voll-geladen">Batterie geladen</a>'
}).addTo(map);


const ZONE = [{
  title: "Zonierung des UBEVM",
  data: "data/UBEVM_Zonierung_Perimeter.json",
}]

//eine Variable erstellen in der die Zonierungen unterschiedliche Farben bekommen (kann hier angepasst werden). Braucht kein eigenes Skript, weil nur wenig Inhalt
const COLORS = {
  "Kernzone": "darkred",
  "Pflegezone": "green",
  "Entwicklungszone": "orange"
}
//Forschleife machen, die über die ganzen Geojson-Daten Läuft
for (let config of ZONE) {
  fetch(config.data)
    .then(response => response.json()) //innere runde Klammer: Funktionsaufruf, damit es gestartet/ausgeführt wird 
    .then(geojsonData => {
      //console.log("Data: ", geojsonData); //Immer mal wieder, zum schauen ob es funktioniert oder Fehler gibt.
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
  }).addTo(map)
}

//Icons für die verschiedenen Bereiche definieren
let icons = {
  "Entwickelt": "entwickelt.png",
  "Entwicklungsbedarf": "entwicklungsbedarf.png",
  "Vorteil": "vorteil.png",
  "Nachteil": "nachteil.png",
  "keineZuordnung": "comment-map-icon.png"
}

console.log(COMMENTS) //Schauen ob die Verknüpfung funktioniert und etwas in der Console gelogged wird
for (let entry of COMMENTS) { //"entry" wird hier als Begriff für die einzelnen Variablen bzw Keys in COMMENTS definiert  
//wählen wann welches Icon zum Einsatz kommt:
  if (icons[entry.id == "Entwickelt"]) {}
  if (icons[entry.id == "Entwicklungsbedarf"]) {}
  if (icons[entry.id == "Vorteil"]) {}
  if (icons[entry.id == "Nachteil"]) {}
  if (icons[entry.id == "keineZuordnung"]) {}

  //Icons einsetzen:
  let mrk = L.marker([entry.lat, entry.lng], {
    icon: L.icon({
      iconUrl: `icons/${icons[entry.id]}`,
      iconSize: [37, 37], //Array mit Höhe u Breite, kann ich im img anschauen. Mit der Size ist das Icon genau mittig auf den Koordinatenpunkt, passend für unsere Karte.
      popupAnchor: [0, -19], //Damit das Popup am ende des Icons aufploppt udn nicht in der Mitte und die Hälfte überdeckt, verschieben wir es um die Hälfte ca. nach oben.
    })
  }).addTo(map);
  mrk.bindPopup(`
      <strong> ${entry.ort}:</strong>
      <hr>${entry.txt}
      `);
}

//PLUGINS
//Maßstab siehe: https://leafletjs.com/reference-1.7.1.html#control-scale
L.control.scale({
  imperial: false
}).addTo(map)

// hash: zeigt in der URL-Leiste die Koordinaten und das #Zoom des Kartenausschnittes an 
var hash = new L.Hash(map); //var hash steht hier nur weil man eine neue Variable erstellt, falls man sie später noch mal braucht.

//Minimap
var miniMap = new L.Control.MiniMap(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
  toggleDisplay: true, //Minimap wird damit ein- und ausklappbar
  minimized: true //mit true zeigt es die Minimap im eingeklappten Zustand an.
}).addTo(map);

//Nordpfeil einfügen
var north = L.control({
  position: "bottomleft"
});
north.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML = '<img src="images/arrowkl.png">';
  return div;
}
north.addTo(map);

//Legende:
var legend = L.control({
  position: "bottomleft",
});

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Ergebnisse</h4>";
  div.innerHTML += '<img src=icons/vorteil.png class="imglegend mr-L"><span id=textlegend>Vorteile</span><br>';
  div.innerHTML += '<img src=icons/nachteil.png class="imglegend mr-L"><span id=textlegend>Nachteile</span><br>';
  div.innerHTML += '<img src=icons/entwickelt.png class="imglegend mr-L"><span id=textlegend>Sehr Gut Entwickelt</span><br>';
  div.innerHTML += '<img src=icons/entwicklungsbedarf.png class="imglegend mr-L"><span id=textlegend>Entwicklungspotenzial</span><br>';
  div.innerHTML += '<img src=icons/comment-map-icon.png class="imglegend mr-L"><span id=textlegend>Kommentare</span><br>';
  div.innerHTML += '<i style="background: darkgreen"></i><span>RNP</span><br>';
  div.innerHTML += '<i style="background: darkred"></i><span>SNP</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>UEBVM</span><br>';

  return div;
};
legend.addTo(map);


/* DROPDOWN FÜR QUELLE - Öffnen via Klick */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
// Dropdown schließen, wenn man außerhalb davon klickt
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