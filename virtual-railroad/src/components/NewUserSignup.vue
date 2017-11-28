<template>
  <div class="">

            <!--Content Area--->
            <section class="content user-content">
            	<div class="container">
            		<div class="row">
                  <div class="col-md-12">

                          <h1>Create your account</h1>
                          <div class="spacer spacer10"></div>
                          <p>Please add a profile picture and enter your approximate location here: </p>
                          <div class="row">
                            <div class="col-md-4">
                              <form id="upload" method="post" action="" enctype="multipart/form-data">
                                  <div class="drop">
                                    <span>Profile Photo</span>
                                    <a class="blue-btn text-uppercase">Browse</a>
                                    <input type="file" name="upl" multiple="">
                                  </div>

                                </form>
                            </div>
                            <div class="col-md-7">
                              <form method="post" action="" enctype="multipart/form-data">
                                    <div class="row">
                                      <div class="col-md-8 pad-right-0">
                                        <input type="text" class="form-control" id="new-user-location-input" placeholder="Enter Your Location" />
                                      </div>
                                      <div class="col-md-4">
                                        <input type="submit" class="main-btn form-control mtop-0 text-uppercase" value="Search" />
                                      </div>
                                    </div>
                                </form>

                                <div id="user-location-map-gm"></div>
                            </div>
                           
                          </div>
                          <div class="clearfix"></div>


                          <input type="submit" id="summary-submit" value="Finish" class="btn main-btn" />
            			</div>
                   

                  <div class="spacer spacer20"></div>
            			
            		</div>
            	</div>
            </section>
            <!--Content Area--->

              
     </div>
</template>


<script>
  


</script>


<style scoped>
/**-----Content Area----**/
.content {
	margin: 15px 0px;
}
/**----profile-content---**/
label {
    line-height: 27px;
}
.form-control {
    height: 31px;
    border-radius: 0px;
    padding: 0px;
    color: #222;
    font-size: 16px;
}
.blue-btn {
    background-color: #4475b7;
    padding: 12px 26px;
    color: #fff;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    display: inline-block;
    margin-top: 12px;
    line-height: 1;
}
.drop {
    margin-bottom: 30px;
    text-align: center;
    border: 20px solid rgba(0, 0, 0, 0);
    border-radius: 3px;
}
.drop span {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    color: #7f858a;
    display:block;
}
.drop input {
    display: none;
}
.blue-btn:hover {
    background-color: #0986a3;
}
#user-location-map-gm {
    height: 220px;
    margin-top: 5px;
}
</style>
