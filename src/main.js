// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

$(document).ready(function () {

  $(`#mostrarBtn`).click(function () {
    $('#menuDesplegable').toggle()
  })

  $(`#desplegarSudMenu`).click(function () {
    $('#subMenu').toggle()
  })

  fetch("https://api.rawg.io/api/games?key=ec99b7fa07b847acb46058d5b8200062")
    .then((repuesta) => {
      if (repuesta.ok) {
        console.log()
        return repuesta.json()
      } else {
        console.error(`error:${repuesta.statusText}`)
      }
    }).then((data) => {
      console.log(data.results)
      renderSwiper(data.results);
    })
    .catch((error) => {
      console.error(`error:${error}`)
    })

  const renderSwiper = (games) => {
    const swiperWrapper = $('.swiper-wrapper');

    games.forEach(game => {
      $("#swiper-wrapper").append(
        ` <div class="swiper-slide"><img src="${game.background_image}" alt="${game.name}"></div>`
      );
    });

    // Inicializar Swiper después de renderizar los slides
    const swiper = new Swiper('.swiper', {
      // configure Swiper to use modules
      modules: [Navigation, Pagination],
      // Optional parameters
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
})