export function getFirstAndLastName(fullName: string) {
  const nameParts = fullName.trim().split(/\s+/);
  if (nameParts.length === 1) {
    return nameParts[0];
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  return `${firstName} ${lastName}`;
}

export function getInitials(fullName: string): string {
  const nameParts = fullName.trim().split(/\s+/);

  if (nameParts.length === 0 || nameParts[0] === "") {
    return "";
  }

  const firstInitial = nameParts[0][0].toUpperCase();
  const lastInitial =
    nameParts.length > 1 ? nameParts[nameParts.length - 1][0].toUpperCase() : firstInitial;

  return `${firstInitial}${lastInitial}`;
}
