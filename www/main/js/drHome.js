

function startUp () {
    var cookie = document.cookie;
    console.log(cookie);
    var params = cookie.split("&");
    var uname = params[0].substring(params[0].indexOf('=')+1);
    var fullname = params[1].substring(params[1].indexOf('=')+1);
    console.log("uname is: " + uname);
    console.log("fullname is: " + fullname)
    $('#name').text(fullname);
    console.log("name innerText is: " + $('#name').text());
}


















