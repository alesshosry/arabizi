import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArabiziConverterService {

  private arToArabizi: Record<string, string> = {
    'ا': 'a', 'أ': '2a', 'إ': '2e', 'آ': 'aa',
    'ء': '2', 'ؤ': '2', 'ئ': '2',

    'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j',
    'ح': '7', 'خ': '5', 'د': 'd', 'ذ': 'dh',
    'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh',
    'ص': '9', 'ض': "9'", 'ط': '6', 'ظ': "6'",
    'ع': '3', 'غ': "3'", 'ف': 'f', 'ق': '8',
    'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
    'ه': 'h', 'و': 'w', 'ي': 'y',
    'ى': 'a', 'ة': 'a'
  };

  private arabiziToAr: Record<string, string> = {
    "9'": 'ض', "6'": 'ظ', "3'": 'غ',
    "sh": 'ش', "th": 'ث', "dh": 'ذ',
    "2a": 'أ', "2e": 'إ', "aa": 'آ',

    "2": 'ء', "3": 'ع', "5": 'خ',
    "6": 'ط', "7": 'ح', "8": 'ق', "9": 'ص',

    "a": 'ا', "b": 'ب', "t": 'ت',
    "j": 'ج', "d": 'د', "r": 'ر',
    "z": 'ز', "s": 'س', "f": 'ف',
    "k": 'ك', "l": 'ل', "m": 'م',
    "n": 'ن', "h": 'ه', "w": 'و',
    "y": 'ي'
  };

  private removeDiacritics(text: string): string {
    return text.replace(/[\u064B-\u065F\u0670]/g, '');
  }

  arabicToArabizi(text: string): string {
    text = this.removeDiacritics(text);

    let result = '';
    for (const char of text) {
      result += this.arToArabizi[char] ?? char;
    }

    return result;
  }

  arabiziToArabic(text: string): string {
    let result = '';
    let i = 0;

    while (i < text.length) {
      const twoChar = text.substring(i, i + 2);

      if (this.arabiziToAr[twoChar]) {
        result += this.arabiziToAr[twoChar];
        i += 2;
        continue;
      }

      const oneChar = text[i];

      if (this.arabiziToAr[oneChar]) {
        result += this.arabiziToAr[oneChar];
      } else {
        result += oneChar;
      }

      i++;
    }

    return result;
  }
}
