import nconf from 'nconf';

const defaultState = {
    fileContents: null,
    sheetNames: null,
    addedFile : null,
    inputValues : null
}

const actions = nconf.get('actions');

export default function (state = defaultState, action) {
    // if (action !== undefined) {
    switch (action.type) {
        case actions.JSON_RECEIVED:
            {
                state = {
                    ...state,
                    fileContents: { ...state.fileContents, ...action.payload },
                };
                break

            }
        case actions.SHEET_NAMES_RECEIVED:{
            state = {
                ...state,
                sheetNames: { ...state.sheetNames, ...action.payload },
            };
            break
        }
        case actions.FILE_ADDED:{
            state = {
                ...state,
                addedFile: { ...state.addedFile, ...action.payload },
            };
            break;
        }
        case actions.INPUT_VALUES_ENTERED: {
            state = {
                ...state,
                inputValues: { ...state.inputValues, ...action.payload },
            };
            break;
        }
        default:

            return state
    }
    return state;
}

