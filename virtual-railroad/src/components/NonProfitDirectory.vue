<template>
  <div class="">

            <!--Content Area--->
            <section class="content user-content">
            	<div class="container">
            		<div class="row">
                  <div class="col-md-12">

                          <h1>Create a new non profit</h1>
                          <div class="spacer spacer10"></div>
                          <p>Please take a moment to sign up to be a non profit on Virtual Railroad</p>
                          <div class="row">
                            <div class="col-md-4">
                              <form id="upload" method="post" action="" enctype="multipart/form-data">
                                  <div class="drop">
                                    <span>Logo Here</span>
                                    <a class="blue-btn text-uppercase">Browse</a>
                                    <input type="file" name="upl" multiple="">
                                  </div>

                                </form>
                            </div>
                            <div class="col-md-4">
                              <form method="post" action="" enctype="multipart/form-data">
                                    <label>Name <sup>*</sup></label>
                                    <input type="text" class="form-control" />

                                    <label>Description <sup>*</sup></label>
                                    <input type="text" class="form-control" />

                                    <label>Link <sup>*</sup></label>
                                    <input type="text" class="form-control" />

                                    <label>Add an Office <sup>*</sup></label>
                                    <input type="text" class="form-control" placeholder="Enter a location" />

                                    <div class="row">
                                      <div class="col-md-7">
                                        <input type="submit" class="main-btn form-control" value="Add Office Location" />
                                      </div>
                                      <div class="col-md-5">
                                        <input type="submit" class="main-btn form-control" value="Save" />
                                      </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-4">
                                <p class="mtop-0">List of Offices</p>
                            </div>
                          </div>
                          <div class="clearfix"></div>
            			</div>
                   

                  <div class="spacer spacer20"></div>
            			
            		</div>
            	</div>
            </section>
            <!--Content Area--->

                    <!-- Modal -->
                      <div class="modal fade" id="myModal2" role="dialog">
                        <div class="modal-dialog">
                        
                          <!-- Modal content-->
                          <div class="modal-content">
                             <button type="button" class="close" data-dismiss="modal"><span>X</span> Close</button>
                            <div class="modal-body">
                              <p>When you find a nonprofit you support, close this window to return to your Edit Profile page, enter the nonprofit and save your changes.</p>
                            </div>
                          </div>
                          
                        </div>
                      </div>
           
     </div>
</template>



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
    height: 24px;
    border-radius: 0px;
    padding: 0px;
    color: #222;
    font-size: 16px;
}
select {
    margin-bottom: 5px;
    font-family: sans-serif;
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
input[type="submit"] {
  color: #fff;
}
</style>
