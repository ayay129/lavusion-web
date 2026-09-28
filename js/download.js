// =========================================================
// Download configuration
// =========================================================
const downloadConfig = window.LAVUSION_CONFIG?.downloads ?? {};
const appVersion = window.LAVUSION_CONFIG?.version;

document.querySelectorAll('[data-download-platform]').forEach((link) => {
  const platform = link.dataset.downloadPlatform;
  const url = downloadConfig[platform];
  if (url) link.href = url;
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

// =========================================================
// macOS unsigned build notice
// =========================================================
const macDownloadLink = document.querySelector('[data-download-platform="macos"]');
const macDownloadModal = document.querySelector('[data-mac-download-modal]');
const macDownloadConfirm = document.querySelector('[data-mac-download-confirm]');
const macDownloadCancelButtons = document.querySelectorAll('[data-mac-download-cancel]');
const copyMacCommandButton = document.querySelector('[data-copy-mac-command]');
const macCommand = document.querySelector('[data-mac-command]');
let pendingMacDownloadUrl = '';

const closeMacDownloadModal = () => {
  if (!macDownloadModal) return;
  macDownloadModal.hidden = true;
  document.body.classList.remove('modal-open');
  pendingMacDownloadUrl = '';
};

macDownloadLink?.addEventListener('click', (event) => {
  event.preventDefault();
  pendingMacDownloadUrl = downloadConfig.macos || macDownloadLink.href;
  closeDownloadMenu();
  if (!macDownloadModal) {
    if (pendingMacDownloadUrl) window.location.href = pendingMacDownloadUrl;
    return;
  }
  macDownloadModal.hidden = false;
  document.body.classList.add('modal-open');
  macDownloadConfirm?.focus();
});

const windowsDownloadLink = document.querySelector('[data-download-platform="windows"]');
const windowsDownloadModal = document.querySelector('[data-windows-download-modal]');
const windowsDownloadConfirm = document.querySelector('[data-windows-download-confirm]');
const windowsDownloadCancelButtons = document.querySelectorAll('[data-windows-download-cancel]');
let pendingWindowsDownloadUrl = '';

document.querySelectorAll('[data-windows-download-version]').forEach((element) => {
  element.textContent = appVersion || '';
});

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

macDownloadCancelButtons.forEach((button) => {
  button.addEventListener('click', closeMacDownloadModal);
});

macDownloadConfirm?.addEventListener('click', () => {
  const url = pendingMacDownloadUrl;
  closeMacDownloadModal();
  if (url) window.location.href = url;
});

copyMacCommandButton?.addEventListener('click', async () => {
  const command = macCommand?.textContent?.trim();
  if (!command) return;

  try {
    await navigator.clipboard.writeText(command);
    const previous = copyMacCommandButton.textContent;
    copyMacCommandButton.textContent = '已复制';
    setTimeout(() => { copyMacCommandButton.textContent = previous; }, 1400);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(macCommand);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && macDownloadModal && !macDownloadModal.hidden) {
    closeMacDownloadModal();
  }
  if (event.key === 'Escape' && windowsDownloadModal && !windowsDownloadModal.hidden) {
    closeWindowsDownloadModal();
  }
});
