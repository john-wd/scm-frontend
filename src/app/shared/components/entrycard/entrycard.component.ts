import { Component, Input } from '@angular/core';

@Component({
  selector: 'entry-card',
  standalone: true,
  imports: [],
  templateUrl: './entrycard.component.html',
  styleUrl: './entrycard.component.sass'
})
export class EntrycardComponent {
  @Input("imgUrl") imageUrl: string
}
