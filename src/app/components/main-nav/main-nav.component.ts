import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ThemeToggleService } from 'src/app/shared/services/theme-toggle.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.sass']
})
export class MainNavComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void { }

  onBack() {
    this._location.back()
  }

}
