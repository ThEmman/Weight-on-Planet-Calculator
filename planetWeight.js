
// get submit btn and adds click function
const submitBtn = document.querySelector("input[type=button]");
submitBtn.addEventListener("click", calculateWeight);

// gets form element
const form = document.querySelector("form");

// gets and validates inputs
async function getFormInput(eventObj) {
  const informer = document.querySelector(".informer"); // display block/none
  const showcase = document.querySelector("#showcase"); // display flex/none

  const data = new FormData(form);
  const weightInKg= data.get("weightInKg");
  const planet = data.get("planet");
  console.log(eventObj);// just for tracking sakes

  // validation
  if (weightInKg == "" || planet == "empty" || weightInKg < 0) {
    informer.style.display = "block";
    showcase.style.display = "none";
    if (weightInKg < 0) {
      informer.innerText = "Please let the weight be greater than zero.";
    } else if (planet == "empty") {
      informer.innerText = "Please enter planet";
    } else {
      informer.innerText = "Please enter weight";
    }
    return false;
  } else {
    return [Number(weightInKg), planet];
  }
}

// calculation work;
async function weightInPlanet(weightAndPlanet = []) {
  const planetToGravity = {
    // gravitational pull on earth per 1 g = 9.8m/s**2, so each planet is fraction based of earths pull.
    Mercury: { g: 0.38, imgUrl: "planetsImages/mercury.png" },
    Venus: { g: 0.91, imgUrl: "planetsImages/venus.png" },
    Earth: { g: 1.0, imgUrl: "planetsImages/earth.png" },
    Mars: { g: 0.38, imgUrl: "planetsImages/mars.png" },
    Jupiter: { g: 2.34, imgUrl: "planetsImages/jupiter.png" },
    Saturn: { g: 0.93, imgUrl: "planetsImages/saturn.png" },
    Uranus: { g: 0.92, imgUrl: "planetsImages/uranus.png" },
    Neptune: { g: 1.12, imgUrl: "planetsImages/neptune.png" },
  };

  const [weight, planet] = weightAndPlanet;

  const arrOfProperties = Object.keys(planetToGravity);
  for (let plan of arrOfProperties) {
    if (planet == plan) {
      let results = (planetToGravity[plan].g * weight).toFixed(2) + "kg";
      let imgUrl = `${planetToGravity[plan].imgUrl}`;
      let planet = plan;
      return [results, imgUrl, planet];
    }
  }
}

// displays results
function display(weight, url, planet) {
  const informer = document.querySelector(".informer"); // gets element to toggle between display block/none
  const showcase = document.querySelector("#showcase"); // gets element to toggle between display flex/none

  const info = showcase.querySelector("h3"); // gets h3 tag in showcase
  const weightNum = document.querySelector(".results").querySelector("div"); // gets div to display weight
  const imgTag = document.querySelector(".planetImg").querySelector("img"); // gets image tag

  info.innerText = `The Weight on ${planet} is:`;
  weightNum.innerText = weight;
  imgTag.src = url;

  informer.style.display = "none";
  showcase.style.display = "flex";
  imgTag.style = "opacity:1;";
}

//does calculation and display work
async function calculateWeight(event) {
  //! still learning how to handle errors with promises
  const weightAndPlanet = await getFormInput(event)
  const [weight, planetUrl, planet] = await weightInPlanet(
    weightAndPlanet
  ).catch((error) => {
    console.log("You have this error", error);
  });
  display(weight, planetUrl, planet);
}



//! possible pause and play feature to implement for video.
/*       function myFunction() {
         if (video.paused) {
           video.play();
           btn.innerHTML = "Pause";
         } else {
           video.pause();
           btn.innerHTML = "Play";
         }
       } 
*/
