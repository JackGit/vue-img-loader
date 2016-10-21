function checkInView (element, viewRect) {
  let rect = element.getBoundingClientRect();

  if (!viewRect) {
      viewRect = {top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0};
  }

  return !(rect.bottom < viewRect.top
          || rect.right < viewRect.left
          || rect.top > viewRect.bottom
          || rect.left > viewRect.rigth);
}
