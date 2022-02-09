const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductlist(data);
  });

function handleProductlist(data) {
  data.forEach(showProduct);
}

/*  <article class="smallProduct">
<img src="Assets/tshirt.jpg" alt="tshirt" />

<p class="price"><span>Prev.</span>DKK 1595,-</p>
<div class="discounted">
  <p>Now DKK 1560,-</p>
  <p>-34%</p>
</div>
<a href="product.html" class="see_more">See more</a>
</article>
*/

function showProduct(product) {
  console.log(product);
  //grab the template
  const template = document.querySelector("#smallProductTemplate").content;
  //clone it

  const copy = template.cloneNode(true);
  //change content
  copy.querySelector(
    ".subtle"
  ).textContent = `${product.articletype} | ${product.brandname}`;

  copy.querySelector("h3").textContent = product.productdisplayname;

  //grab parent
  const parent = document.querySelector("main");

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }

  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
    /*
<div class="discounted">
  <p>Now DKK 1560,-</p>
  <p>-34%</p>
</div>
*/
    copy.querySelector(".discounted p").textContent =
      product.price / product.discount;
    /*do the math
    math.floor(product.price-(product.price*(product.discount/100)))
    */
  }

  //append
  parent.appendChild(copy);
}
