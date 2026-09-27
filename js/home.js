// =========================================================
// Home page specific interactions
// =========================================================
// Shared download behaviour lives in ./download.js.

const productVideo = document.querySelector('[data-product-video]');
const productVideoPlay = document.querySelector('[data-product-video-play]');
const productVideoStatus = document.querySelector('[data-product-video-status]');

if (productVideo && productVideoPlay) {
  const showVideoError = () => {
    productVideo.controls = false;
    productVideoPlay.hidden = false;
    productVideoStatus.hidden = false;
    productVideoStatus.textContent = '视频加载失败，请检查网络或视频地址后重试';
  };

  productVideoPlay.addEventListener('click', () => {
    productVideoStatus.hidden = true;
    productVideo.controls = true;
    productVideoPlay.hidden = true;
    productVideo.play().catch(() => {
      showVideoError();
    });
  });

  productVideo.addEventListener('playing', () => {
    productVideoStatus.hidden = true;
    productVideoPlay.hidden = true;
  });
  productVideo.addEventListener('error', showVideoError);
}

document.querySelectorAll('.feature-motion').forEach((cropMotion) => {
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) timeline.seek(timeline.duration());
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
});
