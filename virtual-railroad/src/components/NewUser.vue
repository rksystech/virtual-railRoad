<template>
  <div class="">

            <!--Content Area--->
            <section class="content user-content">
            	<div class="container">
            		<div class="row">
            			<div class="col-md-8">
            				  <h1>Join the Virtual Railroad</h1>

                      <div class="spacer spacer40"></div>

                      <label class="pull-right">* Required</label>

                      <label>First Name <sup>*</sup></label>
                      <input type="text" class="form-control" />

                      <label>Last Name <sup>*</sup></label>
                      <input type="text" class="form-control" />

                      <label>Username <sup>*</sup></label>
                      <input type="text" class="form-control" />

                      <div class="spacer spacer20"></div>

                      <label>To join, you must volunteer for, work for or donate to at least one nonprofit that fights slavery. To find one to support, click <a href="">here</a>. Select up to 8 nonprofits that will show as places you support on your profile page:</label>

                      <div class="spacer spacer10"></div>

                      <ol>

                        <li>
                          <select class="form-control">
                            <option>Please Select</option>
                          </select>
                        </li>
                        <li>
                          <select class="form-control">
                            <option>Please Select</option>
                          </select>
                        </li>
                        <li>
                          <select class="form-control">
                            <option>Please Select</option>
                          </select>
                        </li>
                      </ol>
                      <a href="" class="btn main-btn">Add Another</a> 

                  </div>
                  <div class="col-md-12">

                      <div class="spacer spacer20"></div>

                      <label><a data-toggle="modal" data-target="#myModal">?</a></label>

                      <!-- Modal -->
                      <div class="modal fade" id="myModal" role="dialog">
                        <div class="modal-dialog">
                        
                          <!-- Modal content-->
                          <div class="modal-content">
                            <button type="button" class="close" data-dismiss="modal"><span>X</span> Close</button>
                            <div class="modal-body">
                              <p>If a nonprofit you support doesn’t allow donors to specify which region your donations go to, it’s fine to pick the region that has most inspired you to help that nonprofit. For example, if a nonprofit has locations in Kenya, India and Cambodia, and you’re most interested in helping slaves in India, then choose India.</p>
                            </div>
                          </div>
                          
                        </div>
                      </div>

                     

                      <div class="spacer spacer20"></div>
                      <a class="btn main-btn" href="">Continue</a>
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
.form-control {
    height: 24px;
    border-radius: 0px;
    padding: 0px;
    color: #222;
    font-size: 16px;
}
h3 {
    font-weight: 600;
    letter-spacing: -.7px;
}
ol {
    counter-reset: foo;
    display: table;
    width: 100%;
}
ol > li {
    counter-increment: foo;
    display: table-row;
}
ol > li::before {
    content: counter(foo) ".";
    display: table-cell;
    width: 4%;
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
