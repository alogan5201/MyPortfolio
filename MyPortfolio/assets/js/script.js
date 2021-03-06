/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on("load", function () {
  $(".preloader").fadeOut(100);
});

jQuery(function ($) {
  "use strict";

  /* ========================================================================= */
  /*	lazy load initialize
	/* ========================================================================= */

  const observer = lozad(); // lazy loads elements with default selector as ".lozad"
  observer.observe();

  /* ========================================================================= */
  /*	Magnific popup
	/* =========================================================================  */
  $(".image-popup").magnificPopup({
    type: "image",
    removalDelay: 160, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
        this.st.mainClass = this.st.el.attr("data-effect");
      },
    },
    closeOnContentClick: true,
    midClick: true,
    fixedContentPos: false,
    fixedBgPos: true,
  });

  /* ========================================================================= */
  /*	Portfolio Filtering Hook
	/* =========================================================================  */

  var containerEl = document.querySelector(".shuffle-wrapper");
  if (containerEl) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector(".shuffle-wrapper"), {
      itemSelector: ".shuffle-item",
      buffer: 1,
    });

    jQuery('input[name="shuffle-filter"]').on("change", function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });
  }

  /* ========================================================================= */
  /*	Testimonial Carousel
	/* =========================================================================  */

  $("#testimonials").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  });

  /* ========================================================================= */
  /*	animation scroll js
	/* ========================================================================= */

  function myFunction(x) {
    if (x.matches) {
      var topOf = 50;
    } else {
      var topOf = 350;
    }
  }

  var html_body = $("html, body");
  $("nav a, .page-scroll").on("click", function () {
    //use page-scroll class in any HTML tag for scrolling
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        html_body.animate(
          {
            scrollTop: target.offset().top - 50,
          },
          1500,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // easeInOutExpo Declaration
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      }
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  });

  /* ========================================================================= */
  /*	counter up
	/* ========================================================================= */
  function counter() {
    var oTop;
    if ($(".count").length !== 0) {
      oTop = $(".count").offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $(".count").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 1000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    }
  }
  $(window).on("scroll", function () {
    counter();
  });
  /* =============================CALCULATOR============================*/

  let runningTotal = 0;
  let buffer = "0";
  let previousOperator = null;
  const screen = document.querySelector(".screen");

  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      console.log(event.target.innerText);
      buttonClick(event.target.innerText);
    });

  function buttonClick(value) {
    if (isNaN(parseInt(value))) {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }
    rerender();
  }

  function handleNumber(value) {
    if (buffer === "0") {
      buffer = value;
    } else {
      buffer += value;
    }
  }

  function handleSymbol(value) {
    switch (value) {
      case "C":
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
        break;
      case "=":
        if (previousOperator === null) {
          return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
        break;
      case "&#x2190;":
        if (buffer.length === 1) {
          buffer = "0";
        } else {
          buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
      default:
        handleMath(value);
        break;
    }
  }
  function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
      runningTotal = intBuffer;
    } else {
      flushOperation(intBuffer);
    }

    previousOperator = value;
    console.log("previousOperation");
    buffer = "0";
  }
  function flushOperation(intBuffer) {
    if (previousOperator === "+") {
      runningTotal += intBuffer;
    } else if (previousOperator === "-") {
      runningTotal -= intBuffer;
    } else if (previousOperator === "??") {
      runningTotal *= intBuffer;
    } else {
      runningTotal /= intBuffer;
    }
  }

  function rerender() {
    screen.innerText = buffer;
  }
});
$(document).ready(function () {
  //dl-menu dl-menuopen
  $("#dl-menu").click(function () {
    $(this).toggleClass("dl-menuopen");
    $(".dl-trigger").toggleClass("dl-active");
    $(".dl-menu").toggleClass("dl-menuopen");
  });

  $(".tabs").click(function () {
    $(".tabs").removeClass("active");
    $(".tabs h6").removeClass("font-weight-bold");
    $(".tabs h6").addClass("text-muted");
    $(this).children("h6").removeClass("text-muted");
    $(this).children("h6").addClass("font-weight-bold");
    $(this).addClass("active");

    current_fs = $(".active");

    next_fs = $(this).attr("id");
    next_fs = "#" + next_fs + "1";

    $("fieldset").removeClass("show");
    $(next_fs).addClass("show");

    current_fs.animate(
      {},
      {
        step: function () {
          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({
            display: "block",
          });
        },
      }
    );
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});

let adminTab = document.getElementById("tab02");
let clientTab = document.getElementById("tab01");
let adminVid = document.getElementById("adminVid");

adminTab.addEventListener("click", function () {
  adminVid.paused ? adminVid.play() : adminVid.pause();
});

clientTab.addEventListener("click", function () {
  adminVid.paused ? adminVid.play() : adminVid.pause();
});
/* 
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  iPhone: function () {
    return navigator.userAgent.match(/iPhone/i);
  },
  iPad: function () {
    return navigator.userAgent.match(/iPad/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

//test
if (isMobile.any()) {
  document.getElementById("mobile").innerHTML = "This is mobile browser";
} else {
  document.getElementById("mobile").innerHTML = "This is PC browser";
}

if (isMobile.iPhone()) {
  document.getElementById("iphone").innerHTML = "-- and iPhone device";
}

if (isMobile.Android()) {
  document.getElementById("android").innerHTML = "-- and Android device";
}




if (isMobile.any()) {
  document.getElementById("mobile").innerHTML = "This is mobile browser";
} else {
  document.getElementById("mobile").innerHTML = "This is PC browser";
}

if (isMobile.iPhone()) {
  document.getElementById("iphone").innerHTML = "-- and iPhone device";
}

if (isMobile.Android()) {
  document.getElementById("android").innerHTML = "-- and Android device";
}
*/

/*
$(document).ready(function () {
  $(".second").modal("show");
});
*/
