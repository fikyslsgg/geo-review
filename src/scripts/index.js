document.addEventListener('DOMContentLoaded' , (e)=> {
    ymaps.ready(init);
    function init() {
      const myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 14,
        controls:[]
    });

    myMap.events.add('click', function(e) {
      const coords = e.get('coords')

      openBallon(myMap, coords)
    })


    }
});

function openBallon(map, coords) {
  map.balloon.open(coords, {
    content: `
    <form id = "add-form">
    <input type = "text" placeholder = "Названгие места" name = "place"><br></br>
    <input type = "text" placeholder = "Вашк имя" name = "author"><br></br>
    <textarea placeholder = "Ваш отзыв" name = "revirew"></textarea><br></br>
    <button id = "add-btn">Добавить</button><br></br>
    </form>
    `
  })
}