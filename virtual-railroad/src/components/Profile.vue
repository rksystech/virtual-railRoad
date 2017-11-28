<template>
  <div class="">

      		


            <!--Content Area--->
            <section class="content profile-content">
            	<div class="container">
            		<div class="row">
            			<div class="col-md-6">
            				<div class="row">
                      <div class="col-sm-5">
                        <img src="../assets/profile.jpg" alt="Lily Smith" />
                      </div>
                      <div class="col-sm-7">
                        <h1>Lily Smith</h1>
                        <p><strong>Location:</strong> Mbaraki, Mombasa, Kenya</p>
                        <a href="" class="btn main-btn">Edit profile</a> 
                      </div>
                    </div>
            			</div>
                  <div class="col-md-4 col-md-offset-2">
                      <h3>I Support:</h3>
                      <p>
                        <a href="">Oxfam International</a><br/>
                        <a href="">Streetlight</a><br/>
                        <a href="">Feeding America</a><br/>
                        <a href="">Raphahouse</a>
                      </p>
                  </div>


            			<div class="spacer spacer40"></div>

                  <div class="col-md-12">
                    <div id="user-selected-nonprofits-map"></div>
                  </div>

                  <div class="spacer spacer20"></div>
            			
            		</div>
            	</div>
            </section>
            <!--Content Area--->
           
     </div>
</template>



<style scoped>
/**-----Content Area----**/
.content {
	margin: 15px 0px;
}
/**----profile-content---**/
.profile-content img {
  width: 100%;
}
.profile-content h1 {
    margin-top: 50px;
}
.profile-content h3 {
    font-size: 1.17em;
    font-weight: 600;
    margin-top: 55px;
}
#user-selected-nonprofits-map {
    width: 100%;
    height: 500px;
}

</style>
