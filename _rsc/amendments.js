$(document).ready(function(){
	initializeStates();
	initializeTOC();
	$('#amendmentslist').children().on('click',function(event){
		displayVotes(amendments[$(event.target).attr('index')]);
	});
	$('#stateslist_button').on('click', function(event){
		$(event.target).removeClass('inactive');
		$('#stateview_button').addClass('inactive');
		$('#stateslist').removeClass('hidden');
		$('#stateview').addClass('hidden');
		$('#vmap').vectorMap('set', 'colors', latestAmendmentsMapColor);
	});
	$('#stateview_button').on('click', function(event){
		$(event.target).removeClass('inactive');
		$('#stateslist_button').addClass('inactive');
		$('#stateview').removeClass('hidden');
		$('#stateslist').addClass('hidden');
		$('#content').removeClass('rejected');
		$('#vmap').vectorMap('set', 'colors', latestStatesMapColor);
	});
});

var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var latestStatesMapColor, latestAmendmentsMapColor;

function displayVotes(amendment){
$('#description').html(amendment.description);
$('#amendmentslist li').removeClass('underlined');
$('#' + amendment.roman.replace(/ /g, "_")).addClass('underlined');

var votes = amendment.votes;
votes.sort(function(a, b) {
	return a[3]-b[3];
});
var mapColors = {};
var voters = '<div id="voters"><h2>States who took action on the amendment</h2>', noaction='', ineligible='';
for (var i=0; i<votes.length; i++) {
	if ((votes[i][1]) && (votes[i][2] == 1) && (votes[i][4])) {
		voters +='<p><span class="state tag" id="'+ votes[i][0] +'">'+ window[votes[i][0]].name +'</span> <span class="vote yes">' + 'ratified</span> the amendment on ' + months[votes[i][3].getMonth()] + ' ' + votes[i][3].getDate() + ', ' + votes[i][3].getFullYear() + '.</div>';  
		var j=votes[i][0].toLowerCase();
		mapColors[j] = '#39528D';
	}
	else if ((votes[i][1]) && (votes[i][2] == 1) && (votes[i][4] == false)) {
		voters +='<p><span class="state tag" id="'+ votes[i][0] +'">'+ window[votes[i][0]].name +'</span> <span class="vote yessish">' + 'symbolically ratified</span> the amendment on ' + months[votes[i][3].getMonth()] + ' ' + votes[i][3].getDate() + ', ' + votes[i][3].getFullYear() + '.</div>';
		mapColors[votes[i][0].toLowerCase()] = '#7D83B0';
	}
	else if ((votes[i][1]) && (votes[i][2] == -1))	{
		voters +='<p><span class="state tag" id="'+ votes[i][0] +'">'+ window[votes[i][0]].name +'</span> <span class="vote no">' + 'rejected</span> the amendment';
		if (typeof votes[i][3] == 'object')
			voters += ' on ' + months[votes[i][3].getMonth()] + ' ' + votes[i][3].getDate() + ', ' + votes[i][3].getFullYear();  
		voters += '.</div>' 
		mapColors[votes[i][0].toLowerCase()] = '#D34747';
	}
	else if ((votes[i][1]) && (votes[i][2] == -2))	{
		voters +='<p><span class="state tag" id="'+ votes[i][0] +'">'+ window[votes[i][0]].name +'</span> <span class="vote noish">' + 'rescinded</span> an earlier ratification';
		if (typeof votes[i][3] == 'object')
			voters += ' on ' + months[votes[i][3].getMonth()] + ' ' + votes[i][3].getDate() + ', ' + votes[i][3].getFullYear();  
		voters += '.</p>' 
		mapColors[votes[i][0].toLowerCase()] = '#D46A6A';
	}
	else if ((votes[i][1]) && (votes[i][2] == 0))	{
		noaction += '<span class="tag" id="' + votes[i][0] +'">' + window[votes[i][0]].name + '</span>, ';
		mapColors[votes[i][0].toLowerCase()] = '#FFE7AA'; 
	}
	else {
		ineligible += '<span class="tag" id="' + votes[i][0] +'">' + window[votes[i][0]].name + '</span>, '; 
		mapColors[votes[i][0].toLowerCase()] = '#d9d9d9';
	}
};
	$('#noaction').html('');
	$('#ineligible').html('');
	$('#voters').html(voters);
	
	if (noaction.length > 0) {	
		noaction = noaction.substring(0, noaction.length-2);
		$('#noaction').html('<h2>States who took no action on the amendment</h2>' + noaction);

	}
	if (ineligible.length > 0) {
		ineligible = ineligible.substring(0, ineligible.length-2);
		document.getElementById('ineligible').innerHTML = '<h2>Not yet states at time of action</h2>' + ineligible;
	}
	$('#vmap').vectorMap('set', 'colors', mapColors);
	latestAmendmentsMapColor = mapColors;
	$('#content').removeClass('rejected');
	$('#stateslist_button').removeClass('rejected');
	
	if (amendment.ratified ==0) {
		$('#content').addClass('rejected');
		$('#stateslist_button').addClass('rejected');
	}
	
	$('.tag').click(function() {
		$('#stateview_button').removeClass('inactive');
		$('#stateslist_button').addClass('inactive');
		$('#stateslist').addClass('hidden');
		displayState(event.target.id);

	});	
}
function initializeTOC(){
	var listHTML = '<ul>';
	for (var i=0; i<amendments.length; i++) {
		if (i==0)
			listHTML += '<li class="heading">Ratified Amendments:</li>';
		if (i==18)
			listHTML += '<br><li class="heading">Rejected Amendments:</li>';
		listHTML+= '<li id="' + amendments[i].roman.replace(/ /g, "_") + '" index="' + i + '">' + amendments[i].roman + '</li>';
	}
	listHTML += '</ul>';
	document.getElementById('amendmentslist').innerHTML = listHTML;
}
function displayState(code){
	var state = window[code];
	var index = state.index;
//Step 1: Refresh Map to display gray for all colors but state index. 
	var mapColors = {};
	for (var i =0; i<50; i++) {
		var j= amendments[0].votes[i][0].toLowerCase();
		mapColors[j] = '#d9d9d9';	}
	mapColors[code.toLowerCase()] = '#39528D';
	$('#vmap').vectorMap('set', 'colors', mapColors);
	latestStatesMapColor = mapColors;
//Step 2: Change buttons to reflect that Stateview is Active. 	
	$('#stateview_button').removeClass('inactive');
	$('#stateslist_button').addClass('inactive');
	$('#stateview').removeClass('hidden').html('');
	$('#stateslist').addClass('hidden');
//Step 3: Generate code showing the list of all states. 
	var listHTML = '';
	$('#stateview').append('<h2>' + state.name + '</h2>');
	$('#stateview').append('<h3>Ratified Amendments</h3>');
	$('#stateview').append('<div id="passed_ls">' + displayStateHTML(0,17,index) + '</div>');
	$('#stateview').append('<h3>Rejected Amendments</h3>');
	$('#stateview').append('<div id="failed_ls">' + displayStateHTML(18,amendments.length, index) + '</div>');
	$('#content').removeClass('rejected');
//Step 4: Make the names of all amendments clickable. 
	$('.amendment.tag').on('click',function() {
		var i = $(event.target).attr('index');
		$('#stateview_button').addClass('inactive');
		$('#stateslist_button').removeClass('inactive');
		$('#stateslist').removeClass('hidden');
		$('#stateview').addClass('hidden');
		displayVotes(amendments[i]);	
	});	
}
function displayStateHTML(startIndex, stopIndex, index) {
	if (startIndex <0 )
		startIndex = 0;
	if (stopIndex >= amendments.length)
		stopIndex = amendments.length -1;
	var listHTML = '';
	for (var i=startIndex; i<=stopIndex; i++) {
		listHTML += '<p><span class="bold amendment tag" index= '+ i +'>' + amendments[i].amendmentNumber + '</span>: ';
		if (amendments[i].votes[index][1] == false) {
			listHTML += 'was not eligible to take action.'
		}
		else if ((amendments[i].votes[index][1]) && (amendments[i].votes[index][2] == 1) && (amendments[i].votes[index][4] == true) )  {
			listHTML += '<span class="vote yes">voted to ratify</span>';
			if (typeof amendments[i].votes[index][3] == 'object')
				listHTML += ' on ' + months[amendments[i].votes[index][3].getMonth()] + ' ' + amendments[i].votes[index][3].getDate() + ', ' + amendments[i].votes[index][3].getFullYear(); 
				listHTML += '.';
		}
		else if ((amendments[i].votes[index][1]) && (amendments[i].votes[index][2] == 1) && (amendments[i].votes[index][4] == false) )  {
			listHTML += '<span class="vote yessish">ratified symbolically</span>';
			if (typeof amendments[i].votes[index][3] == 'object')
				listHTML += ' on ' + months[amendments[i].votes[index][3].getMonth()] + ' ' + amendments[i].votes[index][3].getDate() + ', ' + amendments[i].votes[index][3].getFullYear(); 
				listHTML += '.';
		}

		else if ((amendments[i].votes[index][1]) && (amendments[i].votes[index][2] == -1))  {
			listHTML += '<span class="vote no">rejected the amendment</span>.';
		}
		else if ((amendments[i].votes[index][1]) && (amendments[i].votes[index][2] == -2)) {
			listHTML+= '<span class="vote noish">rescinded after initially ratifying</span>.';
		}
		else /*if ((amendments[i].votes[index][1]) && (amendments[i].votes[index][2] == 0)) */	{
			listHTML += '<span class="vote">took no action</span>.';
		}	
		listHTML +=  '</p>';
	}
			return listHTML;
}