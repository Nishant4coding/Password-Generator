const CharacterRange = document.getElementById("CharacterRange");
const NumberOfCharacter = document.getElementById("NumberOfCharacter");

CharacterRange.addEventListener("input", syncNumberOfCharacter);
NumberOfCharacter.addEventListener("input", syncNumberOfCharacter);

function syncNumberOfCharacter(e) {
  const value = e.target.value;
  CharacterRange.value = value;
  NumberOfCharacter.value = value;
  NumberOfCharacter.innerText = value;
}


const form = document.getElementById("PasswordGeneraterForm");
const IncludeLetterElement = document.getElementById("IncludeLetter");
const IncludeNumberElement = document.getElementById("IncludeNumber");
const IncludeSymbolElement = document.getElementById("IncludeSymbol");

const passwordDisplay = document.getElementById("passwordDisplay");

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const length = NumberOfCharacter.value;
  const IncludeLetter = IncludeLetterElement.checked;
  const IncludeNumber = IncludeNumberElement.checked;
  const IncludeSymbol = IncludeSymbolElement.checked;
  const password = generatePassword(
    length,
    IncludeLetter,
    IncludeNumber,
    IncludeSymbol
  );
  passwordDisplay.innerHTML = password;
});

function generatePassword(length, IncludeLetter, IncludeNumber, IncludeSymbol) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (IncludeLetter) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (IncludeSymbol) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  if (IncludeNumber) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < length; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  const finalPassword = passwordCharacters.slice(0, length);
  return finalPassword.join("");
}
function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}


let handleCopyClick = document.querySelector(".copy");
handleCopyClick.addEventListener("click", () => {
  let text = passwordDisplay.textContent;
  console.log(text);
  navigator.clipboard.writeText(text);

  alert(`Password Copied Successfully`);
});
