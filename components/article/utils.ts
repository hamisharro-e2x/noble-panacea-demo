export function removeWwwFromUrl(url: string): string {
  const wwwRegex = /^(https?:\/\/)?www\./;

  return url.replace(wwwRegex, '$1');
}
