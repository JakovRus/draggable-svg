export function getCoordinates(event, rect) {
  const xStep = Math.floor(rect.width / 10);
  const yStep = Math.floor(rect.height / 10);

  let coordinates = [];
  let edgeCoordinates = [];

  if(event.movementX > 0) {
    edgeCoordinates = getRightEdgeCoordinates(rect, yStep);
    coordinates = coordinates.concat(edgeCoordinates);
  }

  if(event.movementX < 0) {
    edgeCoordinates = getLeftEdgeCoordinates(rect, yStep);
    coordinates = coordinates.concat(edgeCoordinates);
  }

  if(event.movementY > 0) {
    edgeCoordinates = getBottomEdgeCoordinates(rect, xStep);
    coordinates = coordinates.concat(edgeCoordinates);
  }

  if(event.movementY < 0) {
    edgeCoordinates = getTopEdgeCoordinates(rect, xStep);
    coordinates = coordinates.concat(edgeCoordinates);
  }

  return coordinates;
}

function getRightEdgeCoordinates(rect, yStep) {
  return Array.from({length: yStep}, function(v, i) {
    return {
      x: rect.right,
      y: rect.top + i * yStep
    }
  }).concat([{
    x: rect.right,
    y: rect.bottom
  }]);
}

function getLeftEdgeCoordinates(rect, yStep) {
  return Array.from({length: yStep}, function(v, i) {
    return {
      x: rect.left,
      y: rect.top + i * yStep
    }
  }).concat([{
    x: rect.left,
    y: rect.bottom
  }]);
}

function getBottomEdgeCoordinates(rect, xStep) {
  return Array.from({length: xStep}, function(v, i) {
    return {
      x: rect.left + i * xStep,
      y: rect.bottom
    }
  }).concat([{
    x: rect.right,
    y: rect.bottom
  }]);
}

function getTopEdgeCoordinates(rect, xStep) {
  return Array.from({length: xStep}, function(v, i) {
    return {
      x: rect.left + i * xStep,
      y: rect.top
    }
  }).concat([{
    x: rect.right,
    y: rect.top
  }]);
}