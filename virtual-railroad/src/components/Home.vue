<template>
  <div class="">
   	<div id="video-container" class="hide">
        <div class="video-controls">
          <div class="close-video">Skip intro &raquo;</div>
          <label for="dont-show-video">
            <input id="dont-show-video" type="checkbox" name="dont-show-video"/>
            <span>Don't show video again. (Cookies must be active)</span>
          </label>
        </div>
        <video id="intro-video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
          <source src="http://s3.amazonaws.com/virtual-railroad/video-2-full.mp4" type='video/mp4'>
        </video>
      </div>

      		


            <!--Content Area--->
            <section class="content home-content">
            	<div class="container">
            		<div class="row">
            			<div class="col-md-12">
            				<div id="railroad-map" style="height:500px;"></div>
            			</div>

            			<div class="spacer spacer20"></div>

            			<div class="col-md-12">
            				<p><img src="../assets/light_bulb_32.png" alt="Person helping slaves"/> = <strong>person helping to free slaves.</strong> Individuals helping the Underground Railroad left lit lamps hanging on their barn doors and sheds overnight to let runaway slaves know they were safe havens where they could sleep or find food and water for their journey. They also used lamps to signal to runaway slaves who were preparing to cross rivers whether there was anyone on the other shore who would report them or try to capture them, or if the coast was clear to swim across.</p>
							<p><img src="../assets/star_32.png" alt="Nonprofit organization helping slaves"/> = <strong>nonprofit helping to free slaves.</strong> In the 1800s, slaves trying to escape north to freedom regularly relied on the North star as a beacon and compass because it's the only star in the sky that doesn't change its location. Today, slaves rely on nonprofits to help them gain their freedom and the nonprofits are steadfast in their commitment to free slaves, so we represent them with stars.</p>	
            			</div>
            		</div>
            	</div>
            </section>
            <!--Content Area--->
           
     </div>
</template>



<style scoped>
/**----Video Overlay----**/
#video-player{
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 110%;
}
#video-container.hide{ display: none !important;}
.video-controls{
  position: absolute;
  bottom: 2em;
  right: 1em;
  z-index: 11;
  color: white;
  width: 13em;
  font-size: 10px;
}
.video-controls .close-video{
  cursor: pointer;
  font-size: 14px;
}
.loading{
  position: absolute;
  background: black;
  width: 100%;
  height: 110%;
  z-index: 12;
}
.loading img{
  width: 800px;
  display: block;
  margin: auto;
  margin-top: 20%;
}
/**----Video Overlay----**/
/**-----Content Area----**/
.content {
	margin: 15px 0px;
}

</style>
