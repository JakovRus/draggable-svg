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

      var canTranslate = isEmpty(evt);
      if(canTranslate) {
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      }
    }
  }

  function endDrag(evt) {
    selectedElement = false;
  }
}

function isEmpty(event) {
  var elem = event.target;
  var boundingRect = elem.getBoundingClientRect();

  elem.style.display = 'none';

  var coords = getCoords(event, boundingRect);
  var belowElement = null;

  var isEmpty = coords.reduce(function (result, currentValue) {
    belowElement = document.elementFromPoint(
      currentValue.x,
      currentValue.y
    );

    return isParent(elem, belowElement) && result;
  }, true);


  elem.style.display = 'block';

  return isEmpty;
}

function getCoords(event, rect) {
  var xStep = Math.floor(rect.width / 10);
  var yStep = Math.floor(rect.height / 10);

  var coords = [];
  var edgeCoords = [];

  if(event.movementX > 0) {
    edgeCoords = Array.from({length: yStep}, function(v, i) {
      return {
        x: rect.right,
        y: rect.top + i * yStep
      }
    }).concat([{
      x: rect.right,
      y: rect.bottom
    }]);

    coords = coords.concat(edgeCoords);
    console.log(coords);
  }

  if(event.movementX < 0) {
    edgeCoords = Array.from({length: yStep}, function(v, i) {
      return {
        x: rect.left,
        y: rect.top + i * yStep
      }
    }).concat([{
      x: rect.left,
      y: rect.bottom
    }]);

    coords = coords.concat(edgeCoords);
  }

  if(event.movementY > 0) {
    edgeCoords = Array.from({length: xStep}, function(v, i) {
      return {
        x: rect.left + i * xStep,
        y: rect.bottom
      }
    }).concat([{
      x: rect.right,
      y: rect.bottom
    }]);

    coords = coords.concat(edgeCoords);
  }

  if(event.movementY < 0) {
    edgeCoords = Array.from({length: xStep}, function(v, i) {
      return {
        x: rect.left + i * xStep,
        y: rect.top
      }
    }).concat([{
      x: rect.right,
      y: rect.top
    }]);

    coords = coords.concat(edgeCoords);
  }

  return coords;
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