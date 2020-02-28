import {shouldCreateTranslate} from "../should-create-translate";
import {getMousePosition, resolveGetScreenCtm} from "../get-mouse-position";

export function getStartDragHandler(svg, dragParams) {
  return function (evt) {
    dragParams.selectedElement = evt.target;
    dragParams.selectedElement.parentNode.appendChild(dragParams.selectedElement);
    dragParams.offset = getMousePosition(evt, svg);

    let transforms = dragParams.selectedElement.transform.baseVal;

    if (shouldCreateTranslate(transforms)) {
      let translate = svg.createSVGTransform();
      translate.setTranslate(0, 0);
      dragParams.selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }

    dragParams.transform = transforms.getItem(0);
    dragParams.offset.x -= dragParams.transform.matrix.e;
    dragParams.offset.y -= dragParams.transform.matrix.f;
  }
}