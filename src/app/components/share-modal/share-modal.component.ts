import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { memoize } from 'src/app/shared/utils/memoization';
import { default as urlcat } from "urlcat";

export type ResourceType = "song" | "playlist" | "game"
export type DialogData = {
  resourceType: ResourceType,
  resourceId: string,
  title: string,
  description: string,
}

type exportType = "link" | "embed" | "twitter"

@Component({
  selector: 'app-share-modal',
  standalone: true,
  imports: [
    MatIconButton,
    MatIconModule,
    MatTooltipModule,
    MatInput,
    MatFormField,
  ],
  templateUrl: './share-modal.component.html',
  styleUrl: './share-modal.component.scss'
})
export class ShareModal implements OnInit {
  copied: boolean;
  inputTypes: { [key in exportType]?: string; } = {
    link: "text"
  }
  exportType: exportType = "link"
  @ViewChild("copyTooltip") copyTooltipRef: MatTooltip

  @memoize()
  resourceUrl(): string {
    let origin = window.location.origin
    return urlcat(origin, this.typePath(), {
      resourceId: this.data.resourceId
    })
  }

  getContent(): string {
    switch (this.exportType) {
      case 'link':
        return this.resourceUrl()
      default:
        return ""
    }
  }

  typePath(): string {
    switch (this.data.resourceType) {
      case 'game':
        return "/explore/games/:resourceId"
      case 'song':
        return "/explore/songs/:resourceId"
      case 'playlist':
        return "/explore/playlists/:resourceId"
      default:
        throw `resource type ${this.data.resourceType} is invalid`
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ShareModal>,
  ) {
    if (!data) {
      throw "data must be provided to this modal"
    }
  }

  ngOnInit(
  ): void {
  }

  onclose() {
    this.dialogRef.close()
  }

  copyToClipboard() {
    this.copyTooltipRef.hide()
    if (!this.copied)
      setTimeout(() => {
        this.copied = true
        this.copyTooltipRef.hideDelay = 1000
        this.copyTooltipRef.show()
      }, 50)
  }

  copyToClipboardBlur() {
    if (this.copied)
      setTimeout(() => {
        this.copied = false
        this.copyTooltipRef.hideDelay = 200
      }, 1000)
  }
}
