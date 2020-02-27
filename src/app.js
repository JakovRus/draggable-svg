import {isEmpty} from "./is-empty";

function makeDraggable(svg) {

  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  svg.addEventListener('touchstart', startDrag);
  svg.addEventListener('touchmove', drag);
  svg.addEventListener('touchend', endDrag);
  svg.addEventListener('touchleave', endDrag);
  svg.addEventListener('touchcancel', endDrag);

  function getMousePosition(evt) {
    const getScreenCTM = evt.target.parentNode.getScreenCTM.bind(evt.target.parentNode) ||
                       svg.getScreenCTM.bind(svg);

    const CTM = getScreenCTM();
    if (evt.touches) { evt = evt.touches[0]; }
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  let selectedElement, offset, transform;

  function startDrag(evt) {
    selectedElement = evt.target;

    selectedElement.parentNode.appendChild(selectedElement);
    offset = getMousePosition(evt);

    let transforms = selectedElement.transform.baseVal;

    if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      let translate = svg.createSVGTransform();
      translate.setTranslate(0, 0);
      selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }

    transform = transforms.getItem(0);
    offset.x -= transform.matrix.e;
    offset.y -= transform.matrix.f;
  }

  function drag(evt) {
    if (!selectedElement) {
      return;
    }

    if(evt.target !== selectedElement) {
      console.log('end 1');
      endDrag();
    }

    evt.preventDefault();
    let coord = getMousePosition(evt);

    let canTranslate = isEmpty(evt);
    if(canTranslate) {
      transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
    }
  }

  function endDrag(evt) {
    console.log('end!');
    selectedElement = false;
  }
}

const svg = document.querySelectorAll('svg');
svg.forEach(function (element) {
  makeDraggable(element);
});