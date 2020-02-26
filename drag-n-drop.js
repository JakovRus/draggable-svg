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
    var getScreenCTM = evt.target.parentNode.getScreenCTM.bind(evt.target.parentNode) ||
                       svg.getScreenCTM.bind(svg);

    var CTM = getScreenCTM();
    if (evt.touches) { evt = evt.touches[0]; }
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  var selectedElement, offset, transform;

  function startDrag(evt) {
    selectedElement = evt.target;

    selectedElement.parentNode.appendChild(selectedElement);
    offset = getMousePosition(evt);

    var transforms = selectedElement.transform.baseVal;

    if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      var translate = svg.createSVGTransform();
      translate.setTranslate(0, 0);
      selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }

    transform = transforms.getItem(0);
    offset.x -= transform.matrix.e;
    offset.y -= transform.matrix.f;
  }

  function drag(evt) {
    if (selectedElement) {
      evt.preventDefault();
      var coord = getMousePosition(evt);

      var canTranslate = isEmpty(evt.target, coord);
      console.log(canTranslate);
      if(canTranslate) {
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      }
    }
  }

  function endDrag(evt) {
    selectedElement = false;
  }
}

function isEmpty(elem, coords) {
  elem.style.display = 'none';

  var belowElement = document.elementFromPoint(coords.x, coords.y);
  var isEmpty = isParent(elem, belowElement);

  elem.style.display = 'block';

  return isEmpty;
}

function isParent(element, elementToCheck) {
  var isParent = false;

  while(!(element.parentNode instanceof SVGSVGElement) && !isParent) {
    isParent = element.parentNode === elementToCheck;
    element = element.parentNode;
  }

  if(!isParent) {
    isParent = isSvg(elementToCheck);
  }

  return isParent;
}

function isSvg(element) {
  return element instanceof SVGSVGElement;
}

var svg = document.querySelectorAll('svg');
svg.forEach(function (element) {
  makeDraggable(element);
});