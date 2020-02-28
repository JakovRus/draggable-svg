import {getCoordinates} from "./get-coordinates";

export function isEmpty(event, boundingRect) {
  let elem = event.target;
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

  while(element.parentNode  && !(element.parentNode instanceof SVGSVGElement) && !isParent) {
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