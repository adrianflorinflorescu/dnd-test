const memory = {} as {[key: number]: string}

export function generateRandomString({i}: {i: number}): string {
  if(memory[i]){
    return memory[i]
  }
  const minWords = 2;
  const maxWords = 10;

  const whatIs = ['cool', 'fast', 'simple', 'amazing', 'awesome'];
  const whoIs = ['item', 'point', 'thing', 'example'];

  const randomWords = (words: string[]) => words[Math.floor(Math.random() * words.length)];

  const words = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;

  let phrase = '';

  for (let i = 0; i < words; i++) {
    phrase += randomWords(i % 2 === 0 ? whatIs : whoIs) + ' ';
  }

  memory[i] = phrase;

  return phrase;
}