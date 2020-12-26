import APIFetcher from '../components/APIFetcher';

var accessToken: string | null = null;

type AccessChangedCallback = (access: boolean) => any;

// This module serves for the authorization of given login. It implements access and refresh tokens. Detailed info can be found in this article:
// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/
class Authorizer
{
    accessChanged: AccessChangedCallback[] = [];

    // Given callback will be called everytime the existence of the valid access token may change.
    addAccessChangedCallback(callback: AccessChangedCallback): void
    {
        this.accessChanged.push(callback);
    }

    callAccessChanged(result: boolean): void
    {
        this.accessChanged.forEach(callback => callback(result));
    }

    // Returns the current valid access token (or null).
    getToken(): string | null
    {
        return accessToken;
    }

    // Starts the process of obtaining and later refreshing of access tokens.
    // Should be called when the application starts or when the user successfuly logs in.
    async start(): Promise<void>
    {
        await this.refreshAccessToken();
    }

    // Tries to refresh access token. If successful, timeout is set to refresh again before token expiration.
    async refreshAccessToken(): Promise<void>
    {
        if (!(await this.tryGetNewAccessToken())) {
            accessToken = null;
            this.callAccessChanged(false);
            return;
        }

        var jwt = require('jsonwebtoken');
        var expires = jwt.decode(accessToken).exp;
        var timeDifference = expires * 1000 - (new Date()).getTime() - 2000;

        window.setTimeout(this.refreshAccessToken.bind(this), timeDifference);
        this.callAccessChanged(true);
    }

    // Tries to get new access token from the server. If successful, new access token is sent and also new refresh token is set.
    async tryGetNewAccessToken(): Promise<boolean>
    {
        let apiFetcher = new APIFetcher();
        let data = await apiFetcher.fetchUnauthorized('refreshToken/',
        {
            method: 'POST',
            credentials: 'include' // Necessity for the cookies.
        })
		.then(response => response.json())
		.catch(error => {
			console.log(error);
			return false;
		});

		if (!data.ok) {
            console.log(data.error);
            accessToken = null;
            return false;
        }

        accessToken = data.token;
        return true;
    }

    // Sends email and password to the server. If is all valid, refresh token cookie is send back
    async login(email: string, password: string): Promise<any>
    {
        let apiFetcher = new APIFetcher();
        return await apiFetcher.fetchUnauthorized('login/', {
			headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            credentials: 'include', // Necessity for the cookies.
			body: JSON.stringify({ email, password })
		})
        .then(response => response.json())
        .catch(error => ({ ok: false, error }));
    }

    async logout(): Promise<void>
    {
        let apiFetcher = new APIFetcher();
        let result = await apiFetcher.fetch('logout/', {
            method: 'POST',
            credentials: 'include' // Necessity for the cookies.
		})
        .then(response => response.json())
        .catch(error => ({ ok: false, error }));

        if (result.ok) {
            accessToken = null;
            this.callAccessChanged(false);
        }
    }
}

var authorizer = new Authorizer();

export default authorizer;