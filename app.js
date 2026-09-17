const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-button]');
const mobileNav=document.querySelector('[data-mobile-nav]');
const desktopNav=document.querySelector('.desktop-nav');

// Keep the global navigation intentionally small and consistent.
const isDocsPage=location.pathname.endsWith('/docs.html')||location.pathname.endsWith('docs.html');
const ensureDocsLink=(nav,isMobile=false)=>{
  if(!nav||nav.querySelector('a[href="./docs.html"]'))return;
  const link=document.createElement('a');
  link.href='./docs.html';
  link.textContent='文档';
  if(isDocsPage){
    link.classList.add('active');
    link.style.color='#111';
    link.style.fontWeight='650';
  }
  nav.appendChild(link);
  if(isMobile){
    link.addEventListener('click',()=>{
      mobileNav?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded','false');
    });
  }
};
ensureDocsLink(desktopNav);
ensureDocsLink(mobileNav,true);

// Keep footer links consistent across all pages.
document.querySelectorAll('.footer-links a').forEach(link=>{
  if(link.textContent.trim()==='使用文档'){
    link.remove();
    return;
  }
  if(link.matches('a[href^="mailto:"]')){
    link.href='mailto:admin@ilavu.com.cn';
    link.textContent='admin@ilavu.com.cn';
  }
});

const footerLinks=document.querySelector('.footer-links');
if(footerLinks&&!footerLinks.querySelector('[data-icp]')){
  footerLinks.style.flexWrap='wrap';
  const icpLink=document.createElement('a');
  icpLink.href='https://beian.miit.gov.cn/';
  icpLink.target='_blank';
  icpLink.rel='noreferrer';
  icpLink.textContent='粤ICP备2026058851号-1';
  icpLink.dataset.icp='true';
  footerLinks.appendChild(icpLink);
}

const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>8);
onScroll();
window.addEventListener('scroll',onScroll,{passive:true});

menuButton?.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileNav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const tabs=[...document.querySelectorAll('[data-tab]')];
const queryLabel=document.querySelector('[data-query-label]');
const queryCopy=document.querySelector('[data-query-copy]');
const cropBox=document.querySelector('[data-crop-box]');
const grid=document.querySelector('[data-result-grid]');
const states={
  similar:{label:'以这张图片为参照',copy:'找到 128 张视觉相似图片'},
  people:{label:'识别图片中的人物',copy:'在图库中找到 46 张同一人物照片'},
  crop:{label:'框选画面局部',copy:'从 24,862 张图片中定位原图'}
};
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(t=>{
    t.classList.toggle('active',t===tab);
    t.setAttribute('aria-selected',String(t===tab));
  });
  const key=tab.dataset.tab;
  if(queryLabel)queryLabel.textContent=states[key].label;
  if(queryCopy)queryCopy.textContent=states[key].copy;
  if(cropBox)cropBox.style.display=key==='crop'?'block':'none';
  grid?.classList.toggle('people-mode',key==='people');
}));

const downloadPicker=document.querySelector('[data-download-picker]');
const downloadTrigger=document.querySelector('[data-download-trigger]');
const downloadMenu=document.querySelector('[data-download-menu]');
const closeDownloadMenu=()=>{
  downloadPicker?.classList.remove('open');
  downloadTrigger?.setAttribute('aria-expanded','false');
};
downloadTrigger?.addEventListener('click',event=>{
  event.stopPropagation();
  const open=!downloadPicker.classList.contains('open');
  downloadPicker.classList.toggle('open',open);
  downloadTrigger.setAttribute('aria-expanded',String(open));
  if(open)downloadMenu?.querySelector('a')?.focus();
});
downloadPicker?.addEventListener('click',event=>event.stopPropagation());
document.addEventListener('click',closeDownloadMenu);
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    closeDownloadMenu();
    downloadTrigger?.focus();
  }
});