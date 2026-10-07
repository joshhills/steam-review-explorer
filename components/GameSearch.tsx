import React, { useState, useEffect, useCallback } from "react"
import _ from "lodash"
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Container, Row, Col, Form, Spinner, Modal, Button, Accordion } from "react-bootstrap"
import GameCardDeck from "./GameCardDeck"
import { useRouter } from "next/router"
import { MultiSelect } from "react-multi-select-component"
import { useCookies } from "react-cookie"
import DateRangePicker from "react-bootstrap-daterangepicker"
import "bootstrap-daterangepicker/daterangepicker.css"
import supportedLocales from "lib/utils/SteamLocales"

const PRODUCT_TYPES = [
    {
        label: 'Game',
        value: 'game'
    },
    {
        label: 'Adult Game',
        value: 'adult_game'
    },
    {
        label: 'Application',
        value: 'application'
    },
    {
        label: 'Tool',
        value: 'tool'
    },
    {
        label: 'Demo',
        value: 'demo'
    },
    {
        label: 'DLC',
        value: 'dlc'
    },
    {
        label: 'Music',
        value: 'music'
    }
]

const LANGUAGES = Object.keys(supportedLocales).map((k) => { return { label: supportedLocales[k].englishName, value: k } })

const GameSearch = () => {

    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [featuredGames, setFeaturedGames] = useState(null)
    const [loadingSomething, setLoadingSomething] = useState(true)
    const [productTypes, setProductTypes] = useState(PRODUCT_TYPES)
    const [showModal, setShowModal] = useState(false)
    const [selectedGame, setSelectedGame] = useState(null)
    const [timeSpanOption, setTimespanOption] = useState('2weeks')
    const [customTimeSpan, setCustomTimeSpan] = useState([])
    const [selectedLanguages, setSelectedLanguages] = useState(LANGUAGES)
    const [primarilySteamDeck, setPrimarilySteamDeck] = useState(false)
    const [osSelection, setOsSelection] = useState('')
    const [customOs, setCustomOs] = useState('')
    const [hardwareCpu, setHardwareCpu] = useState('')
    const [hardwareGpu, setHardwareGpu] = useState('')

    const [cookies, setCookie] = useCookies(['productTypes'])

    const decodeProductTypes = (productTypesStr) => {
        let productTypeValues = productTypesStr.split(',')
        
        let productTypesArr = []

        for (let productTypeValue of productTypeValues) {
            for (let pt of PRODUCT_TYPES) {
                if (productTypeValue === pt.value) {
                    productTypesArr.push(pt)
                    break
                }
            }
        }
        return productTypesArr
    }
        
    useEffect(() => {
        if (cookies.productTypes) {
            setProductTypes(cookies.productTypes)
        }
    }, [])

    useEffect(() => {

        let loadedProductTypes = []
        if (router.query.productTypes !== undefined) {
            loadedProductTypes = decodeProductTypes(router.query.productTypes as string)
            if (loadedProductTypes.length !== 0 && !_.isEqual(productTypes, loadedProductTypes)) {
                setProductTypes(loadedProductTypes)
            }
        }
        
        if (loadedProductTypes.length === 0) {
            loadedProductTypes = productTypes
        }

        if (router.query.search !== undefined && searchResult !== router.query.search as string) {
            const searchStr = decodeURI(router.query.search as string)
            setSearchTerm(searchStr)
            getGames(searchStr, loadedProductTypes)
        }
        
        if (featuredGames === null) {
            getFeaturedGames()
        }
    }, [router.query.search, router.query.productTypes])

    const getFeaturedGames = async () => {

        const featuredGames = await SteamWebApiClient.getFeaturedGames()

        setFeaturedGames(featuredGames)
        setLoadingSomething(false)
    }
    
    const getGames = async (searchStr, productTypesToUse) => {
        if (productTypesToUse.length === 0 || !searchStr || /^\s*$/.test(searchStr)) {
            setSearchResult(null)
            setLoadingSomething(false)
            return
        }

        let now = new Date()

        setLoadingSomething(true)
    
        let response = null

        if (searchStr.indexOf('http') !== -1 || searchStr.indexOf('www.') !== -1) {
            let match = searchStr.match(/\/app\/(\d+)/)
            if (match && match[1]) {
                const individualGame = await SteamWebApiClient.getGame(match[1])
                if (individualGame) {
                    response = [individualGame]
                }
            }
        }

        if (response === null) {
            response = await SteamWebApiClient.findGamesBySearchTerm(searchStr, productTypesToUse.map(e => e.value))
        }

        setSearchResult(previousSearchResult => previousSearchResult === null || now > previousSearchResult.time ? { time: now, data: response, term: searchStr } : previousSearchResult)

        setLoadingSomething(false)
    }

    const encodeProductTypes = (productTypesArr) => {
        if (productTypesArr.length === PRODUCT_TYPES.length) {
            return ''
        }
        
        let selectedProductValues = []
        
        for (let entry of productTypesArr) {
            selectedProductValues.push(entry.value)
        }

        return selectedProductValues.join(',')
    }

    const updateQuery = useCallback(_.debounce((searchStr, newProductTypes) => {

        setCookie('productTypes', newProductTypes, { path: '/' })

        let productTypesEncoded = encodeProductTypes(newProductTypes)

        let queryObj: any = {}
        if (searchStr.length !== 0) {
            queryObj.search = encodeURI(searchStr)
            if (productTypesEncoded.length !== 0) {
                queryObj.productTypes = encodeURI(productTypesEncoded)
            }
        }

        router.push({
            pathname: '/',
            query: queryObj
        }, null, { shallow: true })

        getGames(searchStr, newProductTypes)
    }, 800), [])

    const handleExplore = (game) => {
        setSelectedGame(game)
        setShowModal(true)
    }

    const handleCancelExplore = () => {
        setShowModal(false)
        setSelectedGame(null)
        setPrimarilySteamDeck(false)
        setOsSelection('')
        setCustomOs('')
        setHardwareCpu('')
        setHardwareGpu('')
    }

    const getDateXDaysAgo = (numOfDays: number) => {
        const daysAgo = new Date()
        daysAgo.setDate(daysAgo.getDate() - numOfDays)
        return daysAgo
    }

    const exploreSelectedGame = () => {

        let dateRange = [new Date(0), new Date()]
        if (timeSpanOption === '2weeks') {
            dateRange[0] = getDateXDaysAgo(14)
        } else if (timeSpanOption === '1month') {
            dateRange[0] = getDateXDaysAgo(30)
        } else if (timeSpanOption === 'custom') {
            dateRange = customTimeSpan
        }

        let languageStr = null
        if (selectedLanguages.length !== LANGUAGES.length) {
            languageStr = encodeURI(selectedLanguages.map((l) => l.value).join(','))
        }

        const queryParams: any = {}
        if (timeSpanOption !== 'forever') {
            queryParams.start = dateRange[0].getTime()
            queryParams.end = dateRange[1].getTime()
        }
        if (languageStr) {
            queryParams.languages = languageStr
        }
        if (primarilySteamDeck) {
            queryParams.deck = 'true'
        }
        const effectiveOs = osSelection === 'custom' ? customOs.trim() : osSelection
        if (effectiveOs) {
            queryParams.os = effectiveOs
        }
        if (hardwareCpu.trim()) {
            queryParams.cpu = hardwareCpu.trim()
        }
        if (hardwareGpu.trim()) {
            queryParams.gpu = hardwareGpu.trim()
        }

        const queryString = new URLSearchParams(queryParams).toString()
        router.push(`/game/${selectedGame.steam_appid}${queryString ? `?${queryString}` : ''}`)
    }

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Form.Control style={{minWidth:"16ch"}} className="mb-3" placeholder="Find a product..." type="text" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); updateQuery.cancel(); updateQuery(e.target.value, productTypes); }} />
                </Col>
                <Col>
                    <MultiSelect
                        options={PRODUCT_TYPES}
                        labelledBy="Select product type"
                        overrideStrings={
                            {
                                "allItemsAreSelected": "All product types selected.",
                                "clearSearch": "Clear search",
                                "clearSelected": "Clear selected",
                                "noOptions": "No options",
                                "search": "Search",
                                "selectAll": "Select all product types",
                                "selectAllFiltered": "Select all product types (filtered)",
                                "selectSomeItems": "Select product type",
                                "create": "Create"
                            }
                        }
                        value={productTypes}
                        onChange={(e) => { setProductTypes(e); updateQuery.cancel(); updateQuery(searchTerm, e); }} 
                        />
                </Col>
            </Row>

            {loadingSomething && <Row>
                <Spinner className="mx-auto mt-2" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Row>}

            {searchResult && !loadingSomething && <Row>
                <Col>
                    <p>{searchResult.data && `${searchResult.data.length} result${searchResult.data.length !== 1 ? 's' : ''} found for `}<a href={`https://store.steampowered.com/search/?term=${searchResult.term}`}>{searchResult.term}</a>.
                    {searchResult.data.length > 0 && searchResult.term.length < 11 && <span className="small"> Not what you're looking for? Try being more specific{productTypes.length !== PRODUCT_TYPES.length ? ', or selecting more product types' : ''}</span>}
                    {searchResult.data.length === 0 && <span className="small"> Looking for something specific? Try searching the name as it appears on Steam</span>}</p>
                </Col>
            </Row>}

            {!loadingSomething && searchResult?.data.length > 0 &&
                <GameCardDeck games={searchResult.data} onExplore={handleExplore} />}

            {featuredGames?.length > 0 && <>
            <Row>
                <Col>
                    <h3 className="mb-3">Featured Products</h3>
                </Col>
            </Row>
            <GameCardDeck games={featuredGames} onExplore={handleExplore}/></>}
            
            {selectedGame && <Modal show={showModal} onHide={handleCancelExplore}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Find {selectedGame.name} reviews
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Since...</p>
                    <Form.Check
                        inline
                        label="Two weeks"
                        name="timespan"
                        type="radio"
                        id="2weeks"
                        onChange={(e) => { setTimespanOption(e.target.id)}}
                        checked={timeSpanOption === '2weeks'}
                        />
                    <Form.Check
                        inline
                        label="One month"
                        name="timespan"
                        type="radio"
                        id="1month"
                        onChange={(e) => { setTimespanOption(e.target.id)}}
                        checked={timeSpanOption === '1month'}
                        />
                    <Form.Check
                        inline
                        label="Forever"
                        name="timespan"
                        type="radio"
                        id="forever"
                        onChange={(e) => { setTimespanOption(e.target.id)}}
                        checked={timeSpanOption === 'forever'}
                        />
                    <Form.Check
                        inline
                        label="Custom"
                        name="timespan"
                        type="radio"
                        id="custom"
                        onChange={(e) => { setTimespanOption(e.target.id)}}
                        checked={timeSpanOption === 'custom'}
                        className={timeSpanOption === 'custom' ? 'mb-3' : ''}/>
                    {timeSpanOption === 'custom' && <>
                        <DateRangePicker onCancel={() => {}} onCallback={(start: any, end: any) => { setCustomTimeSpan([start.toDate(), end.toDate()])}} initialSettings={{ minDate: null, maxDate: new Date(), startDate: getDateXDaysAgo(14), endDate: new Date(), timePicker: true, locale: { cancelLabel: 'Clear', applyLabel: 'Apply' }}}>
                            <Form.Control type="text"/>
                        </DateRangePicker>
                    </>}
                    <p className="mt-3">In language{selectedLanguages.length > 1 && 's'}... {selectedLanguages.length === 0 && <em>(Select at least one)</em>}</p>
                    <MultiSelect
                        options={LANGUAGES}
                        labelledBy="Select languages"
                        value={selectedLanguages}
                        onChange={(e) => { setSelectedLanguages(e) }} 
                        />
                    <div className="mt-3">
                        <Form.Check
                            type="checkbox"
                            id="primarily-steam-deck"
                            label="Only reviews played primarily on Steam Deck"
                            checked={primarilySteamDeck}
                            onChange={(e) => setPrimarilySteamDeck(e.target.checked)}
                        />
                    </div>
                    <div className="mt-3">
                        <Accordion flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Advanced hardware filters (Optional)</Accordion.Header>
                                <Accordion.Body className="pt-2 px-1">
                                    <Form.Group className="mb-2">
                                        <Form.Label className="small text-muted mb-1">Operating System</Form.Label>
                                        <Form.Select size="sm" value={osSelection} onChange={(e) => setOsSelection(e.target.value)}>
                                            <option value="">All Operating Systems</option>
                                            <option value="Windows 11">Windows 11</option>
                                            <option value="Windows 10">Windows 10</option>
                                            <option value="Linux">Linux</option>
                                            <option value="macOS">macOS</option>
                                            <option value="custom">Other / Custom...</option>
                                        </Form.Select>
                                        {osSelection === 'custom' && (
                                            <Form.Control
                                                size="sm"
                                                className="mt-1"
                                                placeholder="Exact OS name, e.g. Windows 11"
                                                value={customOs}
                                                onChange={(e) => setCustomOs(e.target.value)}
                                            />
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="small text-muted mb-1">CPU</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            placeholder="Exact CPU, e.g. Intel(R) Core(TM) i7-14700KF"
                                            value={hardwareCpu}
                                            onChange={(e) => setHardwareCpu(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="small text-muted mb-1">GPU</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            placeholder="Exact GPU, e.g. NVIDIA GeForce RTX 4060"
                                            value={hardwareGpu}
                                            onChange={(e) => setHardwareGpu(e.target.value)}
                                        />
                                    </Form.Group>
                                    <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>
                                        Note: Steam matches exact hardware strings as detected by the Steam client.
                                    </small>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={exploreSelectedGame} disabled={selectedLanguages.length === 0}>
                        Explore
                    </Button>
                </Modal.Footer>
            </Modal>}

        </Container>
    )
}

export default GameSearch