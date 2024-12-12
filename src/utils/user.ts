export function getFirstAndLastName(fullName: string) {
  const nameParts = fullName.trim().split(/\s+/);
  if (nameParts.length === 1) {
    // If only one name is provided, return it as both first and last name
    return nameParts[0];
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  return `${firstName} ${lastName}`;
}
