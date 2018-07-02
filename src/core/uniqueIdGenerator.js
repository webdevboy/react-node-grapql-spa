const ALPHABET = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const BASE = ALPHABET.length; // base is the length of the alphabet (58 in this case)

export default (num) => {
  var encoded = '';
  while (num) {
    var remainder = num % BASE;
    num = Math.floor(num / BASE);
    encoded = ALPHABET[remainder].toString() + encoded;
  }
  return encoded;
}