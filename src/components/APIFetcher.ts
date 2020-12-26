import authorizer from '../authorization/Authorizer';

// This class is used for calls to the API server. New object should be created for each request.
export default class APIFetcher
{
    readonly rootApiUrl = 'http://localhost:3200/';

    // Same as default javascript fetch method, but adds access token to the header. Also sets correct API url.
    fetch(relativeUrl: string, init?: RequestInit | undefined): Promise<Response>
    {
        const token = authorizer.getToken();
        if (token == null)
            throw Error('Token undefined.');

        if (init == null)
            init = {};

        let headers: any = (init.headers == null ? {} : init.headers);
        headers.Authorization = 'Token ' + token;

        init.headers = headers;

        return fetch(this.rootApiUrl + relativeUrl, init);
    }

    // Same as default javascript fetch method, but sets correct API url.
    fetchUnauthorized(relativeUrl: string, init?: RequestInit | undefined): Promise<Response>
    {
        return fetch(this.rootApiUrl + relativeUrl, init);
    }
}