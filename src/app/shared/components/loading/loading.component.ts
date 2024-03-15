import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input("size") size: number;
  constructor(public loadingService: LoadingService) { }
}
