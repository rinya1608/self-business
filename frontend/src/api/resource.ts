import {AppDispatch} from "../store/store";
import {Response} from "../models/Response";
import {getJwtTokenHeader} from "../utils/jwtUtils";
import {IPage} from "../models/IPage";
import {messageSlice} from "../store/reducers/MesageSlice";
import {IMessage} from "../models/IMessage";
import {statusResolve} from "../utils/errorUtils";
import {resourceSlice} from "../store/reducers/ResourceSlice";
import {IResource} from "../models/IResource";
import {IResourceData} from "../models/IResourceData";

export const getPageWithResources = (page: number, size: number) => async (dispatch: AppDispatch) => {
    dispatch(resourceSlice.actions.resourceFetching())
    let res = await fetch('/api/resource?page=' + (page - 1) + '&size=' + size, {
        method: 'get',
        headers: getJwtTokenHeader()
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IPage<IResource>>>;
        else {
            statusResolve(response.status);
        }
    }).then((r => {
        if (r) {
            if (r.error != null) {
                dispatch(resourceSlice.actions.resourceFetchingError(r.error));
            } else if (r.body != null) {
                dispatch(resourceSlice.actions.resourceFetchingSuccess(r.body));
            }
            return r;
        }
    })).catch(e => {
        console.log(e);
    });

}

export const addResource = (data: IResourceData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/resource', {
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

export const updateResource = (id: number, data: IResourceData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/resource/' + id, {
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

export const deleteResource = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/resource/' + id, {
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