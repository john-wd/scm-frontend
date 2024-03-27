import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  styleUrls: ['./about.component.scss'],
  standalone: true,
})
export class AboutComponent implements OnInit {
  repoLink = "https://github.com/john-wd/scm-frontend"
  telegramLink = "https://t.me/smashcustommusic"
  mailLink = "mailto:contact@smashcustommusic.net"

  constructor() { }

  ngOnInit(): void {
  }

}
