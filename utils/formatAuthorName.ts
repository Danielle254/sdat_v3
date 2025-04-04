export default function formatAuthorName(displayName: string): string {
  const nameArray = displayName.split(" ");
  return nameArray[0];
}
