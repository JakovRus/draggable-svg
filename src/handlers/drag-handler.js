import {isEmpty} from "../is-empty";
import {getMousePosition} from "../get-mouse-position";

export function getDragHandler(svg, dragParams) {
  return function (evt) {
    evt.preventDefault();
    if (!dragParams.selectedElement) {
      return;
    }

    const canTranslate = isEmpty(evt);
    if (canTranslate) {
      setTranslate(evt, svg, dragParams);
    }
  }
}

function getTranslates(evt, svg, dragParams) {
  const coordinates = getMousePosition(evt, svg);
  const tx = coordinates.x - dragParams.offset.x;
  const ty = coordinates.y - dragParams.offset.y;

  return {tx, ty};
}

function setTranslate(evt, svg, dragParams) {
  const translates = getTranslates(evt, svg, dragParams);
  dragParams.transform.setTranslate(
    translates.tx,
    translates.ty
  );
}