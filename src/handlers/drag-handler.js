import {isEmpty} from "../is-empty";
import {getMousePosition} from "../get-mouse-position";

export function getDragHandler(svg, dragParams) {
  return function (evt) {
    evt.preventDefault();
    if (!dragParams.selectedElement) {
      return;
    }

    if (evt.target !== dragParams.selectedElement) {
      endDrag();
    }

    let coord = getMousePosition(evt, svg);
    const tx = coord.x - dragParams.offset.x;
    const ty = coord.y - dragParams.offset.y;
    const rect = evt.target.getBoundingClientRect();

    let canTranslate = isEmpty(evt, rect);
    if (canTranslate) {
      dragParams.transform.setTranslate(tx, ty);
    }
  }
}