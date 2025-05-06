import React from 'react'

const Footer = () => {
return (
<div>
<section class="row bg-info">
<div class="col-md-4 text-white">
<h4 class="text-center">About us</h4>
<p>Hofistis is your ultimate destination for premium hockey sticks from top brands .We offer a diverse selection of classic wooden sticks to high performance carbon-fiber models with a wide selection to suit your needs.Whether you are a beginner or a pro we provide sticks designed for power,precision,durability and performance.</p>
<p> Your game.Your stick.Your choice to play with confidence with Hofistis.
</p>

</div>
<div class="col-md-4 text-center text-white">
<h3>Contact Us</h3>
<form action="">
<input type="text" placeholder="Enter your Email"/>
<br/>
<br/>
<textarea name="" id="" rows="5px">Leave a comment</textarea>
<br/>
<br/>
<input type="submit" value="Send message" class="btn btn-outline-danger"/>

</form>

</div>
<div class="col-md-4 text-center text-dark">
<h3 class="text-white">Stay connected</h3>
<img src="fb.png" alt=""/>
<img src="in.png" alt=""/>
<img src="x.png" alt=""/>
<p class="text-start">  located in Westlands haven court
<br />
<div className="col-md-12">
    <h2 className="fw-bold">Why call Us?</h2>
    <ul className="circle">
    <li className="list-group-item"> Ask for an order</li>
    <li className="list-group-item"> Get Discounts and promotions</li>
    <li className="list-group-item">Get buying guides </li>
    <li className="list-group-item"> For support in hockey stick tips</li>
    </ul>
    </div>
</p>

</div>

</section>
<br />

<section class="row bg-secondary">
<div class="col-md-12 text-white text-center">
Developed by Mucee Mercy at 2025,.  to provide high-quality ,performance-driven hockey sticks

<br />
<br />
<marquee behavior="" direction="right" ><b>Thank you for visiting Hofistis</b></marquee>

 



</div>
</section>
</div>
)
}

export default Footer
