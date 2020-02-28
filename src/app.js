import {getStartDragHandler} from "./handlers/start-drag-handler";
import {getDragHandler} from "./handlers/drag-handler";
import {getEndDragHandler} from "./handlers/end-drag-handler";

function makeDraggable(svg) {
  const dragParams = {
    selectedElement: null,
    offset: null,
    transform: null,
  };

  const startDrag = getStartDragHandler(svg, dragParams);
  const drag = getDragHandler(svg, dragParams);
  const endDrag = getEndDragHandler(dragParams);

  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseover', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  svg.addEventListener('touchstart', startDrag);
  svg.addEventListener('touchmove', drag);
  svg.addEventListener('touchend', endDrag);
  svg.addEventListener('touchleave', endDrag);
  svg.addEventListener('touchcancel', endDrag);
}

const svg = document.querySelectorAll('svg');
svg.forEach(function (element) {
  makeDraggable(element);
});