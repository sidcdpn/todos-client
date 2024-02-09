//// commented right before adding ractive forms
// import { Component, OnInit } from '@angular/core';
// import { CategoryService } from '../../services/category.service';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-categories',
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.scss']
// })
// export class CategoriesComponent implements OnInit{
// categoryStorage:any[]=[];
// categoryName:string='';
// errorMessage:string='';

// constructor(private categoryService:CategoryService){}

// ngOnInit(): void {
//   this.getAllCategories()
// }

// getAllCategories():void{
//   this.categoryService.getAllCategories()
//   .subscribe(categories=>{
//     console.log('categories found',categories);   
//     this.categoryStorage=categories
//   })
// }

// createCategory():void{
//   if(!this.categoryName.trim()){
//     return;
//   }
//   this.categoryService.createCategory({catName:this.categoryName})
//   .subscribe(newCategory=>{
//     console.log('category added',newCategory);
//     this.categoryStorage.push(newCategory)
//     this.categoryName=''
//     this.errorMessage=''
//   },
//   (error:HttpErrorResponse)=>{
//     if(error.status === 409){
//       this.errorMessage=error.error.message;

//     }else{
//       this.errorMessage='An error occured,please try agin lter!'
//     }
//   }
//   )
// }


// }


import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({

  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit{
categoryStorage:any[]=[];
categoryName:string='';
errorMessage:string='';
//reactive section
categoryForm:FormGroup;

constructor(private formBuilder:FormBuilder,private  categoryService:CategoryService){
  this.categoryForm=this.formBuilder.group({
    categoryName:['',Validators.required]
  })
}

ngOnInit(): void {
  this.getAllCategories()
}

getAllCategories():void{
  this.categoryService.getAllCategories()
  .subscribe(categories=>{
    console.log('categories found',categories);   
    this.categoryStorage=categories
  })
}
createCategory():void{
  if(this.categoryForm.invalid){
    return;
  }
  const categoryName=this.categoryForm.value.categoryName;
  this.categoryService.createCategory({catName:categoryName}).subscribe(
    (newCategory)=>{
      console.log('category added:',newCategory);
      this.categoryStorage.push(newCategory);
      this.categoryForm.reset();
      this.errorMessage=''   
    },
    (error) => {
      console.error('Error creating category:', error);
      if (error.status === 409) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'An error occurred, please try again later!';
      }
    }


  )
}


}

