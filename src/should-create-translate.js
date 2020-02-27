export function shouldCreateTranslate(transforms) {
  return transforms.length === 0 ||
    transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE;
}