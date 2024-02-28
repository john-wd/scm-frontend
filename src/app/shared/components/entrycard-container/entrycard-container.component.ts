import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrycardComponent } from '../entrycard/entrycard.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { memoize } from '../../utils/memoization';

export interface Entry {
  entryId: string;
  imageUrl: string;
  title: string;
}

export type Type = "series" | "console" | "playlist" | "game"
export const ENTRY_ID: string = ":entryId"

@Component({
  selector: 'entry-card-container',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    EntrycardComponent,
  ],
  templateUrl: './entrycard-container.component.html',
  styleUrl: './entrycard-container.component.sass'
})
export class EntrycardContainerComponent {
  @Input("entries") entries: Entry[] | null
  @Input("type") type: Type
  @Input({ transform: booleanAttribute }) nowrap: boolean = false;
  @Input("routerLinkTemplate") routerLinkTemplate: string[] = []
  @Input("queryParams") queryParams: any = {}

  @memoize()
  link(entryId: string): string[] {
    return this.routerLinkTemplate.map(x => {
      return x.replace(ENTRY_ID, entryId)
    })
  }

  @memoize()
  query(entryId: string): object {
    let params: any = this.queryParams
    Object.keys(params).forEach(k => {
      if (params[k] === ENTRY_ID) {
        params[k] = entryId
      }
    })
    return params
  }
}
