import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: `./products-header.component.html`,
  styles: [],
})
export class ProductsHeaderComponent {
  @Output() newColumnsUpdate = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() itemsSortChange = new EventEmitter<string>();
  sort = "desc";
  itemsShowCount = 12;

  onSortUpdate(newSort: string): void {
    this.sort = newSort;
    this.itemsSortChange.emit(newSort);
  }

  onItemsUpdate(count: number) {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }
  onColumnsCount(colsNumber: number) {
    this.newColumnsUpdate.emit(colsNumber);
  }
}
