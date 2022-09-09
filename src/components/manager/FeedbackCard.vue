<template>
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-md-9 col-lg-7 col-xl-5">
                <div class="card">
                    <div class="card-body">
                        <blockquote class="blockquote blockquote-custom bg-white px-3 pt-4">
                        <div class="blockquote-custom-icon bg-info shadow-1-strong">
                            <i class="fa fa-quote-left text-white"></i>
                        </div>
                        <p class="mb-0 mt-2 font-italic">
                        "{{info.comment}}"
                        </p>
                        <p class="mb-0 mt-2 font-italic" style="text-align:right;">
                            <a href="#">See order details</a>
                        </p>
                        <footer class="blockquote-footer pt-4 mt-4 border-top">
                            order number: {{info.orderNumber}}, {{convertTime()}}
                        </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    
</template>
 
<script>
 
 
export default {
   name: 'FeedbackCard',
   props: ['info'],  
 
   components:{},
   data() { 
         return {
     
         }
   },  
 
   methods:{ 
    convertTime(){
        let date = new Date(this.info.time);
       
        return (
            date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()+
            " "+date.getHours()+
            ":"+date.getMinutes()+
            ":"+date.getSeconds()
        )
    }
   },
 
 }
  
 
</script>
 
 
<style lang="scss" scoped>

.card-body{
    width:100%;
    margin-top: 50px;
}
 
.d-flex{
    width:100%;
}

footer{
    text-align:right;
}
 
.blockquote-custom {
position: relative;
font-size: 1.1rem;
}

.blockquote-custom-icon {
width: 50px;
height: 50px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: -40px;
left: 19px;
}
 
 </style>