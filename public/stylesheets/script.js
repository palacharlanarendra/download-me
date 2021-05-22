
		const host = "http://localhost:5000/";
        
        var userImageLink = 
"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
            var time_start, end_time;
            
            // The size in bytes
            var downloadSize = 5616998;
            var downloadImgSrc = new Image();
  
            
            setInterval(()=>{
                end_time = new Date().getTime();
                displaySpeed()
            },850)
            time_start = new Date().getTime();
            downloadImgSrc.src = userImageLink;
            document.write("time start: " + time_start);
            document.write("<br>");
            
            function displaySpeed() {
                var timeDuration = (end_time - time_start) / 1000;
                var loadedBits = downloadSize * 8;
                
                /* Converts a number into string
                   using toFixed(2) rounding to 2 */
                var bps = (loadedBits / timeDuration).toFixed(2);
                var speedInKbps = (bps / 1024).toFixed(2);
                var speedInMbps = (speedInKbps / 1024).toFixed(2);
                let internetSpeed = document.querySelector('.item5')
                internetSpeed.innerHTML = ''
                let h5 = document.createElement('h5')
                let h3 = document.createElement('h5')
                let h4 = document.createElement('h5')
                let h2 = document.createElement('h5')
                h5.classList.add('heading5')
                // h3.classList.add('heading5')
                h4.classList.add('heading4')
                h2.classList.add('heading4')
                h5.innerText = "Your internet connection speed is: \n" 
                    //   + bps + " bps\n" + speedInKbps 
                    //   + " kbps\n" + speedInMbps + " Mbps\n"
                // h3.innerText = `${bps}bps`
                h4.innerText = `${speedInKbps}Kbps`
                h2.innerText = `${speedInMbps}Mbps`      
                internetSpeed.innerHTML = `<lottie-player src="https://assets10.lottiefiles.com/packages/lf20_DtW8ik.json" class="speedmeter" background="transparent"  speed="1"  style="width: 300px; height: 150px; margin-bottom: -4rem;"  loop autoplay></lottie-player>`
                internetSpeed.append(h5,h4,h2)     
                
            }
                
            
            
		document.querySelector("#get-video-info-btn").addEventListener("click",function(){
            
			let videoURL = document.querySelector("#videoURL").value.trim();
            
			if(videoURL.length == 0){
				alert("Please enter youtube video link");
				return;
			}
			fetch(host+"videoInfo?videoURL="+videoURL).then(function(response){
				return response.json();
			}).then(function(data){
				console.log(data);
				let detailsNodes = {
					thumbnail:document.querySelector(".video-data .thumbnail img"),
					title:document.querySelector(".video-data .info h2"),
					description:document.querySelector(".video-data .info p"),
					videoURL:document.querySelector(".video-data .controls #video-url"),
					downloadOptions:document.querySelector(".video-data .controls #download-options")
				}

				let html = "";
                // let videoUrl = document.querySelector("#videoURL")
                
               

				for(let i=0;i<data.formats.length;i++){
                    console.log(data.formats);
                    

					if(data.formats[i].container != "mp4"){
                        
						continue;
					}

					
					if(data.formats[i].audioCodec == null){
						continue;
					}
                    if(data.formats[i].mimeType.includes('mp4') && data.formats[i].qualityLabel!==null ){
                        html += `
						<option value="${data.formats[i].itag}">
							${data.formats[i].container} - ${data.formats[i].qualityLabel}
						</option>
					`;
                    }
					
					detailsNodes.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url; // get HD thumbnail img
					detailsNodes.title.innerText = data.videoDetails.title;
					// detailsNodes.description.innerText = data.videoDetails.description;

					detailsNodes.videoURL.value = videoURL;
					detailsNodes.downloadOptions.innerHTML = html;

					document.querySelector(".video-data").style.display = "block";
					document.querySelector(".video-data").scrollIntoView({
						behavior:"smooth"
					});

				}
			}).catch(function(error){
				alert("Something went wrong");
			})

            videoURL.innerText = "";

            
		});
        

		document.querySelector("#download-btn").addEventListener("click",function(){
			let videoURL = document.querySelector("#video-url").value;
			let itag = document.querySelector("#download-options").value;
			window.open(host + "download?videoURL="+videoURL+"&itag="+itag);
		});




        let video_data = document.querySelector(".video-data")
        document.getElementById('cross').addEventListener('click', () => {

            video_data.style.display = "none"
            console.log('cross')
            

        })

