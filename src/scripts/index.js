document.addEventListener('DOMContentLoaded' , (e)=> {
    ymaps.ready(init);
    function init() {
      const myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 14
    });
    }

});