import nconf from 'nconf';
import axios from 'axios';
import { isHandlerEnabled, requestHandler, errorHandler, successHandler } from './common/httpInterceptor'
const baseURL = nconf.get('baseURL');
const actions = nconf.get('actions');
console.log(baseURL)
const api = axios.create({
    baseURL
});

api.interceptors.request.use(
    request => requestHandler(request)
)

api.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)

// export async const uploadFile = (fileData) => dispatch => {

//     console.log('uploading')
//     try {
//             api.post('/uploadFile', fileData).then(res => {
//             console.log(res.data)
//             dispatch({
//                 type: actions.JSON_RECEIVED,
//                 payload : res.data
//             })
//         });
//     }
//     catch (error) {
//         console.log(error)
//     }
// }


export async function uploadFile({ dispatch, fileData, isHandlerEnabled }) {
    try {
        let res = await api.post('/uploadFile', fileData, { isHandlerEnabled })
        if (res.status) {
            let result = res.data
            console.log(result)
            dispatch({
                type: actions.JSON_RECEIVED,
                payload: result
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getSheetNames({ dispatch, fileData, isHandlerEnabled }) {
    try {
        let res = await api.post('/getSheets', fileData, { isHandlerEnabled })
        if (res.status) {
            let result = res.data
            console.log(result)
            dispatch({
                type: actions.SHEET_NAMES_RECEIVED,
                payload: result
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export async function selectedFiles({ dispatch, file }) {
    try {
        if (file) {
            dispatch({
                type: actions.FILE_ADDED,
                payload: file
            })
        }
    }
    catch (error) {
        console.log(error)
    }
}

export async function setInputValues({ dispatch, values }) {
    try {
        dispatch({
            type: actions.INPUT_VALUES_ENTERED,
            payload: values
        })
    }
    catch (error) {
        console.log(error)
    }
}