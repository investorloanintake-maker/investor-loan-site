(function () {
  const isLocalFile = window.location.protocol === 'file:';
  if (!isLocalFile) return;

  document.querySelectorAll('input[name="_next"]').forEach((input) => {
    const localPath = input.getAttribute('data-local-next');
    if (localPath) {
      input.value = window.location.href.replace(/[^/]*$/, localPath);
    }
  });
})();
