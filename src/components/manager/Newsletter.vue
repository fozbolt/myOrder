<!-- source: design: https://codepen.io/themefisher/pen/EZzREe, functionality: https://codepen.io/VladKvaskov/pen/GPxbXQ?editors=1010  -->
<template>
    <div class="contact-form-wrapper">
        <div class="title">
            <h1>Let our subscribers be informed.</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Duis aute irure true melkior.
            </p>
        </div>
        <div style="text-align:left;">
            <a href='#' @click="outsourceMail">Send from email client</a>
        </div>
        <div style="height:25px;">
            <p v-if="errorMessage" style="color:red;">
            {{ errorMessage }}
            </p>
            <p v-if="successMessage" style="color:green;">
                {{ successMessage }}
            </p>
        </div>
        <form id="contact-form" class="contact-form" method="post" role="form">
            <div class="form-group">
                <input type="text" placeholder="To all" class="form-control" name="To" id="to" disabled>
            </div>

            <div class="form-group">
                <input v-model="subject" type="text" placeholder="Subject" class="form-control" name="subject" id="subject" required>
            </div>

            <div class="form-group">
                <textarea v-model="message"  rows="6" placeholder="Message" class="form-control" name="message" id="message" required></textarea>    
            </div>

            <div id="submit" class="">
                <input @click="sendMessage" type="button" id="contact-submit" class="btn btn-default submit-button" value="Send Message">
            </div>
        </form>
       
    </div>
 </template>
 
 <script>
 import { Products } from '@/services';


 export default {
    name: 'Newsletter',
    
 
    data() { 
         return {
            emails: [],
            subject: '',
            message: '',  
            errorMessage: false,
            successMessage: false
         }
   },  
 
    methods:{
        async sendMessage(){
            if (this.subject === '' || this.message === '')
                this.errorMessage='empty fields'
            else {

                await fetch('https://movers-san-francisco.com/email_sender.php', {
                    method:   'POST',
                    'Accept': 'application/json',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body:     'email_message=' + JSON.stringify({
                            'mail_to': this.emails.toString(),
                            'mail_subject': this.subject,
                            'mail_message': this.message
                            })
                }).then(response => response.json()).then(data => {
                    
                    if (data.result == 'success') {
                        this.successMessage='email sent successfuly'
                        this.message = '',
                        this.subject = ''
                    }
                    else
                        this.errorMessage= 'error while sending mail'

                })
            }
        },

        outsourceMail(){
            location = 'mailto:' + this.emails.join(';')  + '?subject=' + this.subject + '&body=' + this.message ;
        }
            
    },

    watch:{
		"errorMessage": _.debounce(function(){this.errorMessage = false}, 10000),
        "successMessage": _.debounce(function(){this.successMessage = false}, 5000)
	},


    async mounted(){
        let subscribers = await Products.fetchSubscribers();

        this.emails =  subscribers.map(obj => obj.email);
    }

 
 }
  
 
 </script>
 
 
 <style lang="scss" scoped>
 
 .contact-form-wrapper {
  margin:50px auto;
  width: 600px;
  .title {
    margin-bottom:30px;
    text-align: left;
   }
  h1 {
    font-size:18px;
    text-transform: uppercase;
    font-weight:bold;
  }
  p {
    font-size:14px;
    color: #777;
  }
}
.contact-form {
  input {
    border-radius:0;
    height:50px;
    font-size:12px;
    color:black;
    margin-top:10px;
  } 
  textarea {
    border-radius:0;
    font-size:12px;
    color:black;
    margin-top:10px;
  }
  .submit-button {
    background: #00AEEF;
    color:#fff;
    font-size:12px;
    text-transform:uppercase;
    font-weight:bold;
    letter-spacing:1px;
  }
}


@media(max-width:700px){
    .contact-form-wrapper {
    margin:50px auto;
    width: 95%;    
    }
}
 
 </style>