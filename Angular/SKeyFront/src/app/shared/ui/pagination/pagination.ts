import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skey-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class SkeyPaginationComponent implements OnChanges {
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() itemType = 'عنصر';
  @Output() pageIndexChange = new EventEmitter<number>();

  totalPages = 1;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['total'] || changes['pageSize']) {
      this.totalPages = Math.ceil(this.total / this.pageSize) || 1;
      this.generatePages();
    }
  }

  selectPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.pageIndex) {
      this.pageIndexChange.emit(page);
    }
  }

  getStartItem(): number {
    if (this.total === 0) return 0;
    return (this.pageIndex - 1) * this.pageSize + 1;
  }

  getEndItem(): number {
    return Math.min(this.pageIndex * this.pageSize, this.total);
  }

  private generatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
