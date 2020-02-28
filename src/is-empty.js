import {getCoordinates} from "./get-coordinates";

export function isEmpty(event) {
  const element = event.target;
  const boundingRect = element.getBoundingClientRect();

  hideElement(element);

  const coordinates = getCoordinates(event, boundingRect);
  const reducer = getReducer(element);
  const isEmpty = coordinates.reduce(reducer, true);

  showElement(element);

  return isEmpty;
}

function getReducer(element) {
  return function (result, currentValue) {
    const belowElement = document.elementFromPoint(
      currentValue.x,
      currentValue.y
    );

    return isParent(element, belowElement) && result;
  }
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

function showElement(element) {
  element.style.display = 'block';
}

function hideElement(element) {
  element.style.display = 'none';
}