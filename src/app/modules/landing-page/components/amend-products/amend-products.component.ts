import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'src/app/interfaces/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-amend-products',
  templateUrl: './amend-products.component.html',
  styleUrls: ['./amend-products.component.scss']
})
export class AmendProductsComponent implements OnInit {

  productForm!: FormGroup;

  invalidForm: boolean = false;

  constructor(private formBuiler: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AmendProductsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) {
    this.createForm();
    if(data){
      this.productForm.get('name')?.setValue(data.name);
      this.productForm.get('description')?.setValue(data.description);
      this.productForm.get('price')?.setValue(data.price);
      this.productForm.get('discount')?.setValue(data.discount);
    }
  }

  ngOnInit(): void {
  }

  createForm(){
    this.productForm = this.formBuiler.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required]
    });
  }

  submit(){

    this.invalidForm = false;
    if(this.productForm.invalid){
      return;
    }

    let requestBody = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      defaultImage: "http://placeimg.com/640/480/cats",
      images: [
        "http://placeimg.com/640/480/cats",
        "http://placeimg.com/640/480/cats",
        "http://placeimg.com/640/480/cats",
        "http://placeimg.com/640/480/cats"
      ],
      price: this.productForm.get('price')?.value,
      discount: this.productForm.get('discount')?.value,
    }

    if(this.data){
      this.apiService.updateProductById(this.data.id, requestBody).subscribe({
        next: (res) => {
          this.dialogRef.close();
        },
        error: (err) => console.error(err)
      })
    } else {
      this.apiService.addNewProduct(requestBody).subscribe({
        next: (res) => {
          this.dialogRef.close();
        },
        error: (err) => console.error(err)
      });
    }

  }

  close(){
    this.dialogRef.close();
  }

}
