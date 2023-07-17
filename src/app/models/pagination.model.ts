export class Pagination {
    page: number;
    pageSize: number;
    numElements?: number;
    constructor(page: number, pageSize: number, numElements: number) {
        this.page = page;
        this.pageSize = pageSize;
        this.numElements = numElements;
    }
}