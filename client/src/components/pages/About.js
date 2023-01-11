import React from 'react'

const About = () => {
  return (
    <>
      <div className='container-fluid row'>
        <div className='col-md-8 about'>
          <div className='fs-2 text-primary p-3'>
            About Online Auction System
          </div>
          <hr />
          <p className='fs-4 p-3'>An online auction is an auction which is held over the internet. Online auctions come in many different formats, but most popularly they are ascending English auctions, descending Dutch auctions, first-price scaled-bid, Vickrey auctions, or sometimes even a combination of multiple auctions, taking elements of one and forging them with another. The scope and reach of these auctions have been propelled by the Internet to a level beyond what the initial purveyors had anticipated. This is mainly because online auctions break down and remove the physical limitations of traditional auctions such as geography, presence, time, space and a small target audience. This influx in reachability has also made it easier to commit  unlawful auctions within an auction. In 2002, online auctions were projected to account for 30% of all online e-commerce due to the rapid expansion of the popularity of the form of electronic commerce.</p>
          <p className='fs-4 p-3 mt-2'>Online auctions were taking place even before the release of the first web browser for personal computers, NCSA Mosaic, Instead of users selling items through the web they were instead trading through text-based newsgroups and email discussion lists. However, the first Web-based commercial activity regarding online auctions that made significant sales began in May 1995 with the company Onsale. In September that same year eBay also began trading. Both of these companies used ascending bid. The web offered new advantages such as the use of automated bids via electronic forms, a search engine to be able to quickly find items and the ability to allow users to view items by categories.</p>
        </div>
        <div className='col-md-4 image-div text-center mt-5'>
          <img src="images/img5.jpg" className='mb-5' style={{ height: "350px", width: "350px", borderRadius: "10px" }} alt="img3" /><br />
          <img src="images/img6.jpg" style={{ height: "350px", width: "350px", borderRadius: "10px" }} alt="img2" />
        </div>
      </div>
    </>
  )
}

export default About