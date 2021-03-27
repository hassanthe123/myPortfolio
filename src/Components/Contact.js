import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {

   state = {
      name: "",
      email: "",
      subject: "",
      message:""
   } 
   
   handleChange = (event) => {
      var nam = event.target.name;
      var val = event.target.value;

      this.setState({
         [nam]: val
      })
     
   }
   
    submitRequest = async (event) => {
      event.preventDefault();
       console.log(this.state);

      //  const emai = this.state.email;
      //  const mess = this.state.message;

      axios({
      method: "POST", 
      url:"http://localhost:8080/access", 
      data:  this.state
      }).then((response) => {
         console.log(response.status);
      if (response.status === 200) {
         alert("Message Sent."); 
         document.getElementById('contactForm').reset();
        } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    }) 

      // const response = await fetch('http://localhost:8080/access', {
      //    method: 'POST',
      //    header: {
      //       'Content-type': 'application/json'
      //    },
      //    body: JSON.stringify({ "hello": "world" })
      // });
       
       
      //  const resData = await response.json();
         
      //  if (resData.status === 'success') {
      //     alert('Message Sent.');
      //     this.resetForm()

      //  } else if (resData.status === 'fail') {
      //     alert('Message failed to sent');
      //  }
   }
   
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form onSubmit={this.submitRequest} id="contactForm" name="contactForm">
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
                         <input type="text" defaultValue="" size="35" id="contactName" name="name" 
                            onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" required defaultValue="" size="35" id="contactEmail" name="email" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input type="text" defaultValue="" size="35" id="contactSubject" name="subject" onChange={this.handleChange}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea cols="50" required rows="15" id="contactMessage" name="message" onChange={this.handleChange}></textarea>
                  </div>

                  <div>
                     <button className="submit">Submit</button>
                     {/* <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span> */}
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning">Error</div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address and Phone</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>

               {/* <div className="widget widget_tweets">
                  <h4 className="widget-title">Latest Tweets</h4>
                  <ul id="twitter">
                     <li>
                        <span>
                        This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
                        Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">2 Days Ago</a></b>
                     </li>
                     <li>
                        <span>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                        </span>
                        <b><a href="#">3 Days Ago</a></b>
                     </li>
                  </ul>
		         </div> */}
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
