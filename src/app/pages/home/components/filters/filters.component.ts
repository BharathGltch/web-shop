import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  constructor(private storeService: StoreService) {}
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> | undefined;
  categorySubscription: Subscription | undefined;

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
  ngOnInit(): void {
    this.storeService.getAllCategories().subscribe((_category) => {
      this.categories = _category;
    });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
