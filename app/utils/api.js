export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    //making a request, turning response to json, if there is no items, throw an error
    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if(!data.items) {
                throw new Error(data.message)
            }

            return data.items
        })
}