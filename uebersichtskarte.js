// Kartenhintergründe definieren, provider ist leaflet : http://leaflet-extras.github.io/leaflet-providers/preview/index.html 
let baselayers = {
    standard: L.tileLayer.provider("OpenStreetMap.CH"),
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
}
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