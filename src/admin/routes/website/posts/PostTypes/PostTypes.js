import ArticleSidebar from "../Sidebars/Custom/Article";
import AircraftSidebar from "../Sidebars/Custom/Aircraft";
import EventSidebar from "../Sidebars/Custom/Event";
import AirportSidebar from "../Sidebars/Custom/Airport";
import CorporateSidebar from "../Sidebars/Custom/Corporate";
import ArticleListSidebar from "../Sidebars/Custom/ArticleList";
import ServiceListSidebar from "../Sidebars/Custom/ServiceList";
import AirportDetailsSidebar from "../Sidebars/Custom/AirportDetails";
import PrivateJetCharterSidebar from "../Sidebars/Custom/PrivateJetCharter";
import PrivateJetChaterDestinationSidebar from "../Sidebars/Custom/PrivateJetChaterDestination";
import PrivateJetCharterBetweenTwoCitiesSidebar from "../Sidebars/Custom/PrivateJetCharterBetweenTwoCities";
import PrivateJetChaterManufacturerSideBar from "../Sidebars/Custom/PrivateJetChaterManufacturer";
import PrivateJetChaterCategorySideBar from "../Sidebars/Custom/PrivateJetChaterCategory";
import JetCostDestinationSidebar from "../Sidebars/Custom/JetCostDestination";
import CorporateSocialResponsibilitySidebar from "../Sidebars/Custom/CorporateSocialResponsibility";
import HistorySidebar from "../Sidebars/Custom/History";
import JobSidebar from "../Sidebars/Custom/Job";
import ReviewSidebar from "../Sidebars/Custom/Review";
import EmptyLegsDestinationSidebar from "../Sidebars/Custom/EmptyLegsDestination";
import FleetSidebar from "../Sidebars/Custom/Fleet";
import JetComparatorSidebar from "../Sidebars/Custom/JetComparator";

import ArticleHeaders from "../PostTable/Headers/Custom/Article";
import ArticleRows from "../PostTable/Rows/Custom/Article";

export const PostTypes =  {
  article: {
    editor: true,
    type: "article",
    sidebar: ArticleSidebar,
    template: "article-details",
    headersComponent: ArticleHeaders,
    rowsComponent: ArticleRows,
    name: "Article Details",
  },
  aircraft: {
    editor: true,
    subeditor: null,
    type: "aircraft",
    sidebar: AircraftSidebar,
    template: "aircraft-details",
    name: "Aircraft Details",
  },
  event: {
    editor: true,
    type: "event",
    subeditor: true,
    sidebar: EventSidebar,
    template: "event-details",
    name: "Event Details",
  },
  airport: {
    editor: true,
    type: "airport",
    subeditor: false,
    sidebar: AirportDetailsSidebar,
    template: "airport-details",
    name: "Airport Details",
  },
  job: {
    editor: true,
    subeditor: false,
    sidebar: JobSidebar,
    template: "job-details",
    type: "job",
    name: "Job",
  },
  career: {
    subeditor: false,
    sidebar: null,
    template: "career",
    type: "page",
    name: "Career",
  },
  review: {
    editor: false,
    subeditor: false,
    sidebar: ReviewSidebar,
    template: "review",
    type: "review",
    name: "Review",
  },
  "press-release": {
    editor: true,
    subeditor: false,
    sidebar: null,
    template: "press-release",
    type: "article",
    name: "Press Release",
  },
  home: {
    editor: false,
    subeditor: false,
    sidebar: null,
    template: "home",
    type: "page",
    name: "Home",
  },
  fleet: {
    editor: true,
    subeditor: true,
    sidebar: FleetSidebar,
    template: "fleet",
    type: "page",
    name: "Fleet",
  },
  "jet-comparator": {
    editor: true,
    subeditor: false,
    sidebar: JetComparatorSidebar,
    template: "jet-comparator",
    type: "page",
    name: "Jet Comparator",
  },
  "private-jet-charter": {
    editor: true,
    subeditor: false,
    sidebar: PrivateJetCharterSidebar,
    template: "private-jet-charter",
    type: "page",
    name: "Private Jet Charter",
  },
  "private-jet-charter-destination": {
    editor: true,
    subeditor: false,
    sidebar: PrivateJetChaterDestinationSidebar,
    template: "private-jet-charter-destination",
    type: "page",
    name: "Private Jet Charter Destination",
  },
  "private-jet-charter-between-two-cities": {
    editor: true,
    subeditor: false,
    sidebar: PrivateJetCharterBetweenTwoCitiesSidebar,
    template: "private-jet-charter-between-two-cities",
    type: "page",
    name: "Private Jet Charter Between Two Cities",
  },

  "private-jet-charter-manufacturer": {
    editor: true,
    subeditor: false,
    sidebar: PrivateJetChaterManufacturerSideBar,
    template: "private-jet-charter-manufacturer",
    type: "page",
    name: "Private Jet Charter Manufacturer",
  },
  "private-jet-charter-category": {
    editor: true,
    subeditor: false,
    sidebar: PrivateJetChaterCategorySideBar,
    template: "private-jet-charter-category",
    type: "page",
    name: "Private Jet Charter Category",
  },
  "jet-cost": {
    subeditor: false,
    editor: true,
    sidebar: null,
    template: "jet-cost",
    type: "page",
    name: "Jet Cost",
  },
  "jet-cost-destination": {
    editor: true,
    subeditor: true,
    sidebar: JetCostDestinationSidebar,
    template: "jet-cost-destination",
    type: "page",
    name: "Jet Cost Destination",
  },
  "empty-leg-flights": {
    editor: false,
    subeditor: false,
    sidebar: null,
    template: "empty-legs",
    type: "page",
    name: "Empty Leg Flights List",
  },
  "empty-legs-destination": {
    editor: true,
    sidebar: EmptyLegsDestinationSidebar,
    template: "empty-legs-destination",
    type: "page",
    name: "Empty Legs Destination",
  },
  "airport-map": {
    editor: true,
    subeditor: false,
    sidebar: AirportSidebar,
    template: "airport-map",
    type: "page",
    name: "Airports Map",
  },
  services: {
    editor: true,
    subeditor: false,
    sidebar: ServiceListSidebar,
    template: "services",
    type: "page",
    name: "Services List",
  },
  corporate: {
    editor: true,
    subeditor: false,
    sidebar: CorporateSidebar,
    template: "corporate",
    type: "page",
    name: "Corporate Services List",
  },
  "corporate-social-responsibility": {
    editor: true,
    subeditor: false,
    sidebar: CorporateSocialResponsibilitySidebar,
    template: "corporate-social-responsibility",
    type: "page",
    name: "Corporate Social Responsibility",
  },
  evergreen: {
    editor: false,
    subeditor: false,
    sidebar: null,
    template: "evergreen",
    type: "page",
    name: "Evergreen",
  },
  "article-list": {
    subeditor: true,
    sidebar: ArticleListSidebar,
    template: "article-list",
    type: "page",
    name: "Article List",
  },
  "news-list": {
    subeditor: false,
    sidebar: null,
    template: "news-list",
    type: "page",
    name: "News List",
  },
  "event-list": {
    subeditor: false,
    sidebar: null,
    template: "event-list",
    type: "page",
    name: "Event List",
  },
  "contact-us": {
    subeditor: false,
    sidebar: null,
    template: "contact-us",
    type: "page",
    name: "Contact Us",
  },
  testimonials: {
    subeditor: false,
    // sidebar: TestimonialSidebar,
    template: "testimonials",
    type: "page",
    name: "Testimonials",
  },
  team: {
    editor: true,
    subeditor: false,
    sidebar: null,
    template: "team",
    type: "page",
    name: "Team",
  },
  partners: {
    subeditor: false,
    sidebar: null,
    template: "partners",
    type: "page",
    name: "Partners",
  },
  "media-center": {
    subeditor: false,
    sidebar: null,
    template: "media-center",
    type: "page",
    name: "Media Center",
  },
  "mobile-app": {
    subeditor: false,
    sidebar: null,
    template: "mobile-app",
    type: "page",
    name: "Mobile App",
  },
  history: {
    editor: true,
    subeditor: false,
    sidebar: HistorySidebar,
    template: "history",
    type: "page",
    name: "History",
  },
  generic: {
    editor: true,
    subeditor: false,
    sidebar: null,
    template: "generic",
    type: "page",
    name: "Generic Page",
  },
  "destination-list": {
    template: "destination-list",
    type: "page",
    name: "Destination List"
  }
};


export const CardPostTypes = ['article', 'service'];