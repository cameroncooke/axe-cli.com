const THEME_SCRIPT = `
(function() {
  try {
    var t = localStorage.getItem('axe-docs-theme');
    if (t !== 'dark' && t !== 'light') t = 'dark';
    document.documentElement.setAttribute('data-docs-theme', t);
    var s = localStorage.getItem('axe-docs-sidebar');
    document.documentElement.setAttribute('data-docs-sidebar', s === 'false' ? 'off' : 'on');
  } catch (e) {
    document.documentElement.setAttribute('data-docs-theme', 'dark');
    document.documentElement.setAttribute('data-docs-sidebar', 'on');
  }
})();
`.trim()

export function DocsThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  )
}
