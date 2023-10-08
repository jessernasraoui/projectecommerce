import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient:HttpClient) { }
  public addProduct(product:FormData){
return this.httpclient.post<Product>("http://localhost:8080/add",product );
  }
  public getAllProducts(){
    return this.httpclient.get<Product[]>("http://localhost:8080/getAllProducts");
  }
}
