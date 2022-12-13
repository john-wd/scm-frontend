import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@NgModule({
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    CdkTableModule,
  ],
})
export class MaterialModule {}
