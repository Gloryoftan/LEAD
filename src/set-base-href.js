// 动态设置base href的脚本
(function() {
  // 检查是否在GitHub Pages环境
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  if (isGitHubPages) {
    // 在GitHub Pages上，设置正确的base href
    const baseElement = document.querySelector('base');
    if (baseElement) {
      baseElement.setAttribute('href', '/LEAD/');
    } else {
      // 如果没有base元素，创建一个
      const base = document.createElement('base');
      base.setAttribute('href', '/LEAD/');
      document.head.insertBefore(base, document.head.firstChild);
    }
  }
})();
