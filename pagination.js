import { LightningElement,api } from 'lwc';

export default class Pagination extends LightningElement {
	_pageSize;
	@api get pageSize() {
		return this._pageSize;
	}
	set pageSize(value) {
		return this._pageSize = +value;
	}

	_listSize;
	@api get listSize() {
		return this._listSize;
	}
	set listSize(value) {
		return this._listSize = +value;
	}

	get allPages() {
		if (this._listSize % this._pageSize) {
			return Math.floor(this.listSize / this.pageSize) + 1;
		} else {
			return Math.floor(this.listSize / this.pageSize);
		}
	}

	currentPage = 1;
	get startView() {
		return (this.currentPage * this.pageSize) - this.pageSize + 1;
	};
	get endView() {
		let temp = this.currentPage * this.pageSize;
		return temp > this.listSize ? this.listSize : temp;
	};

	get disabled(){
		return {
			prev: this.currentPage == 1,
			next: this.currentPage == this.allPages,
		}
	}

	@api handlePrev(){
		this.currentPage = this.disabled.prev ? 1 : this.currentPage - 1;
		this.dispatchPaginationEvent()
	}

	@api handleNext(){
		this.currentPage = this.disabled.next ? this.allPages : this.currentPage + 1;
		this.dispatchPaginationEvent()
	}

	@api
	resetPagination(){
		this.currentPage = 1;
	}

	dispatchPaginationEvent(){
		this.dispatchEvent(new CustomEvent('pagination',{
			detail:{
				startView   : this.startView - 1,
				endView     : this.endView
			}
		}));
	}
}
