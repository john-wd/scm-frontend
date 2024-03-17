import { ComponentType } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'route-wrapper',
  standalone: true,
  imports: [
  ],
  template: "",
})
export class RouteWrapperComponent<T> implements OnInit {
  @Input() component: ComponentType<T>
  @Input() routeId: string

  constructor(
    private dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.dialog.open(this.component, {
      data: this.routeId
    }).afterClosed().subscribe(
      () => this.location.back()
    )
  }

}
