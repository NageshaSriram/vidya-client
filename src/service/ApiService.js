import {instance} from './AuthenticationService';

export const API_ADMIN = '/admin'
export const API_ORGANIZATION_ALL = API_ADMIN + '/organization/all'

export const API_ADD_ORGANIZATION = API_ADMIN + '/organization/add/organization'

export const API_FILE = '/file'
export const API_FILE_UPLOAD = API_FILE + '/upload'

class ApiService {
    getAllOrganization(){
        return instance.get(API_ORGANIZATION_ALL);
    }

    addOrganization(organization){
        return instance.post(API_ADD_ORGANIZATION, organization);
    }

    uploadFile(file){
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return instance.post(API_FILE_UPLOAD, formData, config)
    }

    getFile(fileId){
        return instance.get(API_FILE + "/" + fileId);
    }
    

    
}
export default new ApiService()