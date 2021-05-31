const COMMENTS = [{
    nr: 1,
    ort: "Schigebiet Scuol", //Könnte man ev. als titel ds popups verwenden
    txt: "MIthilfe des UBEVM könnte man das Schigebit in ein nachhaltiges Schigebiet wandlen und es als 'das nachhaltigste Schigebiet der Welt' vermarkten.",
    lat:46.8189,
    lng:10.2743,
    id: "Vorteil", //das muss so eingearbeitet werden, dass es sich auf die form der popoups bezieht
}, {
    nr: 2, //nur zur Übersicht, brauchen wir eig nicht zrum einbinden
    ort: "Schigebiet Scuol",
    txt: "Schigebiete fühlen sich bei ihren touristischen Angebotsmöglichkeiten eingeschränkt, wenn sie sich  mit dem Leitbild des UBEVM nicht identifizieren können.",
    lat: 46.8171, //muss man wahrscheinlich noch überall anpassen nach dem implementieren
    lng: 10.2873,
    id:"Nachteil", 
},  {
    nr: 3,
    ort: "Gebiet Valsot", //unsre kartengrundlage zeigt den ort valsot nicht, das ist ein bisschen blöd, finde aber keine andre
    txt: "Dort wo noch kein UBEVM ist, wäre noch Entwicklungspotenzial.",
    lat: 46.8543,
    lng: 10.4207,
    id:"Entwicklungsbedarf", 
},   {
    nr: 4,
    ort: "Gebiet Scuol",
    txt: "Dort wo noch kein UBEVM ist, wäre noch Entwicklungspotenzial.",
    lat: 46.7945,
    lng: 10.3069,
    id:"Entwicklungsbedarf", 
},   {
    nr: 5,
    ort: "Pflegezone",
    txt: "In der gesamten Pflegezone des UBEVM wäre noch Entwicklungspotenzial.",
    lat: 46.7187,
    lng: 10.2296,
    id:"Entwicklungsbedarf", 
},  {
    nr: 6,
    ort: "Pflegezone",
    txt: "Das Gebiet der Pflegezone kann als solche vom UBEVM profitieren und sich entwickeln.",
    lat: 46.7187,
    lng: 10.2269,
    id:"Vorteil", 
}, {
    nr: 7,
    ort: "Ganze Region",
    txt: "In der ganzen Region Engiadina Bassa - Val Müstair ist der Landwirtschaftssektor sehr gut entwickelt.",
    lat: 46.7599,
    lng: 10.2104,
    id:"Entwickelt", 
},  {
    nr: 8,
    ort: "Unterengadin",
    txt: "Das Unterengadin könnte von einer Vermarktung über das UBEVM profitieren und die Wertschöpfung landwirtschaftlicher Produkte steigern.",
    lat: 46.7599,
    lng: 10.2114,
    id:"Vorteil", 
}, {
    nr: 9,
    ort: "Siedlungsgebiet Unterengadin",
    txt: "Das Unterengadin könnte vom UBEVM profitieren.",
    lat: 46.7599,
    lng: 10.2014,
    id:"Vorteil", 
}, {
    nr: 10,
    ort: "Schweizerischer Nationalpark",
    txt: "Der Schweizerische Nationalpark ist als Trennung und zugleich auch als Verbindung zwischen den Tälern zu sehen. Damit stellt er einen Vorteil und zugleich auch einen Nachteil dar.",
    lat: 46.64842, 
    lng: 10.26607,
    id:"keineZuordnung", //Vorteil und nachteil zugleich -> entweder gelb machen oder zwei kästchen  
}, {
    nr: 11,
    ort: "Kernzone",
    txt: "Der Schweizerische Nationalpark als Kernzone ist hervorragend aufgestellt und etabliert.",
    lat: 46.6739,
    lng: 10.2369,
    id:"Entwickelt",
}, {
    nr: 12,
    ort: "Schigebiet Val Müstair",
    txt: "Naturschutzorganisationen verhindern eine Erweiterung und Ausbau des Schigebietes und schränken dieses damit in ihren Handlungsmöglichkeiten ein.",
    lat: 46.6464,
    lng: 10.3302,
    id:"Nachteil", 
}, {
    nr: 13,
    ort: "Schigebiet Val Müstair",
    txt: "Durch einen guten Austausch zwischen den Naturschutzorganisationen und dem Schigebiet könnten Vorteile für beide entstehen.",
    lat: 46.645,
    lng: 10.3359,
    id:"Vorteil", 
}, {
    nr: 14,
    ort: "Außerhalb des bestehenden Siedlungsraums",
    txt: "Das UBEVM bringt Einschränkungen beim Bau und Ausbau von touristischen Infrastrukturen außerhalb des Siedlugnsraumes.",
    lat: 46.6006,
    lng: 10.3276,
    id:"Nachteil", 
},  {
    nr: 15,
    ort: "Val Müstair",
    txt: "Durch das Biosphärenreservat erlangt das Münstertal wirtschaftliche Vorteile und ist damit wirtschafltich gut entwickelt.",
    lat: 46.6120,
    lng: 10.3937,
    id:"Entwickelt", 
}, {
    nr: 15,
    ort: "Entwicklungszone",
    txt: "Das Biosphärenreservat bringt positive Effekte für das Gebiet der Entwicklungszone. Das Tal und insbesondere der Siedlungsraum Val Müstair können vom Biosphärenreservat profitieren.",
    lat: 46.6164,
    lng: 10.4043,
    id:"Vorteil", 
},  {
    nr: 16,
    ort: "Entwicklungszone",
    txt: "Die Entwicklungszone des UBEVM ist bereits sehr gut entwickelt.",
    lat: 46.6164,
    lng: 10.4077,
    id:"Entwickelt", 
}, {
    nr: 17,
    ort: "gesamtes existierendes Biosphärenparkgebiet",
    txt: "Das gesamte bisherige Gebiet wird als gut entwickelt angesehen, wobei keine Einschränkungen zu finden sind, sondern lediglich Vortiele im Gebiet zu erreichen sind. Besonders die aktuelle Größe des Gebietes ist vortielhaft, da in dieser Größenordung Kommunikaton gut möglich ist. Auf der anderen Seite wird gesagt, dass die räumliche Trennung der zwei Täler sich auch in Schwierigkeiten der Kommunikation niederschlägt. Hier würde noch Entwicklungsdarf herrschen.",
    lat: 46.6721,
    lng: 10.2619,
    id:"keineZuordnung",  //Könnte man auch einfach in den text unter die Karte geben. jedenfalls POpup anders formatieren, oder doch mehrere Popups machen.
},

]