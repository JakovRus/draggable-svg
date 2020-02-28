import {getMousePosition, resolveGetScreenCtm} from "../get-mouse-position";

export function getStartDragHandler(svg, dragParams) {
  return function (evt) {
    initializeDrag(evt, svg, dragParams);

    if (shouldCreateTranslate(dragParams)) {
      createTranslate(svg, dragParams);
    }

    startDrag(dragParams);
  }
}

function initializeDrag(evt, svg, dragParams) {
  dragParams.selectedElement = evt.target;
  dragParams.selectedElement
    .parentNode
    .appendChild(
      dragParams.selectedElement
    );

  dragParams.offset = getMousePosition(evt, svg);
}

function createTranslate(svg, dragParams) {
  const translate = svg.createSVGTransform();

  translate.setTranslate(0, 0);
  dragParams.selectedElement
    .transform
    .baseVal
    .insertItemBefore(translate, 0);
}

function shouldCreateTranslate(dragParams) {
  const transforms = getTransforms(dragParams);

  return transforms.length === 0 ||
    transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE;
}

function getTransforms(dragParams) {
  return dragParams.selectedElement.transform.baseVal;
}

function startDrag(dragParams) {
  const transforms = getTransforms(dragParams);

  dragParams.transform = transforms.getItem(0);
  dragParams.offset.x -= dragParams.transform.matrix.e;
  dragParams.offset.y -= dragParams.transform.matrix.f;
}