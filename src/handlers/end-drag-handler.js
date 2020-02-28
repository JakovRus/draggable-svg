export function getEndDragHandler(dragParams) {
  return function (evt) {
    dragParams.selectedElement = null;
  }
}