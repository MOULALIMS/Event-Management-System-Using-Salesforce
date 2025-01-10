import { LightningElement } from 'lwc';
import getSpeakers from '@salesforce/apex/SessionSpeakers.getSpeakers';
import { NavigationMixin } from 'lightning/navigation';

export default class SpeakerList extends NavigationMixin(LightningElement) {
    speakers =[];
    errors = [];

    connectedCallback() {
        this.fetchSpeakers();
    }

    fetchSpeakers(){
        getSpeakers()
        .then((data) => {
            this.speakers = data.map((speaker) => ({
                ...speaker,
                Image_URL__c: speaker.Image_URL__c || 'https://res.cloudinary.com/dx566fwmp/image/upload/v1736502680/Event%20Speakers/wavwwaerkgi88919dzfb.png',
            }));
            this.errors = [];
        })
        .catch((error) => {
            this.errors = error.message;
            this.speakers = [];
        })
    }

    handleCardClick(event){
        const recordId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view',
            },
        })
    }
}
