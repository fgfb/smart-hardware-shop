import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  text: string = '';

  constructor(@Optional() @Inject(MAT_SNACK_BAR_DATA) private productName: string,
  private snackRef: MatSnackBarRef<SnackBarComponent>) {
    this.text = productName + "got added to cart!";
  }

  ngOnInit(): void {
  }

  cancel(){
    this.snackRef.dismiss();
  }

}
