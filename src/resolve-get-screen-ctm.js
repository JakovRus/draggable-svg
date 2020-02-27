export function resolveGetScreenCtm(target, svg) {
  if(target && target.parentNode && target.parentNode.getScreenCTM) {
    return target.parentNode.getScreenCTM
      .bind(target.parentNode);
  }

  return svg.getScreenCTM.bind(svg);
}