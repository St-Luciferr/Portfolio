/**
 * Page-wide art behind every section below the hero (docs/DESIGN_SPEC.md):
 * topographic contours plus a dashed trekking trail with altitude waypoints,
 * so scrolling reads as walking down from the hero's summit.
 *
 * The drawings live in /public/art as static SVGs used as CSS masks, so the
 * colour comes from theme tokens (--page-contour, --page-trail) and the HTML
 * stays light. The trail is desktop-only: on a phone only a sliver of it would
 * show.
 */
export function PageArt() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="page-art page-contours absolute inset-0" />
      <div className="page-art page-trail absolute inset-0 hidden md:block" />
    </div>
  );
}
