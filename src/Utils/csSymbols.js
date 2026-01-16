// Computer Science & Algorithm related symbols and text
export const csSymbols = [
  // Math & Logic Operators
  "∑", "∏", "∫", "∂", "∆", "∇", "√", "∞", "≈", "≠", "≤", "≥", "±", "×", "÷",
  "∈", "∉", "⊂", "⊃", "∪", "∩", "∧", "∨", "¬", "⊕", "⊗", "→", "←", "↔", "⇒",

  // Binary & Hex
  "0", "1", "0x", "&&", "||", "!=", "==", "++", "--", "<<", ">>",

  // Algorithm Keywords
  "if", "else", "for", "while", "return", "void", "int", "bool", "null",
  "true", "false", "break", "continue", "switch", "case", "try", "catch",

  // Data Structures
  "[]", "{}", "()", "<>", "->", "=>", "::", "...", "/**", "*/",

  // Big O Notation
  "O(1)", "O(n)", "O(n²)", "O(log n)", "O(n!)", "Θ(n)", "Ω(n)",

  // Algorithm Names (short)
  "BFS", "DFS", "A*", "DP", "DIV", "MOD", "XOR", "AND", "OR", "NOT",

  // Greek Letters (common in CS)
  "α", "β", "γ", "δ", "ε", "λ", "μ", "π", "σ", "τ", "φ", "ω",

  // Special Symbols
  "⌘", "⌥", "⇧", "⌫", "⏎", "⎋", "◉", "◎", "●", "○", "■", "□", "▲", "△", "▼", "▽",

  // Code Symbols
  "#", "$", "@", "&", "*", "%", "^", "~", "`", "|", "\\", "/",

  // Brackets & Delimiters
  "[i]", "[j]", "[k]", "arr[]", "fn()", "*.js", "*.py", "</>", "</>"
];

// Get a random symbol from the list
export const getRandomSymbol = () => {
  return csSymbols[Math.floor(Math.random() * csSymbols.length)];
};

// Get multiple random symbols
export const getRandomSymbols = (count) => {
  const symbols = [];
  for (let i = 0; i < count; i++) {
    symbols.push(getRandomSymbol());
  }
  return symbols;
};
