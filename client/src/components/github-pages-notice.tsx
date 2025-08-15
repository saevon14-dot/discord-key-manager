// GitHub Pages Notice Component
export default function GitHubPagesNotice() {
  const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');
  
  if (!IS_GITHUB_PAGES) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span>GitHub Pages Demo Mode - Data stored locally</span>
      </div>
    </div>
  );
}