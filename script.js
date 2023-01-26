var fastSongsList = [
    ["Power of Your Love", "https://www.youtube.com/embed/KXXqNmAbR1E"],
    ["Shine Jesus Shine", "https://www.youtube.com/embed/GbLHex0QFB8"],
    ["God Is Enough", "https://www.youtube.com/embed/hc-9NZJI6w4"],
    ["Open The Eyes Of My Heart", "https://www.youtube.com/embed/pkNs17tvM8U"],
    ["Redeeming Love", "https://www.youtube.com/embed/_ap1QdIIaKU"],
    ["We'll Be Faithful", "https://www.youtube.com/embed/tfW9sqf7xpI"],
    ["Psalm 100", "https://www.youtube.com/embed/8_c3MsF8fas"],
    ["Let The Fire Fall", "https://www.youtube.com/embed/nnPdljKOdo0"],
    ["You Are My Delight", "https://www.youtube.com/embed/Auxd7vsGPWk"],
    ["Behold", "https://www.youtube.com/embed/TwPxil7vzAA"],
    ["Blessing and Glory", "https://www.youtube.com/embed/i7J6S2TdWhM"],
    ["Grateful", "https://www.youtube.com/embed/ST4BikSk5Fc"],
    ["Prepare The Way", "https://www.youtube.com/embed/8_Sj853SIsU"],
    ["Magnificat", "https://www.youtube.com/embed/w5w64I1NeXQ"],
    ["To Love You And To Make You Love", "https://www.youtube.com/embed/SVoZMh8Nb8M"],
    ["Whom Shall I Fear", "https://www.youtube.com/embed/7Q1L0qYQvIY"],
    ["Fight The Good Fight Of Faith", "https://www.youtube.com/embed/8xgQfmlShB0"],
    ["By Your Side", "https://www.youtube.com/embed/gB1GJXSbCGI"],
    ["Sure Foundation", "https://www.youtube.com/embed/lpD1AIknXao"],
    ["My Life Is In You Lord", "https://www.youtube.com/embed/oH1niwYVHZs"],
    ["Lord I Lift Your Name On High", "https://www.youtube.com/embed/ug28lEOw6n8"],
    ["Isaiah 60", "https://www.youtube.com/embed/hiSC7jSzEDM"],
    ["Ablaze", "https://www.youtube.com/embed/JHhnw5D9NJQ"],
    ["Psalm 95", "https://www.youtube.com/embed/hlwDBNgGLZM"],
    ["Victory To Our King", "https://www.youtube.com/embed/qMTmYcIc5SE"],
    ["Mission Ready", "https://www.youtube.com/embed/zcue8r4_7lE"],
    ["Stand Firm", "https://www.youtube.com/embed/XxKlHhIpB4k"],
    ["Free to Dance", "https://www.youtube.com/embed/CJJ_TRbVZ3U"],
    ["Worship the Lord", "https://www.youtube.com/embed/B4EqEU11ftI"],
    ["Glory Glory Lord", "https://www.youtube.com/embed/KDyVbwX_NwQ"]
]

var slowSongsList = [
    ["Make My Heart Your Dwelling Place", "https://www.youtube.com/embed/WvTZ4fxdaCo"],
    ["Breath", "https://www.youtube.com/embed/oEDYnxTgNdo"],
    ["God Will Make A Way", "https://www.youtube.com/embed/JDdayURcbn4"],
    ["Heaven", "https://www.youtube.com/embed/ehoOO8QwkHg"],
    ["I Give My All", "https://www.youtube.com/embed/2qBGkZYcsAk"],
    ["Create In Me", "https://www.youtube.com/embed/lKjkZyD1Pjg"],
    ["Let Us Exalt His Name Together", "https://www.youtube.com/embed/q0mRbIx8uM0"],
    ["God Alone", "https://www.youtube.com/embed/l_YzbXAWIwI"],
    ["You Are Near", "https://www.youtube.com/embed/LAjbc5OP9j0"],
    ["The Heart Of Worship", "https://www.youtube.com/embed/WaIlq1ulHiU"],
    ["Lord Jesus We Enthrone You", "https://www.youtube.com/embed/j9vXLsnCH54"],
    ["I Offer My Life", "https://www.youtube.com/embed/E815nPVsrO0"],
    ["You Have Chosen Me", "https://www.youtube.com/embed/r0ii9EFsci4"],
    ["Change My Heart Oh God", "https://www.youtube.com/embed/hDsn46r6CSs"],
    ["A New Commandment", "https://www.youtube.com/embed/eO_QhBXY_78"],
    ["Salvation Belongs to Our God", "https://www.youtube.com/embed/3d0MZBWbAp0"],
    ["Fearless", "https://www.youtube.com/embed/Z2dPfNmVObI"],
    ["God in Me", "https://www.youtube.com/embed/dQyXysalHsc"]
]

const firstFrame = document.querySelector("#first_iframe");
const secondFrame = document.querySelector("#second_iframe");
const thirdFrame = document.querySelector("#third_iframe");

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
    
        // firstButtonElement.innerText = "1";
        // secondButtonElement.innerText = "2";
        //  thirdButtonElement.innerText = "3";
    
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


