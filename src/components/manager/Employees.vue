<template>
    <div>
       Employee tab
       Kopirati ovamo sve iz Productsa + emlpoyee podatke iz quick ordera
    </div>
</template>

 <script>
 

export default {
    name: "Employees",
    data() {
        return {
            id: null,
                email: null,
                password: null,
                photo_url: null,

                full_name: null,
                date_of_birth: null,
                phone: null,
                adress: null,
                city: null,
                postal_code: null,

                position: '',
                contract: '',
                wage: null,
                
                confirm_password: '',
        };
    },
    methods: {},
    mounted(){
        console.log('tu')
    }
}
  
 
 </script>
 
 
 <style lang="scss">
 

 
 </style>