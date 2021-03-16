const CORS_URL = "https://desolate-refuge-02398.herokuapp.com/"

const SteamWebApiClient = {
    getFeaturedGames: async () => {
        return await fetch(`${CORS_URL}https://store.steampowered.com/api/featured/`)
            .then(res => res.json())
            .then(res => res.featured_win.map(game => { return {
                id: game.id,
                tiny_image: game.header_image,
                name: game.name 
            }}))
    },
    findGamesBySearchTerm: async (searchTerm: string) => {
        return await fetch(`${CORS_URL}https://store.steampowered.com/api/storesearch/?term=${searchTerm}&l=english&cc=US`)
            .then(res => res.json())
            .then(res => res.items)
    },
    getGame: async (appId: string) => {
        return await fetch(`${CORS_URL}https://store.steampowered.com/api/appdetails?appids=${appId}`)
            .then(res => res.json())
            .then(res => res[appId].data)
    },
    getReviews: async (appId: string) => {
        const getReviewsPage = async (appId: string, cursor: string) => {
            if (cursor) {
                cursor = encodeURIComponent(cursor)
            }
            
            return await fetch(`${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&filter=recent&purchase_type=all&num_per_page=100${cursor ? `&cursor=${cursor}` : ""}`)
            .then(res => res.json())
            .then(res => {
                if (res !== null && res.success && res.query_summary.num_reviews > 0) {
                    return { reviews: res.reviews, cursor: res.cursor }
                }
            })
        }

        let cursor = null, reviews = []
        do {
            let res = await getReviewsPage(appId, cursor)
            
            if (res) {
                reviews.push(...res.reviews)
                cursor = res.cursor
            } else {
                cursor = null
            }
        } while (cursor)

        return reviews
    }
}

export default SteamWebApiClient