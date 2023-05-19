import isPalindrome from '../../functions/is-palindrome';

describe('Test Palindrome Function', () => {
  // An empty string is considered a palindrome as it reads the same forwards and backwards.
  test('Test Empty String', () => {
    expect(isPalindrome('')).toBe(true);
  });

  test('Test Single Character String', () => {
    expect(isPalindrome('a')).toBe(true);
  });

  test('Test Palindrome String', () => {
    expect(isPalindrome('abcba')).toBe(true);
  });

  test('Test Non-Palindrome String', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  // The function should ignore the case of the characters and treat them as equal.
  test('Test Palindrome String with Different Cases', () => {
    expect(isPalindrome('RaceCar')).toBe(true);
  });

  test('Test Palindrome String with Spaces', () => {
    expect(isPalindrome('race car')).toBe(true);
  });

  test('Test Palindrome String with Punctuation', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama!')).toBe(true);
  });
});
