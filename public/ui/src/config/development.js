import nconf from 'nconf';
nconf.use('memory');

const actions = {
    JSON_RECEIVED : 'JSON_RECEIVED',
    SHEET_NAMES_RECEIVED : 'SHEET_NAMES_RECEIVED',
    FILE_ADDED : 'FILE_ADDED',
    INPUT_VALUES_ENTERED : 'INPUT_VALUES_ENTERED'
}

const baseURL = "http://localhost:8000/upload";

nconf.set('baseURL' , baseURL);
nconf.set('actions' , actions);

console.log(nconf.get('actions'))