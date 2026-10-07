import React from "react"
import { Row, Col, Badge } from "react-bootstrap"
import ReviewScoreBadge from "./ReviewScoreBadge"

const GameSummary = ({ game, hardwareFilters = null }: { game: any, hardwareFilters?: any }) => {

    const type = game.type === 'dlc' ? 'DLC' : game.type.charAt(0).toUpperCase() + game.type.slice(1)
    const developers = game.developers.join(', ')

    const steamUrl = `https://store.steampowered.com/app/${game.steam_appid}`
    const steamDBUrl = `https://steamdb.info/app/${game.steam_appid}`
    const steamSpyUrl = `https://steamspy.com/app/${game.steam_appid}`

    let supportedLanguages = 'Unknown'
    if (Object.keys(game.parsed_supported_languages).length > 0) {
        supportedLanguages = Object.entries(game.parsed_supported_languages).map((e:any) => e[1].englishName).join(', ')
    }

    const hasHardware = hardwareFilters && (
        hardwareFilters.primarilySteamDeck ||
        hardwareFilters.hardwareOs ||
        hardwareFilters.hardwareCpu ||
        hardwareFilters.hardwareGpu
    )

    return (
        <Row>
            <Col md="auto" className="mb-5">
                <img style={{ width: '100%', maxWidth: '100%'}} src={game.header_image}/>
            </Col>
            <Col className="mb-5">
                <h4>
                    {game.name} <ReviewScoreBadge game={game} showTooltip={false}/>
                    {(game.content_descriptors.ids !== null && game.content_descriptors.ids.indexOf(3) !== -1) && <Badge bg="danger" className="ms-1">Adult</Badge>}
                    {hasHardware && <>
                        {hardwareFilters.primarilySteamDeck && <Badge bg="secondary" className="ms-1">Steam Deck</Badge>}
                        {hardwareFilters.hardwareOs && <Badge bg="secondary" className="ms-1">OS: {hardwareFilters.hardwareOs}</Badge>}
                        {hardwareFilters.hardwareCpu && <Badge bg="secondary" className="ms-1">CPU: {hardwareFilters.hardwareCpu}</Badge>}
                        {hardwareFilters.hardwareGpu && <Badge bg="secondary" className="ms-1">GPU: {hardwareFilters.hardwareGpu}</Badge>}
                    </>}
                </h4>
                <p className="text-muted mb-2">{type} by {developers} {game.release_date.coming_soon ? 'coming soon' : `released ${game.release_date.date}`}</p>
                <p className="text-muted"><a href={steamUrl}>Steam Store</a> | <a href={steamDBUrl}>SteamDB</a> | <a href={steamSpyUrl}>SteamSpy</a></p>
                <p className="text-muted">Supported languages: { supportedLanguages }</p>
                <p>{game.short_description}</p>
            </Col>
        </Row>
    )
}

export default GameSummary