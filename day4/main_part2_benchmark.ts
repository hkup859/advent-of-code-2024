const solution = (input) => {
  const fullText = input.split("\n").join(",");
  const lineLength = fullText.indexOf(",");

  const CRISSCROSS_M_REGEX = new RegExp(
    `(?=M.{1}S.{${lineLength - 1}}A.{${lineLength - 1}}M.{1}S)`,
    "g",
  );
  const CRISSCROSS_S_REGEX = new RegExp(
    `(?=S.{1}M.{${lineLength - 1}}A.{${lineLength - 1}}S.{1}M)`,
    "g",
  );
  const M_REGEX = new RegExp(
    `(?=M.{1}M.{${lineLength - 1}}A.{${lineLength - 1}}S.{1}S)`,
    "g",
  );
  const S_REGEX = new RegExp(
    `(?=S.{1}S.{${lineLength - 1}}A.{${lineLength - 1}}M.{1}M)`,
    "g",
  );

  const CRISSCROSS_M = fullText.match(CRISSCROSS_M_REGEX) ?? [];
  const CRISSCROSS_S = fullText.match(CRISSCROSS_S_REGEX) ?? [];
  const M_CROSS = fullText.match(M_REGEX) ?? [];
  const S_CROSS = fullText.match(S_REGEX) ?? [];

  // Combine all searches
  return CRISSCROSS_M.length + CRISSCROSS_S.length + M_CROSS.length +
    S_CROSS.length;
};
