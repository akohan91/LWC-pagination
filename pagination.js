import { LightningElement,api } from 'lwc';
 
export default class Pagination extends LightningElement {
    @api countView;
    @api allCount;
    startView = 0;
    endView;
    get templateStartView(){
        return this.startView + 1;
    }
    connectedCallback(){
        this.endView = this.countView;
        this.dispatchPaginationEvent()
    }
    handlePrev(){
        if (this.startView - this.countView <= 0){
            this.startView  = 0;
            this.endView    = this.countView;
        } else {
            this.startView  -= this.countView;
            this.endView    -= this.countView;
        }
        this.dispatchPaginationEvent()
    }
    handleNext(){
        if (this.endView + this.countView >= this.allCount){
            this.startView  = this.allCount - this.countView;
            this.endView    = this.allCount;
        } else {
            this.startView  += this.countView;
            this.endView    += this.countView;
        }
        this.dispatchPaginationEvent()
    }
    @api
    resetPagination(){
        this.startView  = 0;
        this.endView    = this.countView;
    }
    get disabled(){
        return {
            prev: this.startView <= 0 ? true : false,
            next: this.endView >= this.allCount ? true : false
        }
    }
    dispatchPaginationEvent(){
        this.dispatchEvent(new CustomEvent('pagination',{
            detail:{
                startView   : this.startView,
                endView     : this.endView
            }
        }));
    }
}