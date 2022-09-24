import { galleryItems } from "./gallery-items.js";
console.log(galleryItems);

const galleryBox = document.querySelector(".gallery");

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
     />
   </a>
</div>`
  )
  .join("");

galleryBox.insertAdjacentHTML("beforeend", markup);

galleryBox.addEventListener("click", onClick);
function onClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const largeImage = event.target.getAttribute("data-source");
  const instance = basicLightbox.create(`
    <img src="${largeImage}" width="800" height="600">
`);

  instance.show();
  galleryBox.addEventListener("keydown", (event) => {
    if (event.code === "Escape" || event.code === "Enter") {
      instance.close();
    }
  });
}
