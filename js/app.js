var map = L.map("mapid").setView([19.03793, -98.20346], 12);

L.tileLayer(
  "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=ULohX30zZKHpFLtElHY4",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

const fetchData = async () => {
  const response = await fetch("test.json");
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    const results = data.result;
    console.log(results);

    const parsedData = {
      nombre: results.records.map((item) => item.Nombre),
      direccion: results.records.map((item) => item.Dirección),
      telefono: results.records.map((item) => item.Teléfono),
      horario: results.records.map((item) => item.Horario),
      costo: results.records.map((item) => item.Costo),
      lat: results.records.map((item) => item.Latitud),
      long: results.records.map((item) => item.Longitud),
      actualizacion: results.records.map((item) => item.actualizacion),
    };
    console.log(parsedData);

    for (var i = 0; i < parsedData.nombre.length; i++) {
      var html = [
        '<div class="col-md-auto">' +
          `<div class="card" id=${i}>` +
          '<div class="card-body">' +
          '<h5 class="card-title">' +
          parsedData.nombre[i] +
          "</h5>" +
          '<p class="card-text">' +
          parsedData.direccion[i] +
          "</p>" +
          "</div>" +
          "</div>" +
          "</div>",
      ];

      $("#container-turistico").append(html);

      var firefoxIcon = L.icon({
        iconUrl:
          "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
        iconSize: [50, 50], // size of the icon
        popupAnchor: [0, -15],
      });

      var marker = L.marker([parsedData.lat[i], parsedData.long[i]], {
        // elevation: 260.0,
        title: "Transamerica Pyramid",
        icon: firefoxIcon,
      }).addTo(map);

      marker
        .bindPopup(
          `<b>${parsedData.nombre[i]}</b><br>
           ${parsedData.direccion[i]}<br>
           ${parsedData.telefono[i]}<br>
           ${parsedData.horario[i]}<br>
           ${parsedData.costo[i]}<br>
           ${parsedData.actualizacion[i]}<br>`
          // '<b>Hello world!</b><br>I am a popup.'
        )
        .openPopup();
    }
  }
};

const restaurantes = async () => {
  const response = await fetch("restaurantes.json");
  if (response.ok) {
    const data = await response.json();
    const results = data.result;

    const parsedData = {
      nombre: results.records.map((item) => item.Nombre),
      direccion: results.records.map((item) => item.Dirección),
      telefono: results.records.map((item) => item.Teléfono),
      horario: results.records.map((item) => item.Horario),
      costo: results.records.map((item) => item.Costo),
      lat: results.records.map((item) => item.Latitud),
      long: results.records.map((item) => item.Longitud),
    };
    console.log(parsedData);

    for (var i = 0; i < parsedData.nombre.length; i++) {
      var firefoxIcon = L.icon({
        iconUrl:
          "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
        iconSize: [50, 50], // size of the icon
        popupAnchor: [0, -15],
      });

      var marker = L.marker([parsedData.lat[i], parsedData.long[i]], {
        // elevation: 260.0,
        title: "Restaurantes",
        icon: firefoxIcon,
      }).addTo(map);

      marker.bindPopup(
        `<b>${parsedData.nombre[i]}</b><br>
           ${parsedData.direccion[i]}<br>
           ${parsedData.telefono[i]}<br>
           ${parsedData.horario[i]}<br>
           <b>${parsedData.costo[i]}</b><br>`
      );

      marker.on("click", function (e) {
        map.setView([e.latlng.lat, e.latlng.lng], 18);
        for (var i = 0; i < parsedData.nombre.length; i++) {
          if (
            Number(parsedData.lat[i]) === e.latlng.lat &&
            Number(parsedData.long[i]) === e.latlng.lng
          ) {
            var html = [
              '<h2 class="card-title">' +
                parsedData.nombre[i] +
                "</h2>" +
                '<div class="card-subInfo">' +
                "<p>" +
                parsedData.direccion[i] +
                "</p>" +
                '<p class="black-bold"> <b>' +
                parsedData.costo[i] +
                "</b></p>" +
                '<div class="card-stars">' +
                '<i class="fa fa-star fa-lg"></i>' +
                '<i class="fa fa-star fa-lg"></i>' +
                '<i class="fa fa-star fa-lg"></i>' +
                "</div>",
            ];

            $("#card-content").append(html);
            map.setView([e.latlng.lat, e.latlng.lng], 12);
          }
        }
        $("#container-card").show();
      });
    }
  }
};

$(document).ready(function () {
  $("#mapid").hide();
  $("#buttons").hide();
  $("#container-card").hide();
});

$("#home-btn").click(function () {
  console.log("clicked");
  $("#home").hide();
  $("#mapid").show();
  $("#buttons").show();
});

$("#turisitco").click(function () {
  $("#container-turistico").toggle("show");
  fetchData();
});

$("#restaurantes").click(function () {
  $("#container-restaurantes").toggle("show");
  restaurantes();
  document.getElementById("cantainer-card").innerHTML = "";
});

$("#close-card").click(function () {
  $("#container-card").hide();
  document.getElementById("card-content").innerHTML = "";
});
