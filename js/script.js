function setCookie(key, value, expiry) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
}

function getCookie(key) {
  var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}

function deleteCookie(key) {
  var keyValue = getCookie(key);
  setCookie(key, keyValue, "-1");
}

function ready(fn) {
  if (typeof fn !== "function") {
    throw new Error("Argument passed to ready should be a function");
  }
  if (document.readyState != "loading") {
    fn();
  } else if (document.addEventListener) {
    var theme = getCookie("theme");
    if (theme) {
      document.getElementById("theme").setAttribute("href", theme);
    }
    document.addEventListener("DOMContentLoaded", fn, {
      once: true,
    });
  } else {
    var theme = getCookie("theme");
    if (theme) {
      document.getElementById("theme").setAttribute("href", theme);
    }
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState != "loading") fn();
    });
  }
}

function themeChanger() {
  document.getElementById("light-btn").onclick = function (e) {
    document.getElementById("theme").setAttribute("href", "css/light.css");
    setCookie("theme", "css/light.css", 365);
  };
  document.getElementById("dark-btn").onclick = function (e) {
    document.getElementById("theme").setAttribute("href", "css/dark.css");
    setCookie("theme", "css/dark.css", 365);
  };
}

window.ready(themeChanger);
