// https://leafletjs.com/
const map = L.map('map', { //map heißen, weil das div element dazu im index html so definiert. ergebniskarte heißt map!
  center: [46.7699, 10.2405],
  zoom: 10,
  fullscreenControl: true, //Fullscreen plugin
})
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Beispielmarker für Popups: koordinaten und text ändern :) die koordinaten könnten zb mithilfe des hash plugins herausgelesen werden! :)
//L.marker([46.7599, 10.2104]).addTo(map)
//  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //.openPopup();

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




//Icons für die verschiedenen Bereiche definieren
  let icons = {
    "Entwickelt": "comment-map-icon.png",
    "Entwicklungsbedarf": "",
    "Vorteil": "",
    "Nachteil": "",
  }


console.log(COMMENTS) //Schauen ob die erknüpfung funktioniert und etwas geloged wird
for (let entry of COMMENTS){ //marker müssen noch an id angepasst werden. entry wird hier als begriff für die einzelnen Variablen bzw keys in COMMENTS definiert  
  //console.log(entry);
  //wählen wann welches Icon zum einsatz kommt
  if (icons[entry.id == "Entwickelt"]) {
  }if (icons[entry.id == "Enwicklungsbedarf"]) {
  }if (icons[entry.id == "Vorteil"]) {
  }if (icons[entry.id == "Nachteil"]) {
  }else { icons["comment-map-icon.png"]}
//Icons einsetzen:
  let mrk = L.marker([entry.lat, entry.lng], {
    icon: L.icon({
      iconUrl: `icons/${icons[entry.id]}`,
      iconSize: [32, 37], //array höhe u breite, kann ich im img anschauen. mit der size ist der icon mittig, aber die iconspitze liegt nicht auf koordinate. also;
      iconAnchor: [16, 37], //damit richitg positioniert, aber verdeckt durchpopup, deswegen siehe nächste zeile:
      popupAnchor: [0, -37], //mitte passt =0, dann nach oben verschieben um icongröße, dann gehts oberhalb auf
})
  }).addTo(map);
  mrk.bindPopup(`
      <strong> ${entry.ort}:</strong>
      <hr>${entry.txt}
      `);
}





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




