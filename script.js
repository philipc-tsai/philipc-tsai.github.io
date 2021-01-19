const firstFrame = document.querySelector("#first_iframe");
const secondFrame = document.querySelector("#second_iframe");
const thirdFrame = document.querySelector("#third_iframe");

/*
var fastSongsList = ["Power of Your Love","Shine Jesus Shine","God Is Enough","Power of Your Love","Shine Jesus Shine","God Is Enough",
"Power of Your Love","Shine Jesus Shine","God Is Enough","Power of Your Love","Blessing and Glory","Sure Foundation"];
var slowSongsList = ["Make My Heart Your Dwelling Place","Breath","God Will Make a Way","Heaven","I Give My All","Create In Me",
"Make My Heart Your Dwelling Place","Breath","God Will Make a Way","Heaven","I Give My All","Create In Me"];
*/

var fastSongsList = [
    ["Power of Your Love", "https://www.youtube.com/embed/KXXqNmAbR1E"],
    ["Shine Jesus Shine", "https://www.youtube.com/embed/GbLHex0QFB8"],
    ["God Is Enough", "https://www.youtube.com/embed/hc-9NZJI6w4"],
    ["Open The Eyes Of My Heart", "https://www.youtube.com/embed/pkNs17tvM8U"]

]

var slowSongsList = [
    ["Make My Heart Your Dwelling Place", "https://www.youtube.com/embed/WvTZ4fxdaCo"],
    ["Breath", "https://www.youtube.com/embed/oEDYnxTgNdo"],
    ["God Will Make A Way", "https://www.youtube.com/embed/JDdayURcbn4"],
    ["Heaven", "https://www.youtube.com/embed/ehoOO8QwkHg"],
    ["I Give My All", "https://www.youtube.com/embed/2qBGkZYcsAk"],
    ["Create In Me", "https://www.youtube.com/embed/lKjkZyD1Pjg"]

]

fastSongsList.sort();
slowSongsList.sort();

    let f = 0;
    while (f < fastSongsList.length) {
        let listItem = document.createElement("li");
        listItem.setAttribute("id", fastSongsList[f][0]);
        let songsUL = document.querySelector("#fast-songs");
        songsUL.appendChild(listItem);
    
        let divItem = document.createElement("div");
        divItem.setAttribute("class","song");
        divItem.innerText = fastSongsList[f][0];
        listItem.appendChild(divItem);
        f++;
    };

    let s = 0;
    while (s < slowSongsList.length) {
        let listItem = document.createElement("li");
        listItem.setAttribute("id", slowSongsList[s][0]);
        let songsUL = document.querySelector("#slow-songs");
        songsUL.appendChild(listItem);
    
        let divItem = document.createElement("div");
        divItem.setAttribute("class","song");
        divItem.innerText = slowSongsList[s][0];
        listItem.appendChild(divItem);
        s++;
    };

const fastSongs = document.querySelector("#fast-songs").querySelectorAll("li");
const slowSongs = document.querySelector("#slow-songs").querySelectorAll("li");

function changeVideo(song, frame) {

    for (i = 0; i < fastSongsList.length; i++) {
        
        if (fastSongsList[i][0] == song) {
            frame.setAttribute("src", fastSongsList[i][1]);
            break;
        } 
    };

    for (i = 0; i < slowSongsList.length; i++) {
        
        if (slowSongsList[i][0] == song) {
            frame.setAttribute("src", slowSongsList[i][1]);
            break;
        } 
    };

/*
    switch(song) {
        case "Power of Your Love": {
            frame.setAttribute("src", "https://www.youtube.com/embed/KXXqNmAbR1E");
            break;
        }
        case "Make My Heart Your Dwelling Place": {
            frame.setAttribute("src", "https://www.youtube.com/embed/WvTZ4fxdaCo");
            break;
        }
        case "Breath": {
            frame.setAttribute("src", "https://www.youtube.com/embed/oEDYnxTgNdo");
            break;
        }
        case "Shine Jesus Shine": {
            frame.setAttribute("src", "https://www.youtube.com/embed/GbLHex0QFB8");
            break;
        }
        case "God Will Make A Way": {
            frame.setAttribute("src", "https://www.youtube.com/embed/JDdayURcbn4");
            break;
        }
        case "Heaven": {
            frame.setAttribute("src", "https://www.youtube.com/embed/ehoOO8QwkHg");
            break;
        }
        case "Open The Eyes Of My Heart": {
            frame.setAttribute("src", "https://www.youtube.com/embed/pkNs17tvM8U");
            break;
        }
        case "God Is Enough": {
            frame.setAttribute("src", "https://www.youtube.com/embed/hc-9NZJI6w4");
            break;
        }
        case "I Give My All": {
            frame.setAttribute("src", "https://www.youtube.com/embed/2qBGkZYcsAk");
            break;
        }
        case "Create In Me": {
            frame.setAttribute("src", "https://www.youtube.com/embed/lKjkZyD1Pjg");
            break;
        }
        case "Breath": {
            frame.setAttribute("src", "https://www.youtube.com/embed/oEDYnxTgNdo");
            break;
        }
        case "ShineJesus": {
            frame.setAttribute("src", "https://www.youtube.com/embed/GbLHex0QFB8");
            break;
        }
    }
    */
}

function createButtons(tempo) {

    for (let i=0; i < tempo.length; i += 1) {
        var firstButtonElement = document.createElement("button");
        var secondButtonElement = document.createElement("button");
        var thirdButtonElement = document.createElement("button");
    
        firstButtonElement.setAttribute("id","firstButton_" + tempo[i].getAttribute("id"));
        firstButtonElement.setAttribute("class","firstButton");
        secondButtonElement.setAttribute("id","secondButton_" + tempo[i].getAttribute("id"));
        secondButtonElement.setAttribute("class","secondButton");
        thirdButtonElement.setAttribute("id","thirdButton_" + tempo[i].getAttribute("id"));
        thirdButtonElement.setAttribute("class","thirdButton");
    
        var firstButtonId = firstButtonElement.getAttribute("id");
        var secondButtonId = secondButtonElement.getAttribute("id");
        var thirdButtonId = thirdButtonElement.getAttribute("id");
    
        firstButtonElement.innerText = "1st";
        secondButtonElement.innerText = "2nd";
        thirdButtonElement.innerText = "3rd";
    
        tempo[i].appendChild(firstButtonElement);
        tempo[i].appendChild(secondButtonElement);
        tempo[i].appendChild(thirdButtonElement);
    
        const songTitle = document.getElementById(tempo[i].getAttribute("id")).getAttribute("id");
        const songFirstButton = document.getElementById(firstButtonId);
        const songSecondButton = document.getElementById(secondButtonId);
        const songThirdButton = document.getElementById(thirdButtonId);
    
        songFirstButton.addEventListener('click',function () { changeVideo(songTitle, firstFrame);},false);
        songSecondButton.addEventListener('click',function () { changeVideo(songTitle, secondFrame);},false);
        songThirdButton.addEventListener('click',function () { changeVideo(songTitle, thirdFrame);},false);
    }

}

createButtons(fastSongs);
createButtons(slowSongs);


