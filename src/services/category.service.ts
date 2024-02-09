import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl='http://localhost:3000/categories';

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl)
 }

 createCategory(categoryData:{catName:string}):Observable<any>{
    return this.http.post(this.baseUrl,categoryData)
    //added this ti console the error cz its lost when i call error in components for display
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        console.error('Error',error.error);
        return throwError(error)
        
      })
    )
 }
}
