const reviews = []


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

function getOptionsCluster(coords) {
  const clusterObjects = [];

  for (const review of reviews) {
    if (JSON.stringify(review.coords) ===  JSON.stringify(coords)) {
      const geoObj = new ymaps.GeoObject({
        geometry:{type:'Point', coordinates:coords}
      }) 
      clusterObjects.push(geoObj)
    }
  }
  return clusterObjects
}

function addCluster(map, coords) {
  const clusterer = new ymaps.Clusterer({clusterDisableClickZoom: true})
  clusterer.options.set('hasBalloon', false)

  function addToCluster() {
    const myGoeObjects = getOptionsCluster(coords)
    clusterer.add(myGoeObjects)
    map.geoObjects.add(clusterer)
    map.balloon.close()
  }

clusterer.events.add('click', function(e) {
  e.preventDefault();
  openBallon(map, coords, clusterer, addToCluster)
})

  addToCluster()
}

function getReviewList (coords) {
  let reviewListHTML = ''

  for (const review of reviews) {
    if (JSON.stringify(review.coords) ===  JSON.stringify(coords)){
      reviewListHTML += `
      <div class = 'review'>
        <span class = 'review__author'>${review.author}</span>
        <span class = 'review__place'>${review.place}</span>
        <div class = 'review__comment'>${review.comment}</div>
      </div>
      `
    }
  }
  return reviewListHTML
}

async function openBallon(map, coords, clusterer, fn) {
  await map.balloon.open(coords, {
    content: `
    <div class= 'reviews'>${getReviewList(coords)}</div>
    <div class = 'title'>Отзыв:</div>
    <form id = "add-form">
      <input type = "text" class='place' placeholder = "Укажите место" name = "place"><br></br>
      <input type = "text" class='author' placeholder = "Укажите ваше имя" name = "author"><br></br>
      <textarea placeholder = "Оставть отзыв" class = 'comment' ></textarea><br></br>
      <button id = "add-btn">Добавить</button><br></br>
    </form>
    `
  })
  document.querySelector('#add-form').addEventListener('submit', (e)=> {
    e.preventDefault();
    if (clusterer) {
      clusterer.removeAll()
    }
    let place = document.querySelector('.place').value;
    let author = document.querySelector('.author').value;
    let comment = document.querySelector('.comment').value;
    reviews.push({
      coords:coords,
      place:place,
      author:author,
      comment: comment
    })

    !fn ? addCluster(map,coords) : fn()
    map.balloon.close()
  })
}