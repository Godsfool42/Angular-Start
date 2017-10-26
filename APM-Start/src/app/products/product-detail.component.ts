import {Component, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "./product.service";
import {ProductListComponent} from "./product-list.component";

@Component({
  selector: "pm-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: IProduct;
  products: IProduct[] = [];
  filteredProducts: IProduct[];
  errorMessage: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _productService: ProductService) {

  }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get("id");
    this.pageTitle += `: ${id}`;
    this.readInProducts(id);
    // this.product = {
    //    "productId" : id,
    //    "productName" : "Leaf Rake",
    //    "productCode" : "GDN-0011",
    //    "releaseDate" : "March 19, 2016",
    //    "description" : "Leaf rake with 48-inch wooden handle",
    //    "price" : 19.95,
    //    "starRating" : 3.2,
    //    "imageUrl" : "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    //  }
  }


  onBack(): void {
    this._router.navigate(["/products"]);

  }

  readInProducts(id: number): void {
    this._productService.getProducts()
      .subscribe(returnProducts => {
          this.products = returnProducts;
          this.filteredProducts = this.products;
          this.filterProducts(id)
        },
        error => this.errorMessage = <any>error);
  }

  filterProducts(id: number) {
    for (let product of this.filteredProducts) {
      if(product.productId == id) {
        this.product = product;
        break;
      }
    }
  }



}
