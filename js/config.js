(() => {
  const version = '1.2.5';
  const directory = `https://lavusion-pkg-1255642211.cos.ap-guangzhou.myqcloud.com/version${version}`;
  window.LAVUSION_CONFIG = {
    version,
    downloads: {
      macos: `${directory}/${encodeURIComponent(`览悟找图-${version}-arm64.dmg`)}`,
      windows: `${directory}/${encodeURIComponent(`览悟找图 Setup ${version}.exe`)}`
    }
  };
})();
