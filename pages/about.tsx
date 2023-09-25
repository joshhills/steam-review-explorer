import Donate from "components/Donate"
import BetaNotice from "components/BetaNotice"
import React from "react"
import Link from "next/link"
import { Row, Col, Container, Breadcrumb } from "react-bootstrap"

export default function About() {
    return (<>
        <BetaNotice />
        <div className="bg-light rounded-3 p-3 mb-4">
            <Breadcrumb className="mb-0">
                <Breadcrumb.Item><Link href="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>About</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <Container>
            <Row>
                <Col>
                    <h3>Purpose</h3>
                    <p className="lead">
                        This tool has been built to help promote the accessibility of the <a href="https://store.steampowered.com/reviews/">Steam user review system</a> so that developers can better perform research and action on feedback about their products.
                    </p>
                    <p>
                        There are many tools out there that help make sense of the totality of public data Steam provides - they transform the data they mine to provide insights Steam does not readily provide itself.
                    </p>
                    <p>
                        The Steam review system was introduced in 2011 and has evolved from a simple text box to include user curation and filtering in an attempt to be more useful and address issues such as spam and <a href="https://en.wikipedia.org/wiki/Review_bomb">'review bombing'</a>.
                    </p>
                    <p>
                        There are now a huge number of user reviews in Steam, but the only place to view them is the store front, which is geared towards consumers.
                    </p>
                    <p>
                        However, Steam's APIs can be used to access all reviews for a given product at once, and more. This tool provides a clean interface to this data set with a greater level of control.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Usage</h3>
                    <p>
                        Research shows that <a href="https://arstechnica.com/gaming/2014/04/steam-gauge-do-strong-reviews-lead-to-stronger-sales-on-steam/">user reviews are influential</a>, and have the potential to answer a number of interesting and useful questions such as:
                    </p>
                    <ul>
                        <li>How long do people typically play this game?</li>
                        <li>What do people like/dislike most about it?</li>
                        <li>What is the current trend in user sentiment after the last update compared to previous updates?</li>
                        <li>Which users are having technical issues?</li>
                        <li>Do people who receive it for free rate it more favourably?</li>
                    </ul>
                    <p>
                        A community manager may use it to find dedicated users worth helping and rewarding. A designer may use it to isolate high quality feedback. A product analyst may use it evaluate success (retention, sentiment) over time.
                    </p>
                    <p>
                        To this end, visualisations are provided to aid exploration, and the data itself can be exported.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Feedback &amp; Support</h3>
                    <p>
                        You can request features and report bugs on <a href="https://github.com/joshhills/steam-review-explorer/projects/1">Github</a>.
                    </p>
                    <p>
                        This tool is provided for free, but developing, maintaining and hosting it takes time and money. If you find it useful, and you'd like to support me, consider <Link href="/feedback">providing constructive feedback</Link> and <a href="https://twitter.com/intent/tweet?hashtags=gamedev&ref_src=twsrc%5Etfw&text=Make%20better%20sense%20of%20all%20%40Steam%20product%20reviews%20using%20this%20free%20exploratory%20data%20analysis%20tool&tw_p=tweetbutton&url=https%3A%2F%2Fproject.joshhills.dev%2Fsteam-review-explorer&via=steamreviewtool" target="_blank">sharing on social media</a>, or joining one of the many kind people who have made a donation using the link below.
                    </p>
                    <Donate/>
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col>
                    <h3 id="faq">FAQ</h3>
                    <h5 id="data-source">Where does the data come from?</h5>
                    <p>
                        The data is retrieved from <a href="https://partner.steamgames.com/doc/store/getreviews">Steam's Web API</a> by your web browser via a CORS proxy I'm hosting. It can only see public reviews (ones not made by private accounts). 
                    </p>
                    <h5 id="data-quantity">Is there a limit to its use?</h5>
                    <p>
                        None imposed by this tool, but since the reviews are stored in your browser's memory, and filtering them can be demanding on your hardware, the tool may break for games with &gt; 30,000 reviews. Steam may also decide to rate limit use of their public APIs, or make them inaccessible, at any time.
                    </p>
                    <h5 id="data-privacy">Are you spying on me?</h5>
                    <p>
                        I've chosen to not include any kind of analytics scripts on this website, so you can use it in a professional capacity without worrying about being tracked. <a href="https://github.com/joshhills/steam-review-explorer/">View the source here</a>, and use a VPN if you're unconvinced. Consider this the privacy policy.
                    </p>
                    <h5 id="known-issues-mismatched-totals">Why am I seeing more / less reviews than I expected for a product?</h5>
                    <p>
                        If reviews are added or removed while the tool is busy retrieving them, the number retrieved may not match the total
                        Steam initially provided. This is more likely to happen with new/popular games recieving a lot of activity. 
                        Though it may take some time for Steam to accurately report the total number of reviews for a product in its system,
                        this tool will retrieve all reviews it has access to at the time of retrieval.
                    </p>
                    <h5 id="product-type">Why 'products' and not 'games'?</h5>
                    <p>
                        Over time Valve has experimented with providing more than just games through Steam, from subscriptions to films and hardware.
                        Reviews can only be left for games, DLCs and soundtracks.
                    </p>
                    <h5 id="languages">Does the language matter?</h5>
                    <p>
                        Some experimental features such as censoring bad words and word frequency currently only work in English - if you'd like to contribute
                        to localising these features, please contact me!
                    </p>
                    <Link href="/feedback">
                        Do you have a different question?
                    </Link>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h3 id="changelog">Changelog</h3>
                    <h6>0.9</h6>
                    <ul>
                        <li>
                            Added configurable specificity to to search term filter
                        </li>
                        <li>
                            Filters can be shared and applied via URL
                        </li>
                        <li>
                            Added smart links from review statistics tab
                        </li>
                        <li>
                            Added prompts section
                        </li>
                        <li className="text-secondary">
                            Relaxed strictness of profanity filter
                        </li>
                    </ul>
                    <h6>0.8</h6>
                    <ul>
                        <li>
                            Date range and language are able to be specified prior to exploring
                        </li>
                        <li className="text-secondary">
                            Less typos and UI bugs
                        </li>
                    </ul>
                    <h6>0.7</h6>
                    <ul>
                        <li>
                            Product type filterable in home page search
                        </li>
                        <li className="text-secondary">
                            Adult games no longer in featured list
                        </li>
                    </ul>
                    <h6>0.6</h6>
                    <ul>
                        <li>
                            Search bar also in header of site
                        </li>
                        <li>
                            Sorting preferences remembered between visits
                        </li>
                        <li>
                            Review text truncated by median length
                        </li>
                        <li>
                            Added SteamDB and SteamSpy links
                        </li>
                        <li className="text-secondary">
                            Dates formatted with full year for clarity
                        </li>
                        <li className="text-secondary">
                            Language pie chart is responsive on mobile
                        </li>
                    </ul>
                    <h6>0.5</h6>
                    <ul>
                        <li>
                            Further breakdowns now available for time played after review stats
                        </li>
                        <li className="text-secondary">
                            Vote underflow bug corrected
                        </li>
                    </ul>
                    <h6>0.4</h6>
                    <ul>
                        <li>
                            Scroll-up button now exists at bottom of review table
                        </li>
                        <li>
                            Language filter is now remembered between visits
                        </li>
                        <li>
                            Select fields are searchable, easier to use
                        </li>
                        <li>
                            Time played after review stats now available
                        </li>
                        <li className="text-secondary">
                            UI frameworks updated
                        </li>
                    </ul>
                    <h6>0.3</h6>
                    <ul>
                        <li>
                            Dark mode and view filter preferences are remembered between visits
                        </li>
                        <li>
                            Copy text functionality exists for review items
                        </li>
                        <li>
                            Scraper shows elapsed time and allows you to continue early
                        </li>
                        <li>
                            Review table can be paginated using left and right arrow keys
                        </li>
                        <li className="text-secondary">
                            Word frequency table made responsive
                        </li>
                    </ul>
                    <h6>0.2</h6>
                    <ul>
                        <li>
                            Review URLs included in CSV export
                        </li>
                        <li>
                            Filter panel requires confirmation of changes
                        </li>
                        <li className="text-secondary">
                            Filter and page refresh bugs fixed
                        </li>
                    </ul>
                    <h6>0.1</h6>
                    <ul>
                        <li>
                            Initial release with game search, review table, and highlighted sections
                        </li>
                        <li className="text-secondary">
                            Beta, 'experimental' and feedback notices on some features
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h3>Legal &amp; Attributions</h3>
                    <p>
                        Data is retrieved from <a href="https://steamcommunity.com/dev">Steam's web APIs</a> in accordance with their policy.
                        This website is not affiliated with Valve.
                    </p>
                </Col>
            </Row>

            {/* <Row>
                <Col>
                    <h3>Anatomy Of Steam Review Information</h3>
                    <p>
                        A single user review is comprised of these fields:
                    </p>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Type
                                </th>
                                <th>
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Recommendation ID
                                </td>
                                <td>
                                    String
                                </td>
                                <td>
                                    The unique ID of the review
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Author
                                </td>
                                <td>
                                    Object
                                </td>
                                <td>
                                    Data about the author including their account ID, the number of products they own, the number of reviews they have written, their total usage in minutes at the time of review, their most recently reported total usage, and the time at which they last used the product
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Language
                                </td>
                                <td>
                                    String
                                </td>
                                <td>
                                    The language the review was written in (not always accurate, uses the user's primary language preference in their account settings)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Review
                                </td>
                                <td>
                                    String
                                </td>
                                <td>
                                    The contents of the review, with a minimum length of X and a maximum length of Y. For reviewers, this is free text input that supports <a href="https://en.wikipedia.org/wiki/BBCode">BBCodes</a>, and therefore may contain links, emojis and ASCII art. Users can report reviews to moderators, and the store uses a censorship filter when displaying them; this tool provides the uncensored text content. 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Timestamp Created
                                </td>
                                <td>
                                    Number
                                </td>
                                <td>
                                    The time the review was created (Unix epoch time)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Timestamp Updated
                                </td>
                                <td>
                                    Number
                                </td>
                                <td>
                                    The time the review was last updated (Unix epoch time)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Voted Up
                                </td>
                                <td>
                                    True/False
                                </td>
                                <td>
                                    Whether the review was positive or negative
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Votes Up
                                </td>
                                <td>
                                    Number
                                </td>
                                <td>
                                    The number of users that have marked this review as helpful
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Votes Funny
                                </td>
                                <td>
                                    Number
                                </td>
                                <td>
                                    The number of users that have marked this review as funny
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Weighted Vote Score
                                </td>
                                <td>
                                    Number
                                </td>
                                <td>
                                    Steam's relative helpfulness score influenced by user votes and account activity
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Comment Count
                                </td>
                                <td>
                                    Number
                                </td>
                                <td>
                                    The number of comments this review has
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Steam Purchase
                                </td>
                                <td>
                                    True/False
                                </td>
                                <td>
                                    Whether the user purchased the product through Steam, or redeemed it from a code purchased elsewhere
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Recieved For Free
                                </td>
                                <td>
                                    True/False
                                </td>
                                <td>
                                    Whether the user checked an option to declare that they received it for free (does not happen automatically, even if the game is free-to-play)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Written During Early Access
                                </td>
                                <td>
                                    True/False
                                </td>
                                <td>
                                    Whether the user wrote the review while the game was in an early access state
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row> */}
            {/* <Row>
                <Col>
                    <h3>Resources</h3>
                    <ul>
                        <li>Steam Services</li>
                        <ul>
                            <li><a href="https://store.steampowered.com/reviews/">Steam's Review System</a></li>
                            <li><a href="https://store.steampowered.com/communityrecommendations/">Steam Labs User Recommendations</a></li>
                        </ul>

                        <li>Review Scores Explained</li>
                        <ul>
                            <li><a href="https://www.gamasutra.com/blogs/LarsDoucet/20141006/227162/Fixing_Steams_User_Rating_Charts.php">Steam's Rating System Explained</a></li>
                            <li><a href="https://steamdb.info/blog/steamdb-rating/">SteamDB - Ratings Explained</a></li>
                        </ul>

                        <li>Vox Pop</li>
                        <ul>
                            <li><a href="https://www.rockpapershotgun.com/what-developers-think-of-steam-reviews">RPS - What developers think of Steam reviews</a></li>
                            <li><a href="https://www.reddit.com/r/Games/comments/29a3gw/steam_user_reviews_are_getting_more_and_more/">Reddit - "Steam user reviews are getting more and more useless"</a></li>
                            <li><a href="https://www.reddit.com/r/Games/comments/29a3gw/steam_user_reviews_are_getting_more_and_more/">Steam Community - "The Steam review award system has destroyed what little worth reviews used to have"</a></li>
                        </ul>
                        
                        <li>Chronology Of Review System Changes</li>
                        <ul>
                            <li><a href="https://store.steampowered.com/oldnews/21695">Customer Review System Updated</a></li>
                            <li><a href="https://store.steampowered.com/oldnews/24155">More Updates To The Steam Customer Review System</a></li>
                            <li><a href="https://steamcommunity.com/games/593110/announcements/detail/1448326897426987372">User Reviews</a></li>
                            <li><a href="https://steamcommunity.com/games/593110/announcements/detail/1808664240333155775">User Reviews Revisited</a></li>
                            <li><a href="https://steamcommunity.com/games/593110/announcements/detail/2666556941788470579">Improving User Reviews</a></li>
                            <li><a href="https://steamcommunity.com/groups/steamworks/announcements/detail/1697229969000435735">Reviews Volumes Increase</a></li>
                        </ul>
                    </ul>
                </Col>
            </Row> */}
        </Container>
    </>)
}