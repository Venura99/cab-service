import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMessageService } from 'src/app/shared/services/app-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  FV: FormGroup;
  items: any
  categories: any
  colors: any
  selectedBrands: any
  selectedColors: any
  selectedPrice: any
  prices: any
  checked1: any
  checked2: any
  color1: any = 'black'
  color2: any
  color3: any
  color4: any
  color5: any
  color6: any
  color7: any
  color8: any
  type: any
  products: any[] = []
  productsAll: any[] = []
  subCategories: any[] = []
  subCategoriesAll: any[] = []
  foods: any[] = []
  foodTypes: any
  foodCategory: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private msgService: AppMessageService,
  ) {
    this.FV = this.formBuilder.group({
      selectedCategory: [''],
      selectedBrands: ['', Validators.required],
      selectedPrice: ['', Validators.required],
      checked1: ['', Validators.required],
      foodType: ['']
    });
  }

  ngOnInit(): void {
    this.loadAllFoodCategories()
    this.loadAllFoodTypes()
    this.loadAllFoods()
  }

  onChangeCategories() {
    let category = this.FV.get("selectedCategory")?.value
    this.subCategories = this.subCategoriesAll.filter((element: any) => element.categoryId == category.id)
    console.log("selectedCategory", category)
    this.products = []
    this.products = this.productsAll.filter((element: any) => element.categoryId == category.id)
  }

  loadAllFoodCategories() {
    // this.foodCategoryService.getAllCategory().subscribe((result) => {
    //   let results: any = result
    //   if (results.isSuccessful) {
    //     this.foodCategory = results.dataSet
    //     this.foodCategory.unshift({ foodCategoryId: -1, foodCategoryName: 'All' })
    //     console.log("foodCat", this.foodCategory)
    //   } else {
    //     this.msgService.showErrorAlert(result.Message)
    //   }
    // })
  }

  loadAllFoodTypes() {
    // this.foodTypesService.GetAllFoodTypes().subscribe((result) => {
    //   let results: any = result
    //   if (results.isSuccessful) {
    //     let data = results.dataSet
    //     this.foodTypes = []
    //     this.foodTypes = data
    //     this.foodTypes.unshift({ foodTypeId: -1, foodTypeName: 'All' })
    //     console.log("Food Types", data)
    //   } else {
    //     this.msgService.showErrorAlert(result.Message)
    //   }
    // })
  }

  loadAllFoods() {
    try {
      // this.foodService.GetAllFoods().subscribe((result) => {
      //   let results: any = result
      //   if (results.isSuccessful) {
      //     this.foods = results.dataSet
      //     console.log("this.foods", this.foods)
      //   } else {
      //     this.msgService.showErrorAlert(result.Message)
      //   }
      // })
    } catch (error: any) {
      this.msgService.showErrorAlert(error)
    }
  }

  onClickAddToCart(rowData: any) {
    try {

    } catch (error: any) {
      this.msgService.showErrorAlert(error)
    }
  }
}
