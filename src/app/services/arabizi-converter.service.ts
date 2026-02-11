import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArabiziConverterService {

  private arToArabizi: Record<string, string> = {
    'ا': 'a',
    'أ': '2a',
    'إ': '2e',
    'آ': 'aa',
    'ء': '2',
    'ؤ': '2',
    'ئ': '2',

    'َ': 'a',
    'ِ': 'i',
    'ُ': 'ou',

    // Tanwin 
    'ً': 'an',
    'ٍ': 'in',
    'ٌ': 'oun',

    'ْ': '',
    'ّ': '',

    'ب': 'b',
    'ت': 't',
    'ث': 'th',
    'ج': 'j',
    'ح': '7',
    'خ': 'kh',
    'د': 'd',
    'ذ': 'z',
    'ر': 'r',
    'ز': 'z',
    'س': 's',
    'ش': 'sh',
    'ص': 's',
    'ض': "d'",
    'ط': 't',
    'ظ': 'z',
    'ع': '3',
    'غ': 'gh',
    'ف': 'f',
    'ق': 'k',
    'ك': 'k',
    'ل': 'l',
    'م': 'm',
    'ن': 'n',
    'ه': 'h',
    'ي': 'i',
    'ى': 'a',
    'ة': 'a'
  };

  private arabiziToAr: Record<string, string> = {
    "2a": 'أ',
    "2e": 'إ',
    "aa": 'آ',

    // Tanwin reverse support 
    "an": 'ً',
    "in": 'ٍ',
    "oun": 'ٌ',

    "ou": 'و',
    "kh": 'خ',
    "gh": 'غ',
    "sh": 'ش',
    "th": 'ث',
    "d'": 'ض',
    "2": 'ء',
    "3": 'ع',
    "a": 'ا',
    "i": 'ي',
    "b": 'ب',
    "t": 'ت',
    "j": 'ج',
    "d": 'د',
    "r": 'ر',
    "z": 'ز',
    "s": 'س',
    "f": 'ف',
    "k": 'ك',
    "l": 'ل',
    "m": 'م',
    "n": 'ن',
    "h": 'ه',
    "w": 'و'
  };


  // private removeDiacritics(text: string): string {
  //   // Remove everything except tanwin
  //   return text.replace(/[\u064E\u064F\u0650\u0652\u0651\u0670]/g, '');
  // }

  arabicToArabizi(text: string): string {

    let result = '';
    const vowels = ['a', 'i', 'ou'];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      const isStartOfWord = i === 0 || text[i - 1] === ' ';

      //Rule: "ال" at beginning
      if (isStartOfWord && text.substring(i, i + 2) === 'ال') {
        result += 'l';
        i += 1;
        continue;
      }

      // Rule: beginning ا → skip (I guess hayde l rule fine khalliya w chil li fo2)
      if (isStartOfWord && char === 'ا') {
        continue;
      }

      //Special handling for و  aw2at btelafaz w aw2at ou 
      if (char === 'و') {
        const lastOutput = result;

        if (isStartOfWord) {
          result += 'w';
        } else if (vowels.some(v => lastOutput.endsWith(v))) {
          result += 'w';
        } else {
          result += 'ou';
        }

        continue;
      }

      // Special handling for ي + vowel; lezem zid lal و bas ma bade okhbosa ma3 condition fo2
      if (char === 'ي') {
        const nextChar = text[i + 1] ?? '';
        if (nextChar === 'َ') {
          result += 'ya';
          i += 1;
          continue;
        }
        if (nextChar === 'ِ') {
          result += 'yi';
          i += 1;
          continue;
        }
        if (nextChar === 'ُ') {
          result += 'you';
          i += 1;
          continue;
        }
        // standalone ي
        result += 'i';
        continue;
      }

      // Default mapping
      result += this.arToArabizi[char] ?? char;
    }

    return result;
  }

  arabiziToArabic(text: string): string {
    let result = '';
    const vowels = ['a', 'i', 'ou'];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1] ?? '';
      const nextTwo = text.substring(i, i + 2);
      const nextThree = text.substring(i, i + 3);
      const isStartOfWord = i === 0 || text[i - 1] === ' ';

      // Rule: 'l' at start of word → 'ال'
      if (isStartOfWord && char === 'l') {
        result += 'ال';
        continue;
      }

      // Special handling for 'you', 'yi', 'ya'
      if (nextThree === 'you') { // nextThree will be defined below
        result += 'يُ';
        i += 2; // skip 3 letters
        continue;
      }
      if (nextTwo === 'yi') {
        result += 'يِ';
        i += 1;
        continue;
      }
      if (nextTwo === 'ya') {
        result += 'يَ';
        i += 1;
        continue;
      }

      // standalone 'i' → 'ي'
      if (char === 'i') {
        result += 'ي';
        continue;
      }

      // Handling 'ou' or 'w' → 'و'
      if (nextTwo === 'ou') {
        result += 'و';
        i += 1; // skip next letter
        continue;
      }
      if (char === 'w') {
        result += 'و';
        continue;
      }

      // Default reverse mapping
      result += this.arabiziToAr[char] ?? char;
    }

    return result;
  }


}
