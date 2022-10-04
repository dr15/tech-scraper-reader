export function getCurrentPathTabName(currentPath: string): string {
  return currentPath.split('/').filter((item) => item !== '')[0];
}

export function getLinkTabName(link: string): string {
  return link.split('/').filter((item) => item !== '' && item !== 'reader')[0];
}

export function isCurrentTab(link, currentPath): boolean {
  if (!link || !currentPath) return false;

  return getCurrentPathTabName(currentPath) === getLinkTabName(link);
}
