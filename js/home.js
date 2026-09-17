// =========================================================
// Download dropdown
// =========================================================
const downloadPicker = document.querySelector('[data-download-picker]');
const downloadTrigger = document.querySelector('[data-download-trigger]');
const downloadMenu = document.querySelector('[data-download-menu]');

const closeDownloadMenu = () => {
  downloadPicker?.classList.remove('open');
  downloadTrigger?.setAttribute('aria-expanded', 'false');
};

downloadTrigger?.addEventListener('click', (event) => {
  event.stopPropagation();
  const open = !downloadPicker.classList.contains('open');
  downloadPicker.classList.toggle('open', open);
  downloadTrigger.setAttribute('aria-expanded', String(open));
  if (open) downloadMenu?.querySelector('a')?.focus();
});

downloadPicker?.addEventListener('click', (event) => event.stopPropagation());
document.addEventListener('click', closeDownloadMenu);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDownloadMenu();
    downloadTrigger?.focus();
  }
});
