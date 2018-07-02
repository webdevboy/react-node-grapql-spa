import moment from 'moment';
import _ from 'lodash';
import { 
  REQ_FLIGHT_ADD_LEG,
  REQ_FLIGHT_RETURN_LEG,
  REQ_FLIGHT_REMOVE_LEG,
  REQ_FLIGHT_SET_LOCATION,
  REQ_FLIGHT_SET_DATETIME,
  REQ_FLIGHT_SET_PAX,  
  REQ_FLIGHT_CHANGE_OPTION,
  REQ_FLIGHT_CONTACT_INFO,
  REQ_FLIGHT_NEXT_STEP,
  REQ_FLIGHT_PREV_STEP,
  REQ_FLIGHT_MOVE_TO_STEP,
  REQ_FLIGHT_SUBMIT,
  REQ_FLIGHT_RESET,
  REQ_FLIGHT_UPDATE_CONTACT,
  REQ_FLIGHT_VALIDATED_STEP,
  REQ_FLIGHT_REMOVE_VALIDATED_STEP,
  REQ_FLIGHT_CLEAR_LOCATION,
  REQ_FLIGHT_SUBMIT_SUCCESS,
  REQ_FLIGHT_SUBMIT_ERROR,
  REQ_FLIGHT_TOGGLE_OPTIONS,
  SET_EMPTY_LEG,
  REMOVE_EMPTY_LEG,
  CONTACT_TITLES
} from '../constants/requestFlight';

const MAX_STEPS = 3;
const DEFAULT_STEP = 0;
const DEFAULT_LUGGAGE = 1;
const DEFAULT_PETS = 0;
const MAX_LEGS = 5;
const MIN_LEGS = 1;
const MAX_PETS = _.times(5);
const MAX_LUGGAGE_AND_PAX = _.times(20, (i) => {
  let val = i + 1;
  if (val === 20) {
    val = `${val}+`;
  }
  return val
});

const today = moment();

const DEFAULT_LEG = {
  date: moment(today).add(today.minutes() < 30 ? 2 : 3, "hours").minutes(today.minutes() < 30 ? 30 : 0),
  pax: 1,
  flightOptions: {
    luggage: DEFAULT_LUGGAGE,
    pets: DEFAULT_PETS,
    wifi: false,
    others: false,
    smokers: false,
    limousine: false,
    helicopter: false,
    catering: false,
  },
};

const INITIAL_STATE = {
  step: DEFAULT_STEP,
  config: {
    steps: {
      min: DEFAULT_STEP,
      max: MAX_STEPS
    },
    legs: {
      maxLegs: MAX_LEGS,
      minLegs: MIN_LEGS,
    },
    options: {
      luggage: MAX_LUGGAGE_AND_PAX,
      pax: MAX_LUGGAGE_AND_PAX,
      pets: MAX_PETS,
    }
  },
  legs: [DEFAULT_LEG],
  contactInfo: {
    title:            CONTACT_TITLES[0],
    firstName:        undefined,
    lastName:         undefined,
    email:            undefined,
    phone:            undefined,
    additionalNotes:  undefined,
  },
  completedSteps:     [],
  isLoading: false,
  showOption: null,
  emptyleg: null,
}

const calcDistance = (lat1, lon1, lat2, lon2, unit) => {
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var theta = lon1 - lon2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'm') {
    dist = dist * 1609.344;
  }
  if (unit === 'K') {
    dist = dist * 1.609344;
  }
  if (unit === 'N') {
    dist = dist * 0.8684;
  }
  return dist;
};

const AIRPORTS_HOURS_MARGIN = 2;
const BASE_SPEED = 900000;
const calcTime = (distance, speed = BASE_SPEED) => Math.ceil(distance / speed)

const calculateAdditionalFlightTime = (from, to) => {
  let pointA = (from.__typename === 'GeoType' || from.__typename === 'LocationType') 
    ? { 
      lat: from.geometry.location.lat,
      lng: from.geometry.location.lng,
    }
    : {
      lat: from.coordinates.split(',')[0],
      lng: from.coordinates.split(',')[1],
    }

  let pointB = (to.__typename === 'GeoType' || to.__typename === 'LocationType') 
    ? { 
      lat: to.geometry.location.lat,
      lng: to.geometry.location.lng,
    }
    : {
      lat: to.coordinates.split(',')[0],
      lng: to.coordinates.split(',')[1],
    }

  let totalDistance = calcDistance(pointA.lat, pointA.lng, pointB.lat, pointB.lng, 'm');
  let flightTime = calcTime(totalDistance) + AIRPORTS_HOURS_MARGIN;
  return flightTime;
}

const leg = (state, action) => {
  switch(action.type) {
    case REQ_FLIGHT_CHANGE_OPTION:
      const fields = {
        [action.payload.field]: action.payload.value,
      };
      if (action.payload.field === 'limousine' && action.payload.value) {
        fields['helicopter'] = !action.payload.value
      }
      if (action.payload.field === 'helicopter' && action.payload.value) {
        fields['limousine'] = !action.payload.value
      }
      return {
        ...state,
        flightOptions: {
          ...state.flightOptions,
          ...fields,
        }
      }
    case REQ_FLIGHT_SET_PAX:
    case REQ_FLIGHT_SET_LOCATION:
    default:
      return state;
  }
}

const legs = (state, action) => {
  switch (action.type) {
    case REQ_FLIGHT_ADD_LEG:
      if (state.length < MAX_LEGS) {
        return [
          ...state,
          {
            from: state[state.length-1].to,
            to: undefined,
            date: moment(state[state.length-1].date).add(calculateAdditionalFlightTime(state[state.length-1].from, state[state.length-1].to), "hours"),
            pax: state[state.length-1].pax,
            flightOptions: state[state.length-1].flightOptions,
          }
        ]
      }
      return state;
    case REQ_FLIGHT_RETURN_LEG:
      return [
        ...state,
        {
          from: state[state.length-1].to,
          to: state[state.length-1].from,
          date: moment(state[state.length-1].date).add(calculateAdditionalFlightTime(state[state.length-1].from, state[state.length-1].to), "hours"),
          pax: state[state.length-1].pax,
          flightOptions: state[state.length-1].flightOptions,
        }
      ];

    case REQ_FLIGHT_REMOVE_LEG:
      return [
        ...state.slice(0, action.payload.index),
        ...state.slice(action.payload.index + 1),
      ];

    case REQ_FLIGHT_SET_LOCATION:
      return state.map((leg, index) => 
        (index === action.payload.index)
        ? { ...leg, [action.payload.direction]: action.payload.value }
        : leg
      );

    case REQ_FLIGHT_SET_PAX:
      return state.map((leg, index) => 
        (index === action.payload.index)
        ? { ...leg, pax: action.payload.value }
        : leg
      );
    
    case REQ_FLIGHT_SET_DATETIME:
      return state.map((leg, index) => 
        (index === action.payload.index)
        ? { ...leg, date: moment(action.payload.date) }
        : leg
      );

    case REQ_FLIGHT_CLEAR_LOCATION:
      return state.map((leg, index) => {
        if (index === action.payload.index) {
          let editedLeg = leg;
          delete editedLeg[action.payload.direction];
          return editedLeg
        }
        return leg
      });
    case REQ_FLIGHT_CHANGE_OPTION:
      return state.map((a, index) => 
        (index === action.payload.index)
        ? leg(a, action)
        : a
      );
    default:
      return state
  }
}

const requestFlight = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EMPTY_LEG:
      return {
        ...state,
        emptyleg: action.payload.emptyleg
      }
    case REMOVE_EMPTY_LEG:
      return {
        ...state,
        emptyleg: null,
      }
    case REQ_FLIGHT_RESET:
      return INITIAL_STATE

    case REQ_FLIGHT_NEXT_STEP:
      if (state.step < MAX_STEPS) {
        return {
          ...state,
          step: state.step + 1
        }
      }
      return state
    case REQ_FLIGHT_PREV_STEP:
      if (state.step > DEFAULT_STEP) {
        return {
          ...state,
          step: state.step - 1
        }
      }
      return state
    case REQ_FLIGHT_MOVE_TO_STEP:
      if (action.payload.step !== state.step && action.payload.step <= MAX_STEPS && action.payload.step >= DEFAULT_STEP) {
        return {
          ...state,
          step: action.payload.step
        }
      }
      return state
    case REQ_FLIGHT_UPDATE_CONTACT:
      return {
        ...state,
        contactInfo: { ...state.contactInfo, [action.payload.field]: action.payload.value }
      }
    case REQ_FLIGHT_VALIDATED_STEP:
      if (!state.completedSteps.includes(action.payload.index)) {
        return {
          ...state,
          completedSteps: [...state.completedSteps, action.payload.index]
        }
      }
      return state
    case REQ_FLIGHT_REMOVE_VALIDATED_STEP:
      if (state.completedSteps.includes(action.payload.index)) {
        return {
          ...state,
          completedSteps: [
            ...state.completedSteps.slice(0, state.completedSteps.indexOf(action.payload.index)),
            ...state.completedSteps.slice(state.completedSteps.indexOf(action.payload.index) + 1),
          ]
        }
      }
      return state
    case REQ_FLIGHT_SET_LOCATION:
    case REQ_FLIGHT_SET_PAX:
    case REQ_FLIGHT_SET_DATETIME:
    case REQ_FLIGHT_CLEAR_LOCATION:
    case REQ_FLIGHT_CHANGE_OPTION:
      return {
        ...state,
        legs: legs(state.legs, action)
      }
    case REQ_FLIGHT_RETURN_LEG:
    case REQ_FLIGHT_REMOVE_LEG:
    case REQ_FLIGHT_ADD_LEG:
      return {
        ...state,
        legs: legs(state.legs, action),
        showOption: null,
      }
    case REQ_FLIGHT_TOGGLE_OPTIONS:
      return {
        ...state,
        showOption: (state.showOption === action.payload.index) ? null : action.payload.index,
      }
    case REQ_FLIGHT_SUBMIT:
      return {
        ...state,
        isLoading: true
      }
    case REQ_FLIGHT_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.data,
      }
    case REQ_FLIGHT_SUBMIT_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.e
      }
    default:
      return state;
  }
}

export default requestFlight