import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getFutureEvents from '@salesforce/apex/FutureEvents.getFutureEvents';

export default class Sessions extends NavigationMixin(LightningElement) {
    @track events = [];
    @track filteredEvents = [];
    searchTerm = '';
    error;

    @wire(getFutureEvents)
    wiredEvents({ error, data }) {
        if (data) {
            this.events = data;
            this.filteredEvents = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.events = [];
            this.filteredEvents = [];
        }
    }

    handleSearchTermChange(term){
        this.searchTerm = term;
        this.filteredEvents = this.events.filter(event =>
            event.Name.toLowerCase().includes(this.searchTerm)
        );
    }

    handleCardClick(event) {
        const recordId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view',
            },
        });
    }
}
