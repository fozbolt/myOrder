<template>
  <div class="login">
      <div class="container">
        <div class="row">
          <img class="logo center" alt="logo center" src="../assets/logo.svg" />
        </div>
        <div class="row">
          <img id="loginIcon" class="center" alt="svg login icon" src="../assets/team.svg" />
        </div>
        <div class="row">
          <div class="col-sm"></div>
              <div class="col-sm">

                <form>
                <div class="email"> 
                    <i class="fa fa-envelope" id="iconEmail" aria-hidden="true"></i>
                    <input type="email" class="form-control placeholderEmail" aria-describedby="emailHelp" placeholder=" e-mail..."  />
                   
                </div>

                <div class="password">
                    <i class="fas fa-key"></i>
                    <input type="password" class="form-control"  id="hidden_password" placeholder="password..."  />
                    <i class="fas fa-eye" id="password_eye" v-on:click="show_password()"></i>
                    
                </div>
                <br/>
                <button type="submit" class="btn btn-primary" @click="login()">Login</button>
                </form>

              </div>
            <div class="col-sm"></div>
          </div>
      </div>
  </div>
</template>

<script>
import store from '@/store.js'
export default {
  data(){
      return{
        email: '',
        password: '',
        store
      }
    },
  methods: {
      login(){
        //login request to api
        this.$router.push('/'); 
      },

      authError(){
        //handle auth error
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
        
      }
    }
}
</script>

<style scoped>


.logo{
  margin-bottom:5%;
  max-width: 250px;
}

#loginIcon{
  max-width: 400px;
  max-height: 400px;
  margin-top: -100px

}


.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  
}

.btn{
  margin-top:25px;
  background-color: #00a2ff;
  text-align: center;
  font: Regular 40px/49px Montserrat;
  letter-spacing: 0;
  color: #FFFFFF;
  opacity: 1;
    
}



form{
  margin-top: 0px;
  
}

input {
  border-color:white;
  font-size: 17.5px;
  width:250px;
  display: inline-block;

}

@keyframes mymove {
  
  50% {border-bottom-color: #00a2ff;}
}

.logReg{
  
  margin-top:5px;
  padding: 3px;
  text-align: center;
  color:#888888;

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

.form-control > .placeholderEmail {
  padding-left: 30px;
  background-color:red;
  color:red;
}




</style>