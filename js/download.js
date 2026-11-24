// =========================================================
// Download configuration
// =========================================================
const downloadConfig = window.LAVUSION_CONFIG?.downloads ?? {};

document.querySelectorAll('[data-download-platform]').forEach((link) => {
  const platform = link.dataset.downloadPlatform;
  const url = downloadConfig[platform];
  if (url) link.href = url;
  const appVersion = url?.split(/[?#]/, 1)[0].match(/\/version(\d+(?:\.\d+)+)\//)?.[1];
  if (appVersion) link.querySelector('.download-menu-copy b')?.append(` · v${appVersion}`);
});

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

document.querySelector('[data-download-platform="macos"]')?.addEventListener('click', closeDownloadMenu);

const windowsDownloadLink = document.querySelector('[data-download-platform="windows"]');
const windowsDownloadModal = document.querySelector('[data-windows-download-modal]');
const windowsDownloadConfirm = document.querySelector('[data-windows-download-confirm]');
const windowsDownloadCancelButtons = document.querySelectorAll('[data-windows-download-cancel]');
let pendingWindowsDownloadUrl = '';

const closeWindowsDownloadModal = () => {
  if (!windowsDownloadModal) return;
  windowsDownloadModal.hidden = true;
  document.body.classList.remove('modal-open');
  pendingWindowsDownloadUrl = '';
};

windowsDownloadLink?.addEventListener('click', (event) => {
  event.preventDefault();
  pendingWindowsDownloadUrl = downloadConfig.windows || windowsDownloadLink.href;
  closeDownloadMenu();
  if (!windowsDownloadModal) {
    if (pendingWindowsDownloadUrl) window.location.href = pendingWindowsDownloadUrl;
    return;
  }
  windowsDownloadModal.hidden = false;
  document.body.classList.add('modal-open');
  windowsDownloadConfirm?.focus();
});

windowsDownloadCancelButtons.forEach((button) => {
  button.addEventListener('click', closeWindowsDownloadModal);
});

windowsDownloadConfirm?.addEventListener('click', () => {
  const url = pendingWindowsDownloadUrl;
  closeWindowsDownloadModal();
  if (url) window.location.href = url;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && windowsDownloadModal && !windowsDownloadModal.hidden) {
    closeWindowsDownloadModal();
  }
});
