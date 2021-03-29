import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
      // http://contactnode-env.eba-kpfjmnmw.us-east-2.elasticbeanstalk.com/test
       
      axios({
      method: "POST", 
      url:"http://contactnode-env.eba-kpfjmnmw.us-east-2.elasticbeanstalk.com/test", 
      data:  this.state
      }).then((response) => {
         console.log(response.status);
      if (response.status === 200) {
         Swal.fire(
            {
               icon: 'success',
               title: 'Thank you, your email was sent!',
               showConfirmButton: false,
               timer: 2000
            }
         )
         document.getElementById('contactForm').reset();
         // document.getElementById('image-loader').hide();
         // document.getElementById('message-warning').hide();
         // document.getElementById('contactForm').hide();
         // document.getElementById('message-success').fadeIn();  

      } else if (response.status === 'fail') {
         // document.getElementById('image-loader').fadOut();
         // document.getElementById('message-warning').html(response.status);
         // document.getElementById('message-warning').fadeIn();
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

                {/* onSubmit={this.submitRequest} */}

               <form  onSubmit={this.submitRequest} id="contactForm" name="contactForm">
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
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
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

             
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
