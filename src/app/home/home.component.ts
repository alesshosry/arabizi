import { Component } from '@angular/core';
import { ArabiziConverterService } from '../services/arabizi-converter.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  inputText: string = '';
  outputText: string = '';

  constructor(private converter: ArabiziConverterService) { }

  convertToArabizi(): void {
    this.outputText = this.converter.arabicToArabizi(this.inputText);
  }

  convertToArabic(): void {
    this.outputText = this.converter.arabiziToArabic(this.inputText);
  }

  clear(): void {
    this.inputText = '';
    this.outputText = '';
  }
}
