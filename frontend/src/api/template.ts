import {AppDispatch} from "../store/store";
import {Response} from "../models/Response";
import {getJwtTokenHeader} from "../utils/jwtUtils";
import {IPage} from "../models/IPage";
import {messageSlice} from "../store/reducers/MesageSlice";
import {IMessage} from "../models/IMessage";
import {statusResolve} from "../utils/errorUtils";
import {templateSlice} from "../store/reducers/TemplateSlice";
import {ITemplate} from "../models/ITemplate";
import {ITemplateData} from "../models/ITemplateData";
import {IResourceTypeData} from "../models/IResourceTypeData";

export const getPageWithTemplates = (page: number, size: number) => async (dispatch: AppDispatch) => {
    dispatch(templateSlice.actions.templateFetching())
    let res = await fetch('/api/template?page=' + (page - 1) + '&size=' + size, {
        method: 'get',
        headers: getJwtTokenHeader()
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IPage<ITemplate>>>;
        else {

        }
    }).then((r => {
        if (r) {
            if (r.error != null) {
                dispatch(templateSlice.actions.templateFetchingError(r.error));
            } else if (r.body != null) {
                dispatch(templateSlice.actions.templateFetchingSuccess(r.body));
            }
            return r;
        }
    })).catch(e => {
        console.log(e);
    });

}

export const addTemplate = (data: ITemplateData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    console.log(JSON.stringify(data))
    let res = await fetch('/api/template', {
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

export const updateTemplate = (id: number, data: ITemplateData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/template/' + id, {
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

export const deleteTemplate = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/template/' + id, {
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