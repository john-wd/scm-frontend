import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureFlagService } from '../services/feature-flag.service';

@Directive({
  selector: '[featureFlag]',
  standalone: true
})
export class FeatureFlagDirective implements OnInit {
  @Input("featureFlag") flag: string;

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private featureFlagService: FeatureFlagService,
  ) { }

  ngOnInit() {
    const enabled = this.featureFlagService.isEnabled(this.flag);
    if (enabled)
      this.vcr.createEmbeddedView(this.tpl)
  }
}
