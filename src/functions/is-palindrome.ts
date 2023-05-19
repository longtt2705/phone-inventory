const isAlphanumeric = (charCode: number): boolean => {
  return (
    (charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122)
  );
};

// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all
// non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
const isPalindrome = (phrase: string): boolean => {
  let i = 0;
  let j = phrase.length - 1;

  const lowercasePhrase = phrase.toLowerCase();

  while (i < j) {
    const left = lowercasePhrase.charCodeAt(i);
    const right = lowercasePhrase.charCodeAt(j);

    // If the characters are not alphanumeric, skip them.
    if (!isAlphanumeric(left)) {
      i++;
      continue;
    } else if (!isAlphanumeric(right)) {
      j--;
      continue;
    }

    if (left !== right) {
      return false;
    }

    i++;
    j--;
  }

  return true;
};

// Time complexity: O(n)
// Using two pointers, we can iterate through the string from both ends and compare the characters at each index. This takes O(n) time.

export default isPalindrome;
