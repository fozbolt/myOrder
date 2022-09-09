<template>
    <div id="backgroundDiv">
        <div id="backgroundBlur">
            <div class="row" id="socialMedia">
                <img src="@\assets\FooterSocialMedia\twitter.svg"  @click="scrollToTop()" alt=""/>
                <img src="@\assets\FooterSocialMedia\insta.svg"  @click="scrollToTop()" alt=""/>
                <img src="@\assets\FooterSocialMedia\wapp.svg"  @click="scrollToTop()" alt=""/>
                <img src="@\assets\FooterSocialMedia\yt.svg"  @click="scrollToTop()" alt=""/>
                <img src="@\assets\FooterSocialMedia\pint.svg"  @click="scrollToTop()" alt=""/>
                <img src="@\assets\FooterSocialMedia\face.svg"   @click="scrollToTop()" alt=""/>
                
            </div>
            <div class="row" id="linkRow">
                <div class="col-sm-3 col-6 m-auto" @click="scrollToTop()" alt="">
                    <h5>My account</h5>
                            <h6>AbcDe</h6>
                            <h6>Evgdgijk</h6>
                            <h6>DMMDM oara</h6>
                </div>
                <div class="col-sm-3 col-6 m-auto" @click="scrollToTop()" alt="">
                    <h5>FAQ</h5>
                            <h6>AbcDe</h6>
                            <h6>Evgdgijk</h6>
                            <h6>DMMDM oara</h6>
                </div>
                <div class="col-sm-3 col-6 m-auto" @click="scrollToTop()" alt="">
                    <h5>General rules</h5>
                            <h6>AbcDe</h6>
                            <h6>Evgdgijk</h6>
                            <h6>DMMDM oara</h6>
                </div>
                <div class="col-sm-3 col-6 m-auto" @click="scrollToTop()" alt="">
                    <h5>About us</h5>
                            <h6>AbcDe</h6>
                            <h6>Evgdgijk</h6>
                            <h6>DMMDM oara</h6>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>


export default {
  name: 'Footer',

  data() { 
        return {
        }
  },  

  methods:{
    scrollToTop(){
         window.scrollTo(0, 40);
    }
  },
 
}
 

</script>


<style lang="scss">

#backgroundDiv{
    background-image: url('@/assets/FooterLarge.jpg');
    min-height: 225px;// ovo ce morati biti dinamicki
    width: 100%;
    background-size:cover;
    // margin-top: 100px;
}

#socialMedia > img{
    width: 40px;
    height: 40px;
    padding:0px;
    margin:40px 6px 10px 6px;
}


#socialMedia.row{
    margin-left: 0;
    margin-right: 0;
    justify-content: center;
}

.col-sm-3 > h5{
    color:#CF4F4F;
    margin-bottom:0.1rem;
    font-size:18px;
}

.col-6 > h6{
    margin-bottom: 0px;
    font-size:15px;
}

#linksRow > .row{
    margin-top:20px;
}

#backgroundBlur{
    background: rgba(255,255,255, 0.7);
    height: 100%;
}

#linkRow{
    margin: 20px 0 0 0;
}

#backgroundDiv > .col-sm-3, .col-6 {
    padding-bottom:25px;
}

@media (max-width:480px){
    #backgroundDiv{
        min-height: 315px;
    }
}


@media (min-width:1024px){
    .col-sm-3 > h5{
        font-size:1.5rem;
    }

    .col-6 > h6{
        margin-bottom: 0px;
        font-size:1.25rem;
    }
}



</style>