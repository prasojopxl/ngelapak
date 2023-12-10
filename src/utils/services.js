export const fetchData = async (url) => {
    const response = await fetch(`https://fakestoreapi.com${url}`)
    const data = await response.json()
    return data
}