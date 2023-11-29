var mySwiperInstance = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints:{
    0: {
      slidesPerView: 0,
    },
    720: {
      slidesPerView: 1,
    },
    1100: {
      slidesPerView: 2,
    },
    1400: {
      slidesPerView: 3,
    },
  }
});
const apiUrl = "https://r0stislaw.github.io/WEB-PR7/json/shopList.json";
axios
  .get(apiUrl)
  .then((responseData) => addItemstoSwiper(responseData))
  .catch((error) => console.log(error));

function addItemstoSwiper(data) {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  data.data.items.forEach((item) => {
    const swiperSlide = document.createElement("div");
    swiperSlide.className = "swiper-slide";
    swiperWrapper.append(swiperSlide);

    const itemContent = document.createElement("div");
    itemContent.className = "itemContent";
    swiperSlide.append(itemContent);

    if (item.newItem) {
      const newItem = document.createElement("div");
      newItem.className = "new";
      newItem.innerHTML = "<p>NEW</p>";
      itemContent.append(newItem);
    } else if (item.hotItem) {
      const hit = document.createElement("div");
      hit.className = "hit";
      hit.innerHTML = "<p>The Most Popular</p>";
      itemContent.append(hit);
    } else if (item.promotional) {
      const promotional = document.createElement("div");
      promotional.className = "promotional";
      promotional.innerHTML = "<p>Promotional Product</p>";
      itemContent.append(promotional);
    }

    const category = document.createElement("div");
    category.className = "category";
    category.innerHTML = `<p>${item.category}</p>`;
    itemContent.append(category);

    const line = document.createElement("div");
    line.className = "line";
    itemContent.append(line);

    const photo = document.createElement("img");
    photo.className = "photo";
    photo.src = item.photo; 
    itemContent.append(photo);

    const name = document.createElement("div");
    name.className = "name";
    name.innerText = item.name;
    itemContent.append(name);

    const price = document.createElement("div");
    price.className = "price";
    const salecost = document.createElement("span");
    salecost.className = "salecost";
    salecost.innerText = item.prevPrice;
    price.append(salecost);
    const cost = document.createElement("span");
    cost.className = "cost";
    cost.innerText = item.price;

    if (item.sale) {
      cost.style.color = "#e43639";
    } else {
      cost.style.color = "black";
    }
    price.append(cost);
    itemContent.append(price);

    const buy = document.createElement("input");
    buy.type = "button";
    if (item.comingSoon) {
      buy.className = "comingSoon";
      buy.value = "ON SALE SOON";
    } else {
      buy.className = "buy";
      buy.value = "TO THE BASKET";
    }
    itemContent.append(buy);
  });
}
