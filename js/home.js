// =========================================================
// Home page specific interactions
// =========================================================
// Shared download behaviour lives in ./download.js.

const cropMotion = document.querySelector('.crop-motion');
if (cropMotion) {
  let started = false;
  let visible = false;
  const playCropMotion = () => {
    if (started || !visible) return;
    let timeline;
    try {
      timeline = cropMotion.contentWindow?.__timelines?.main;
    } catch {
      return;
    }
    if (!timeline) return;
    started = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) timeline.seek(8);
    else timeline.play(0);
  };
  cropMotion.addEventListener('load', playCropMotion);
  const cropObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    visible = true;
    playCropMotion();
    if (started) cropObserver.disconnect();
  }, { threshold: .2 });
  cropObserver.observe(cropMotion);
}
