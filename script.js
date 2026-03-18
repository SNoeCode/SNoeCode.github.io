//element theme colors
const fireColor = "#AC1904";
const fireText = "#E4A006";
const earthColor = "#267903";
const earthText = "#E3FF09";
const waterColor = "#0E7CAB";
const waterText = "#B8EEFF";
const airColor = "#5D088D";
const airText = "#1AF2E5";

//this function returns the color theme for each sign
function getSignColor(sign) {
  //fire signs
  if (sign == "aries" || sign == "leo" || sign == "sagittarius") {
    return { nav: fireColor, text: fireText };
  }
  //earth signs
  if (sign == "taurus" || sign == "virgo" || sign == "capricorn") {
    return { nav: earthColor, text: earthText };
  }
  //water signs
  if (sign == "cancer" || sign == "scorpio" || sign == "pisces") {
    return { nav: waterColor, text: waterText };
  }
  //air signs
  if (sign == "gemini" || sign == "libra" || sign == "aquarius") {
    return { nav: airColor, text: airText };
  }
  //default
  return { nav: "black", text: "white" };
}

//goes through all the sign buttons and colors them
function applySignButtonColors() {
  const buttons = document.querySelectorAll("[data-sign]");
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const sign = btn.getAttribute("data-sign");
    const theme = getSignColor(sign);
    //using important so theme switcher doesnt overwrite
    btn.style.backgroundColor = theme.nav;
    btn.style.color = theme.text;
    btn.style.border = "1px solid " + theme.text;
  }
}

//changes the page theme colors and background
function applyTheme(gif) {
  let theme;
  //check which gif was picked and set the colors
  if (gif === "pictures/themes/fire-theme.gif") {
    theme = { nav: fireColor, text: fireText };
  } else if (gif === "pictures/themes/earth-theme.gif") {
    theme = { nav: earthColor, text: earthText };
  } else if (gif === "pictures/themes/water-theme.gif") {
    theme = { nav: waterColor, text: waterText };
  } else if (gif === "pictures/themes/air-theme.gif") {
    theme = { nav: airColor, text: airText };
  } else {
    theme = { nav: "black", text: "white" };
  }
  //saves the current theme so the modal can use it
  currentTheme = theme;

  //sets the background
  if (gif) {
    document.body.style.backgroundImage = "url('" + gif + "')";
  } else {
    document.body.style.backgroundImage = "url('pictures/rain.gif')";
  }

  //changes the nav background color
  document.querySelector(".nav-container").style.backgroundColor = theme.nav;

  //main headings and nav
  const brightColor = document.querySelectorAll(
    ".sign-name, .p-learn-container, .h1-container, .sign-dates",
  );
  for (let i = 0; i < brightColor.length; i++) {
    brightColor[i].style.color = theme.text;
  }

  //title and date use the darker theme color, white in default
  const titleColor = theme.nav === 'black' ? 'white' : theme.nav;
  const darkColor = document.querySelectorAll(".h1-header, #today-date");
  for (let i = 0; i < darkColor.length; i++) {
    darkColor[i].style.color = titleColor;
  }

  //updates button colors
  const allButtons = document.querySelectorAll("button");
  for (let i = 0; i < allButtons.length; i++) {
    const btn = allButtons[i];
    if (btn.classList.contains("sign-card") || btn.closest(".zodiac-nav")) {
      continue;
    }
    btn.style.backgroundColor = theme.nav;
    btn.style.color = theme.text;
    btn.style.border = "1px solid " + theme.text;
  }
  applySignButtonColors();

  //styles the theme select dropdown menu
  const bgSelect = document.getElementById("bg-select");
  bgSelect.style.backgroundColor = theme.nav;
  bgSelect.style.color = theme.text;
  bgSelect.style.border = "2px solid " + theme.text;

  //styles the footer
  const footer = document.querySelector(".footer");
  if (footer) {
    footer.style.backgroundColor = theme.nav;
    footer.style.color = theme.text;
  }
  const footerLinks = document.querySelectorAll(".footer-links a");
  for (let i = 0; i < footerLinks.length; i++) {
    footerLinks[i].style.color = theme.text;
  }
  const footerCopy = document.querySelector(".footer-copy");
  if (footerCopy) {
    footerCopy.style.color = theme.text;
  }

  //styles the icon area in the nav
  document.querySelector(".nav-color").style.backgroundColor = theme.nav;
  const icon = document.querySelector(".nav-color img");
  if (icon) {
    icon.style.filter = "drop-shadow(0 0 6px " + theme.text + ")";
  }
}

//show today's date on the page
const todayDate = new Date();
document.getElementById("today-date").textContent =
  todayDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

//tracks whatever theme is currently active
let currentTheme = { nav: "black", text: "white" };

//resets to default after 5 minutes
const THEME_TIMEOUT = 5 * 60 * 1000;
let themeTimer = null;

function resetToDefault() {
  applyTheme("");
  document.getElementById("bg-select").value = "";
}

//always start with default on page load
applyTheme("");

//listens for theme changes in the dropdown
document.getElementById("bg-select").addEventListener("change", function () {
  applyTheme(this.value);
  clearTimeout(themeTimer);
  if (this.value) {
    //resets to default after 5 minutes
    themeTimer = setTimeout(resetToDefault, THEME_TIMEOUT);
  }
});

//close button for the horoscope modal
document.getElementById("modal-close").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("active");
});

//clicking the backdrop also closes the modal
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.classList.remove("active");
  }
});

//adds event listener to each horoscope button
const horoBtn = document.querySelectorAll(".sign-card");
for (let i = 0; i < horoBtn.length; i++) {
  horoBtn[i].addEventListener("click", function () {
    const button = horoBtn[i];
    const sign = button.getAttribute("data-sign");

    fetch("horoscope.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const horoscope = data[sign].summary;
        const video = document.getElementById("loading-video");
        const result = document.getElementById("horoscope-result");

        //uses signs element colors by default
        const modalTheme =
          currentTheme.nav === "black" ? getSignColor(sign) : currentTheme;

        //sets modal border color
        const modalContent = document.querySelector(".modal-content");
        modalContent.style.border = "1px solid " + modalTheme.text;

        //close button color
        document.getElementById("modal-close").style.color = modalTheme.text;

        //sets the loading gif
        video.src = "pictures/season/" + sign + "-season.webp";

        //builds the html for the horoscope result
        result.innerHTML =
          '<h2 id="modal-heading" style="color:' +
          modalTheme.text +
          '">' +
          sign.toUpperCase() +
          " Horoscope</h2>" +
          '<p class="modal-date" style="color:' +
          modalTheme.nav +
          '; font-size:20px; font-weight: bold;">' +
          todayDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }) +
          "</p>" +
          '<p style="color:' +
          modalTheme.text +
          '">' +
          horoscope +
          "</p>";

        //shows the modal with the loading gif first
        document.getElementById("modal").classList.add("active");
        video.style.display = "block";
        result.style.display = "none";

        //after 5 seconds swap the gif for the horoscope text
        setTimeout(function () {
          video.style.display = "none";
          result.style.display = "block";
        }, 5000);
      });
  });
}

//opens the sign info overlay panel
function openSign(sign) {
  //shows the overlay with the loading gif right away
  const overlay = document.getElementById("sign-info");
  const loadingGif = document.getElementById("sign-info-loading");
  const signContent = document.querySelector(".sign-info-content");

  overlay.style.display = "block";
  loadingGif.style.display = "block";
  signContent.style.display = "none";

  fetch("zodiac.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const info = data[sign];

      //fills in all the text fields
      document.getElementById("name").textContent = info.name;
      document.getElementById("dates").textContent = info.dates;
      document.getElementById("element").textContent = info.element;
      document.getElementById("symbol").textContent = info.symbol;
      document.getElementById("modality").textContent = info.modality;
      document.getElementById("polarity").textContent = info.polarity;
      document.getElementById("ruling_planet").textContent = info.ruling_planet;
      document.getElementById("ruling_planet_traditional").textContent =
        info.ruling_planet_traditional || "—";
      document.getElementById("house").textContent = info.house;
      document.getElementById("season").textContent = info.season || "—";
      document.getElementById("tarot_card").textContent =
        info.tarot_card || "—";
      document.getElementById("body_part").textContent = info.body_part || "—";

      //builds traits list
      let traitsList = "";
      for (let i = 0; i < info.traits.length; i++) {
        traitsList = traitsList + "<li>" + info.traits[i] + "</li>";
      }
      document.getElementById("traits").innerHTML = traitsList;

      //builds strengths list
      let strengthsList = "";
      for (let i = 0; i < info.strengths.length; i++) {
        strengthsList = strengthsList + "<li>" + info.strengths[i] + "</li>";
      }
      document.getElementById("strengths").innerHTML = strengthsList;

      //builds weaknesses list
      let weaknessesList = "";
      for (let i = 0; i < info.weaknesses.length; i++) {
        weaknessesList = weaknessesList + "<li>" + info.weaknesses[i] + "</li>";
      }
      document.getElementById("weaknesses").innerHTML = weaknessesList;

      //all other values for sign
      document.getElementById("keywords").textContent =
        info.keywords.join(", ");
      document.getElementById("lucky_colors").textContent =
        info.lucky_colors.join(", ");
      document.getElementById("lucky_numbers").textContent =
        info.lucky_numbers.join(", ");
      document.getElementById("lucky_day").textContent = info.lucky_day || "—";
      document.getElementById("lucky_gemstone").textContent =
        info.lucky_gemstone || "—";
      document.getElementById("compatibility").textContent =
        info.compatibility.join(", ");
      document.getElementById("least_compatible").textContent =
        info.least_compatible ? info.least_compatible.join(", ") : "—";
      document.getElementById("love_style").textContent =
        info.love_style || "—";
      document.getElementById("friendship_style").textContent =
        info.friendship_style || "—";
      document.getElementById("career_strengths").textContent =
        info.career_strengths || "—";
      document.getElementById("shadow_side").textContent =
        info.shadow_side || "—";
      document.getElementById("spiritual_lesson").textContent =
        info.spiritual_lesson || "—";
      document.getElementById("famous_examples").textContent =
        info.famous_examples ? info.famous_examples.join(", ") : "—";
      document.getElementById("description").textContent = info.description;

      //if no theme is picked just use the signs element color
      const activeTheme =
        currentTheme.nav === "black" ? getSignColor(sign) : currentTheme;

      //sign name gets the bright color, date gets the darker one
      document.getElementById("name").style.color = activeTheme.text;
      document.getElementById("dates").style.color = activeTheme.nav;

      //color all the h2 headings
      const headings = document.querySelectorAll("#sign-info h2");
      for (let i = 0; i < headings.length; i++) {
        headings[i].style.color = activeTheme.nav;
      }

      //the bold label words like "Element:" "Symbol:" etc
      const boldTxt = document.querySelectorAll(".about-sign b");
      for (let i = 0; i < boldTxt.length; i++) {
        boldTxt[i].style.color = activeTheme.nav;
      }

      //the actual values next to those labels
      const spanTxt = document.querySelectorAll(".about-sign span");
      for (let i = 0; i < spanTxt.length; i++) {
        spanTxt[i].style.color = activeTheme.text;
      }

      //lists get the brighter color
      document.getElementById("traits").style.color = activeTheme.text;
      document.getElementById("strengths").style.color = activeTheme.text;
      document.getElementById("weaknesses").style.color = activeTheme.text;

      //all the info paragraphs at the bottom
      const signInfoFields = [
        "keywords",
        "lucky_colors",
        "lucky_numbers",
        "lucky_day",
        "lucky_gemstone",
        "compatibility",
        "least_compatible",
        "love_style",
        "friendship_style",
        "career_strengths",
        "shadow_side",
        "spiritual_lesson",
        "famous_examples",
        "description",
      ];

      for (let i = 0; i < signInfoFields.length; i++) {
        document.getElementById(signInfoFields[i]).style.color = activeTheme.text;
      }

      // determine background gif based on element
      let bgGif = "pictures/rain.gif";

      if (info.element === "Fire") {
        bgGif = "pictures/themes/fire-theme.gif";
      } else if (info.element === "Earth") {
        bgGif = "pictures/themes/earth-theme.gif";
      } else if (info.element === "Water") {
        bgGif = "pictures/themes/water-theme.gif";
      } else if (info.element === "Air") {
        bgGif = "pictures/themes/air-theme.gif";
      }

      //dark gradient layered on top of the gif so the text is actually readable
      overlay.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.82)), url('" +
        bgGif +
        "')";

      //wait 3 seconds then swap the loading gif for the horoscope
      setTimeout(function () {
        loadingGif.style.display = "none";
        signContent.style.display = "block";
      }, 3000);
    });
}

//close the sign info
document
  .getElementById("sign-info-close")
  .addEventListener("click", function () {
    document.getElementById("sign-info").style.display = "none";
  });