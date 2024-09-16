import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() description: { title: string, package: string } = { title: '', package: '' };
  @Input() photos: { url: string, description: string }[] = [];

  constructor() { }

  ngOnInit(): void { }

  close() {
    this.isVisible = false;
  }
}
