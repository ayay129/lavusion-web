const docLinks=[...document.querySelectorAll('.docs-nav-group a')];const sections=[...document.querySelectorAll('.doc-section')];const docSelect=document.querySelector('[data-doc-select]');const setActive=id=>{docLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${id}`));if(docSelect&&docSelect.value!==`#${id}`)docSelect.value=`#${id}`};if(sections.length){const sectionObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setActive(visible.target.id)},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.2,.5,1]});sections.forEach(section=>sectionObserver.observe(section));setActive((location.hash||'#install').slice(1))}docSelect?.addEventListener('change',()=>{location.hash=docSelect.value});

const librarySection = document.querySelector('#library');
const libraryDemo = document.querySelector('[data-library-demo]');
if (librarySection && libraryDemo && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const libraryObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      librarySection.classList.add('is-playing');
      libraryObserver.disconnect();
    }
  }, { threshold: 0.35 });
  libraryObserver.observe(libraryDemo);
}
