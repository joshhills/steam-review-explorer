import Donate from "components/Donate"
import React from "react"
import Link from "next/link"
import { Row, Col, Container, Breadcrumb } from "react-bootstrap"

export default function About() {
    return (<>
        <Breadcrumb className="mt-5 mb-5">
            <Breadcrumb.Item><Link href="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>About</Breadcrumb.Item>
        </Breadcrumb>
        <Container className="mb-5">
            <Row>
                <Col>
                    <h3>Purpose</h3>
                    <p>
                        There are many online tools that help make sense of the totality of data within Steam,
                        which can be useful for gaining insights that Steam does not readily provide itself.
                    </p>
                    <p>
                        While developers can access further information for their own products within <a href="https://partner.steamgames.com/">Steamworks</a>,
                        these tools listen to Steam's systems and transform the information they receive in
                        order to further inform players and industry professionals. This can help the former make
                        better purchasing decisions, and the latter better products.
                    </p>
                    <p>
                        The Steam review system was introduced in 2011 as a replacement for friend recommendations.
                        It has undergone a slow metamorphasis since to make it more useful, while addressing issues
                        such as spam and 'review-bombing'. What started as a simple list of thumbs-up/down
                        accompanied by text now includes user voting and greater customizability in filtering. It
                        also now contains an enourmous amount of tagged and <a href="https://arstechnica.com/gaming/2014/04/steam-gauge-do-strong-reviews-lead-to-stronger-sales-on-steam/">influential</a> user-generated content.
                    </p>
                    <p>
                        While its features continue to improve, Steam's public store front is still geared towards
                        consumers. It shows a limited amount of reviews at the bottom of each product page; it is
                        missing a text-search functionality, historical information about edits, and full control over
                        filtering. It has a single visualisation showing the volume of reviews over time.
                    </p>
                        This tool uses Steam's APIs to provide you with access to all reviews for a given product at
                        once. With that information, it expands on the Steam store front by providing a greater level
                        of control in its filtering, and is able to derive further insights about the entire dataset
                        alongside visualisations.
                    <p>
                        In this way, it is hoped that this tool can provide people with quicker and cleaner access
                        to feedback about Steam products, and suggest ways they might apply it.
                    </p>
                    <p>
                        Some questions this tool may help answer:
                    </p>
                    <ul>
                        <li>What is the current trend in user sentiment after the last update?</li>
                        <li>Which players are having technical issues?</li>
                        <li>How long do people typically play the game?</li>
                        <li>Do people who recieve it for free rate it more favourably?</li>
                    </ul>
                    <p>
                        In the case that the way the data is presented does not answer a question you may have,
                        the data can be exported for further use!
                    </p>
                    <h3>Usage</h3>
                    <p>
                        To start, search for a product on the homepage and click the 'explore' button. The site will make
                        requests to Steam for its publicly visible reviews, in addition to some general information about
                        its listing on the Steam store. This has to be done in batches and stored in your browser's
                        memory, so the more reviews a product has, the slower things will be.
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
                    <h3>Legal &amp; Attributions</h3>
                    <p>
                        Data is retrieved from <a href="https://steamcommunity.com/dev">Steam's web APIs</a> in accordance with their policy. This website is built
                        with <a href="https://nextjs.org/">Next.js</a> and <a href="https://getbootstrap.com/">Bootstrap</a>, using <a href="https://fontawesome.com/">FontAwesome</a>.
                        This website is not affiliated with Valve.
                    </p>
                    <h3>Useful Resources</h3>
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

                    <h3>Support</h3>
                    <p>
                        Tools that incur a cost to their creator are often placed behind a pay-wall.
                        This tool cuts some corners behind-the-scenes so it can be hosted for free, but developing
                        and maintaining it takes time. If you find it useful, and you'd like to support me financially,
                        you can use the link below - otherwise, I'd appreciate constructive feedback and signal boosts
                        on social media, so that I can improve it and better help more people.
                    </p>
                    <p>
                        You can contrubite to the source code, view a roadmap of features and make requests on <a href="https://github.com/joshhills/steam-review-facts/projects/1">Github</a>.
                    </p>
                    <Donate/>
                </Col>
            </Row>
        </Container>
    </>)
}