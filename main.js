// https://leafletjs.com/
const map = L.map('map', {//map heißen, weil das div element dazu im index html so definiert. ergebniskarte heißt map!
    center: [46.7699, 10.2405],
    zoom: 10, 
    fullscreenControl: true,//Fullscreen plugin
}) 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Hier könnte man noch verschiedene kartengrundlagen einabuen wie im beispiel. und ev den layer fürs BR wenn wir in finden/Bekommen
// Beispielmarker für Popups: koordinaten und text ändern :) die koordinaten könnten zb mithilfe des hash plugins herausgelesen werden! :)
L.marker([46.7599, 10.2104]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();



//Icon für Vorteile (ist ein Plus) (https://fontawesome.com/icons/plus-circle?style=regular)  <i class="far fa-plus-square"></i>
//Icon für Nachteile https://fontawesome.com/icons/minus-square?style=regular <i class="far fa-minus-square"></i>
//Icon für Entwicklungsbedarf https://fontawesome.com/icons/thermometer-quarter?style=solid <i class="fas fa-thermometer-quarter"></i>
//Icon für gut Entwickelt https://fontawesome.com/icons/thermometer-three-quarters?style=solid <i class="fas fa-thermometer-three-quarters"></i>



// hash: zeigt in der URL leiste die Koordinaten und den #zoom des kartenausschnittes an 
var hash = new L.Hash(map); //Var hash steht hier nur weil man eine neue Var erstellt, falls man sie später noch mal braucht. new  --> nach L muss großbuchstabe sein.


// //Minimap
var miniMap = new L.Control.MiniMap(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
    toggleDisplay: true, //minimap ein und ausklappbar
    minimized: true //fangt im eingeklappten zustand an. diese einstellungen kann man alle in der leaflet/github davon nachlesen
}).addTo(map);


//Legende: https://github.com/ptma/Leaflet.Legend 

