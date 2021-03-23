import Donate from "components/Donate"
import React from "react"
import Link from "next/link"
import { Row, Col, Container, Breadcrumb, Table } from "react-bootstrap"

export default function About() {
    return (<>
        <Breadcrumb className="mb-5">
            <Breadcrumb.Item><Link href="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>About</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
            <Row>
                <Col>
                    <h3>Purpose</h3>
                    <p>
                        Developers can access data about their own products within <a href="https://partner.steamgames.com/">Steamworks</a>,
                        however there are other tools publicly available online that help make sense of the totality of data within Steam,
                        and provide insights that Steam does not readily provide itself.
                        These tools listen to Steam's systems and transform the data they receive in
                        order to further help players make better purchasing decisions, and industry professionals make better products.
                    </p>
                    <p>
                        The Steam review system was introduced in 2011 and has slowly become more useful while addressing issues
                        such as spam and <a href="https://en.wikipedia.org/wiki/Review_bomb">'review bombing'</a>. What started as a simple text
                        box now includes user curation and greater customizability in filtering. It also now contains an enormous amount of content.
                    </p>
                    <p>
                        Research indicates that <a href="https://arstechnica.com/gaming/2014/04/steam-gauge-do-strong-reviews-lead-to-stronger-sales-on-steam/">user reviews are influential</a>,
                        but the only place to view them is the store front, which is geared towards consumers.
                        It shows a limited amount of reviews at the bottom of each product page; it is
                        missing a text-search functionality, historical data regarding edits, and full control over
                        filtering. It has a single visualisation showing the volume of reviews over time.
                    </p>
                    <p>
                        This tool uses Steam's APIs to provide you with access to <em>all</em> reviews for a given product at
                        once. These APIs expose further data that is not present on the store front. This tool
                        provides a cleaner interface to a greater level of control over this data,
                        and is able to derive further insights about it alongside visualisations.
                    </p>
                    <p>
                        Some questions this tool may help answer:
                    </p>
                    <ul>
                        <li>What is the current trend in user sentiment after the last update?</li>
                        <li>Which players are having technical issues?</li>
                        <li>How long do people typically play a game?</li>
                        <li>Do people who recieve it for free rate it more favourably?</li>
                    </ul>
                    <p>
                        In the case that the way the data is presented here does not answer a question you may have, or you'd
                        like to track it over time, it can be exported.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Usage</h3>
                    <p>
                        To start, search for a product on the homepage and click the 'explore' button. The site will make
                        requests to Steam for its publicly visible reviews, in addition to some general information about
                        its listing on the Steam store. This has to be done in batches and stored in your browser's
                        memory, so the more reviews a product has, the slower things will be, and the more internet data
                        you will use (time and data estimates will be displayed).
                    </p>
                        Once loaded, you will see a series of tabs that present the data in increasingly granular ways.
                        The reviews tab shows a list of all reviews that meet your filtering criteria, and some insights
                        about that capture group. It is entirely possible to find all positive, Polish reviews written in
                        2014, between 30 and 36 characters long and containing the text 'awesome', where the player received
                        the product for free and garnered 2 comments.
                    <p>
                        Visualisations are also produced, however they do not encompass the full potential of the dataset
                        - to this end, an export functionality is provided. Take your findings along to your next presentation!
                    </p>
                </Col>
            </Row>
            <Row>
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
            </Row>
            <Row>
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
            </Row>
            <Row>
                <Col>
                    <h3 id="known-issues">Known Issues</h3>
                    <h5 id="known-issues-mismatched-totals">I'm seeing more or less reviews than I expected for a product</h5>
                    <p>
                        If reviews are added/removed while the tool is busy retrieving them, the number retrieved may not match the total
                        Steam initially provided. This is more likely to happen with new/popular games recieving a lot of activity. 
                        Though it may take some time for Steam to accurately report the total number of reviews for a product in its system,
                        this tool will retrieve all reviews it has access to at the time of retrieval.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Support</h3>
                    <p>
                        Tools that incur a cost to their creator are often placed behind a pay-wall.
                        This tool cuts some corners behind-the-scenes so it can be hosted for free, but developing
                        and maintaining it takes time. If you find it useful, and you'd like to support me financially,
                        you can use the link below - otherwise, I'd appreciate constructive feedback and a <a href="#">share
                        on social media</a>, so that I can improve it and better help more people.
                    </p>
                    <p>
                        You can contrubite to the source code, view a roadmap of features and make requests on <a href="https://github.com/joshhills/steam-review-facts/projects/1">Github</a>.
                    </p>
                    <Donate/>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Legal &amp; Attributions</h3>
                    <p>
                        Data is retrieved from <a href="https://steamcommunity.com/dev">Steam's web APIs</a> in accordance with their policy. This website is built
                        with <a href="https://nextjs.org/">Next.js</a> and <a href="https://getbootstrap.com/">Bootstrap</a>, using <a href="https://fontawesome.com/">FontAwesome</a>.
                        It is not affiliated with Valve.
                    </p>
                </Col>
            </Row>
        </Container>
    </>)
}