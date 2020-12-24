export default class APIFetcher
{
    readonly rootApiUrl = 'http://localhost:3200/';

    fetch(relativeUrl: string, init?: RequestInit | undefined): Promise<Response>
    {
        const token = localStorage.getItem('token');
        if (token == null)
            throw Error('Token undefined.');

        if (init == null)
            init = {};

        var headers: any = (init.headers == null ? {} : init.headers);
        headers.Authorization = 'Token ' + token;

        init.headers = headers;

        return fetch(this.rootApiUrl + relativeUrl, init);
    }

    fetchUnauthorized(relativeUrl: string, init?: RequestInit | undefined): Promise<Response>
    {
        console.log(init);

        return fetch(this.rootApiUrl + relativeUrl, init);
    }
}