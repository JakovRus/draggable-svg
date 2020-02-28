function resolveGetScreenCtm(target, svg) {
  if(target && target.parentNode && target.parentNode.getScreenCTM) {
    return target.parentNode.getScreenCTM
      .bind(target.parentNode);
  }

  return svg.getScreenCTM.bind(svg);
}

export function getMousePosition(evt, svg) {
  const getScreenCTM = resolveGetScreenCtm(evt.target, svg);

  const CTM = getScreenCTM();
  if (evt.touches) { evt = evt.touches[0]; }
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d
  };
};