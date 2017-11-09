class PaginationService {
  constructor(total, limit, currentPage = 1) {
    this.limit = limit;
    this.currentPage = currentPage;
    this.total = total;
  }

  paginate() {
    const currentPage = parseInt(this.currentPage, 10);
    const skip = this.calculateSkip();
    const lastPage = this.calculeteTotalPages();
    const nextPage = this.calculateNextPage(lastPage);
    const prevPage = this.calculatePreviousPage();
    const { total, limit } = this;

    return {
      skip,
      meta: {
        total,
        limit,
        currentPage,
        lastPage,
        nextPage,
        prevPage,
      },
    };
  }

  calculateSkip() {
    return this.currentPage * this.limit - this.limit;
  }

  calculeteTotalPages() {
    return Math.ceil(this.total / this.limit);
  }

  calculateNextPage(lastPage) {
    let nextPage = lastPage;

    if (this.currentPage < lastPage) {
      nextPage = Number(this.currentPage) + 1;
    }

    return nextPage;
  }

  calculatePreviousPage() {
    let prevPage;

    if (this.currentPage > 1) {
      prevPage = this.currentPage - 1;
    }

    return prevPage;
  }
}

module.exports = PaginationService;
