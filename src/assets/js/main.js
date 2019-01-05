const template = ({ name, imageName, price, oldPrice, productInfo }) => {

  const showOldPrice = () => {
    if (oldPrice !== null) {
      return `<p class="otherProducts__item__price">
          De: <strong>${oldPrice}</strong>
      </p>`;
    }
    return '&nbsp;';
  }

  return `
    <div class="otherProducts__item col-xs-12 col-sm-6 col-md-6 col-lg-3">
      <img src="${imageName}" alt="${name}">
      <p class="otherProducts__item__description truncate truncate">
          ${name}
      </p>
      ${showOldPrice()}
      <p class="otherProducts__item__price">
          Por: <strong>${price}</strong> á vista
      </p>
      <p class="otherProducts__item__plots">
          ${productInfo.paymentConditions}
      </p>
      <div class="otherProducts__button">
          <button type="button">
              adicionar ao carrinho <i class="material-icons">add_shopping_cart</i>
          </button>
      </div>
    </div>
  `
}

const insertHTML = (selector, element) => {
  document.querySelector(selector).innerHTML += template(element)
}

const slider = function () {
  axios.get('products.json')
    .then(res => {
      const productsRecomendation = res.data[0].data.recommendation;

      productsRecomendation.forEach(element => insertHTML('.otherProducts .slider', element));
    })
    .then(res => {
      const slider = tns({
        container: '.otherProducts .slider',
        items: 4,
        mode: 'gallery',
        slideBy: 'page',
        autoplay: true,
        responsive: {
          320: {
            items: 1,
          },
          630: {
            items: 2,
          },
          1200: {
            items: 4
          }
        }
      });

      document.querySelector('.tns-controls').remove();
      document.querySelector('button[data-action="stop"]').remove();
    })
    .catch(error => console.log(error));
}

window.onload = () => slider()
