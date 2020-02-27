export function addListeners(element) {
  element.addEventListener('mousedown', startDrag);
  element.addEventListener('mousemove', drag);
  element.addEventListener('mouseup', endDrag);
  element.addEventListener('mouseleave', endDrag);
  element.addEventListener('touchstart', startDrag);
  element.addEventListener('touchmove', drag);
  element.addEventListener('touchend', endDrag);
  element.addEventListener('touchleave', endDrag);
  element.addEventListener('touchcancel', endDrag);
}