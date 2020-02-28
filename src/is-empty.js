import {getCoordinates} from "./get-coordinates";

export function isEmpty(event) {
  let elem = event.target;
  const boundingRect = elem.getBoundingClientRect();
  elem.style.display = 'none';

  let coords = getCoordinates(event, boundingRect);
  let belowElement = null;

  let isEmpty = coords.reduce(function (result, currentValue) {
    belowElement = document.elementFromPoint(
      currentValue.x,
      currentValue.y
    );

    return isParent(elem, belowElement) && result;
  }, true);


  elem.style.display = 'block';

  return isEmpty;
}

function isParent(element, elementToCheck) {
  let isParent = false;

  while(shouldCheckParent(element.parentNode) && !isParent) {
    isParent = element.parentNode === elementToCheck;
    element = element.parentNode;
  }

  if(!isParent) {
    isParent = isSvg(elementToCheck);
  }

  return isParent;
}

function shouldCheckParent(parentNode) {
  return parentNode  && !(parentNode instanceof SVGSVGElement);
}

function isSvg(element) {
  return element instanceof SVGSVGElement;
}