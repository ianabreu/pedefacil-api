type passwordIsValidType = {
  message: string;
  isValid: boolean;
};

export function formatText(input: string): string {
  // Remove acentos
  const normalized = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Remove caracteres especiais
  const removedSpecialChars = normalized.replace(/[^\w\s]/gi, "");
  // Substitui espaços por hífens
  const withoutSpaces = removedSpecialChars.replace(/\s+/g, "-");
  return withoutSpaces.toLowerCase();
}

function meetsRequirement(
  regex: RegExp,
  message: string,
  password: string
): passwordIsValidType {
  if (!regex.test(password)) {
    return {
      message,
      isValid: false,
    };
  }
  return null;
}

export function passwordIsValid(password: string): passwordIsValidType {
  const requirements = [
    {
      regex: /[A-Z]/,
      message: "Invalid password. Include an uppercase letter.",
    },
    {
      regex: /[a-z]/,
      message: "Invalid password. Include a lowercase letter.",
    },
    { regex: /[0-9]/, message: "Invalid password. Include a number." },
    {
      regex: /[!\|@#\$%\^&\*\(\)\-_]/,
      message: "Invalid password. Include a special character.",
    },
  ];

  if (password.length < 6) {
    return {
      message: "Invalid password. Minimal lenght 6 characters.",
      isValid: false,
    };
  }

  for (const req of requirements) {
    const result = meetsRequirement(req.regex, req.message, password);
    if (result) return result;
  }

  return {
    message: "",
    isValid: true,
  };
}
