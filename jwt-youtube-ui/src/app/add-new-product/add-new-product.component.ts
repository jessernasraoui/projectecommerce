import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotExpr } from '@angular/compiler';
import { FileHandle } from '../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{

  product: Product = {
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }
  constructor(private productservice:ProductService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.product.productImages)
  }
  onFileSelected(event:any){
if(event.target.files){
  const file=event.target.files[0]
  const fileHandle : FileHandle={
    file:file,
    url:this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    )
  }
  this.product.productImages.push(fileHandle)

  }}
  prepareFormData(product:Product):FormData{
    const formData=new FormData();
    formData.append('product',new Blob([JSON.stringify(product)],{type:'application/json'}));
    for(let i=0;i<product.productImages.length;i++){
      formData.append('imageFile',product.productImages[i].file,product.productImages[i].file.name);
    }
    return formData;
  }
  addProduct(p:NgForm)  {
    const productFormData=this.prepareFormData(this.product);
this.productservice.addProduct(productFormData).subscribe(

  (reponse:Product)=>{
p.reset()
this.product.productImages=[]
  },(error:HttpErrorResponse)=>{
    console.log(error);
  } )
 }
  removeImages(i:number){
    this.product.productImages.splice(i,1);
  }
  fileDropped($fileHandle:any){

this.product.productImages.push($fileHandle);


}
}
