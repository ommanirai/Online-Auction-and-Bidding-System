import React from 'react'

const Faq = () => {
  return (
    <>
      <div className='container-fluid row'>
        <div className='col-md-8 about-div p-3'>
          <div className='fs-2 text-primary '>
            FAQ (Frequently Asked Questions)
          </div>
          <hr />

          <p className='fs-5 bg-black text-white mt-4'>What is an online auction?</p>
          <p className='fs-5'>An online auction is similar to our regular live auctions except that it is conducted entirely over the internet. In effect, the software system is taking the place of the auctioneer in controlling the bidding and closing of the lots being sold.</p>

          <p className='fs-5 bg-black text-white mt-4'>When does the online auction end?</p>
          <p className='fs-5'>The auction ends at the time indicated in the auction description, generally 8 PM MT on the date specified. The lots will colse in succession at intervals of 15 seconds, i.e. lot 36 will close 15 seconds after lot 35</p>

          <p className='fs-5 bg-black text-white mt-4'>What is the automatic bidding extension?</p>
          <p className='fs-5'>There is an automatic 2 minute bidding extension if a bid is submittted on any lot within the last minute on the biding clock. These time extensions will continue until there is a 2 minute period during which no bidding takes place on any lot.</p>

          <p className='fs-5 bg-black text-white mt-4'>How do I set up an online bidding account?</p>
          <p className='fs-5'>Go to our bidder registration page for the auction. This can be found in the online/web catalogue for each sale. If you have previously registered you can enter your email and password and proceed with registering for the auction. If this is your first time registering you will be asked to provide personal information and register either a Visa or Mastercard on the sign up page.</p>

          <p className='fs-5 bg-black text-white mt-4'>How do I bid?</p>
          <p className='fs-5'>Each lot in the auction has a clearly marked bidding window. Once you are registered into the auction there are two ways to bid:</p>
          <ul className='fs-5'>
            <li>You simply indicate the maximum amount you wish to bid in the window where indicated and click on the 'Place Bid' button. You will be taken to a confirmation screen that will ask you to either 'Confirm Bid' or 'Cancel Bid'. If you have not yet logged in you will be asked to do so in order to confirm your bid. Please note that by confirming your bid you are entering into a legally binding contract with the auction house to pay for your successful bids plus the applicable buyer's premium and taxes.</li>
            <li className='mt-3'>Bid in real time as each lot is closing just like our live auctions. You will be required to bid, and confirm your bid, for each increment that you are advancing. In effect, you are taking the same steps as in the method above, but are not disclosing your maximum. You are doing the work instead of relying on the software.</li>
          </ul>

          <p className='fs-5 bg-black text-white mt-4'>How much should I bid?</p>
          <p className='fs-5'>It's entirely up to you, the simplest way is to always indicate your top bid- the amount to which you would bid if you were attending an auction in person. The bid submitted is similar to the live auction's absentee bid. In effect, the software will hold your bid in confidence and will bid on your behalf, against competing bids, according to the published increments up to the amount you are prepared to bid. For example, if the current high bid on a lot is $300 and you are prepared to bid up to $550, our software system will accept & implement your first bid at $325. If another bidder then bids $350, our system will automatically submit a bid of $375 on your behalf. If there is no additional bidding, then you will be successful at the $375 hammer price.</p>

          <p className='fs-5 bg-black text-white mt-4'>Can I place an absentee bid?</p>
          <p className='fs-5'>Yes, we are pleased to accept absentee bidding by telephone or fax if you are uncomfortable with or unable to bid by your computer. Please call us during regular business hours to arrange absentee bidding. Absentee bids will generally be accepted until Noon MDT the day of the sale. In instalces where the sale closes outide of a regular work day, absentee bids will be accepted ultil 4 PM the last work day prior to the auction closing.</p>

          <p className='fs-5 bg-black text-white mt-4'>How can I see all my bids?</p>
          <p className='fs-5'>Log in to your bidder's account by entering your email and password. You will see a toolbox that contains your current bids, your bid history, and your bidder information.</p>
        </div>
        <div className='col-md-4 image-div text-center mt-5'>
          <img src="images/img9.png" className='mb-5' style={{ height: "370px", width: "370px", borderRadius: "10px" }} alt="img2" />
          <img src="images/img7.jpg" className='mb-5' style={{ height: "370px", width: "370px", borderRadius: "10px" }} alt="img3" />
          <img src="images/img4.jpg" style={{ height: "370px", width: "370px", borderRadius: "10px" }} alt="img4" />
        </div>
      </div>
    </>
  )
}

export default Faq