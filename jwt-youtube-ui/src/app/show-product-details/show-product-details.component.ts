import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent {
  productDetails:Product[]=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price','Product Actual Price'];

  constructor(private productservice:ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  public getProducts(){
    this.productservice.getAllProducts().subscribe(
    //   this.products=data;
     (resp:Product[])=>{
      this.productDetails=resp;
      console.log(resp);
     },
     (error: HttpErrorResponse)=>{
        console.log(error);
     }
     )
  }

}
