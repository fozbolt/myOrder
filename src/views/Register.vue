<template>
  <div class="register">
    <div class="alert alert-danger alert-dismissible fade show" id="warningAlert">
          <button @click="closeAlert" type="button" class="close" >&times;</button>
          <strong>Greška!</strong> Unesene lozinke se ne podudaraju. Pokušajte opet.
    </div>

    <div class="alert alert-success alert-dismissible fade show" id="successAlert">
          <button @click="closeAlert" type="button" class="close">&times;</button>
          <strong>Uspjeh!</strong>  Za prijavu kliknite na "Prijavite se" (iznad gumba za potvrdu registracije)
    </div>
    <h1 class="logo">myOrder</h1>
    <h3 style="color: #00a2ff;">testna registracija</h3>
    
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form @submit.prevent="register">

            <div class="nameSurname">
              <i class="fas fa-user"></i>
              <input
                type="text"
                v-model="name"
                class="form-control placeholderEmail"
                aria-describedby="emailHelp"
                placeholder="ime..."
                required
              />
            </div>

            <div class="nameSurname">
              <i class="fas fa-user"></i>
              <input
                type="text"
                v-model="surname"
                class="form-control placeholderEmail"
                aria-describedby="emailHelp"
                placeholder="prezime..."
                required
              />
            </div>

            <div class="email">
              <i class="fa fa-envelope" id="iconEmail" aria-hidden="true"></i>
              <input
                type="email"
                v-model="email"
                class="form-control placeholderEmail"
                aria-describedby="emailHelp"
                placeholder=" e-mail..."
                required
              />
            </div>

            <div class="password">
              <i class="fas fa-key"></i>
              <input
                id="password"
                type="password"
                v-model="password"
                class="form-control"
                placeholder="lozinka..."
                required
              />
            </div>

            <div class="password">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                v-model="confirmPassword"
                class="form-control"
                placeholder="ponovi lozinku..."
                required
              />
            </div>
            <h6 v-if="registration_failed" style="color:red; font-size:12px">Neuspjela registracija, email se već koristi.</h6>
            <small class="logReg">
              Imate korisnički račun?
              <router-link to="login" style="padding-left:3px;">Prijavite se</router-link>!
            </small>

            <button type="submit" class="btn btn-primary">Registracija</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>

  </div>
</template>

<script>
import { Auth } from "@/services";

export default {
  name:'Register',
  
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      registration_failed: null
    };
  },
  methods: {
    async register() {
        if (this.password === this.confirmPassword) {

            const response = await Auth.register({username: this.email, password:this.password, name: this.name, surname: this.surname });
        
            if(response){
                this.username = {};
                this.password  =undefined;
                this.confirmPassword = undefined;
                this.registration_failed = null;

                this.$router.push('/');
            }
            else{ //dodati još jedan elseif koji provjerava da li korisničko ime već postoji + nema smisla da imam porukice u formi i bootstrap alerte
                 this.registration_failed = "Došlo je do greške tijekom registracije!";
            }
        }
        else{
            $('#warningAlert').show();
        }
        
	},
    closeAlert(){
      $('.alert').hide();
    }
  },
  mounted(){
    $('#successAlert').hide();
    $('#warningAlert').hide();
    
  },

  created(){
    console.log('tu')
  }
};
</script>

<style scoped>
.logo {
  margin-bottom: 5%;
  font-family: BillabongW00-Regular;
  font-size: 50px;
  letter-spacing: 0;
  color: #000000;
  opacity: 1;
}
.btn {
  margin-top: 25px;
  background-color: #00a2ff;
  text-align: center;
  font: Regular 40px/49px Montserrat;
  letter-spacing: 0;
  color: #ffffff;
  opacity: 1;
}
form {
  margin-top: 50px;
}
input {
  border-color: white;
  font-size: 16px;
  width: 250px;
  display: inline-block;
}
@keyframes mymove {
  50% {
    border-bottom-color: #00a2ff;
  }
}
.logReg {
  margin-top: 5px;
  border: 1px solid coral;
  border-color: white;
  animation: mymove 5s infinite;
  padding: 3px;
  text-align: left;
  color: #888888;
}
.register {
  position: relative;
  animation: mymove2 1s;
  animation-fill-mode: forwards;
  margin-top: -5%;
}
@keyframes mymove2 {
  from {
    top: 0px;
  }
  to {
    top: 100px;
  }
}
::placeholder {
  color: #888888;
  margin-left: -20px;
}
i {
  position: relative;
  font-size: 20px;
  color: #888888;
  display: inline-block;
}
small {
  position: relative;
  margin-left: 12.5%;
  margin-right: 12.5%;
  display: flex;
  justify-content: center;
}
.email,
.password,
.nameSurname {
  width: 300px;
  display: inline-block;
  margin: 10px;
  border-bottom: 1px #00a2ff solid;
}
.form-control > .placeholderEmail {
  padding-left: 30px;
  background-color: red;
  color: red;
}
@media screen and (min-width: 801px){
  #warningAlert, #successAlert{
    top: -2.5rem;
  }
}
/*###Tablet(medium)###*/
@media screen and (min-width : 768px) and (max-width : 800px){
  #warningAlert, #successAlert{
    top: -4rem;
  }
}
/*### Smartphones (portrait and landscape)(small)### */
@media screen and (min-width : 0px) and (max-width : 767px){
  #warningAlert, #successAlert{
    top: -5rem;
  }
  .register{
    height: 700px;
  }
}
</style>
