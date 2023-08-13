export function formatText(input: string): string {
  // Remove acentos
  const normalized = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Remove caracteres especiais
  const removedSpecialChars = normalized.replace(/[^\w\s]/gi, "");
  // Substitui espaços por hífens
  const withoutSpaces = removedSpecialChars.replace(/\s+/g, "-");
  return withoutSpaces.toLowerCase();
}
