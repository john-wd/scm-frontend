import { Injectable } from '@angular/core';
import { FeatureConfig } from '../models/featureconfig.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  config: FeatureConfig;

  constructor() { }

  loadConfig(config: FeatureConfig) {
    this.config = config
  }

  isEnabled(flag: string): boolean {
    if (this.config && Object.hasOwn(this.config, flag)) {
      return this.config[flag]
    }
    return false;
  }
}
