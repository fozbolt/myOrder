<template>
  <div class="login">
      <div class="container">
        <div class="row" id="logo-main">
          <img class="logo center" alt="logo center" src="../assets/logo-main.svg" />
        </div>
        <div class="row">
          <img id="loginIcon" class="center" alt="svg login icon" src="../assets/team.svg" />
        </div>
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm"></div>
              <div class="col-sm">

                <form  @submit.prevent="">
                <div class="email"> 
                    <i class="fa fa-envelope" id="iconEmail" aria-hidden="true"></i>
                    <input v-model="email" type="email" class="form-control placeholderEmail" aria-describedby="emailHelp" placeholder=" e-mail..."  />
                   
                </div>

                <div class="password" onfocus="document.getElementById('password_eye').style.display='block';"
                      onblur="document.getElementById('password_eye').style.display='none';">
                    <i class="fas fa-key" id="iconPassword"></i>
                    <input v-model="password" type="password" class="form-control"  id="hidden_password" placeholder="password..."   />
                    <i class="fas fa-eye" id="password_eye" v-on:click="show_password()"></i>
                    
                </div>
                <br/>
                <small class="logReg">
                    <span>
                      Dont have an account?
                        <a  @click="permissionWarning" href="#" style="padding-left:3px;"> 
                        Sign up 
                        </a>
                      !
                    </span>
                </small>

                <div class="row pl-4 pr-4 justify-content-center warningDiv" id="warningRow">
				          <small style="color: red"  v-if="errorMessage">{{errorMessage}}</small><br>
                  <small style="color: red" v-if="restrictedMessage" >{{restrictedMessage}}</small>
                </div>
       
                <button type="submit" preventD class="btn btn-primary" @click="login()">Login</button>
                </form>
          
              </div>
            <div class="col-sm"></div>
            <div class="col-sm"></div>
          </div>
      </div>
  </div>
</template>

<script>
import store from '@/store.js'
import { Auth } from "@/services";
import _ from 'lodash';

export default {
  data(){
      return{
        email: '',
        password: '',
        errorMessage: false,
        restrictedMessage: false,
        qrUser: undefined,
        qrPass: undefined,
        store
      }
    },
  

  methods: {
    async login(){
			const result = await Auth.login({'username': this.email, 'password': this.password});

			if(result){
				this.email = null;
				this.password = null;
        
				this.$router.push('/');
			}
			else this.errorMessage = "Login failed, please check your input data";
		},

    checkForCustomer(){
      //if query exists then we know its customer - force push login
      this.qrUser = this.$route.query.username;
      this.qrPass = this.$route.query.password;
      this.store.table += this.$route.query.table;

      if(this.qrUser!=null && this.qrPass!=null){
          this.email = this.qrUser
          this.password = this.qrPass

          this.login();
      }
    },


    show_password() {
      
      let x = document.getElementById("hidden_password");
      
      if (x.type === "password"){
        x.type = "text";
        document.getElementsByClassName("fas fa-eye")[0].className = "fas fa-eye-slash";
      } 
      else{
        x.type = "password";
        document.getElementsByClassName("fas fa-eye-slash")[0].className = "fas fa-eye";
      } 
      
    },

    permissionWarning(){
      this.restrictedMessage = 'Restricted access'
    }
 },
  
  watch:{
		"errorMessage": _.debounce(function(){this.errorMessage = false}, 10000),
    "restrictedMessage": _.debounce(function(){this.restrictedMessage = false}, 2000)
	},

  mounted(){

    this.checkForCustomer();
  }

  
}
</script>

<style scoped>




.logo{
  margin-bottom:5%;
  max-width: 250px;
}

#loginIcon{
  max-width: 350px;
  max-height: 350px;

}


.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  
}

.btn{
  margin-top:7.5px;
  background-color: #00a2ff;
  text-align: center;
  font: Regular 40px/49px Montserrat;
  letter-spacing: 0;
  color: #FFFFFF;
  opacity: 1;
    
}

.logReg{
  margin-top:5px;
  border: 1px solid white;
  animation: lightBulb 5s infinite;
  padding: 3px;
  text-align: left;
  color:#888888;
}



form{
  margin-top: 0px;
  
}

input {
  border-color:white;
  font-size: 16px;
  width:250px;
  display: inline-block;

}

@keyframes mymove {
  
  50% {border-bottom-color: #00a2ff;}
}



.border{
  animation: mymove 5s infinite;
  
}

.login{
  position: relative;
  animation: mymove2 2s;
  animation-fill-mode: forwards;
  margin-top:-5%;
}

@keyframes mymove2 {
  from {top: 0px;}
  to {top: 100px;}
}



::placeholder {
  color:#888888;
  margin-left: -20px;
}




i{
  
  position: relative;
  font-size: 20px;
  color:#888888;
  display: inline-block;
    
}

small{
  position:relative;
  margin-left: 12.5%;
  margin-right: 12.5%;
  display: flex;
  justify-content: center;
  
}


.email, .password{
        width: 300px;
        display: inline-block;
        margin: 10px;
        border-bottom:1px #00a2ff solid;
    }

#iconEmail{
  margin-left: -25px;
  
}

#iconPassword{
  margin-left: 0px;
  
}

.form-control > .placeholderEmail {
  padding-left: 30px;
  background-color:red;
  color:red;
}

#password_eye {
  /* display: none; */
}


/* input:focus ~ #password_eye {
  display: inline;
  margin-left:5px;
 
} */


#warningRow{
  flex-wrap: unset;
  height: 45px;
}

/* placement of login content */
@media (min-width:349px){
  #logo-main{
  margin-top: -15%;
 }
 #loginIcon{
  max-width: 350px;
  max-height: 350px;
  margin-top: -10%;
  }
}


@media (min-width:370px){
  #logo-main{
  margin-top: -7.5vh;
 }
 #loginIcon{
  max-width: 350px;
  max-height: 350px;
  margin-top: 3vh;
 }
}


@media (min-width:768px){
  #logo-main{
  margin-top: 10vh;
 }
 #loginIcon{
  max-width: 350px;
  max-height: 350px;
  margin-top: -5%;
 }
}


@media(min-width:1400px){
  .email, .password{
    width:350px;
  }

  input{
    width:300px;
    font-size: 20px;
  }

  #loginIcon{
    max-width: 400px;
    max-height: 400px;
  }

  .logo{
    max-width: 400px;
  }
  
  form > .btn{
    font-size:20px;
  }

}

</style>