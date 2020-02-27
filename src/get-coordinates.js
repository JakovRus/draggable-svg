export function getCoordinates(event, rect) {
  const xStep = Math.floor(rect.width / 10);
  const yStep = Math.floor(rect.height / 10);

  let coords = [];
  let edgeCoords = [];

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