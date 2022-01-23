
class Job {

    job = null;
    shipment = null;
    status = null;
    latitude = null;
    longitude = null;

    constructor(job, options = {}) {
        if(!this.validate(job,options)) {
            throw "Data not valid";
        } else {
            this.shipment = job.shipment;
            if(options.skipJob === undefined || options.skipJob === false) {
                this.job = job.job;    
            }
            if(options.skipStatus === undefined || options.skipStatus === false) {
                this.status = job.status;
            }
            if(job.latitude !== undefined) {
                this.latitude = job.latitude;
            }
            if(job.longitude !== undefined) {
                this.longitude = job.longitude;
            }
        }
    }

    validate(job, options) {
        // Try to keep error = false;
        let error = (job.shipment === undefined || job.shipment.match(/^[A-Z]{4}[0-9]{8}$/g) === null); 
        
        if(!error && (options.skipJob === undefined || options.skipJob === false)) { 
            error = (job.job === undefined || job.job.match(/^[A-Z][0-9]{8}$/g) === null); 
        }
        
        if(!error && (options.skipStatus === undefined || options.skipStatus === false)) {
            switch(job.status.toUpperCase()) {
                case 'ADDED':
                case 'SHIPPED':
                case 'CANCELLED':
                case 'ON HOLD':
                case 'DELIVERED':
                    break;
                default:
                    error = true;
                    break;
            }
        }
        return !error;
    }
}

module.exports = Job;