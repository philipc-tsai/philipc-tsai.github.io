var gTicketList = 'LOVEMORE/VERSION5/TicketList';
var gTickets = 'LOVEMORE/VERSION5/Tickets';
var gTicketIndex = 'LOVEMORE/VERSION5/TicketsIndex';
var gTicketRowsCount = 0;
var gIsADMIN = false;
var gTicketPad = 4;     // padding zero
    // Object to rebuild the list. Called from gcalendar.js==>getCalendarItem after the calendar string extracted from the calendar.
//    var oRebuildObject = {
//        setValue : function(result) {
//            var sHTML = '';
//            var aCont;
//            var nAdded = 0;
//            var aTickets = result.split('|');
//            var sTicket = '', aTemp;
//            for (var i = 1; i < aTickets.length; i++) {
//                try {
//                    aCont = aTickets[i].split(',');
//                    if (aCont.length > 3) {
//                        var oTicket = new TicketClass();
//                        oTicket.AssignedId = cleanString(aCont[1]);
//                        oTicket.AssignedTo = cleanString(aCont[2]);
//                        oTicket.Chapter = cleanString(aCont[3]);
//                        aTemp = cleanString(aCont[4]).split('-');

//                        var oTicketIdx = new TicketIndexClass();
//                        oTicketIdx.AssignedId = oTicket.AssignedId;
//                        oTicketIdx.AssignedTo = oTicket.AssignedTo;
//                        oTicketIdx.TicketFrom = parseInt(aTemp[0]);
//                        oTicketIdx.TicketTo = parseInt(aTemp[1]);
//                        var newRef = firebase.database().ref(gTicketIndex).push();
//                        newRef.set(oTicketIdx);

//                        for (var nTicket = parseInt(aTemp[0]); nTicket <= parseInt(aTemp[1]); nTicket++) {
//                            oTicket.TicketNo = zeroFill(nTicket, 3);
//                            var newRef = firebase.database().ref(gTickets + '/' + oTicket.AssignedId).push();
//                            newRef.set(oTicket);
//                            nAdded++;
//                        }
//                       // oTicket.SortKey = cleanString(aCont[4]);
//                    }
//                } catch (err) {
//                    alert(err);
//                }
//            }
//            //document.getElementById('ticketlist').innerHTML = sHTML;
//            alert("Added = " + nAdded.toString());
//        }
//}
    var oRebuildObject = {
        setValue: function (result) {
            var sHTML = '';
            var aCont;
            var nAdded = 0;
            var aTickets = result.split('|');
            var sTicket = '', aTemp;
            for (var i = 1; i < aTickets.length; i++) {
                try {
                    aCont = aTickets[i].split(',');
                    if (aCont.length > 3) {
                        var oTicket = new TicketClass();
                        //oTicket.AssignedId = cleanString(aCont[1]);
                        oTicket.Chapter = cleanString(aCont[1]);
                        oTicket.AssignedTo = cleanString(aCont[2]);
                        aTemp = cleanString(aCont[3]).split('-');

                        for (var nTicket = parseInt(aTemp[0]); nTicket <= parseInt(aTemp[1]); nTicket++) {
                            oTicket.TicketNo = zeroFill(nTicket, gTicketPad);
                            oTicket.SortKey = oTicket.AssignedTo + oTicket.TicketNo;
                            var newRef = firebase.database().ref(gTickets).push();
                            newRef.set(oTicket);
                            nAdded++;
                        }
                        // oTicket.SortKey = cleanString(aCont[4]);
                    }
                } catch (err) {
                    alert(err);
                }
            }
            //document.getElementById('ticketlist').innerHTML = sHTML;
            alert("Added = " + nAdded.toString());
        }
    }
    // Initialize Firebase
var config = {
    apiKey: "AIzaSyBC_Cf0lAmk0wZtBH2vIqRMCfOKKsGEHDM",
    authDomain: "cfc-dig2.firebaseapp.com",
    databaseURL: "https://cfc-dig2.firebaseio.com",
    projectId: "cfc-dig2",
    storageBucket: "cfc-dig2.appspot.com",
    messagingSenderId: "136854767404"
};

    //************** main 
    firebase.initializeApp(config);

function cleanString(str)
{
    var sNew = '';
    try{
        sNew = str.replace(new RegExp('~', 'g'),',');
    } catch (e) { }
    return sNew;
}
function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
}
function TicketIndexClass(oTickeIndex) {
    if (oTickeIndex != null) {
        this.AssignedId = oTickeIndex.AssignedId;
        this.AssignedTo = oTickeIndex.AssignedTo;
        this.TicketFrom = oTickeIndex.TicketFrom;
        this.TicketTo = oTickeIndex.TicketTo;

    } else {
        this.AssignedId = '';
        this.AssignedTo = '';
        this.TicketFrom = 0;
        this.TicketTo = 0;
    }
}
function TicketClass(oTicket) {
    if (oTicket != null) {
        this.AssignedId = oTicket.AssignedId;
        this.AssignedTo = oTicket.AssignedTo;
        this.Chapter = oTicket.Chapter;
        this.TicketNo = oTicket.TicketNo;
        this.Sold = oTicket.Sold;
        this.SoldTo = oTicket.SoldTo;
        this.SoldBy = oTicket.SoldBy;
        this.Paid = oTicket.Paid;
        this.SortKey = oTicket.SortKey;
        this.Accounted = oTicket.Accounted;
        this.Comment = oTicket.Comment;
    }
    else {
        this.AssignedId = '';
        this.AssignedTo = '';
        this.Chapter = '';
        this.TicketNo = '';
        this.Sold = '';
        this.SoldTo = '';
        this.SoldBy = '';
        this.Paid = '';
        this.SortKey = '';
        this.Accounted = '';
        this.Comment = '';
    }
}

// Rebuilds the ticket list in Firebase. Gets the string from the calendar.
function rebuildTicketFromDB() {
    if (confirm("Rebuild the TicketNo List in the Firebase DB?") && confirm('talaga?') && confirm('sigurado?')) {
        var tickets = firebase.database().ref(gTickets);
        tickets.remove();
        alert('removed');

        tickets = firebase.database().ref(gTicketList);
        tickets.on("value", function (snapshot) {
            alert('building');
            oRebuildObject.setValue(snapshot.val());
        });
    }
}

//function rebuildTicketFromDB() {
//    if (confirm("Rebuild the TicketNo List in the Firebase DB?") && confirm('talaga?') && confirm('sigurado?')) {
//        var tickets = firebase.database().ref(gTickets);
//        tickets.remove();
//        tickets = firebase.database().ref(gTicketIndex);
//        tickets.remove();
//        alert('removed');

//        tickets = firebase.database().ref(gTicketList);
//        tickets.on("value", function (snapshot) {
//            alert('building');
//            oRebuildObject.setValue(snapshot.val());
//        });
//    }
//}
//function removeAllTicketFromDB() {
//    if (confirm("Remove all tickets in the TicketNo List of the Firebase DB? \n This will delete all data!")) {
//        var tickets = firebase.database().ref('Tickets/TicketNo');
//        tickets.remove();
//        alert('removed');
//    }
//}

function getTicketsFromDB() {
    var nCols = 3;
    var sGroup = '';
    var sHTML = '';
    //var database = firebase.database();
    var tickets = firebase.database().ref('Tickets/TicketNo').orderByChild('SortKey');
    //var tickets = firebase.database().ref();
    tickets.on("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            // key
            var key = childSnapshot.key;
            // value, could be object
            //var childData = childSnapshot.val();
            var oTicket = new TicketClass(childSnapshot.val());
            if (oTicket.Group != sGroup) {
                sHTML = '<h3 class="shadowedtext">' + oTicket.Group + '</h3>';
                sGroup = oTicket.Group;
            } else {
                sHTML = '';
            }
            sHTML += '<div>';
            sHTML += '<strong>' + oTicket.TicketNo + '</strong>';
            if (oTicket.Chapter)
                sHTML += '<div style="text-align:justify;margin-left:15px;">' + oTicket.Chapter + '</div>';
            if (oTicket.AssignedTo)
                sHTML += '<br><i class="fa fa-user"></i>&nbsp;' + oTicket.AssignedTo;
            if (oTicket.SoldTo)
                sHTML += '&nbsp;&nbsp;<i class="fa fa-phone"></i>&nbsp;' + oTicket.SoldTo;
            sHTML += '<hr></div>';
            $('#divTickets').append(sHTML);
            // Do what you want with these key/values here
            //alert(key + ' - ' + childData.Chapter);
        });
        //alert(snapshot.val());
        //console.log(snapshot.val());
    }, function (error) {
        alert("Error: " + error.code);
    });
}

function getTicketList(cId) {
    if (cId == "ADMIN") {
        var ticketids = firebase.database().ref(gTicketIndex).orderByChild('TicketFrom');
        ticketids.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var oTicketId = new TicketIndexClass(childSnapshot.val());
                //alert(oTicketId.AssignedId);
                getTicketsDetailed(oTicketId.AssignedId);
            });
        }, function (error) {
            alert("Error: " + error.code);
        });
    } else {
        getTicketsDetailed(cId);
    }
}

function getTicketsDetailed(divName,sortName,sAssignedTo, bIsAdmin) {
    var nCols = 3;
    var sHTML = '';
    var sAssigned = '';
    var nTicketNo = 0;
    var bValid = true; bSellerEditing = false; bLocked = false;
    var tickets = firebase.database().ref(gTickets).orderByChild(sortName);
    //var tickets = firebase.database().ref();
    gTicketRowsCount = 0;
    tickets.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            // key

            var key = childSnapshot.key;
            // value, could be object
            //var childData = childSnapshot.val();
            var oTicket = new TicketClass(childSnapshot.val());

            if (sAssignedTo != null && sAssignedTo.length > 0) {
                bValid = false;
                if (sAssignedTo == oTicket.AssignedTo) {
                    bValid = true;
                    bSellerEditing = true;
                }
            } else {
                bValid = true;
            }
            if (bValid) {
                //if (oTicket.SoldTo) {
                //    setSeller(key, oTicket.SoldTo);
                //}

                sHTML = '<div class="row">';
                sAssigned = oTicket.AssignedTo;
                //$('#divTickets').append('<h3 id="row' + sAssigned + '" class="shadowedtext" style="margin-top:15px;margin-bottom:10px;">' + oTicket.AssignedTo + ' (Chapter: ' + oTicket.Chapter + ')</h3>');                
                //$('#divTicketindex').append('<span class="shadowedtext" style="font-size:x-large;"><a href="#row' + sAssigned + '">' + sAssigned + '</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;');

                if (oTicket.Accounted)
                    bLocked = (oTicket.Accounted == 'YES');
                else
                    bLocked = false;

                sHTML += '<div id="col' + oTicket.TicketNo + '" key="' + key + '" assignid="' + oTicket.AssignedId + '" class="col-xs-12 col-sm-12" style="margin-bottom:5px;">';
                if (bSellerEditing)
                {
                    if (!bLocked)
                        sHTML += '<input id="reAssign' + oTicket.TicketNo + '" name="reAssign" ticketNo="' + oTicket.TicketNo + '" type="checkbox" class="checkSelect" />';
                    else
                        sHTML += '&nbsp;&nbsp;&nbsp;';
                }
                if (oTicket.Sold) {
                    if(!bLocked)
                        sHTML += '<span style="font-weight:bold;color: #734d26;font-size:large;"><i class="fa fa-ticket" style="color:' + (oTicket.Paid == 'YES' ? 'red' : (oTicket.Sold == "YES" ? 'green' : 'lightgray')) + '"></i>' + oTicket.TicketNo + '</span> ';
                    else
                        sHTML += '<span style="font-weight:bold;color: #734d26;font-size:large;"><i class="fa fa-money" style="color:green"></i>' + oTicket.TicketNo + '</span> ';

                } else {
                    sHTML += '<span style="font-weight:bold;color: #734d26;font-size:large;"><i class="fa fa-ticket" style="color:lightgray"></i>' + oTicket.TicketNo + '</span> ';
                }

                nTicketNo = parseInt(oTicket.TicketNo);

                if (!bSellerEditing) {
                    //sHTML += 'Seller : <input disabled=true id="assignedTo' + oTicket.TicketNo + '" onchange="assignTo_update(' + nTicketNo + ');" type="text" width="75" value="' + oTicket.AssignedTo + '" /> ';
                    sHTML += '<span class="LeftText" style="font-weight:bold;font-size:small">' + oTicket.AssignedTo + '</span> ';
                    sHTML += 'Seller : <input disabled=true id="soldBy' + oTicket.TicketNo + '" onchange="soldby_update(' + nTicketNo + ');" type="text" width="75" value="' + oTicket.SoldBy + '" /> ';

                    if (oTicket.Sold)
                        sHTML += '<input disabled=true id="sold' + oTicket.TicketNo + '" type="checkbox" ' + (oTicket.Sold == 'YES' ? 'checked="checked" ' : '') + ' onchange="sold_update(' + nTicketNo + ');" />Sold ';
                    else
                        sHTML += '<input disabled=true id="sold' + oTicket.TicketNo + '" type="checkbox" onchange="sold_update(' + nTicketNo + ');"/>Sold ';

                    sHTML += 'To : <input disabled=true id="soldTo' + oTicket.TicketNo + '" onchange="soldTo_update(' + nTicketNo + ');" type="text" width="75" value="' + oTicket.SoldTo + '" /> ';
                    //sHTML += 'Sold By : <input id="soldBy' + oTicket.TicketNo + '" onchange="mark_update(' + nTicketNo + ');" type="text" width="75" value="' + oTicket.SoldBy + '" /> ';
                    if (oTicket.Paid)
                        sHTML += '<input disabled=true id="paid' + oTicket.TicketNo + '" type="checkbox" ' + (oTicket.Paid == 'YES' ? 'checked="checked" ' : '') + ' onchange="mark_update(' + nTicketNo + ');" />Paid';
                    else
                        sHTML += '<input disabled=true id="paid' + oTicket.TicketNo + '" type="checkbox" onchange="mark_update(' + nTicketNo + ');" />Paid';

                    if (oTicket.Accounted) {
                        sHTML += '&nbsp;&nbsp;' + (oTicket.Accounted == 'YES' ? '<i class="fa fa-money" style="font-size:20px;color:green"></i> Accounted' : '');
                        if (oTicket.Comment)
                            sHTML += ' <input style="width:300px;" type="text" width="300" readonly value="' + oTicket.Comment + '" /> ';
                    }
                }
                else {

                    //if(!bLocked)
                    //    //sHTML += 'Seller : <input id="assignedTo' + oTicket.TicketNo + '" onchange="assignTo_update(' + nTicketNo + ');" type="text" width="75" value="' + oTicket.AssignedTo + '" /> ';
                    //    sHTML += '<span class="LeftText">' + oTicket.AssignedTo + '</span> ';
                    //else
                    //    //sHTML += 'Seller : <input type="text" width="75" value="' + oTicket.AssignedTo + '" readonly style="border:0px;" /> ';
                    //    sHTML += '<span class="LeftText">' + oTicket.AssignedTo + '</span> ';
                    sHTML += 'Seller : <input id="soldBy' + oTicket.TicketNo + '" onchange="soldby_update(' + nTicketNo + ');" type="text" width="75" value="' + oTicket.SoldBy + '" /> ';

                    if (oTicket.Sold)
                    {
                        if(!bLocked)
                            sHTML += '<input id="sold' + oTicket.TicketNo + '" type="checkbox" ' + (oTicket.Sold == 'YES' ? 'checked="checked" ' : '') + ' onchange="sold_update(' + nTicketNo + ');" />Sold ';
                        else
                            sHTML += '<input type="checkbox" ' + (oTicket.Sold == 'YES' ? 'checked="checked" ' : '') + ' disabled=true />Sold ';
                    }
                    else
                        sHTML += '<input id="sold' + oTicket.TicketNo + '" type="checkbox" onchange="sold_update(' + nTicketNo + ');"/>Sold ';

                    if(!bLocked)
                        sHTML += 'To : <input id="soldTo' + oTicket.TicketNo + '" onchange="soldTo_update(' + nTicketNo + ');" type="text" width="75" value="' + oTicket.SoldTo + '" /> ';
                    else
                        sHTML += 'To : <input type="text" width="75" value="' + oTicket.SoldTo + '" readonly style="border:0px;" /> ';

                    if (oTicket.Paid)
                    {
                        if(!bLocked)
                            sHTML += '<input id="paid' + oTicket.TicketNo + '" type="checkbox" ' + (oTicket.Paid == 'YES' ? 'checked="checked" ' : '') + ' onchange="mark_update(' + nTicketNo + ');" ' + (oTicket.Sold == 'YES' ? 'false' : 'disabled=true') + ' />Paid';
                        else
                            sHTML += '<input type="checkbox" ' + (oTicket.Paid == 'YES' ? 'checked="checked" ' : '') + '  disabled=true />Paid';
                    }
                    else
                        sHTML += '<input id="paid' + oTicket.TicketNo + '" type="checkbox" onchange="mark_update(' + nTicketNo + ');" ' + (oTicket.Sold == 'YES' ? 'false' : 'disabled=true') + ' />Paid';

                    if (bIsAdmin) {
                        if (oTicket.Accounted)
                            sHTML += '&nbsp;&nbsp;<input id="accounted' + oTicket.TicketNo + '" type="checkbox" ' + (oTicket.Accounted == 'YES' ? 'checked="checked" ' : '') + ' onchange="accounted_update(' + nTicketNo + ');" ' + (oTicket.Paid == 'YES' ? 'false' : 'disabled=true') + ' />Accounted';
                        else
                            sHTML += '&nbsp;&nbsp;<input id="accounted' + oTicket.TicketNo + '" type="checkbox" onchange="accounted_update(' + nTicketNo + ');" ' + (oTicket.Paid == 'YES' ? 'false' : 'disabled=true') + ' />Accounted';

                        if(oTicket.Comment)
                            sHTML += ' <input style="width:300px;" id="comment' + oTicket.TicketNo + '" onchange="comment_update(' + nTicketNo + ');" type="text" width="300" value="' + oTicket.Comment + '" /> ';
                        else
                            sHTML += ' <input style="width:300px;" id="comment' + oTicket.TicketNo + '" onchange="comment_update(' + nTicketNo + ');" type="text" width="300" value="" /> ';

                    }
                    else
                    {
                        if (oTicket.Accounted) {
                            sHTML += '&nbsp;&nbsp;' + (oTicket.Accounted == 'YES' ? '<i class="fa fa-money" style="font-size:20px;color:green"></i> Accounted' : '');
                            if (oTicket.Comment)
                                sHTML += ' <input style="width:300px;" type="text" width="300" readonly value="' + oTicket.Comment + '" /> ';
                        }
                    }
                }
                //if (oTicket.SoldTo)
                //    sHTML += '&nbsp;<i class="fa fa-phone"></i>' + oTicket.SoldTo;
                //if (oTicket.Paid)
                //    sHTML += '<div style="margin-left:20px;margin-left:20px;text-align:justify">' + oTicket.Paid + '</div>';	

                sHTML += '<span style="float:right"><a href="#divTicketNoIdx" title="Go To First"><i class="fa fa-arrow-circle-up"></i></href></span></div>';
                sHTML += '</div>';
                gTicketRowsCount++;
                $('#' + divName).append(sHTML);
            }
        });

    }, function (error) {
        alert("Error: " + error.code);
    });
}

function setSeller(key,sSoldTo) {
    firebase.database().ref(gTickets + '/' + key + '/SoldBy').set(sSoldTo);
}

function downloadTicketsDetailed(divName, sortName) {
    var nCols = 3;
    var sHTML = '';
    var sAssigned = '';
    var nTicketNo = 0;
    var bValid = true; bSellerEditing = false; bLocked = false;
    var tickets = firebase.database().ref(gTickets).orderByChild(sortName);
    gTicketRowsCount = 0;
    tickets.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            // key

            var key = childSnapshot.key;
            var oTicket = new TicketClass(childSnapshot.val());

            sHTML = "<tr><td>'" + oTicket.TicketNo + "</td>";
            sHTML += "<td>" + oTicket.AssignedTo + "</td><td>" + oTicket.SoldBy + "</td>";
            sHTML += "<td>" + (oTicket.Sold ? oTicket.Sold : "NO") + "</td><td>" + (oTicket.SoldTo ? oTicket.SoldTo : "") + "</td>";
            sHTML += "<td>" + (oTicket.Paid ? oTicket.Paid : "NO") + "</td><td>" + (oTicket.Accounted ? oTicket.Accounted : "NO") + "</td>";
            sHTML += "<td>" + (oTicket.Comment ? oTicket.Comment : "") + "</td>";
            sHTML += "</tr>";
            $('#' + divName).append(sHTML);
        });

    }, function (error) {
        alert("Error: " + error.code);
    });
}

function getTicketStatus(sId,bIsAdmin) {
    var sHTML = ''; sAssignedTo = ''; cDanceMove = '1';
    var nTickets = 0, nSold = 0, nPaid = 0, nAvailable = 0; nCtr = 0;
    var gTicketCtr = 0, gSold = 0, gPaid = 0, gAvailable = 0;
    var gAccounted = 0; nAccounted = 0;
    var ticketids = firebase.database().ref(gTickets).orderByChild('SortKey');
    var bValid = true;
    ticketids.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            //var oTicketId = new TicketIndexClass(childSnapshot.val());
            //var tickets = firebase.database().ref(gTickets + '/' + oTicketId.AssignedId).orderByChild('TicketNo');
            //tickets.once("value", function (snapshot) {
            //    snapshot.forEach(function (childSnapshot) {
            var oTicket = new TicketClass(childSnapshot.val());

            if (sId != null && sId.length > 0) {
                bValid = false;
                if (sId == oTicket.AssignedTo) {
                    bValid = true;
                }
            } else {
                bValid = true;
            }
            if (bValid) {
                if (sAssignedTo == '') { sAssignedTo = oTicket.AssignedTo; }
                if (sAssignedTo != oTicket.AssignedTo) {
                    var perCentage = Math.round((nSold / nTickets) * 100).toString();
                    sHTML = '<tr>';
                    if (bIsAdmin)
                        sHTML += '<td class="LeftText"><a style="font-weight:bold;text-decoration:underline;"  href="lovemore.html?seller=' + encodeURIComponent(sAssignedTo) + '&admin=YES" target="_blank">' + sAssignedTo + '</a></td>';
                    else
                        sHTML += '<td class="LeftText"><a style="font-weight:bold;text-decoration:underline;"  href="lovemore.html?seller=' + encodeURIComponent(sAssignedTo) + '" target="_blank">' + sAssignedTo + '</a></td>';
                    sHTML += '<td>' + nTickets.toString() + '</td>';
                    sHTML += '<td class="LeftText">​<div class="w3-green" style="float:left;text-align:center;height:30px;width:' + perCentage + '%">' + perCentage + '%</div></td>';
                    cDanceMove = getDanceMove(nTickets, perCentage);
                    if (cDanceMove != '') {
                        sHTML += '<td><img src="images/dance0' + cDanceMove + '.gif" style="width:40px;height:30px" /></td>';
                    } else {
                        sHTML += '<td></td>';
                    }
                    sHTML += '<td>' + nSold.toString() + '</td><td>' + nPaid.toString() + '</td><td style="font-weight:bold;font-size:14px;"><i class="fa fa-money" style="font-size:10px;color:green"></i> ' + nAccounted.toString() + '</td><td>' + nAvailable.toString() + '</td>';
                    sHTML += '</tr>';
                    $('#divStatus').append(sHTML);
                    nSold = 0;
                    nPaid = 0;
                    nAccounted = 0;
                    nAvailable = 0;
                    nCtr = 0;
                    nTickets = 0;
                    sAssignedTo = oTicket.AssignedTo;
                }
                if (oTicket.Sold.length > 0 && oTicket.Sold == 'YES') {
                    nSold++;
                    gSold++;
                } else {
                    nAvailable++;
                    gAvailable++;
                };
                if (oTicket.Paid.length > 0 && oTicket.Paid == 'YES') {
                    nPaid++;
                    gPaid++;
                };
                if (oTicket.Accounted)
                {
                    if (oTicket.Accounted == 'YES')
                    {
                        nAccounted++;
                        gAccounted++;
                    }
                }
                nCtr++;
                nTickets++;
                gTicketCtr++;
                //nTickets++;
                //    });
                //});
            }
        });
        if (nTickets > 0) {
            var perCentage = Math.round((nSold / nTickets) * 100).toString();
            sHTML = '<tr>';
            sHTML += '<td class="LeftText"><a style="font-weight:bold;text-decoration:underline;" href="lovemore.html?seller=' + encodeURIComponent(sAssignedTo) + '" target="_blank">' + sAssignedTo + '</a></td>';
            sHTML += '<td>' + nTickets.toString() + '</td>';
            sHTML += '<td class="LeftText">​<div class="w3-green" style="float:left;text-align:center;height:30px;width:' + perCentage + '%">' + perCentage + '%</div></td>';
            cDanceMove = getDanceMove(nTickets, perCentage);
            if (cDanceMove != '') {
                sHTML += '<td><img src="images/dance0' + cDanceMove + '.gif" style="width:40px;height:30px" /></td>';
            } else {
                sHTML += '<td></td>';
            }
            sHTML += '<td>' + nSold.toString() + '</td><td>' + nPaid.toString() + '</td><td style="font-weight:bold;font-size:14px;"><i class="fa fa-money" style="font-size:10px;color:green"></i> ' + nAccounted.toString() + '</td><td>' + nAvailable.toString() + '</td>';
            sHTML += '</tr>';
            $('#divStatus').append(sHTML);
        }

        if (gTicketCtr > 0 && (sId == null || sId.length == 0)) {
            var perCentage = Math.round((gSold / gTicketCtr) * 100).toString();
            sHTML = '<tr style="background-color:lightgray;font-weight:bold;">';
            sHTML += '<td class="LeftText" style="text-align:center">TOTALS</td>';
            sHTML += '<td>' + gTicketCtr.toString() + '</td>';
            sHTML += '<td class="LeftText">​<div class="w3-green" style="float:left;text-align:center;height:30px;width:' + perCentage + '%">' + perCentage + '%</div></td>';
            cDanceMove = getDanceMove(nTickets, perCentage);
            if (cDanceMove != '') {
                sHTML += '<td><img src="images/dance0' + cDanceMove + '.gif" style="width:40px;height:30px" /></td>';
            } else {
                sHTML += '<td></td>';
            }
            sHTML += '<td>' + gSold.toString() + '</td><td>' + gPaid.toString() + '</td><td style="font-weight:bold;font-size:16px;"><i class="fa fa-money" style="font-size:20px;color:green"></i> ' + gAccounted.toString() + '</td><td>' + gAvailable.toString() + '</td>';
            sHTML += '</tr>';
            $('#divStatus').append(sHTML);
        }

    }, function (error) {
        alert("Error: " + error.code);
    });
    //<div class="w3-light-grey" > <div class="w3-green" style="text-align:center;height:20px;width:' + perCentage + '%">' + perCentage + '%</div>
}

function getDanceMove(nTickets, nPercentage)
{
    if (nPercentage > 0) {
        if (nTickets <= 10) {
            if (nPercentage <= 50) { return '1'; }
            if (nPercentage < 99) { return '2'; }
            if (nPercentage == 100) { return '3';}
        }
        else {
            if (nPercentage <= 30) { return '1'; }
            if (nPercentage <= 60) { return '2'; }
            if (nPercentage < 99) { return '3'; }
            if (nPercentage == 100) { return '4';}
        }
    }
    return '';
}
function sold_update(nTicketNo) {
    var sTicketNo = zeroFill(nTicketNo, gTicketPad);
    var key = $('#col' + sTicketNo).attr('key');
    var isSold = $('#sold' + sTicketNo).prop('checked');
    if (!isSold) {
        $('#soldTo' + sTicketNo).prop('value', '');
        firebase.database().ref(gTickets + '/' + key + '/SoldTo').set('');
        $('#paid' + sTicketNo).prop('checked', false);
        $('#paid' + sTicketNo).prop('disabled', true);
        firebase.database().ref(gTickets + '/' + key + '/Paid').set('NO')
    } else
    {
        $('#paid' + sTicketNo).prop('disabled', false);
    }
    firebase.database().ref(gTickets + '/' + key + '/Sold').set((isSold ? 'YES' : 'NO'));
    $('#col' + sTicketNo).css('background-color', '#FDF5E6');
}
function soldTo_update(nTicketNo) {
    var sTicketNo = zeroFill(nTicketNo, gTicketPad);
    var key = $('#col' + sTicketNo).attr('key');
    var soldTo = $('#soldTo' + sTicketNo).prop('value');
    var isSold = (soldTo.length > 0 ? true : false);

    if (isSold) {
        $('#sold' + sTicketNo).prop('checked', true);
        firebase.database().ref(gTickets + '/' + key + '/Sold').set('YES');
        $('#paid' + sTicketNo).prop('disabled', false);
    }
 
    firebase.database().ref(gTickets + '/' + key + '/SoldTo').set(soldTo);
    $('#col' + sTicketNo).css('background-color', '#FDF5E6');
}
//function assignTo_update(nTicketNo) {
//    var sTicketNo = zeroFill(nTicketNo, gTicketPad);
//    var key = $('#col' + sTicketNo).attr('key');
//    var assignTo = $('#assignedTo' + sTicketNo).prop('value');

//    if (assignTo.length == 0) {
//        assignTo = 'NOT ASSIGNED';
//    }
//    firebase.database().ref(gTickets + '/' + key + '/AssignedTo').set(assignTo);
//    firebase.database().ref(gTickets + '/' + key + '/SortKey').set(assignTo+sTicketNo);
//}

function mark_update(nTicketNo)
{
    //alert('hey');
    var sTicketNo = zeroFill(nTicketNo, gTicketPad);
    var key = $('#col' + sTicketNo).attr('key');
    var cId = $('#col' + sTicketNo).attr('assignid');
    //var isSold = $('#sold' + sTicketNo).prop('checked');
    var isPaid = $('#paid' + sTicketNo).prop('checked');
    //var assignTo = $('#assignedTo' + sTicketNo).prop('value');
 
    //if (assignTo) {
    //    firebase.database().ref(gTickets + '/' + key + '/AssignedTo').set(assignTo);
    //} else {
    //    firebase.database().ref(gTickets + '/' + key + '/AssignedTo').set('');
    //}
    firebase.database().ref(gTickets + '/' + key + '/Paid').set((isPaid?'YES':'NO'));
    //alert('hey ' + sTicketNo);
    //$('#col' + sTicketNo).css('border-width', '5px');
}

function accounted_update(nTicketNo) {
    var sTicketNo = zeroFill(nTicketNo, gTicketPad);
    var key = $('#col' + sTicketNo).attr('key');
    var isAcct = $('#accounted' + sTicketNo).prop('checked');
     firebase.database().ref(gTickets + '/' + key + '/Accounted').set((isAcct ? 'YES' : 'NO'));
}

function comment_update(nTicketNo) {
    var sTicketNo = zeroFill(nTicketNo, gTicketPad);
    var key = $('#col' + sTicketNo).attr('key');
    var sComment = $('#comment' + sTicketNo).prop('value');
    if(sComment)
        firebase.database().ref(gTickets + '/' + key + '/Comment').set(sComment);
    else
        firebase.database().ref(gTickets + '/' + key + '/Comment').set('');
}

function soldby_update(nTicketNo) {
    var sTicketNo = zeroFill(nTicketNo, gTicketPad);
    var key = $('#col' + sTicketNo).attr('key');
    var sSeller = $('#soldBy' + sTicketNo).prop('value');
    if (sSeller) {
        firebase.database().ref(gTickets + '/' + key + '/SoldBy').set(sSeller);
    }
    else
        firebase.database().ref(gTickets + '/' + key + '/SoldBy').set('');
}

function getTicketsSummary() {
    var nCols = 3;
    var sHTML = '';
    var sTicketNo = ''
    //var database = firebase.database();
    var tickets = firebase.database().ref('Tickets/TicketNo').orderByChild('TicketNo');
    //var tickets = firebase.database().ref();
    tickets.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            // key

            var key = childSnapshot.key;
            // value, could be object
            //var childData = childSnapshot.val();
            var oTicket = new TicketClass(childSnapshot.val());
            if (nCols > 2) {
                sHTML = '<div class="row">';
                nCols = 1;
            }
            //if (sTicketNo != oTicket.TicketNo) {
            sHTML += '<div class="col-xs-12 col-sm-6" style="margin-bottom:5px;">';
            sHTML += '<span style="font-weight:bold;color: #734d26;">' + oTicket.TicketNo + '</span><br>';
            //}
            if (oTicket.AssignedTo)
                sHTML += '<i class="fa fa-user"></i>' + oTicket.AssignedTo;
            if (oTicket.SoldTo)
                sHTML += '&nbsp;<i class="fa fa-phone"></i>' + oTicket.SoldTo;

            //if (sTicketNo != oTicket.TicketNo) {
            sHTML += '</div>';
            //    sTicketNo = oTicket.TicketNo;
            nCols++;
            //}
            if (nCols > 2) {
                sHTML += '</div>';
                $('#divTickets').append(sHTML);
                sHTML = '';
            }
            // Do what you want with these key/values here
            //alert(key + ' - ' + childData.Chapter);
        });
        if(sHTML)
        {
            sHTML += '</div>';
            $('#divTickets').append(sHTML);
        }
        //alert(snapshot.val());
        //console.log(snapshot.val());
    }, function (error) {
        alert("Error: " + error.code);
    });
}

function reAssignSelectedTickets(sNewOwner)
{
    var sTicketNo;
    var nCtr = 0;
    var totalChecked = $('input[name="reAssign"]:checked').length;
    if (totalChecked > 0) {
        if (confirm('You are about to re assign ' + totalChecked.toString() + ' tickets to ' + sNewOwner + '.... Confirmed?')) {
            $(".checkSelect").each(function (idx, obj) {
                if (obj.checked) {
                    sTicketNo = $('#' + obj.id).attr('ticketNo');
                    var key = $('#col' + sTicketNo).attr('key');
                   // alert(sTicketNo + ' - ' + key);
                    firebase.database().ref(gTickets + '/' + key + '/AssignedTo').set(sNewOwner);
                    firebase.database().ref(gTickets + '/' + key + '/SortKey').set(sNewOwner + sTicketNo);
                }
                nCtr++;
                if (gTicketRowsCount == nCtr) {
                    alert('Successfully Re Assigned tickets..');
                    location.reload();
                }
            });
        }
    } else {
        alert('Nothing selected to re assign...');
    }
}

function getSourceString() {
    var tickets = firebase.database().ref(gTicketList);
    tickets.on("value", function (snapshot) {
        alert(snapshot.val());
        $('#ticketlist').append(snapshot.val());
    });
}


function addSortProperty() {
    var tickets = firebase.database().ref('Tickets/TicketNo');
    tickets.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var oService = firebase.database().ref('Tickets/TicketNo/' + childSnapshot.key);
            var oTicket = new TicketClass(childSnapshot.val());
            alert(oTicket.Group + oTicket.TicketNo + oTicket.LastName);
            oService.set({
                SortField: oTicket.Group + oTicket.TicketNo + oTicket.LastName
            });
        });
    }, function (error) {
        alert("Error: " + error.code);
    });
}

function getImagesFromStorage() {
    // storage
    var storage = firebase.storage();
    var storageRef = storage.ref();
    //var tangRef = storageRef.child('images/pdf.jpg');
    var tangRef = firebase.storage().ref('images/pdf.jpg');
    // First we sign in the user anonymously
    //firebase.auth().signInAnonymously().then(function () {
    // Once the sign in completed, we get the download URL of the image
    tangRef.getDownloadURL().then(function (url) {
        // Once we have the download URL, we set it to our img element
        document.querySelector('img').src = url;

    }).catch(function (error) {
        // If anything goes wrong while getting the download URL, log the error
        console.error(error);
    });
    // });
}

function uploadDocToStorage() {
    var storageRef = firebase.storage.ref("folderName/file.jpg");
    var fileUpload = document.getElementById("fileUpload");
    fileUpload.on('change', function (evt) {
        var firstFile = evt.target.file[0]; // get the first file uploaded
        var uploadTask = storageRef.put(firstFile);
        uploadTask.on('state_changed', function progress(snapshot) {
            console.log(snapshot.totalBytesTransferred); // progress of upload
        });
    });
}
