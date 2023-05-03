import {AppDispatch} from "../store/store";
import {Response} from "../models/Response";
import {getJwtTokenHeader} from "../utils/jwtUtils";
import {IPage} from "../models/IPage";
import {IResourceType} from "../models/IResourceType";
import {resourceTypeSlice} from "../store/reducers/ResourceTypeSlice";
import {IResourceTypeData} from "../models/IResourceTypeData";
import {messageSlice} from "../store/reducers/MesageSlice";
import {IMessage} from "../models/IMessage";

export const getPageWithResourceTypes = (page: number, size: number) => async (dispatch: AppDispatch) => {
    dispatch(resourceTypeSlice.actions.resourceTypeFetching())
    let res = await fetch('/api/type?page=' + (page - 1) + '&size=' + size, {
        method: 'get',
        headers: getJwtTokenHeader()
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IPage<IResourceType>>>;
        else {
            throw response.status;
        }
    }).then((r => {
        if (r.error != null) {
            dispatch(resourceTypeSlice.actions.resourceTypeFetchingError(r.error));

        } else if (r.body != null) {
            dispatch(resourceTypeSlice.actions.resourceTypeFetchingSuccess(r.body));
        }
        return r;
    })).catch(e => {
        console.log(e);
    });

}

export const addResourceType = (data: IResourceTypeData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/type', {
        method: 'post',
        headers: getJwtTokenHeader(),
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IMessage>>;
        else {
            throw response.status;
        }
    }).then((r => {
        if (r.error != null) {
            dispatch(messageSlice.actions.messageFetchingError(r.error));

        } else if (r.body != null) {
            dispatch(messageSlice.actions.messageFetchingSuccess(r.body));
        }
        return r;
    })).catch(e => {
        console.log(e);
    });
}

export const updateResourceType = (id: number, data: IResourceTypeData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/type/' + id, {
        method: 'put',
        headers: getJwtTokenHeader(),
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IMessage>>;
        else {
            throw response.status;
        }
    }).then((r => {
        if (r.error != null) {
            dispatch(messageSlice.actions.messageFetchingError(r.error));

        } else if (r.body != null) {
            dispatch(messageSlice.actions.messageFetchingSuccess(r.body));
        }
        return r;
    })).catch(e => {
        console.log(e);
    });
}

export const deleteResourceType = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/type/' + id, {
        method: 'delete',
        headers: getJwtTokenHeader()
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IMessage>>;
        else {
            throw response.status;
        }
    }).then((r => {
        if (r.error != null) {
            dispatch(messageSlice.actions.messageFetchingError(r.error));

        } else if (r.body != null) {
            dispatch(messageSlice.actions.messageFetchingSuccess(r.body));
        }
        return r;
    })).catch(e => {
        console.log(e);
    });
}