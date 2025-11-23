const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

const $ = id => document.getElementById(id);

function generatePassword(length, sets) {
  if (sets.length === 0) return "";
  const all = sets.join("");
  let password = [];
  
  for (const s of sets) {
    password.push(s[Math.floor(Math.random() * s.length)]);
  }

  for (let i = password.length; i < length; i++) {
    password.push(all[Math.floor(Math.random() * all.length)]);
  }
 
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }
  return password.join("");
}

$("generate").addEventListener("click", () => {
  const length = parseInt($("length").value, 10) || 12;
  const sets = [];
  if ($("upper").checked) sets.push(upperChars);
  if ($("lower").checked) sets.push(lowerChars);
  if ($("numbers").checked) sets.push(numberChars);
  if ($("symbols").checked) sets.push(symbolChars);

  if (sets.length === 0) {
    $("result").value = "";
    $("note").textContent = "Please select at least one character set.";
    return;
  }
  if (length < sets.length) {
    $("note").textContent = `Length should be at least ${sets.length} to include each selected type.`;
    return;
  }
  $("note").textContent = "Tip: include at least one character set.";
  $("result").value = generatePassword(length, sets);
});

$("copy").addEventListener("click", async () => {
  const txt = $("result").value;
  if (!txt) return;
  try {
    await navigator.clipboard.writeText(txt);
    $("note").textContent = "Copied to clipboard!";
  } catch {

    $("result").select();
    document.execCommand("copy");
    $("note").textContent = "Copied to clipboard (fallback)!";
  }
});
