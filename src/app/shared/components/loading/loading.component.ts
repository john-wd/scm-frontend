import { Component, Input } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.sass'
})
export class LoadingComponent {
  @Input("size") size: number;
  constructor(public loadingService: LoadingService) { }
}
