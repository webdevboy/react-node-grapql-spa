import moment from 'moment';

export default function getGreetingTime (m) {
	var g = null; //return g

	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

	var split_afternoon = 13 //24hr time to split the afternoon
	var currentHour = parseFloat(m.format("HH"));

	if(currentHour >= split_afternoon){
		g = "Afternoon";
	} else {
		g = "Morning";
	}

	return g;
}