var map;

export default map = L.map("mapid").locate({ setView: true, maxZoom: 13 });
// L.esri.basemapLayer("Streets").addTo(map);

L.tileLayer(
  "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=ULohX30zZKHpFLtElHY4",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);
