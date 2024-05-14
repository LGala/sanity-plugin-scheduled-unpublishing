'use strict';

var React = require('react');
var useSWR = require('swr');
var sanityClient = require('part:@sanity/base/client');
var tslib = require('tslib');
var ui = require('@sanity/ui');
var pluralize = require('pluralize');
var icons = require('@sanity/icons');
var debug$2 = require('debug');
var dateFnsTz = require('date-fns-tz');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var useSWR__default = /*#__PURE__*/_interopDefaultLegacy(useSWR);
var sanityClient__default = /*#__PURE__*/_interopDefaultLegacy(sanityClient);
var pluralize__default = /*#__PURE__*/_interopDefaultLegacy(pluralize);
var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug$2);

var rawTimeZones = [
	{
		name: "Pacific/Niue",
		alternativeName: "Niue Time",
		group: [
			"Pacific/Niue"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Niue",
		countryCode: "NU",
		mainCities: [
			"Alofi"
		],
		rawOffsetInMinutes: -660,
		abbreviation: "NUT",
		rawFormat: "-11:00 Niue Time - Alofi"
	},
	{
		name: "Pacific/Midway",
		alternativeName: "Samoa Time",
		group: [
			"Pacific/Midway"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "United States Minor Outlying Islands",
		countryCode: "UM",
		mainCities: [
			"Midway"
		],
		rawOffsetInMinutes: -660,
		abbreviation: "SST",
		rawFormat: "-11:00 Samoa Time - Midway"
	},
	{
		name: "Pacific/Pago_Pago",
		alternativeName: "Samoa Time",
		group: [
			"Pacific/Pago_Pago",
			"Pacific/Samoa",
			"US/Samoa"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "American Samoa",
		countryCode: "AS",
		mainCities: [
			"Pago Pago"
		],
		rawOffsetInMinutes: -660,
		abbreviation: "SST",
		rawFormat: "-11:00 Samoa Time - Pago Pago"
	},
	{
		name: "Pacific/Rarotonga",
		alternativeName: "Cook Islands Time",
		group: [
			"Pacific/Rarotonga"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Cook Islands",
		countryCode: "CK",
		mainCities: [
			"Avarua"
		],
		rawOffsetInMinutes: -600,
		abbreviation: "CKT",
		rawFormat: "-10:00 Cook Islands Time - Avarua"
	},
	{
		name: "America/Adak",
		alternativeName: "Hawaii-Aleutian Time",
		group: [
			"America/Adak",
			"America/Atka",
			"US/Aleutian"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "United States",
		countryCode: "US",
		mainCities: [
			"Adak"
		],
		rawOffsetInMinutes: -600,
		abbreviation: "HAST",
		rawFormat: "-10:00 Hawaii-Aleutian Time - Adak"
	},
	{
		name: "Pacific/Honolulu",
		alternativeName: "Hawaii-Aleutian Time",
		group: [
			"Pacific/Honolulu",
			"Pacific/Johnston",
			"US/Hawaii"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "United States",
		countryCode: "US",
		mainCities: [
			"Honolulu",
			"East Honolulu",
			"Pearl City",
			"Hilo"
		],
		rawOffsetInMinutes: -600,
		abbreviation: "HAST",
		rawFormat: "-10:00 Hawaii-Aleutian Time - Honolulu, East Honolulu, Pearl City, Hilo"
	},
	{
		name: "Pacific/Tahiti",
		alternativeName: "Tahiti Time",
		group: [
			"Pacific/Tahiti"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "French Polynesia",
		countryCode: "PF",
		mainCities: [
			"Faaa",
			"Papeete",
			"Punaauia"
		],
		rawOffsetInMinutes: -600,
		abbreviation: "TAHT",
		rawFormat: "-10:00 Tahiti Time - Faaa, Papeete, Punaauia"
	},
	{
		name: "Pacific/Marquesas",
		alternativeName: "Marquesas Time",
		group: [
			"Pacific/Marquesas"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "French Polynesia",
		countryCode: "PF",
		mainCities: [
			"Marquesas"
		],
		rawOffsetInMinutes: -570,
		abbreviation: "MART",
		rawFormat: "-09:30 Marquesas Time - Marquesas"
	},
	{
		name: "America/Anchorage",
		alternativeName: "Alaska Time",
		group: [
			"America/Anchorage",
			"America/Juneau",
			"America/Metlakatla",
			"America/Nome",
			"America/Sitka",
			"America/Yakutat",
			"US/Alaska"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "United States",
		countryCode: "US",
		mainCities: [
			"Anchorage",
			"Juneau",
			"Fairbanks",
			"Eagle River"
		],
		rawOffsetInMinutes: -540,
		abbreviation: "AKST",
		rawFormat: "-09:00 Alaska Time - Anchorage, Juneau, Fairbanks, Eagle River"
	},
	{
		name: "Pacific/Gambier",
		alternativeName: "Gambier Time",
		group: [
			"Pacific/Gambier"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "French Polynesia",
		countryCode: "PF",
		mainCities: [
			"Gambier"
		],
		rawOffsetInMinutes: -540,
		abbreviation: "GAMT",
		rawFormat: "-09:00 Gambier Time - Gambier"
	},
	{
		name: "America/Los_Angeles",
		alternativeName: "Pacific Time",
		group: [
			"America/Los_Angeles",
			"US/Pacific"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "United States",
		countryCode: "US",
		mainCities: [
			"Los Angeles",
			"San Diego",
			"San Jose",
			"San Francisco"
		],
		rawOffsetInMinutes: -480,
		abbreviation: "PST",
		rawFormat: "-08:00 Pacific Time - Los Angeles, San Diego, San Jose, San Francisco"
	},
	{
		name: "America/Tijuana",
		alternativeName: "Pacific Time",
		group: [
			"America/Tijuana",
			"America/Ensenada",
			"America/Santa_Isabel",
			"Mexico/BajaNorte"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Mexico",
		countryCode: "MX",
		mainCities: [
			"Tijuana",
			"Mexicali",
			"Ensenada",
			"Rosarito"
		],
		rawOffsetInMinutes: -480,
		abbreviation: "PST",
		rawFormat: "-08:00 Pacific Time - Tijuana, Mexicali, Ensenada, Rosarito"
	},
	{
		name: "America/Vancouver",
		alternativeName: "Pacific Time",
		group: [
			"America/Vancouver",
			"Canada/Pacific"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Vancouver",
			"Surrey",
			"Okanagan",
			"Victoria"
		],
		rawOffsetInMinutes: -480,
		abbreviation: "PST",
		rawFormat: "-08:00 Pacific Time - Vancouver, Surrey, Okanagan, Victoria"
	},
	{
		name: "Pacific/Pitcairn",
		alternativeName: "Pitcairn Time",
		group: [
			"Pacific/Pitcairn"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Pitcairn",
		countryCode: "PN",
		mainCities: [
			"Adamstown"
		],
		rawOffsetInMinutes: -480,
		abbreviation: "PST",
		rawFormat: "-08:00 Pitcairn Time - Adamstown"
	},
	{
		name: "America/Hermosillo",
		alternativeName: "Mexican Pacific Time",
		group: [
			"America/Hermosillo"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Mexico",
		countryCode: "MX",
		mainCities: [
			"Hermosillo",
			"Ciudad Obregón",
			"Nogales",
			"San Luis Río Colorado"
		],
		rawOffsetInMinutes: -420,
		abbreviation: "GMT-7",
		rawFormat: "-07:00 Mexican Pacific Time - Hermosillo, Ciudad Obregón, Nogales, San Luis Río Colorado"
	},
	{
		name: "America/Edmonton",
		alternativeName: "Mountain Time",
		group: [
			"America/Cambridge_Bay",
			"America/Edmonton",
			"America/Inuvik",
			"America/Yellowknife",
			"Canada/Mountain"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Calgary",
			"Edmonton",
			"Red Deer",
			"Sherwood Park"
		],
		rawOffsetInMinutes: -420,
		abbreviation: "MST",
		rawFormat: "-07:00 Mountain Time - Calgary, Edmonton, Red Deer, Sherwood Park"
	},
	{
		name: "America/Ojinaga",
		alternativeName: "Mountain Time",
		group: [
			"America/Chihuahua",
			"America/Mazatlan",
			"America/Ojinaga",
			"Mexico/BajaSur"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Mexico",
		countryCode: "MX",
		mainCities: [
			"Ciudad Juárez",
			"Chihuahua",
			"Culiacán",
			"Mazatlán"
		],
		rawOffsetInMinutes: -420,
		abbreviation: "MST",
		rawFormat: "-07:00 Mountain Time - Ciudad Juárez, Chihuahua, Culiacán, Mazatlán"
	},
	{
		name: "America/Denver",
		alternativeName: "Mountain Time",
		group: [
			"America/Boise",
			"America/Denver",
			"America/Shiprock",
			"Navajo",
			"US/Mountain"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "United States",
		countryCode: "US",
		mainCities: [
			"Denver",
			"El Paso",
			"Albuquerque",
			"Colorado Springs"
		],
		rawOffsetInMinutes: -420,
		abbreviation: "MST",
		rawFormat: "-07:00 Mountain Time - Denver, El Paso, Albuquerque, Colorado Springs"
	},
	{
		name: "America/Phoenix",
		alternativeName: "Mountain Time",
		group: [
			"America/Phoenix",
			"US/Arizona",
			"America/Creston"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "United States",
		countryCode: "US",
		mainCities: [
			"Phoenix",
			"Tucson",
			"Mesa",
			"Chandler"
		],
		rawOffsetInMinutes: -420,
		abbreviation: "MST",
		rawFormat: "-07:00 Mountain Time - Phoenix, Tucson, Mesa, Chandler"
	},
	{
		name: "America/Whitehorse",
		alternativeName: "Yukon Time",
		group: [
			"America/Creston",
			"America/Dawson",
			"America/Dawson_Creek",
			"America/Fort_Nelson",
			"America/Whitehorse",
			"Canada/Yukon"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Whitehorse",
			"Fort St. John",
			"Creston",
			"Dawson"
		],
		rawOffsetInMinutes: -420,
		abbreviation: "YT",
		rawFormat: "-07:00 Yukon Time - Whitehorse, Fort St. John, Creston, Dawson"
	},
	{
		name: "America/Belize",
		alternativeName: "Central Time",
		group: [
			"America/Belize"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Belize",
		countryCode: "BZ",
		mainCities: [
			"Belize City",
			"San Ignacio",
			"San Pedro",
			"Orange Walk"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - Belize City, San Ignacio, San Pedro, Orange Walk"
	},
	{
		name: "America/Chicago",
		alternativeName: "Central Time",
		group: [
			"America/Chicago",
			"America/Indiana/Knox",
			"America/Indiana/Tell_City",
			"America/Menominee",
			"America/North_Dakota/Beulah",
			"America/North_Dakota/Center",
			"America/North_Dakota/New_Salem",
			"US/Central",
			"America/Knox_IN",
			"US/Indiana-Starke"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "United States",
		countryCode: "US",
		mainCities: [
			"Chicago",
			"Houston",
			"San Antonio",
			"Dallas"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - Chicago, Houston, San Antonio, Dallas"
	},
	{
		name: "America/Guatemala",
		alternativeName: "Central Time",
		group: [
			"America/Guatemala"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Guatemala",
		countryCode: "GT",
		mainCities: [
			"Guatemala City",
			"Mixco",
			"Villa Nueva",
			"Petapa"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - Guatemala City, Mixco, Villa Nueva, Petapa"
	},
	{
		name: "America/Managua",
		alternativeName: "Central Time",
		group: [
			"America/Managua"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Nicaragua",
		countryCode: "NI",
		mainCities: [
			"Managua",
			"León",
			"Masaya",
			"Chinandega"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - Managua, León, Masaya, Chinandega"
	},
	{
		name: "America/Mexico_City",
		alternativeName: "Central Time",
		group: [
			"America/Bahia_Banderas",
			"America/Matamoros",
			"America/Merida",
			"America/Mexico_City",
			"America/Monterrey",
			"Mexico/General"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Mexico",
		countryCode: "MX",
		mainCities: [
			"Mexico City",
			"Iztapalapa",
			"Ecatepec de Morelos",
			"Guadalajara"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - Mexico City, Iztapalapa, Ecatepec de Morelos, Guadalajara"
	},
	{
		name: "America/Costa_Rica",
		alternativeName: "Central Time",
		group: [
			"America/Costa_Rica"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Costa Rica",
		countryCode: "CR",
		mainCities: [
			"San José",
			"Limón",
			"San Francisco",
			"Alajuela"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - San José, Limón, San Francisco, Alajuela"
	},
	{
		name: "America/El_Salvador",
		alternativeName: "Central Time",
		group: [
			"America/El_Salvador"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "El Salvador",
		countryCode: "SV",
		mainCities: [
			"San Salvador",
			"Soyapango",
			"Santa Ana",
			"San Miguel"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - San Salvador, Soyapango, Santa Ana, San Miguel"
	},
	{
		name: "America/Regina",
		alternativeName: "Central Time",
		group: [
			"America/Regina",
			"America/Swift_Current",
			"Canada/Saskatchewan"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Saskatoon",
			"Regina",
			"Prince Albert",
			"Moose Jaw"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - Saskatoon, Regina, Prince Albert, Moose Jaw"
	},
	{
		name: "America/Tegucigalpa",
		alternativeName: "Central Time",
		group: [
			"America/Tegucigalpa"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Honduras",
		countryCode: "HN",
		mainCities: [
			"Tegucigalpa",
			"San Pedro Sula",
			"Choloma",
			"La Ceiba"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - Tegucigalpa, San Pedro Sula, Choloma, La Ceiba"
	},
	{
		name: "America/Winnipeg",
		alternativeName: "Central Time",
		group: [
			"America/Rainy_River",
			"America/Rankin_Inlet",
			"America/Resolute",
			"America/Winnipeg",
			"Canada/Central"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Winnipeg",
			"Brandon",
			"Steinbach",
			"Kenora"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "CST",
		rawFormat: "-06:00 Central Time - Winnipeg, Brandon, Steinbach, Kenora"
	},
	{
		name: "Pacific/Easter",
		alternativeName: "Easter Island Time",
		group: [
			"Pacific/Easter",
			"Chile/EasterIsland"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Chile",
		countryCode: "CL",
		mainCities: [
			"Easter"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "EAST",
		rawFormat: "-06:00 Easter Island Time - Easter"
	},
	{
		name: "Pacific/Galapagos",
		alternativeName: "Galapagos Time",
		group: [
			"Pacific/Galapagos"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Ecuador",
		countryCode: "EC",
		mainCities: [
			"Galapagos"
		],
		rawOffsetInMinutes: -360,
		abbreviation: "GALT",
		rawFormat: "-06:00 Galapagos Time - Galapagos"
	},
	{
		name: "America/Rio_Branco",
		alternativeName: "Acre Time",
		group: [
			"America/Eirunepe",
			"America/Rio_Branco",
			"America/Porto_Acre",
			"Brazil/Acre"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Brazil",
		countryCode: "BR",
		mainCities: [
			"Rio Branco",
			"Cruzeiro do Sul",
			"Sena Madureira",
			"Eirunepé"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "ACT",
		rawFormat: "-05:00 Acre Time - Rio Branco, Cruzeiro do Sul, Sena Madureira, Eirunepé"
	},
	{
		name: "America/Bogota",
		alternativeName: "Colombia Time",
		group: [
			"America/Bogota"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Colombia",
		countryCode: "CO",
		mainCities: [
			"Bogotá",
			"Cali",
			"Medellín",
			"Barranquilla"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "COT",
		rawFormat: "-05:00 Colombia Time - Bogotá, Cali, Medellín, Barranquilla"
	},
	{
		name: "America/Havana",
		alternativeName: "Cuba Time",
		group: [
			"America/Havana",
			"Cuba"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Cuba",
		countryCode: "CU",
		mainCities: [
			"Havana",
			"Santiago de Cuba",
			"Camagüey",
			"Holguín"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "CST",
		rawFormat: "-05:00 Cuba Time - Havana, Santiago de Cuba, Camagüey, Holguín"
	},
	{
		name: "America/Atikokan",
		alternativeName: "Eastern Time",
		group: [
			"America/Atikokan"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Atikokan"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - Atikokan"
	},
	{
		name: "America/Cancun",
		alternativeName: "Eastern Time",
		group: [
			"America/Cancun"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Mexico",
		countryCode: "MX",
		mainCities: [
			"Cancún",
			"Chetumal",
			"Playa del Carmen",
			"Cozumel"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - Cancún, Chetumal, Playa del Carmen, Cozumel"
	},
	{
		name: "America/Grand_Turk",
		alternativeName: "Eastern Time",
		group: [
			"America/Grand_Turk"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Turks and Caicos Islands",
		countryCode: "TC",
		mainCities: [
			"Cockburn Town"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - Cockburn Town"
	},
	{
		name: "America/Cayman",
		alternativeName: "Eastern Time",
		group: [
			"America/Cayman"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Cayman Islands",
		countryCode: "KY",
		mainCities: [
			"George Town"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - George Town"
	},
	{
		name: "America/Jamaica",
		alternativeName: "Eastern Time",
		group: [
			"America/Jamaica",
			"Jamaica"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Jamaica",
		countryCode: "JM",
		mainCities: [
			"Kingston",
			"New Kingston",
			"Spanish Town",
			"Portmore"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - Kingston, New Kingston, Spanish Town, Portmore"
	},
	{
		name: "America/Nassau",
		alternativeName: "Eastern Time",
		group: [
			"America/Nassau"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Bahamas",
		countryCode: "BS",
		mainCities: [
			"Nassau",
			"Lucaya",
			"Freeport"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - Nassau, Lucaya, Freeport"
	},
	{
		name: "America/New_York",
		alternativeName: "Eastern Time",
		group: [
			"America/Detroit",
			"America/Indiana/Indianapolis",
			"America/Indiana/Marengo",
			"America/Indiana/Petersburg",
			"America/Indiana/Vevay",
			"America/Indiana/Vincennes",
			"America/Indiana/Winamac",
			"America/Kentucky/Louisville",
			"America/Kentucky/Monticello",
			"America/New_York",
			"US/Michigan",
			"America/Fort_Wayne",
			"America/Indianapolis",
			"US/East-Indiana",
			"America/Louisville",
			"US/Eastern"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "United States",
		countryCode: "US",
		mainCities: [
			"New York City",
			"Brooklyn",
			"Queens",
			"Philadelphia"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - New York City, Brooklyn, Queens, Philadelphia"
	},
	{
		name: "America/Panama",
		alternativeName: "Eastern Time",
		group: [
			"America/Panama",
			"America/Coral_Harbour"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Panama",
		countryCode: "PA",
		mainCities: [
			"Panamá",
			"San Miguelito",
			"Juan Díaz",
			"David"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - Panamá, San Miguelito, Juan Díaz, David"
	},
	{
		name: "America/Port-au-Prince",
		alternativeName: "Eastern Time",
		group: [
			"America/Port-au-Prince"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Haiti",
		countryCode: "HT",
		mainCities: [
			"Port-au-Prince",
			"Carrefour",
			"Delmas 73",
			"Pétionville"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - Port-au-Prince, Carrefour, Delmas 73, Pétionville"
	},
	{
		name: "America/Toronto",
		alternativeName: "Eastern Time",
		group: [
			"America/Iqaluit",
			"America/Nipigon",
			"America/Pangnirtung",
			"America/Thunder_Bay",
			"America/Toronto",
			"America/Montreal",
			"Canada/Eastern"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Toronto",
			"Montréal",
			"Ottawa",
			"Mississauga"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "EST",
		rawFormat: "-05:00 Eastern Time - Toronto, Montréal, Ottawa, Mississauga"
	},
	{
		name: "America/Guayaquil",
		alternativeName: "Ecuador Time",
		group: [
			"America/Guayaquil"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Ecuador",
		countryCode: "EC",
		mainCities: [
			"Guayaquil",
			"Quito",
			"Cuenca",
			"Santo Domingo de los Colorados"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "ECT",
		rawFormat: "-05:00 Ecuador Time - Guayaquil, Quito, Cuenca, Santo Domingo de los Colorados"
	},
	{
		name: "America/Lima",
		alternativeName: "Peru Time",
		group: [
			"America/Lima"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Peru",
		countryCode: "PE",
		mainCities: [
			"Lima",
			"Arequipa",
			"Callao",
			"Trujillo"
		],
		rawOffsetInMinutes: -300,
		abbreviation: "PET",
		rawFormat: "-05:00 Peru Time - Lima, Arequipa, Callao, Trujillo"
	},
	{
		name: "America/Manaus",
		alternativeName: "Amazon Time",
		group: [
			"America/Boa_Vista",
			"America/Campo_Grande",
			"America/Cuiaba",
			"America/Manaus",
			"America/Porto_Velho",
			"Brazil/West"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Brazil",
		countryCode: "BR",
		mainCities: [
			"Manaus",
			"Campo Grande",
			"Cuiabá",
			"Porto Velho"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AMT",
		rawFormat: "-04:00 Amazon Time - Manaus, Campo Grande, Cuiabá, Porto Velho"
	},
	{
		name: "America/St_Kitts",
		alternativeName: "Atlantic Time",
		group: [
			"America/St_Kitts"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Saint Kitts and Nevis",
		countryCode: "KN",
		mainCities: [
			"Basseterre"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Basseterre"
	},
	{
		name: "America/Blanc-Sablon",
		alternativeName: "Atlantic Time",
		group: [
			"America/Blanc-Sablon"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Blanc-Sablon"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Blanc-Sablon"
	},
	{
		name: "America/Montserrat",
		alternativeName: "Atlantic Time",
		group: [
			"America/Montserrat"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Montserrat",
		countryCode: "MS",
		mainCities: [
			"Brades",
			"Plymouth"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Brades, Plymouth"
	},
	{
		name: "America/Barbados",
		alternativeName: "Atlantic Time",
		group: [
			"America/Barbados"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Barbados",
		countryCode: "BB",
		mainCities: [
			"Bridgetown"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Bridgetown"
	},
	{
		name: "America/St_Lucia",
		alternativeName: "Atlantic Time",
		group: [
			"America/St_Lucia"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Saint Lucia",
		countryCode: "LC",
		mainCities: [
			"Castries"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Castries"
	},
	{
		name: "America/Port_of_Spain",
		alternativeName: "Atlantic Time",
		group: [
			"America/Port_of_Spain"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Trinidad and Tobago",
		countryCode: "TT",
		mainCities: [
			"Chaguanas",
			"Mon Repos",
			"San Fernando",
			"Port of Spain"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Chaguanas, Mon Repos, San Fernando, Port of Spain"
	},
	{
		name: "America/Martinique",
		alternativeName: "Atlantic Time",
		group: [
			"America/Martinique"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Martinique",
		countryCode: "MQ",
		mainCities: [
			"Fort-de-France",
			"Le Lamentin",
			"Le Robert",
			"Sainte-Marie"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Fort-de-France, Le Lamentin, Le Robert, Sainte-Marie"
	},
	{
		name: "America/St_Barthelemy",
		alternativeName: "Atlantic Time",
		group: [
			"America/St_Barthelemy"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Saint Barthelemy",
		countryCode: "BL",
		mainCities: [
			"Gustavia"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Gustavia"
	},
	{
		name: "America/Halifax",
		alternativeName: "Atlantic Time",
		group: [
			"America/Glace_Bay",
			"America/Goose_Bay",
			"America/Halifax",
			"America/Moncton",
			"Canada/Atlantic"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"Halifax",
			"Moncton",
			"Sydney",
			"Dartmouth"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Halifax, Moncton, Sydney, Dartmouth"
	},
	{
		name: "Atlantic/Bermuda",
		alternativeName: "Atlantic Time",
		group: [
			"Atlantic/Bermuda"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Bermuda",
		countryCode: "BM",
		mainCities: [
			"Hamilton"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Hamilton"
	},
	{
		name: "America/St_Vincent",
		alternativeName: "Atlantic Time",
		group: [
			"America/St_Vincent"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Saint Vincent and the Grenadines",
		countryCode: "VC",
		mainCities: [
			"Kingstown",
			"Kingstown Park"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Kingstown, Kingstown Park"
	},
	{
		name: "America/Kralendijk",
		alternativeName: "Atlantic Time",
		group: [
			"America/Kralendijk"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Bonaire, Saint Eustatius and Saba ",
		countryCode: "BQ",
		mainCities: [
			"Kralendijk"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Kralendijk"
	},
	{
		name: "America/Guadeloupe",
		alternativeName: "Atlantic Time",
		group: [
			"America/Guadeloupe"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Guadeloupe",
		countryCode: "GP",
		mainCities: [
			"Les Abymes",
			"Baie-Mahault",
			"Le Gosier",
			"Petit-Bourg"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Les Abymes, Baie-Mahault, Le Gosier, Petit-Bourg"
	},
	{
		name: "America/Marigot",
		alternativeName: "Atlantic Time",
		group: [
			"America/Marigot"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Saint Martin",
		countryCode: "MF",
		mainCities: [
			"Marigot"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Marigot"
	},
	{
		name: "America/Aruba",
		alternativeName: "Atlantic Time",
		group: [
			"America/Aruba"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Aruba",
		countryCode: "AW",
		mainCities: [
			"Oranjestad",
			"Tanki Leendert",
			"San Nicolas"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Oranjestad, Tanki Leendert, San Nicolas"
	},
	{
		name: "America/Lower_Princes",
		alternativeName: "Atlantic Time",
		group: [
			"America/Lower_Princes"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Sint Maarten",
		countryCode: "SX",
		mainCities: [
			"Philipsburg"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Philipsburg"
	},
	{
		name: "America/Tortola",
		alternativeName: "Atlantic Time",
		group: [
			"America/Tortola"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "British Virgin Islands",
		countryCode: "VG",
		mainCities: [
			"Road Town"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Road Town"
	},
	{
		name: "America/Dominica",
		alternativeName: "Atlantic Time",
		group: [
			"America/Dominica"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Dominica",
		countryCode: "DM",
		mainCities: [
			"Roseau"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Roseau"
	},
	{
		name: "America/St_Thomas",
		alternativeName: "Atlantic Time",
		group: [
			"America/St_Thomas"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "U.S. Virgin Islands",
		countryCode: "VI",
		mainCities: [
			"Saint Croix",
			"Charlotte Amalie"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Saint Croix, Charlotte Amalie"
	},
	{
		name: "America/Grenada",
		alternativeName: "Atlantic Time",
		group: [
			"America/Grenada"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Grenada",
		countryCode: "GD",
		mainCities: [
			"Saint George's"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Saint George's"
	},
	{
		name: "America/Antigua",
		alternativeName: "Atlantic Time",
		group: [
			"America/Antigua"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Antigua and Barbuda",
		countryCode: "AG",
		mainCities: [
			"Saint John’s"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Saint John’s"
	},
	{
		name: "America/Puerto_Rico",
		alternativeName: "Atlantic Time",
		group: [
			"America/Puerto_Rico",
			"America/Virgin"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Puerto Rico",
		countryCode: "PR",
		mainCities: [
			"San Juan",
			"Bayamón",
			"Carolina",
			"Ponce"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - San Juan, Bayamón, Carolina, Ponce"
	},
	{
		name: "America/Santo_Domingo",
		alternativeName: "Atlantic Time",
		group: [
			"America/Santo_Domingo"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Dominican Republic",
		countryCode: "DO",
		mainCities: [
			"Santo Domingo",
			"Santiago de los Caballeros",
			"Santo Domingo Oeste",
			"Santo Domingo Este"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Santo Domingo, Santiago de los Caballeros, Santo Domingo Oeste, Santo Domingo Este"
	},
	{
		name: "America/Anguilla",
		alternativeName: "Atlantic Time",
		group: [
			"America/Anguilla"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Anguilla",
		countryCode: "AI",
		mainCities: [
			"The Valley"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - The Valley"
	},
	{
		name: "America/Thule",
		alternativeName: "Atlantic Time",
		group: [
			"America/Thule"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Greenland",
		countryCode: "GL",
		mainCities: [
			"Thule"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Thule"
	},
	{
		name: "America/Curacao",
		alternativeName: "Atlantic Time",
		group: [
			"America/Curacao"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Curacao",
		countryCode: "CW",
		mainCities: [
			"Willemstad"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "AST",
		rawFormat: "-04:00 Atlantic Time - Willemstad"
	},
	{
		name: "America/La_Paz",
		alternativeName: "Bolivia Time",
		group: [
			"America/La_Paz"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Bolivia",
		countryCode: "BO",
		mainCities: [
			"La Paz",
			"Santa Cruz de la Sierra",
			"Cochabamba",
			"Sucre"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "BOT",
		rawFormat: "-04:00 Bolivia Time - La Paz, Santa Cruz de la Sierra, Cochabamba, Sucre"
	},
	{
		name: "America/Santiago",
		alternativeName: "Chile Time",
		group: [
			"America/Santiago",
			"Chile/Continental"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Chile",
		countryCode: "CL",
		mainCities: [
			"Santiago",
			"Puente Alto",
			"Antofagasta",
			"Viña del Mar"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "CLT",
		rawFormat: "-04:00 Chile Time - Santiago, Puente Alto, Antofagasta, Viña del Mar"
	},
	{
		name: "America/Guyana",
		alternativeName: "Guyana Time",
		group: [
			"America/Guyana"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Guyana",
		countryCode: "GY",
		mainCities: [
			"Georgetown",
			"Linden",
			"New Amsterdam"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "GYT",
		rawFormat: "-04:00 Guyana Time - Georgetown, Linden, New Amsterdam"
	},
	{
		name: "America/Asuncion",
		alternativeName: "Paraguay Time",
		group: [
			"America/Asuncion"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Paraguay",
		countryCode: "PY",
		mainCities: [
			"Asunción",
			"Ciudad del Este",
			"San Lorenzo",
			"Capiatá"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "PYT",
		rawFormat: "-04:00 Paraguay Time - Asunción, Ciudad del Este, San Lorenzo, Capiatá"
	},
	{
		name: "America/Caracas",
		alternativeName: "Venezuela Time",
		group: [
			"America/Caracas"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Venezuela",
		countryCode: "VE",
		mainCities: [
			"Caracas",
			"Maracaibo",
			"Maracay",
			"Valencia"
		],
		rawOffsetInMinutes: -240,
		abbreviation: "VET",
		rawFormat: "-04:00 Venezuela Time - Caracas, Maracaibo, Maracay, Valencia"
	},
	{
		name: "America/St_Johns",
		alternativeName: "Newfoundland Time",
		group: [
			"America/St_Johns",
			"Canada/Newfoundland"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Canada",
		countryCode: "CA",
		mainCities: [
			"St. John's",
			"Mount Pearl",
			"Corner Brook",
			"Conception Bay South"
		],
		rawOffsetInMinutes: -210,
		abbreviation: "NST",
		rawFormat: "-03:30 Newfoundland Time - St. John's, Mount Pearl, Corner Brook, Conception Bay South"
	},
	{
		name: "America/Argentina/Buenos_Aires",
		alternativeName: "Argentina Time",
		group: [
			"America/Argentina/Buenos_Aires",
			"America/Argentina/Catamarca",
			"America/Argentina/Cordoba",
			"America/Argentina/Jujuy",
			"America/Argentina/La_Rioja",
			"America/Argentina/Mendoza",
			"America/Argentina/Rio_Gallegos",
			"America/Argentina/Salta",
			"America/Argentina/San_Juan",
			"America/Argentina/San_Luis",
			"America/Argentina/Tucuman",
			"America/Argentina/Ushuaia",
			"America/Buenos_Aires",
			"America/Argentina/ComodRivadavia",
			"America/Catamarca",
			"America/Cordoba",
			"America/Rosario",
			"America/Jujuy",
			"America/Mendoza"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Argentina",
		countryCode: "AR",
		mainCities: [
			"Buenos Aires",
			"Córdoba",
			"Rosario",
			"Mendoza"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "ART",
		rawFormat: "-03:00 Argentina Time - Buenos Aires, Córdoba, Rosario, Mendoza"
	},
	{
		name: "America/Sao_Paulo",
		alternativeName: "Brasilia Time",
		group: [
			"America/Araguaina",
			"America/Bahia",
			"America/Belem",
			"America/Fortaleza",
			"America/Maceio",
			"America/Recife",
			"America/Santarem",
			"America/Sao_Paulo",
			"Brazil/East"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Brazil",
		countryCode: "BR",
		mainCities: [
			"São Paulo",
			"Rio de Janeiro",
			"Salvador",
			"Fortaleza"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "BRT",
		rawFormat: "-03:00 Brasilia Time - São Paulo, Rio de Janeiro, Salvador, Fortaleza"
	},
	{
		name: "Antarctica/Palmer",
		alternativeName: "Chile Time",
		group: [
			"Antarctica/Palmer",
			"Antarctica/Rothera"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"Palmer",
			"Rothera"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "CLT",
		rawFormat: "-03:00 Chile Time - Palmer, Rothera"
	},
	{
		name: "America/Punta_Arenas",
		alternativeName: "Chile Time",
		group: [
			"America/Punta_Arenas"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Chile",
		countryCode: "CL",
		mainCities: [
			"Punta Arenas",
			"Puerto Natales"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "CLT",
		rawFormat: "-03:00 Chile Time - Punta Arenas, Puerto Natales"
	},
	{
		name: "Atlantic/Stanley",
		alternativeName: "Falkland Islands Time",
		group: [
			"Atlantic/Stanley"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Falkland Islands",
		countryCode: "FK",
		mainCities: [
			"Stanley"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "FKST",
		rawFormat: "-03:00 Falkland Islands Time - Stanley"
	},
	{
		name: "America/Cayenne",
		alternativeName: "French Guiana Time",
		group: [
			"America/Cayenne"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "French Guiana",
		countryCode: "GF",
		mainCities: [
			"Cayenne",
			"Matoury",
			"Saint-Laurent-du-Maroni",
			"Kourou"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "GFT",
		rawFormat: "-03:00 French Guiana Time - Cayenne, Matoury, Saint-Laurent-du-Maroni, Kourou"
	},
	{
		name: "America/Miquelon",
		alternativeName: "St. Pierre & Miquelon Time",
		group: [
			"America/Miquelon"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Saint Pierre and Miquelon",
		countryCode: "PM",
		mainCities: [
			"Saint-Pierre"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "PM",
		rawFormat: "-03:00 St. Pierre & Miquelon Time - Saint-Pierre"
	},
	{
		name: "America/Paramaribo",
		alternativeName: "Suriname Time",
		group: [
			"America/Paramaribo"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Suriname",
		countryCode: "SR",
		mainCities: [
			"Paramaribo",
			"Lelydorp"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "SRT",
		rawFormat: "-03:00 Suriname Time - Paramaribo, Lelydorp"
	},
	{
		name: "America/Montevideo",
		alternativeName: "Uruguay Time",
		group: [
			"America/Montevideo"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Uruguay",
		countryCode: "UY",
		mainCities: [
			"Montevideo",
			"Salto",
			"Paysandú",
			"Las Piedras"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "UYT",
		rawFormat: "-03:00 Uruguay Time - Montevideo, Salto, Paysandú, Las Piedras"
	},
	{
		name: "America/Nuuk",
		alternativeName: "West Greenland Time",
		group: [
			"America/Nuuk",
			"America/Godthab"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Greenland",
		countryCode: "GL",
		mainCities: [
			"Nuuk"
		],
		rawOffsetInMinutes: -180,
		abbreviation: "WGT",
		rawFormat: "-03:00 West Greenland Time - Nuuk"
	},
	{
		name: "America/Noronha",
		alternativeName: "Fernando de Noronha Time",
		group: [
			"America/Noronha",
			"Brazil/DeNoronha"
		],
		continentCode: "SA",
		continentName: "South America",
		countryName: "Brazil",
		countryCode: "BR",
		mainCities: [
			"Noronha"
		],
		rawOffsetInMinutes: -120,
		abbreviation: "FNT",
		rawFormat: "-02:00 Fernando de Noronha Time - Noronha"
	},
	{
		name: "Atlantic/South_Georgia",
		alternativeName: "South Georgia Time",
		group: [
			"Atlantic/South_Georgia"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "South Georgia and the South Sandwich Islands",
		countryCode: "GS",
		mainCities: [
			"Grytviken"
		],
		rawOffsetInMinutes: -120,
		abbreviation: "GST",
		rawFormat: "-02:00 South Georgia Time - Grytviken"
	},
	{
		name: "Atlantic/Azores",
		alternativeName: "Azores Time",
		group: [
			"Atlantic/Azores"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Portugal",
		countryCode: "PT",
		mainCities: [
			"Ponta Delgada"
		],
		rawOffsetInMinutes: -60,
		abbreviation: "AZOT",
		rawFormat: "-01:00 Azores Time - Ponta Delgada"
	},
	{
		name: "Atlantic/Cape_Verde",
		alternativeName: "Cape Verde Time",
		group: [
			"Atlantic/Cape_Verde"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Cabo Verde",
		countryCode: "CV",
		mainCities: [
			"Praia",
			"Mindelo",
			"Santa Maria",
			"Cova Figueira"
		],
		rawOffsetInMinutes: -60,
		abbreviation: "CVT",
		rawFormat: "-01:00 Cape Verde Time - Praia, Mindelo, Santa Maria, Cova Figueira"
	},
	{
		name: "America/Scoresbysund",
		alternativeName: "East Greenland Time",
		group: [
			"America/Scoresbysund"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Greenland",
		countryCode: "GL",
		mainCities: [
			"Scoresbysund"
		],
		rawOffsetInMinutes: -60,
		abbreviation: "EGT",
		rawFormat: "-01:00 East Greenland Time - Scoresbysund"
	},
	{
		name: "Africa/Abidjan",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Abidjan",
			"Africa/Timbuktu"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Ivory Coast",
		countryCode: "CI",
		mainCities: [
			"Abidjan",
			"Abobo",
			"Bouaké",
			"Daloa"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Abidjan, Abobo, Bouaké, Daloa"
	},
	{
		name: "Africa/Accra",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Accra"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Ghana",
		countryCode: "GH",
		mainCities: [
			"Accra",
			"Kumasi",
			"Tamale",
			"Takoradi"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Accra, Kumasi, Tamale, Takoradi"
	},
	{
		name: "Africa/Bamako",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Bamako"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Mali",
		countryCode: "ML",
		mainCities: [
			"Bamako",
			"Ségou",
			"Sikasso",
			"Mopti"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Bamako, Ségou, Sikasso, Mopti"
	},
	{
		name: "Africa/Bissau",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Bissau"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Guinea-Bissau",
		countryCode: "GW",
		mainCities: [
			"Bissau",
			"Bafatá"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Bissau, Bafatá"
	},
	{
		name: "Africa/Conakry",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Conakry"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Guinea",
		countryCode: "GN",
		mainCities: [
			"Camayenne",
			"Conakry",
			"Nzérékoré",
			"Kindia"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Camayenne, Conakry, Nzérékoré, Kindia"
	},
	{
		name: "Africa/Dakar",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Dakar"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Senegal",
		countryCode: "SN",
		mainCities: [
			"Dakar",
			"Pikine",
			"Touba",
			"Thiès"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Dakar, Pikine, Touba, Thiès"
	},
	{
		name: "America/Danmarkshavn",
		alternativeName: "Greenwich Mean Time",
		group: [
			"America/Danmarkshavn"
		],
		continentCode: "NA",
		continentName: "North America",
		countryName: "Greenland",
		countryCode: "GL",
		mainCities: [
			"Danmarkshavn"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Danmarkshavn"
	},
	{
		name: "Europe/Isle_of_Man",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Europe/Isle_of_Man"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Isle of Man",
		countryCode: "IM",
		mainCities: [
			"Douglas"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Douglas"
	},
	{
		name: "Europe/Dublin",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Europe/Dublin",
			"Eire"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Ireland",
		countryCode: "IE",
		mainCities: [
			"Dublin",
			"Cork",
			"Luimneach",
			"Gaillimh"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Dublin, Cork, Luimneach, Gaillimh"
	},
	{
		name: "Africa/Freetown",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Freetown"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Sierra Leone",
		countryCode: "SL",
		mainCities: [
			"Freetown",
			"Bo",
			"Kenema",
			"Koidu"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Freetown, Bo, Kenema, Koidu"
	},
	{
		name: "Atlantic/St_Helena",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Atlantic/St_Helena"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Saint Helena",
		countryCode: "SH",
		mainCities: [
			"Jamestown"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Jamestown"
	},
	{
		name: "Africa/Lome",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Lome"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Togo",
		countryCode: "TG",
		mainCities: [
			"Lomé",
			"Sokodé",
			"Kara",
			"Atakpamé"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Lomé, Sokodé, Kara, Atakpamé"
	},
	{
		name: "Europe/London",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Europe/London",
			"Europe/Belfast",
			"GB",
			"GB-Eire"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "United Kingdom",
		countryCode: "GB",
		mainCities: [
			"London",
			"Birmingham",
			"Liverpool",
			"Sheffield"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - London, Birmingham, Liverpool, Sheffield"
	},
	{
		name: "Africa/Monrovia",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Monrovia"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Liberia",
		countryCode: "LR",
		mainCities: [
			"Monrovia",
			"Gbarnga",
			"Kakata",
			"Bensonville"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Monrovia, Gbarnga, Kakata, Bensonville"
	},
	{
		name: "Africa/Nouakchott",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Nouakchott"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Mauritania",
		countryCode: "MR",
		mainCities: [
			"Nouakchott",
			"Nouadhibou",
			"Néma",
			"Kaédi"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Nouakchott, Nouadhibou, Néma, Kaédi"
	},
	{
		name: "Africa/Ouagadougou",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Ouagadougou"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Burkina Faso",
		countryCode: "BF",
		mainCities: [
			"Ouagadougou",
			"Bobo-Dioulasso",
			"Koudougou",
			"Ouahigouya"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Ouagadougou, Bobo-Dioulasso, Koudougou, Ouahigouya"
	},
	{
		name: "Atlantic/Reykjavik",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Atlantic/Reykjavik",
			"Iceland"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Iceland",
		countryCode: "IS",
		mainCities: [
			"Reykjavík",
			"Kópavogur",
			"Hafnarfjörður",
			"Akureyri"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Reykjavík, Kópavogur, Hafnarfjörður, Akureyri"
	},
	{
		name: "Europe/Jersey",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Europe/Jersey"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Jersey",
		countryCode: "JE",
		mainCities: [
			"Saint Helier"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Saint Helier"
	},
	{
		name: "Europe/Guernsey",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Europe/Guernsey"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Guernsey",
		countryCode: "GG",
		mainCities: [
			"Saint Peter Port"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Saint Peter Port"
	},
	{
		name: "Africa/Banjul",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Banjul"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Gambia",
		countryCode: "GM",
		mainCities: [
			"Serekunda",
			"Brikama",
			"Bakau",
			"Banjul"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Serekunda, Brikama, Bakau, Banjul"
	},
	{
		name: "Africa/Sao_Tome",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Africa/Sao_Tome"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Sao Tome and Principe",
		countryCode: "ST",
		mainCities: [
			"São Tomé"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - São Tomé"
	},
	{
		name: "Antarctica/Troll",
		alternativeName: "Greenwich Mean Time",
		group: [
			"Antarctica/Troll"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"Troll"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "GMT",
		rawFormat: "+00:00 Greenwich Mean Time - Troll"
	},
	{
		name: "Africa/Casablanca",
		alternativeName: "Western European Time",
		group: [
			"Africa/Casablanca"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Morocco",
		countryCode: "MA",
		mainCities: [
			"Casablanca",
			"Rabat",
			"Fès",
			"Sale"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "WET",
		rawFormat: "+00:00 Western European Time - Casablanca, Rabat, Fès, Sale"
	},
	{
		name: "Africa/El_Aaiun",
		alternativeName: "Western European Time",
		group: [
			"Africa/El_Aaiun"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Western Sahara",
		countryCode: "EH",
		mainCities: [
			"Laayoune",
			"Dakhla"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "WET",
		rawFormat: "+00:00 Western European Time - Laayoune, Dakhla"
	},
	{
		name: "Atlantic/Canary",
		alternativeName: "Western European Time",
		group: [
			"Atlantic/Canary"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Spain",
		countryCode: "ES",
		mainCities: [
			"Las Palmas de Gran Canaria",
			"Santa Cruz de Tenerife",
			"La Laguna",
			"Telde"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "WET",
		rawFormat: "+00:00 Western European Time - Las Palmas de Gran Canaria, Santa Cruz de Tenerife, La Laguna, Telde"
	},
	{
		name: "Europe/Lisbon",
		alternativeName: "Western European Time",
		group: [
			"Atlantic/Madeira",
			"Europe/Lisbon",
			"Portugal"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Portugal",
		countryCode: "PT",
		mainCities: [
			"Lisbon",
			"Porto",
			"Amadora",
			"Braga"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "WET",
		rawFormat: "+00:00 Western European Time - Lisbon, Porto, Amadora, Braga"
	},
	{
		name: "Atlantic/Faroe",
		alternativeName: "Western European Time",
		group: [
			"Atlantic/Faroe",
			"Atlantic/Faeroe"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Faroe Islands",
		countryCode: "FO",
		mainCities: [
			"Tórshavn"
		],
		rawOffsetInMinutes: 0,
		abbreviation: "WET",
		rawFormat: "+00:00 Western European Time - Tórshavn"
	},
	{
		name: "Africa/Windhoek",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Windhoek"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Namibia",
		countryCode: "NA",
		mainCities: [
			"Windhoek",
			"Rundu",
			"Walvis Bay",
			"Oshakati"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CAT",
		rawFormat: "+01:00 Central Africa Time - Windhoek, Rundu, Walvis Bay, Oshakati"
	},
	{
		name: "Africa/Algiers",
		alternativeName: "Central European Time",
		group: [
			"Africa/Algiers"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Algeria",
		countryCode: "DZ",
		mainCities: [
			"Algiers",
			"Boumerdas",
			"Oran",
			"Tébessa"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Algiers, Boumerdas, Oran, Tébessa"
	},
	{
		name: "Europe/Amsterdam",
		alternativeName: "Central European Time",
		group: [
			"Europe/Amsterdam"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Netherlands",
		countryCode: "NL",
		mainCities: [
			"Amsterdam",
			"Rotterdam",
			"The Hague",
			"Utrecht"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Amsterdam, Rotterdam, The Hague, Utrecht"
	},
	{
		name: "Europe/Andorra",
		alternativeName: "Central European Time",
		group: [
			"Europe/Andorra"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Andorra",
		countryCode: "AD",
		mainCities: [
			"Andorra la Vella",
			"les Escaldes"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Andorra la Vella, les Escaldes"
	},
	{
		name: "Europe/Belgrade",
		alternativeName: "Central European Time",
		group: [
			"Europe/Belgrade"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Serbia",
		countryCode: "RS",
		mainCities: [
			"Belgrade",
			"Niš",
			"Novi Sad",
			"Zemun"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Belgrade, Niš, Novi Sad, Zemun"
	},
	{
		name: "Europe/Berlin",
		alternativeName: "Central European Time",
		group: [
			"Europe/Berlin",
			"Europe/Busingen"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Germany",
		countryCode: "DE",
		mainCities: [
			"Berlin",
			"Hamburg",
			"Munich",
			"Köln"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Berlin, Hamburg, Munich, Köln"
	},
	{
		name: "Europe/Malta",
		alternativeName: "Central European Time",
		group: [
			"Europe/Malta"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Malta",
		countryCode: "MT",
		mainCities: [
			"Birkirkara",
			"Qormi",
			"Mosta",
			"Żabbar"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Birkirkara, Qormi, Mosta, Żabbar"
	},
	{
		name: "Europe/Bratislava",
		alternativeName: "Central European Time",
		group: [
			"Europe/Bratislava"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Slovakia",
		countryCode: "SK",
		mainCities: [
			"Bratislava",
			"Košice",
			"Prešov",
			"Nitra"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Bratislava, Košice, Prešov, Nitra"
	},
	{
		name: "Europe/Brussels",
		alternativeName: "Central European Time",
		group: [
			"Europe/Brussels"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Belgium",
		countryCode: "BE",
		mainCities: [
			"Brussels",
			"Antwerpen",
			"Gent",
			"Charleroi"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Brussels, Antwerpen, Gent, Charleroi"
	},
	{
		name: "Europe/Budapest",
		alternativeName: "Central European Time",
		group: [
			"Europe/Budapest"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Hungary",
		countryCode: "HU",
		mainCities: [
			"Budapest",
			"Debrecen",
			"Miskolc",
			"Szeged"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Budapest, Debrecen, Miskolc, Szeged"
	},
	{
		name: "Europe/Copenhagen",
		alternativeName: "Central European Time",
		group: [
			"Europe/Copenhagen"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Denmark",
		countryCode: "DK",
		mainCities: [
			"Copenhagen",
			"Århus",
			"Odense",
			"Aalborg"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Copenhagen, Århus, Odense, Aalborg"
	},
	{
		name: "Europe/Gibraltar",
		alternativeName: "Central European Time",
		group: [
			"Europe/Gibraltar"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Gibraltar",
		countryCode: "GI",
		mainCities: [
			"Gibraltar"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Gibraltar"
	},
	{
		name: "Europe/Ljubljana",
		alternativeName: "Central European Time",
		group: [
			"Europe/Ljubljana"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Slovenia",
		countryCode: "SI",
		mainCities: [
			"Ljubljana",
			"Maribor",
			"Celje",
			"Kranj"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Ljubljana, Maribor, Celje, Kranj"
	},
	{
		name: "Arctic/Longyearbyen",
		alternativeName: "Central European Time",
		group: [
			"Arctic/Longyearbyen"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Svalbard and Jan Mayen",
		countryCode: "SJ",
		mainCities: [
			"Longyearbyen"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Longyearbyen"
	},
	{
		name: "Europe/Luxembourg",
		alternativeName: "Central European Time",
		group: [
			"Europe/Luxembourg"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Luxembourg",
		countryCode: "LU",
		mainCities: [
			"Luxembourg",
			"Esch-sur-Alzette",
			"Dudelange"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Luxembourg, Esch-sur-Alzette, Dudelange"
	},
	{
		name: "Europe/Madrid",
		alternativeName: "Central European Time",
		group: [
			"Africa/Ceuta",
			"Europe/Madrid"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Spain",
		countryCode: "ES",
		mainCities: [
			"Madrid",
			"Barcelona",
			"Valencia",
			"Sevilla"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Madrid, Barcelona, Valencia, Sevilla"
	},
	{
		name: "Europe/Monaco",
		alternativeName: "Central European Time",
		group: [
			"Europe/Monaco"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Monaco",
		countryCode: "MC",
		mainCities: [
			"Monaco",
			"Monte-Carlo"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Monaco, Monte-Carlo"
	},
	{
		name: "Europe/Oslo",
		alternativeName: "Central European Time",
		group: [
			"Europe/Oslo",
			"Atlantic/Jan_Mayen"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Norway",
		countryCode: "NO",
		mainCities: [
			"Oslo",
			"Bergen",
			"Trondheim",
			"Stavanger"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Oslo, Bergen, Trondheim, Stavanger"
	},
	{
		name: "Europe/Paris",
		alternativeName: "Central European Time",
		group: [
			"Europe/Paris"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "France",
		countryCode: "FR",
		mainCities: [
			"Paris",
			"Marseille",
			"Lyon",
			"Toulouse"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Paris, Marseille, Lyon, Toulouse"
	},
	{
		name: "Europe/Podgorica",
		alternativeName: "Central European Time",
		group: [
			"Europe/Podgorica"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Montenegro",
		countryCode: "ME",
		mainCities: [
			"Podgorica",
			"Nikšić",
			"Herceg Novi",
			"Pljevlja"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Podgorica, Nikšić, Herceg Novi, Pljevlja"
	},
	{
		name: "Europe/Prague",
		alternativeName: "Central European Time",
		group: [
			"Europe/Prague"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Czechia",
		countryCode: "CZ",
		mainCities: [
			"Prague",
			"Brno",
			"Ostrava",
			"Pilsen"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Prague, Brno, Ostrava, Pilsen"
	},
	{
		name: "Europe/Rome",
		alternativeName: "Central European Time",
		group: [
			"Europe/Rome"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Italy",
		countryCode: "IT",
		mainCities: [
			"Rome",
			"Milan",
			"Naples",
			"Turin"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Rome, Milan, Naples, Turin"
	},
	{
		name: "Europe/San_Marino",
		alternativeName: "Central European Time",
		group: [
			"Europe/San_Marino"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "San Marino",
		countryCode: "SM",
		mainCities: [
			"San Marino"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - San Marino"
	},
	{
		name: "Europe/Sarajevo",
		alternativeName: "Central European Time",
		group: [
			"Europe/Sarajevo"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Bosnia and Herzegovina",
		countryCode: "BA",
		mainCities: [
			"Sarajevo",
			"Banja Luka",
			"Zenica",
			"Tuzla"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Sarajevo, Banja Luka, Zenica, Tuzla"
	},
	{
		name: "Europe/Skopje",
		alternativeName: "Central European Time",
		group: [
			"Europe/Skopje"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "North Macedonia",
		countryCode: "MK",
		mainCities: [
			"Skopje",
			"Bitola",
			"Kumanovo",
			"Prilep"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Skopje, Bitola, Kumanovo, Prilep"
	},
	{
		name: "Europe/Stockholm",
		alternativeName: "Central European Time",
		group: [
			"Europe/Stockholm"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Sweden",
		countryCode: "SE",
		mainCities: [
			"Stockholm",
			"Göteborg",
			"Malmö",
			"Uppsala"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Stockholm, Göteborg, Malmö, Uppsala"
	},
	{
		name: "Europe/Tirane",
		alternativeName: "Central European Time",
		group: [
			"Europe/Tirane"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Albania",
		countryCode: "AL",
		mainCities: [
			"Tirana",
			"Durrës",
			"Elbasan",
			"Vlorë"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Tirana, Durrës, Elbasan, Vlorë"
	},
	{
		name: "Africa/Tunis",
		alternativeName: "Central European Time",
		group: [
			"Africa/Tunis"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Tunisia",
		countryCode: "TN",
		mainCities: [
			"Tunis",
			"Sfax",
			"Sousse",
			"Kairouan"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Tunis, Sfax, Sousse, Kairouan"
	},
	{
		name: "Europe/Vaduz",
		alternativeName: "Central European Time",
		group: [
			"Europe/Vaduz"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Liechtenstein",
		countryCode: "LI",
		mainCities: [
			"Vaduz"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Vaduz"
	},
	{
		name: "Europe/Vatican",
		alternativeName: "Central European Time",
		group: [
			"Europe/Vatican"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Vatican",
		countryCode: "VA",
		mainCities: [
			"Vatican City"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Vatican City"
	},
	{
		name: "Europe/Vienna",
		alternativeName: "Central European Time",
		group: [
			"Europe/Vienna"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Austria",
		countryCode: "AT",
		mainCities: [
			"Vienna",
			"Graz",
			"Linz",
			"Favoriten"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Vienna, Graz, Linz, Favoriten"
	},
	{
		name: "Europe/Warsaw",
		alternativeName: "Central European Time",
		group: [
			"Europe/Warsaw",
			"Poland"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Poland",
		countryCode: "PL",
		mainCities: [
			"Warsaw",
			"Łódź",
			"Kraków",
			"Wrocław"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Warsaw, Łódź, Kraków, Wrocław"
	},
	{
		name: "Europe/Zagreb",
		alternativeName: "Central European Time",
		group: [
			"Europe/Zagreb"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Croatia",
		countryCode: "HR",
		mainCities: [
			"Zagreb",
			"Split",
			"Rijeka",
			"Osijek"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Zagreb, Split, Rijeka, Osijek"
	},
	{
		name: "Europe/Zurich",
		alternativeName: "Central European Time",
		group: [
			"Europe/Zurich",
			"Europe/Busingen"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Switzerland",
		countryCode: "CH",
		mainCities: [
			"Zürich",
			"Genève",
			"Basel",
			"Lausanne"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "CET",
		rawFormat: "+01:00 Central European Time - Zürich, Genève, Basel, Lausanne"
	},
	{
		name: "Africa/Bangui",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Bangui"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Central African Republic",
		countryCode: "CF",
		mainCities: [
			"Bangui",
			"Bimbo",
			"Mbaïki",
			"Berbérati"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Bangui, Bimbo, Mbaïki, Berbérati"
	},
	{
		name: "Africa/Malabo",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Malabo"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Equatorial Guinea",
		countryCode: "GQ",
		mainCities: [
			"Bata",
			"Malabo",
			"Ebebiyin"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Bata, Malabo, Ebebiyin"
	},
	{
		name: "Africa/Brazzaville",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Brazzaville"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Republic of the Congo",
		countryCode: "CG",
		mainCities: [
			"Brazzaville",
			"Pointe-Noire",
			"Dolisie",
			"Kayes"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Brazzaville, Pointe-Noire, Dolisie, Kayes"
	},
	{
		name: "Africa/Porto-Novo",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Porto-Novo"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Benin",
		countryCode: "BJ",
		mainCities: [
			"Cotonou",
			"Abomey-Calavi",
			"Djougou",
			"Porto-Novo"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Cotonou, Abomey-Calavi, Djougou, Porto-Novo"
	},
	{
		name: "Africa/Douala",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Douala"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Cameroon",
		countryCode: "CM",
		mainCities: [
			"Douala",
			"Yaoundé",
			"Garoua",
			"Kousséri"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Douala, Yaoundé, Garoua, Kousséri"
	},
	{
		name: "Africa/Kinshasa",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Kinshasa"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Democratic Republic of the Congo",
		countryCode: "CD",
		mainCities: [
			"Kinshasa",
			"Masina",
			"Kikwit",
			"Mbandaka"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Kinshasa, Masina, Kikwit, Mbandaka"
	},
	{
		name: "Africa/Lagos",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Lagos"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Nigeria",
		countryCode: "NG",
		mainCities: [
			"Lagos",
			"Kano",
			"Ibadan",
			"Kaduna"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Lagos, Kano, Ibadan, Kaduna"
	},
	{
		name: "Africa/Libreville",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Libreville"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Gabon",
		countryCode: "GA",
		mainCities: [
			"Libreville",
			"Port-Gentil",
			"Franceville",
			"Oyem"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Libreville, Port-Gentil, Franceville, Oyem"
	},
	{
		name: "Africa/Luanda",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Luanda"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Angola",
		countryCode: "AO",
		mainCities: [
			"Luanda",
			"N’dalatando",
			"Huambo",
			"Lobito"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Luanda, N’dalatando, Huambo, Lobito"
	},
	{
		name: "Africa/Ndjamena",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Ndjamena"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Chad",
		countryCode: "TD",
		mainCities: [
			"N'Djamena",
			"Moundou",
			"Sarh",
			"Abéché"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - N'Djamena, Moundou, Sarh, Abéché"
	},
	{
		name: "Africa/Niamey",
		alternativeName: "West Africa Time",
		group: [
			"Africa/Niamey"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Niger",
		countryCode: "NE",
		mainCities: [
			"Niamey",
			"Zinder",
			"Maradi",
			"Agadez"
		],
		rawOffsetInMinutes: 60,
		abbreviation: "WAT",
		rawFormat: "+01:00 West Africa Time - Niamey, Zinder, Maradi, Agadez"
	},
	{
		name: "Africa/Bujumbura",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Bujumbura"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Burundi",
		countryCode: "BI",
		mainCities: [
			"Bujumbura",
			"Muyinga",
			"Gitega",
			"Ruyigi"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Bujumbura, Muyinga, Gitega, Ruyigi"
	},
	{
		name: "Africa/Gaborone",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Gaborone"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Botswana",
		countryCode: "BW",
		mainCities: [
			"Gaborone",
			"Francistown",
			"Molepolole",
			"Selebi-Phikwe"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Gaborone, Francistown, Molepolole, Selebi-Phikwe"
	},
	{
		name: "Africa/Harare",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Harare"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Zimbabwe",
		countryCode: "ZW",
		mainCities: [
			"Harare",
			"Bulawayo",
			"Chitungwiza",
			"Mutare"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Harare, Bulawayo, Chitungwiza, Mutare"
	},
	{
		name: "Africa/Juba",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Juba"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "South Sudan",
		countryCode: "SS",
		mainCities: [
			"Juba",
			"Winejok",
			"Yei",
			"Malakal"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Juba, Winejok, Yei, Malakal"
	},
	{
		name: "Africa/Khartoum",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Khartoum"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Sudan",
		countryCode: "SD",
		mainCities: [
			"Khartoum",
			"Omdurman",
			"Nyala",
			"Port Sudan"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Khartoum, Omdurman, Nyala, Port Sudan"
	},
	{
		name: "Africa/Kigali",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Kigali"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Rwanda",
		countryCode: "RW",
		mainCities: [
			"Kigali",
			"Gisenyi",
			"Butare",
			"Gitarama"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Kigali, Gisenyi, Butare, Gitarama"
	},
	{
		name: "Africa/Blantyre",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Blantyre"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Malawi",
		countryCode: "MW",
		mainCities: [
			"Lilongwe",
			"Blantyre",
			"Mzuzu",
			"Zomba"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Lilongwe, Blantyre, Mzuzu, Zomba"
	},
	{
		name: "Africa/Lubumbashi",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Lubumbashi"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Democratic Republic of the Congo",
		countryCode: "CD",
		mainCities: [
			"Lubumbashi",
			"Mbuji-Mayi",
			"Kisangani",
			"Kananga"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Lubumbashi, Mbuji-Mayi, Kisangani, Kananga"
	},
	{
		name: "Africa/Lusaka",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Lusaka"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Zambia",
		countryCode: "ZM",
		mainCities: [
			"Lusaka",
			"Kitwe",
			"Ndola",
			"Kabwe"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Lusaka, Kitwe, Ndola, Kabwe"
	},
	{
		name: "Africa/Maputo",
		alternativeName: "Central Africa Time",
		group: [
			"Africa/Maputo"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Mozambique",
		countryCode: "MZ",
		mainCities: [
			"Maputo",
			"Matola",
			"Beira",
			"Nampula"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "CAT",
		rawFormat: "+02:00 Central Africa Time - Maputo, Matola, Beira, Nampula"
	},
	{
		name: "Asia/Damascus",
		alternativeName: "Eastern European Time",
		group: [
			"Asia/Damascus"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Syria",
		countryCode: "SY",
		mainCities: [
			"Aleppo",
			"Damascus",
			"Homs",
			"Ḩamāh"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Aleppo, Damascus, Homs, Ḩamāh"
	},
	{
		name: "Asia/Amman",
		alternativeName: "Eastern European Time",
		group: [
			"Asia/Amman"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Jordan",
		countryCode: "JO",
		mainCities: [
			"Amman",
			"Zarqa",
			"Irbid",
			"Russeifa"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Amman, Zarqa, Irbid, Russeifa"
	},
	{
		name: "Europe/Athens",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Athens"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Greece",
		countryCode: "GR",
		mainCities: [
			"Athens",
			"Thessaloníki",
			"Pátra",
			"Piraeus"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Athens, Thessaloníki, Pátra, Piraeus"
	},
	{
		name: "Asia/Beirut",
		alternativeName: "Eastern European Time",
		group: [
			"Asia/Beirut"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Lebanon",
		countryCode: "LB",
		mainCities: [
			"Beirut",
			"Ra’s Bayrūt",
			"Tripoli",
			"Sidon"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Beirut, Ra’s Bayrūt, Tripoli, Sidon"
	},
	{
		name: "Europe/Bucharest",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Bucharest"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Romania",
		countryCode: "RO",
		mainCities: [
			"Bucharest",
			"Sector 3",
			"Sector 6",
			"Sector 2"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Bucharest, Sector 3, Sector 6, Sector 2"
	},
	{
		name: "Africa/Cairo",
		alternativeName: "Eastern European Time",
		group: [
			"Africa/Cairo",
			"Egypt"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Egypt",
		countryCode: "EG",
		mainCities: [
			"Cairo",
			"Alexandria",
			"Giza",
			"Port Said"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Cairo, Alexandria, Giza, Port Said"
	},
	{
		name: "Europe/Chisinau",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Chisinau",
			"Europe/Tiraspol"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Moldova",
		countryCode: "MD",
		mainCities: [
			"Chisinau",
			"Tiraspol",
			"Bălţi",
			"Bender"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Chisinau, Tiraspol, Bălţi, Bender"
	},
	{
		name: "Asia/Hebron",
		alternativeName: "Eastern European Time",
		group: [
			"Asia/Gaza",
			"Asia/Hebron"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Palestinian Territory",
		countryCode: "PS",
		mainCities: [
			"East Jerusalem",
			"Gaza",
			"Khān Yūnis",
			"Jabālyā"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - East Jerusalem, Gaza, Khān Yūnis, Jabālyā"
	},
	{
		name: "Europe/Helsinki",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Helsinki"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Finland",
		countryCode: "FI",
		mainCities: [
			"Helsinki",
			"Espoo",
			"Tampere",
			"Vantaa"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Helsinki, Espoo, Tampere, Vantaa"
	},
	{
		name: "Europe/Kaliningrad",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Kaliningrad"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Kaliningrad",
			"Chernyakhovsk",
			"Sovetsk",
			"Baltiysk"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Kaliningrad, Chernyakhovsk, Sovetsk, Baltiysk"
	},
	{
		name: "Europe/Kiev",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Kiev",
			"Europe/Uzhgorod",
			"Europe/Zaporozhye"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Ukraine",
		countryCode: "UA",
		mainCities: [
			"Kyiv",
			"Kharkiv",
			"Donetsk",
			"Odessa"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Kyiv, Kharkiv, Donetsk, Odessa"
	},
	{
		name: "Europe/Mariehamn",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Mariehamn"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Aland Islands",
		countryCode: "AX",
		mainCities: [
			"Mariehamn"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Mariehamn"
	},
	{
		name: "Asia/Nicosia",
		alternativeName: "Eastern European Time",
		group: [
			"Asia/Famagusta",
			"Asia/Nicosia",
			"Europe/Nicosia"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Cyprus",
		countryCode: "CY",
		mainCities: [
			"Nicosia",
			"Limassol",
			"Larnaca",
			"Stróvolos"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Nicosia, Limassol, Larnaca, Stróvolos"
	},
	{
		name: "Europe/Riga",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Riga"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Latvia",
		countryCode: "LV",
		mainCities: [
			"Riga",
			"Daugavpils",
			"Liepāja",
			"Jelgava"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Riga, Daugavpils, Liepāja, Jelgava"
	},
	{
		name: "Europe/Sofia",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Sofia"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Bulgaria",
		countryCode: "BG",
		mainCities: [
			"Sofia",
			"Plovdiv",
			"Varna",
			"Burgas"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Sofia, Plovdiv, Varna, Burgas"
	},
	{
		name: "Europe/Tallinn",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Tallinn"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Estonia",
		countryCode: "EE",
		mainCities: [
			"Tallinn",
			"Tartu",
			"Narva",
			"Kohtla-Järve"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Tallinn, Tartu, Narva, Kohtla-Järve"
	},
	{
		name: "Africa/Tripoli",
		alternativeName: "Eastern European Time",
		group: [
			"Africa/Tripoli",
			"Libya"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Libya",
		countryCode: "LY",
		mainCities: [
			"Tripoli",
			"Benghazi",
			"Mişrātah",
			"Tarhuna"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Tripoli, Benghazi, Mişrātah, Tarhuna"
	},
	{
		name: "Europe/Vilnius",
		alternativeName: "Eastern European Time",
		group: [
			"Europe/Vilnius"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Lithuania",
		countryCode: "LT",
		mainCities: [
			"Vilnius",
			"Kaunas",
			"Klaipėda",
			"Šiauliai"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "EET",
		rawFormat: "+02:00 Eastern European Time - Vilnius, Kaunas, Klaipėda, Šiauliai"
	},
	{
		name: "Asia/Jerusalem",
		alternativeName: "Israel Time",
		group: [
			"Asia/Jerusalem",
			"Asia/Tel_Aviv",
			"Israel"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Israel",
		countryCode: "IL",
		mainCities: [
			"Jerusalem",
			"Tel Aviv",
			"West Jerusalem",
			"Haifa"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "IST",
		rawFormat: "+02:00 Israel Time - Jerusalem, Tel Aviv, West Jerusalem, Haifa"
	},
	{
		name: "Africa/Johannesburg",
		alternativeName: "South Africa Time",
		group: [
			"Africa/Johannesburg"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "South Africa",
		countryCode: "ZA",
		mainCities: [
			"Cape Town",
			"Durban",
			"Johannesburg",
			"Soweto"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "SAST",
		rawFormat: "+02:00 South Africa Time - Cape Town, Durban, Johannesburg, Soweto"
	},
	{
		name: "Africa/Mbabane",
		alternativeName: "South Africa Time",
		group: [
			"Africa/Mbabane"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Eswatini",
		countryCode: "SZ",
		mainCities: [
			"Manzini",
			"Mbabane",
			"Lobamba"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "SAST",
		rawFormat: "+02:00 South Africa Time - Manzini, Mbabane, Lobamba"
	},
	{
		name: "Africa/Maseru",
		alternativeName: "South Africa Time",
		group: [
			"Africa/Maseru"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Lesotho",
		countryCode: "LS",
		mainCities: [
			"Maseru",
			"Mafeteng",
			"Leribe",
			"Maputsoe"
		],
		rawOffsetInMinutes: 120,
		abbreviation: "SAST",
		rawFormat: "+02:00 South Africa Time - Maseru, Mafeteng, Leribe, Maputsoe"
	},
	{
		name: "Asia/Kuwait",
		alternativeName: "Arabian Time",
		group: [
			"Asia/Kuwait"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Kuwait",
		countryCode: "KW",
		mainCities: [
			"Al Aḩmadī",
			"Ḩawallī",
			"As Sālimīyah",
			"Şabāḩ as Sālim"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "AST",
		rawFormat: "+03:00 Arabian Time - Al Aḩmadī, Ḩawallī, As Sālimīyah, Şabāḩ as Sālim"
	},
	{
		name: "Asia/Baghdad",
		alternativeName: "Arabian Time",
		group: [
			"Asia/Baghdad"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Iraq",
		countryCode: "IQ",
		mainCities: [
			"Baghdad",
			"Basrah",
			"Al Mawşil al Jadīdah",
			"Al Başrah al Qadīmah"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "AST",
		rawFormat: "+03:00 Arabian Time - Baghdad, Basrah, Al Mawşil al Jadīdah, Al Başrah al Qadīmah"
	},
	{
		name: "Asia/Qatar",
		alternativeName: "Arabian Time",
		group: [
			"Asia/Qatar"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Qatar",
		countryCode: "QA",
		mainCities: [
			"Doha",
			"Ar Rayyān",
			"Umm Şalāl Muḩammad",
			"Al Wakrah"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "AST",
		rawFormat: "+03:00 Arabian Time - Doha, Ar Rayyān, Umm Şalāl Muḩammad, Al Wakrah"
	},
	{
		name: "Asia/Bahrain",
		alternativeName: "Arabian Time",
		group: [
			"Asia/Bahrain"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Bahrain",
		countryCode: "BH",
		mainCities: [
			"Manama",
			"Al Muharraq",
			"Ar Rifā‘",
			"Dār Kulayb"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "AST",
		rawFormat: "+03:00 Arabian Time - Manama, Al Muharraq, Ar Rifā‘, Dār Kulayb"
	},
	{
		name: "Asia/Riyadh",
		alternativeName: "Arabian Time",
		group: [
			"Asia/Riyadh"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Saudi Arabia",
		countryCode: "SA",
		mainCities: [
			"Riyadh",
			"Jeddah",
			"Mecca",
			"Medina"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "AST",
		rawFormat: "+03:00 Arabian Time - Riyadh, Jeddah, Mecca, Medina"
	},
	{
		name: "Asia/Aden",
		alternativeName: "Arabian Time",
		group: [
			"Asia/Aden"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Yemen",
		countryCode: "YE",
		mainCities: [
			"Sanaa",
			"Al Ḩudaydah",
			"Taiz",
			"Aden"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "AST",
		rawFormat: "+03:00 Arabian Time - Sanaa, Al Ḩudaydah, Taiz, Aden"
	},
	{
		name: "Africa/Addis_Ababa",
		alternativeName: "East Africa Time",
		group: [
			"Africa/Addis_Ababa"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Ethiopia",
		countryCode: "ET",
		mainCities: [
			"Addis Ababa",
			"Dire Dawa",
			"Mek'ele",
			"Nazrēt"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Addis Ababa, Dire Dawa, Mek'ele, Nazrēt"
	},
	{
		name: "Indian/Antananarivo",
		alternativeName: "East Africa Time",
		group: [
			"Indian/Antananarivo"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Madagascar",
		countryCode: "MG",
		mainCities: [
			"Antananarivo",
			"Toamasina",
			"Antsirabe",
			"Fianarantsoa"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Antananarivo, Toamasina, Antsirabe, Fianarantsoa"
	},
	{
		name: "Africa/Asmara",
		alternativeName: "East Africa Time",
		group: [
			"Africa/Asmara"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Eritrea",
		countryCode: "ER",
		mainCities: [
			"Asmara",
			"Keren",
			"Massawa",
			"Assab"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Asmara, Keren, Massawa, Assab"
	},
	{
		name: "Africa/Dar_es_Salaam",
		alternativeName: "East Africa Time",
		group: [
			"Africa/Dar_es_Salaam"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Tanzania",
		countryCode: "TZ",
		mainCities: [
			"Dar es Salaam",
			"Mwanza",
			"Zanzibar",
			"Arusha"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Dar es Salaam, Mwanza, Zanzibar, Arusha"
	},
	{
		name: "Africa/Djibouti",
		alternativeName: "East Africa Time",
		group: [
			"Africa/Djibouti"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Djibouti",
		countryCode: "DJ",
		mainCities: [
			"Djibouti",
			"'Ali Sabieh",
			"Tadjourah",
			"Obock"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Djibouti, 'Ali Sabieh, Tadjourah, Obock"
	},
	{
		name: "Africa/Kampala",
		alternativeName: "East Africa Time",
		group: [
			"Africa/Kampala"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Uganda",
		countryCode: "UG",
		mainCities: [
			"Kampala",
			"Gulu",
			"Lira",
			"Mbarara"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Kampala, Gulu, Lira, Mbarara"
	},
	{
		name: "Indian/Mayotte",
		alternativeName: "East Africa Time",
		group: [
			"Indian/Mayotte"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Mayotte",
		countryCode: "YT",
		mainCities: [
			"Mamoudzou",
			"Koungou",
			"Dzaoudzi"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Mamoudzou, Koungou, Dzaoudzi"
	},
	{
		name: "Africa/Mogadishu",
		alternativeName: "East Africa Time",
		group: [
			"Africa/Mogadishu"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Somalia",
		countryCode: "SO",
		mainCities: [
			"Mogadishu",
			"Hargeysa",
			"Berbera",
			"Kismayo"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Mogadishu, Hargeysa, Berbera, Kismayo"
	},
	{
		name: "Indian/Comoro",
		alternativeName: "East Africa Time",
		group: [
			"Indian/Comoro"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Comoros",
		countryCode: "KM",
		mainCities: [
			"Moroni",
			"Moutsamoudou"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Moroni, Moutsamoudou"
	},
	{
		name: "Africa/Nairobi",
		alternativeName: "East Africa Time",
		group: [
			"Africa/Nairobi",
			"Africa/Asmera"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Kenya",
		countryCode: "KE",
		mainCities: [
			"Nairobi",
			"Mombasa",
			"Ruiru",
			"Kikuyu"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "EAT",
		rawFormat: "+03:00 East Africa Time - Nairobi, Mombasa, Ruiru, Kikuyu"
	},
	{
		name: "Europe/Minsk",
		alternativeName: "Moscow Time",
		group: [
			"Europe/Minsk"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Belarus",
		countryCode: "BY",
		mainCities: [
			"Minsk",
			"Homyel'",
			"Mahilyow",
			"Vitebsk"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "MSK",
		rawFormat: "+03:00 Moscow Time - Minsk, Homyel', Mahilyow, Vitebsk"
	},
	{
		name: "Europe/Moscow",
		alternativeName: "Moscow Time",
		group: [
			"Europe/Kirov",
			"Europe/Moscow",
			"Europe/Volgograd",
			"W-SU"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Moscow",
			"Saint Petersburg",
			"Nizhniy Novgorod",
			"Kazan"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "MSK",
		rawFormat: "+03:00 Moscow Time - Moscow, Saint Petersburg, Nizhniy Novgorod, Kazan"
	},
	{
		name: "Europe/Simferopol",
		alternativeName: "Moscow Time",
		group: [
			"Europe/Simferopol"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Ukraine",
		countryCode: "UA",
		mainCities: [
			"Sevastopol",
			"Simferopol",
			"Kerch",
			"Yevpatoriya"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "MSK",
		rawFormat: "+03:00 Moscow Time - Sevastopol, Simferopol, Kerch, Yevpatoriya"
	},
	{
		name: "Antarctica/Syowa",
		alternativeName: "Syowa Time",
		group: [
			"Antarctica/Syowa"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"Syowa"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "SYOT",
		rawFormat: "+03:00 Syowa Time - Syowa"
	},
	{
		name: "Europe/Istanbul",
		alternativeName: "Turkey Time",
		group: [
			"Europe/Istanbul",
			"Turkey",
			"Asia/Istanbul"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Turkey",
		countryCode: "TR",
		mainCities: [
			"Istanbul",
			"Ankara",
			"İzmir",
			"Bursa"
		],
		rawOffsetInMinutes: 180,
		abbreviation: "TRT",
		rawFormat: "+03:00 Turkey Time - Istanbul, Ankara, İzmir, Bursa"
	},
	{
		name: "Asia/Tehran",
		alternativeName: "Iran Time",
		group: [
			"Asia/Tehran",
			"Iran"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Iran",
		countryCode: "IR",
		mainCities: [
			"Tehran",
			"Mashhad",
			"Isfahan",
			"Karaj"
		],
		rawOffsetInMinutes: 210,
		abbreviation: "IRST",
		rawFormat: "+03:30 Iran Time - Tehran, Mashhad, Isfahan, Karaj"
	},
	{
		name: "Asia/Yerevan",
		alternativeName: "Armenia Time",
		group: [
			"Asia/Yerevan"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Armenia",
		countryCode: "AM",
		mainCities: [
			"Yerevan",
			"Gyumri",
			"Vanadzor",
			"Vagharshapat"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "AMT",
		rawFormat: "+04:00 Armenia Time - Yerevan, Gyumri, Vanadzor, Vagharshapat"
	},
	{
		name: "Asia/Baku",
		alternativeName: "Azerbaijan Time",
		group: [
			"Asia/Baku"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Azerbaijan",
		countryCode: "AZ",
		mainCities: [
			"Baku",
			"Ganja",
			"Sumqayıt",
			"Lankaran"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "AZT",
		rawFormat: "+04:00 Azerbaijan Time - Baku, Ganja, Sumqayıt, Lankaran"
	},
	{
		name: "Asia/Tbilisi",
		alternativeName: "Georgia Time",
		group: [
			"Asia/Tbilisi"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Georgia",
		countryCode: "GE",
		mainCities: [
			"Tbilisi",
			"Kutaisi",
			"Batumi",
			"Sokhumi"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "GET",
		rawFormat: "+04:00 Georgia Time - Tbilisi, Kutaisi, Batumi, Sokhumi"
	},
	{
		name: "Asia/Dubai",
		alternativeName: "Gulf Time",
		group: [
			"Asia/Dubai"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "United Arab Emirates",
		countryCode: "AE",
		mainCities: [
			"Dubai",
			"Sharjah",
			"Abu Dhabi",
			"Ajman City"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "GST",
		rawFormat: "+04:00 Gulf Time - Dubai, Sharjah, Abu Dhabi, Ajman City"
	},
	{
		name: "Asia/Muscat",
		alternativeName: "Gulf Time",
		group: [
			"Asia/Muscat"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Oman",
		countryCode: "OM",
		mainCities: [
			"Muscat",
			"Seeb",
			"Şalālah",
			"Bawshar"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "GST",
		rawFormat: "+04:00 Gulf Time - Muscat, Seeb, Şalālah, Bawshar"
	},
	{
		name: "Indian/Mauritius",
		alternativeName: "Mauritius Time",
		group: [
			"Indian/Mauritius"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Mauritius",
		countryCode: "MU",
		mainCities: [
			"Port Louis",
			"Beau Bassin-Rose Hill",
			"Vacoas",
			"Curepipe"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "MUT",
		rawFormat: "+04:00 Mauritius Time - Port Louis, Beau Bassin-Rose Hill, Vacoas, Curepipe"
	},
	{
		name: "Indian/Reunion",
		alternativeName: "Réunion Time",
		group: [
			"Indian/Reunion"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Reunion",
		countryCode: "RE",
		mainCities: [
			"Saint-Denis",
			"Saint-Paul",
			"Saint-Pierre",
			"Le Tampon"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "RET",
		rawFormat: "+04:00 Réunion Time - Saint-Denis, Saint-Paul, Saint-Pierre, Le Tampon"
	},
	{
		name: "Europe/Samara",
		alternativeName: "Samara Time",
		group: [
			"Europe/Astrakhan",
			"Europe/Samara",
			"Europe/Saratov",
			"Europe/Ulyanovsk"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Samara",
			"Saratov",
			"Tolyatti",
			"Ulyanovsk"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "SAMT",
		rawFormat: "+04:00 Samara Time - Samara, Saratov, Tolyatti, Ulyanovsk"
	},
	{
		name: "Indian/Mahe",
		alternativeName: "Seychelles Time",
		group: [
			"Indian/Mahe"
		],
		continentCode: "AF",
		continentName: "Africa",
		countryName: "Seychelles",
		countryCode: "SC",
		mainCities: [
			"Victoria"
		],
		rawOffsetInMinutes: 240,
		abbreviation: "SCT",
		rawFormat: "+04:00 Seychelles Time - Victoria"
	},
	{
		name: "Asia/Kabul",
		alternativeName: "Afghanistan Time",
		group: [
			"Asia/Kabul"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Afghanistan",
		countryCode: "AF",
		mainCities: [
			"Kabul",
			"Kandahār",
			"Mazār-e Sharīf",
			"Herāt"
		],
		rawOffsetInMinutes: 270,
		abbreviation: "AFT",
		rawFormat: "+04:30 Afghanistan Time - Kabul, Kandahār, Mazār-e Sharīf, Herāt"
	},
	{
		name: "Indian/Kerguelen",
		alternativeName: "French Southern & Antarctic Time",
		group: [
			"Indian/Kerguelen"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "French Southern Territories",
		countryCode: "TF",
		mainCities: [
			"Port-aux-Français"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "FSAT",
		rawFormat: "+05:00 French Southern & Antarctic Time - Port-aux-Français"
	},
	{
		name: "Indian/Maldives",
		alternativeName: "Maldives Time",
		group: [
			"Indian/Maldives"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Maldives",
		countryCode: "MV",
		mainCities: [
			"Male"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "MVT",
		rawFormat: "+05:00 Maldives Time - Male"
	},
	{
		name: "Antarctica/Mawson",
		alternativeName: "Mawson Time",
		group: [
			"Antarctica/Mawson"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"Mawson"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "MAWT",
		rawFormat: "+05:00 Mawson Time - Mawson"
	},
	{
		name: "Asia/Karachi",
		alternativeName: "Pakistan Time",
		group: [
			"Asia/Karachi"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Pakistan",
		countryCode: "PK",
		mainCities: [
			"Karachi",
			"Lahore",
			"Faisalabad",
			"Rawalpindi"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "PKT",
		rawFormat: "+05:00 Pakistan Time - Karachi, Lahore, Faisalabad, Rawalpindi"
	},
	{
		name: "Asia/Dushanbe",
		alternativeName: "Tajikistan Time",
		group: [
			"Asia/Dushanbe"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Tajikistan",
		countryCode: "TJ",
		mainCities: [
			"Dushanbe",
			"Khujand",
			"Kŭlob",
			"Bokhtar"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "TJT",
		rawFormat: "+05:00 Tajikistan Time - Dushanbe, Khujand, Kŭlob, Bokhtar"
	},
	{
		name: "Asia/Ashgabat",
		alternativeName: "Turkmenistan Time",
		group: [
			"Asia/Ashgabat",
			"Asia/Ashkhabad"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Turkmenistan",
		countryCode: "TM",
		mainCities: [
			"Ashgabat",
			"Türkmenabat",
			"Daşoguz",
			"Mary"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "TMT",
		rawFormat: "+05:00 Turkmenistan Time - Ashgabat, Türkmenabat, Daşoguz, Mary"
	},
	{
		name: "Asia/Tashkent",
		alternativeName: "Uzbekistan Time",
		group: [
			"Asia/Samarkand",
			"Asia/Tashkent"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Uzbekistan",
		countryCode: "UZ",
		mainCities: [
			"Tashkent",
			"Namangan",
			"Samarkand",
			"Andijon"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "UZT",
		rawFormat: "+05:00 Uzbekistan Time - Tashkent, Namangan, Samarkand, Andijon"
	},
	{
		name: "Asia/Qyzylorda",
		alternativeName: "West Kazakhstan Time",
		group: [
			"Asia/Aqtau",
			"Asia/Aqtobe",
			"Asia/Atyrau",
			"Asia/Oral",
			"Asia/Qyzylorda"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Kazakhstan",
		countryCode: "KZ",
		mainCities: [
			"Kyzylorda",
			"Aktobe",
			"Oral",
			"Atyrau"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "AQTT",
		rawFormat: "+05:00 West Kazakhstan Time - Kyzylorda, Aktobe, Oral, Atyrau"
	},
	{
		name: "Asia/Yekaterinburg",
		alternativeName: "Yekaterinburg Time",
		group: [
			"Asia/Yekaterinburg"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Yekaterinburg",
			"Chelyabinsk",
			"Ufa",
			"Perm"
		],
		rawOffsetInMinutes: 300,
		abbreviation: "YEKT",
		rawFormat: "+05:00 Yekaterinburg Time - Yekaterinburg, Chelyabinsk, Ufa, Perm"
	},
	{
		name: "Asia/Colombo",
		alternativeName: "India Time",
		group: [
			"Asia/Colombo"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Sri Lanka",
		countryCode: "LK",
		mainCities: [
			"Colombo",
			"Dehiwala-Mount Lavinia",
			"Maharagama",
			"Jaffna"
		],
		rawOffsetInMinutes: 330,
		abbreviation: "IST",
		rawFormat: "+05:30 India Time - Colombo, Dehiwala-Mount Lavinia, Maharagama, Jaffna"
	},
	{
		name: "Asia/Kolkata",
		alternativeName: "India Time",
		group: [
			"Asia/Kolkata",
			"Asia/Calcutta"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "India",
		countryCode: "IN",
		mainCities: [
			"Mumbai",
			"Delhi",
			"Bengaluru",
			"Hyderabad"
		],
		rawOffsetInMinutes: 330,
		abbreviation: "IST",
		rawFormat: "+05:30 India Time - Mumbai, Delhi, Bengaluru, Hyderabad"
	},
	{
		name: "Asia/Kathmandu",
		alternativeName: "Nepal Time",
		group: [
			"Asia/Kathmandu",
			"Asia/Katmandu"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Nepal",
		countryCode: "NP",
		mainCities: [
			"Kathmandu",
			"Pokhara",
			"Pātan",
			"Biratnagar"
		],
		rawOffsetInMinutes: 345,
		abbreviation: "NPT",
		rawFormat: "+05:45 Nepal Time - Kathmandu, Pokhara, Pātan, Biratnagar"
	},
	{
		name: "Asia/Dhaka",
		alternativeName: "Bangladesh Time",
		group: [
			"Asia/Dhaka",
			"Asia/Dacca"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Bangladesh",
		countryCode: "BD",
		mainCities: [
			"Dhaka",
			"Chattogram",
			"Khulna",
			"Rājshāhi"
		],
		rawOffsetInMinutes: 360,
		abbreviation: "BST",
		rawFormat: "+06:00 Bangladesh Time - Dhaka, Chattogram, Khulna, Rājshāhi"
	},
	{
		name: "Asia/Thimphu",
		alternativeName: "Bhutan Time",
		group: [
			"Asia/Thimphu",
			"Asia/Thimbu"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Bhutan",
		countryCode: "BT",
		mainCities: [
			"Thimphu",
			"Punākha",
			"Tsirang",
			"Phuntsholing"
		],
		rawOffsetInMinutes: 360,
		abbreviation: "BTT",
		rawFormat: "+06:00 Bhutan Time - Thimphu, Punākha, Tsirang, Phuntsholing"
	},
	{
		name: "Asia/Urumqi",
		alternativeName: "China Time",
		group: [
			"Asia/Urumqi",
			"Asia/Kashgar"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "China",
		countryCode: "CN",
		mainCities: [
			"Ürümqi",
			"Shihezi",
			"Korla",
			"Aksu"
		],
		rawOffsetInMinutes: 360,
		abbreviation: "CST",
		rawFormat: "+06:00 China Time - Ürümqi, Shihezi, Korla, Aksu"
	},
	{
		name: "Asia/Almaty",
		alternativeName: "East Kazakhstan Time",
		group: [
			"Asia/Almaty",
			"Asia/Qostanay"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Kazakhstan",
		countryCode: "KZ",
		mainCities: [
			"Almaty",
			"Karagandy",
			"Shymkent",
			"Taraz"
		],
		rawOffsetInMinutes: 360,
		abbreviation: "ALMT",
		rawFormat: "+06:00 East Kazakhstan Time - Almaty, Karagandy, Shymkent, Taraz"
	},
	{
		name: "Indian/Chagos",
		alternativeName: "Indian Ocean Time",
		group: [
			"Indian/Chagos"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "British Indian Ocean Territory",
		countryCode: "IO",
		mainCities: [
			"Chagos"
		],
		rawOffsetInMinutes: 360,
		abbreviation: "IOT",
		rawFormat: "+06:00 Indian Ocean Time - Chagos"
	},
	{
		name: "Asia/Bishkek",
		alternativeName: "Kyrgyzstan Time",
		group: [
			"Asia/Bishkek"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Kyrgyzstan",
		countryCode: "KG",
		mainCities: [
			"Bishkek",
			"Osh",
			"Jalal-Abad",
			"Karakol"
		],
		rawOffsetInMinutes: 360,
		abbreviation: "KGT",
		rawFormat: "+06:00 Kyrgyzstan Time - Bishkek, Osh, Jalal-Abad, Karakol"
	},
	{
		name: "Asia/Omsk",
		alternativeName: "Omsk Time",
		group: [
			"Asia/Omsk"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Omsk",
			"Tara",
			"Kalachinsk"
		],
		rawOffsetInMinutes: 360,
		abbreviation: "OMST",
		rawFormat: "+06:00 Omsk Time - Omsk, Tara, Kalachinsk"
	},
	{
		name: "Antarctica/Vostok",
		alternativeName: "Vostok Time",
		group: [
			"Antarctica/Vostok"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"Vostok"
		],
		rawOffsetInMinutes: 360,
		abbreviation: "VOST",
		rawFormat: "+06:00 Vostok Time - Vostok"
	},
	{
		name: "Indian/Cocos",
		alternativeName: "Cocos Islands Time",
		group: [
			"Indian/Cocos"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Cocos Islands",
		countryCode: "CC",
		mainCities: [
			"West Island"
		],
		rawOffsetInMinutes: 390,
		abbreviation: "CCT",
		rawFormat: "+06:30 Cocos Islands Time - West Island"
	},
	{
		name: "Asia/Yangon",
		alternativeName: "Myanmar Time",
		group: [
			"Asia/Yangon",
			"Asia/Rangoon"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Myanmar",
		countryCode: "MM",
		mainCities: [
			"Yangon",
			"Mandalay",
			"Nay Pyi Taw",
			"Mawlamyine"
		],
		rawOffsetInMinutes: 390,
		abbreviation: "MMT",
		rawFormat: "+06:30 Myanmar Time - Yangon, Mandalay, Nay Pyi Taw, Mawlamyine"
	},
	{
		name: "Indian/Christmas",
		alternativeName: "Christmas Island Time",
		group: [
			"Indian/Christmas"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Christmas Island",
		countryCode: "CX",
		mainCities: [
			"Flying Fish Cove"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "CXT",
		rawFormat: "+07:00 Christmas Island Time - Flying Fish Cove"
	},
	{
		name: "Antarctica/Davis",
		alternativeName: "Davis Time",
		group: [
			"Antarctica/Davis"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"Davis"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "DAVT",
		rawFormat: "+07:00 Davis Time - Davis"
	},
	{
		name: "Asia/Hovd",
		alternativeName: "Hovd Time",
		group: [
			"Asia/Hovd"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Mongolia",
		countryCode: "MN",
		mainCities: [
			"Khovd",
			"Ölgii",
			"Ulaangom",
			"Uliastay"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "HOVT",
		rawFormat: "+07:00 Hovd Time - Khovd, Ölgii, Ulaangom, Uliastay"
	},
	{
		name: "Asia/Bangkok",
		alternativeName: "Indochina Time",
		group: [
			"Asia/Bangkok"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Thailand",
		countryCode: "TH",
		mainCities: [
			"Bangkok",
			"Samut Prakan",
			"Mueang Nonthaburi",
			"Udon Thani"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "ICT",
		rawFormat: "+07:00 Indochina Time - Bangkok, Samut Prakan, Mueang Nonthaburi, Udon Thani"
	},
	{
		name: "Asia/Ho_Chi_Minh",
		alternativeName: "Indochina Time",
		group: [
			"Asia/Ho_Chi_Minh",
			"Asia/Saigon"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Vietnam",
		countryCode: "VN",
		mainCities: [
			"Ho Chi Minh City",
			"Da Nang",
			"Biên Hòa",
			"Cần Thơ"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "ICT",
		rawFormat: "+07:00 Indochina Time - Ho Chi Minh City, Da Nang, Biên Hòa, Cần Thơ"
	},
	{
		name: "Asia/Phnom_Penh",
		alternativeName: "Indochina Time",
		group: [
			"Asia/Phnom_Penh"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Cambodia",
		countryCode: "KH",
		mainCities: [
			"Phnom Penh",
			"Takeo",
			"Sihanoukville",
			"Battambang"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "ICT",
		rawFormat: "+07:00 Indochina Time - Phnom Penh, Takeo, Sihanoukville, Battambang"
	},
	{
		name: "Asia/Vientiane",
		alternativeName: "Indochina Time",
		group: [
			"Asia/Vientiane"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Laos",
		countryCode: "LA",
		mainCities: [
			"Vientiane",
			"Pakse",
			"Thakhèk",
			"Savannakhet"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "ICT",
		rawFormat: "+07:00 Indochina Time - Vientiane, Pakse, Thakhèk, Savannakhet"
	},
	{
		name: "Asia/Novosibirsk",
		alternativeName: "Novosibirsk Time",
		group: [
			"Asia/Barnaul",
			"Asia/Krasnoyarsk",
			"Asia/Novokuznetsk",
			"Asia/Novosibirsk",
			"Asia/Tomsk"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Novosibirsk",
			"Krasnoyarsk",
			"Barnaul",
			"Novokuznetsk"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "NOVT",
		rawFormat: "+07:00 Novosibirsk Time - Novosibirsk, Krasnoyarsk, Barnaul, Novokuznetsk"
	},
	{
		name: "Asia/Jakarta",
		alternativeName: "Western Indonesia Time",
		group: [
			"Asia/Jakarta",
			"Asia/Pontianak"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Indonesia",
		countryCode: "ID",
		mainCities: [
			"Jakarta",
			"Surabaya",
			"Medan",
			"Bandung"
		],
		rawOffsetInMinutes: 420,
		abbreviation: "WIB",
		rawFormat: "+07:00 Western Indonesia Time - Jakarta, Surabaya, Medan, Bandung"
	},
	{
		name: "Australia/Perth",
		alternativeName: "Australian Western Time",
		group: [
			"Australia/Perth",
			"Australia/West"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Australia",
		countryCode: "AU",
		mainCities: [
			"Perth",
			"Rockingham",
			"Mandurah",
			"Bunbury"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "AWST",
		rawFormat: "+08:00 Australian Western Time - Perth, Rockingham, Mandurah, Bunbury"
	},
	{
		name: "Asia/Brunei",
		alternativeName: "Brunei Darussalam Time",
		group: [
			"Asia/Brunei"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Brunei",
		countryCode: "BN",
		mainCities: [
			"Bandar Seri Begawan",
			"Kuala Belait",
			"Seria",
			"Tutong"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "BNT",
		rawFormat: "+08:00 Brunei Darussalam Time - Bandar Seri Begawan, Kuala Belait, Seria, Tutong"
	},
	{
		name: "Asia/Makassar",
		alternativeName: "Central Indonesia Time",
		group: [
			"Asia/Makassar",
			"Asia/Ujung_Pandang"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Indonesia",
		countryCode: "ID",
		mainCities: [
			"Makassar",
			"Denpasar",
			"Banjarmasin",
			"Manado"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "WITA",
		rawFormat: "+08:00 Central Indonesia Time - Makassar, Denpasar, Banjarmasin, Manado"
	},
	{
		name: "Asia/Macau",
		alternativeName: "China Time",
		group: [
			"Asia/Macau",
			"Asia/Macao"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Macao",
		countryCode: "MO",
		mainCities: [
			"Macau"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "CST",
		rawFormat: "+08:00 China Time - Macau"
	},
	{
		name: "Asia/Shanghai",
		alternativeName: "China Time",
		group: [
			"Asia/Shanghai",
			"Asia/Chongqing",
			"Asia/Chungking",
			"Asia/Harbin",
			"PRC"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "China",
		countryCode: "CN",
		mainCities: [
			"Shanghai",
			"Beijing",
			"Shenzhen",
			"Guangzhou"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "CST",
		rawFormat: "+08:00 China Time - Shanghai, Beijing, Shenzhen, Guangzhou"
	},
	{
		name: "Asia/Hong_Kong",
		alternativeName: "Hong Kong Time",
		group: [
			"Asia/Hong_Kong",
			"Hongkong"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Hong Kong",
		countryCode: "HK",
		mainCities: [
			"Hong Kong",
			"Kowloon",
			"Tsuen Wan",
			"Yuen Long Kau Hui"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "HKT",
		rawFormat: "+08:00 Hong Kong Time - Hong Kong, Kowloon, Tsuen Wan, Yuen Long Kau Hui"
	},
	{
		name: "Asia/Irkutsk",
		alternativeName: "Irkutsk Time",
		group: [
			"Asia/Irkutsk"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Irkutsk",
			"Ulan-Ude",
			"Bratsk",
			"Angarsk"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "IRKT",
		rawFormat: "+08:00 Irkutsk Time - Irkutsk, Ulan-Ude, Bratsk, Angarsk"
	},
	{
		name: "Asia/Kuala_Lumpur",
		alternativeName: "Malaysia Time",
		group: [
			"Asia/Kuala_Lumpur",
			"Asia/Kuching"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Malaysia",
		countryCode: "MY",
		mainCities: [
			"Kota Bharu",
			"Kuala Lumpur",
			"Klang",
			"Kampung Baru Subang"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "MYT",
		rawFormat: "+08:00 Malaysia Time - Kota Bharu, Kuala Lumpur, Klang, Kampung Baru Subang"
	},
	{
		name: "Asia/Manila",
		alternativeName: "Philippine Time",
		group: [
			"Asia/Manila"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Philippines",
		countryCode: "PH",
		mainCities: [
			"Quezon City",
			"Manila",
			"Caloocan City",
			"Budta"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "PHT",
		rawFormat: "+08:00 Philippine Time - Quezon City, Manila, Caloocan City, Budta"
	},
	{
		name: "Asia/Singapore",
		alternativeName: "Singapore Time",
		group: [
			"Asia/Singapore",
			"Singapore"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Singapore",
		countryCode: "SG",
		mainCities: [
			"Singapore",
			"Woodlands",
			"Marine Parade"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "SGT",
		rawFormat: "+08:00 Singapore Time - Singapore, Woodlands, Marine Parade"
	},
	{
		name: "Asia/Taipei",
		alternativeName: "Taipei Time",
		group: [
			"Asia/Taipei",
			"ROC"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Taiwan",
		countryCode: "TW",
		mainCities: [
			"Taipei",
			"Kaohsiung",
			"Taichung",
			"Tainan"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "TWT",
		rawFormat: "+08:00 Taipei Time - Taipei, Kaohsiung, Taichung, Tainan"
	},
	{
		name: "Asia/Ulaanbaatar",
		alternativeName: "Ulaanbaatar Time",
		group: [
			"Asia/Choibalsan",
			"Asia/Ulaanbaatar",
			"Asia/Ulan_Bator"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Mongolia",
		countryCode: "MN",
		mainCities: [
			"Ulan Bator",
			"Erdenet",
			"Darhan",
			"Hovd"
		],
		rawOffsetInMinutes: 480,
		abbreviation: "ULAT",
		rawFormat: "+08:00 Ulaanbaatar Time - Ulan Bator, Erdenet, Darhan, Hovd"
	},
	{
		name: "Australia/Eucla",
		alternativeName: "Australian Central Western Time",
		group: [
			"Australia/Eucla"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Australia",
		countryCode: "AU",
		mainCities: [
			"Eucla"
		],
		rawOffsetInMinutes: 525,
		abbreviation: "ACWST",
		rawFormat: "+08:45 Australian Central Western Time - Eucla"
	},
	{
		name: "Asia/Dili",
		alternativeName: "East Timor Time",
		group: [
			"Asia/Dili"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Timor Leste",
		countryCode: "TL",
		mainCities: [
			"Dili",
			"Maliana",
			"Suai",
			"Likisá"
		],
		rawOffsetInMinutes: 540,
		abbreviation: "TLT",
		rawFormat: "+09:00 East Timor Time - Dili, Maliana, Suai, Likisá"
	},
	{
		name: "Asia/Jayapura",
		alternativeName: "Eastern Indonesia Time",
		group: [
			"Asia/Jayapura"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Indonesia",
		countryCode: "ID",
		mainCities: [
			"Ambon",
			"Jayapura",
			"Sorong",
			"Ternate"
		],
		rawOffsetInMinutes: 540,
		abbreviation: "WIT",
		rawFormat: "+09:00 Eastern Indonesia Time - Ambon, Jayapura, Sorong, Ternate"
	},
	{
		name: "Asia/Tokyo",
		alternativeName: "Japan Time",
		group: [
			"Asia/Tokyo",
			"Japan"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "Japan",
		countryCode: "JP",
		mainCities: [
			"Tokyo",
			"Yokohama",
			"Osaka",
			"Nagoya"
		],
		rawOffsetInMinutes: 540,
		abbreviation: "JST",
		rawFormat: "+09:00 Japan Time - Tokyo, Yokohama, Osaka, Nagoya"
	},
	{
		name: "Asia/Pyongyang",
		alternativeName: "Korean Time",
		group: [
			"Asia/Pyongyang"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "North Korea",
		countryCode: "KP",
		mainCities: [
			"Pyongyang",
			"Hamhŭng",
			"Namp’o",
			"Sunch’ŏn"
		],
		rawOffsetInMinutes: 540,
		abbreviation: "KST",
		rawFormat: "+09:00 Korean Time - Pyongyang, Hamhŭng, Namp’o, Sunch’ŏn"
	},
	{
		name: "Asia/Seoul",
		alternativeName: "Korean Time",
		group: [
			"Asia/Seoul",
			"ROK"
		],
		continentCode: "AS",
		continentName: "Asia",
		countryName: "South Korea",
		countryCode: "KR",
		mainCities: [
			"Seoul",
			"Busan",
			"Incheon",
			"Daegu"
		],
		rawOffsetInMinutes: 540,
		abbreviation: "KST",
		rawFormat: "+09:00 Korean Time - Seoul, Busan, Incheon, Daegu"
	},
	{
		name: "Pacific/Palau",
		alternativeName: "Palau Time",
		group: [
			"Pacific/Palau"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Palau",
		countryCode: "PW",
		mainCities: [
			"Ngerulmud"
		],
		rawOffsetInMinutes: 540,
		abbreviation: "PWT",
		rawFormat: "+09:00 Palau Time - Ngerulmud"
	},
	{
		name: "Asia/Chita",
		alternativeName: "Yakutsk Time",
		group: [
			"Asia/Chita",
			"Asia/Khandyga",
			"Asia/Yakutsk"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Chita",
			"Yakutsk",
			"Blagoveshchensk",
			"Belogorsk"
		],
		rawOffsetInMinutes: 540,
		abbreviation: "YAKT",
		rawFormat: "+09:00 Yakutsk Time - Chita, Yakutsk, Blagoveshchensk, Belogorsk"
	},
	{
		name: "Australia/Adelaide",
		alternativeName: "Australian Central Time",
		group: [
			"Australia/Adelaide",
			"Australia/Broken_Hill",
			"Australia/South",
			"Australia/Yancowinna"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Australia",
		countryCode: "AU",
		mainCities: [
			"Adelaide",
			"Adelaide Hills",
			"Mount Gambier",
			"Morphett Vale"
		],
		rawOffsetInMinutes: 570,
		abbreviation: "ACST",
		rawFormat: "+09:30 Australian Central Time - Adelaide, Adelaide Hills, Mount Gambier, Morphett Vale"
	},
	{
		name: "Australia/Darwin",
		alternativeName: "Australian Central Time",
		group: [
			"Australia/Darwin",
			"Australia/North"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Australia",
		countryCode: "AU",
		mainCities: [
			"Darwin",
			"Alice Springs",
			"Palmerston"
		],
		rawOffsetInMinutes: 570,
		abbreviation: "ACST",
		rawFormat: "+09:30 Australian Central Time - Darwin, Alice Springs, Palmerston"
	},
	{
		name: "Australia/Brisbane",
		alternativeName: "Australian Eastern Time",
		group: [
			"Australia/Brisbane",
			"Australia/Lindeman",
			"Australia/Queensland"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Australia",
		countryCode: "AU",
		mainCities: [
			"Brisbane",
			"Gold Coast",
			"Logan City",
			"Townsville"
		],
		rawOffsetInMinutes: 600,
		abbreviation: "AEST",
		rawFormat: "+10:00 Australian Eastern Time - Brisbane, Gold Coast, Logan City, Townsville"
	},
	{
		name: "Australia/Sydney",
		alternativeName: "Australian Eastern Time",
		group: [
			"Antarctica/Macquarie",
			"Australia/Hobart",
			"Australia/Melbourne",
			"Australia/Sydney",
			"Australia/Currie",
			"Australia/Tasmania",
			"Australia/Victoria",
			"Australia/ACT",
			"Australia/Canberra",
			"Australia/NSW"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Australia",
		countryCode: "AU",
		mainCities: [
			"Sydney",
			"Melbourne",
			"Canberra",
			"Newcastle"
		],
		rawOffsetInMinutes: 600,
		abbreviation: "AEST",
		rawFormat: "+10:00 Australian Eastern Time - Sydney, Melbourne, Canberra, Newcastle"
	},
	{
		name: "Pacific/Guam",
		alternativeName: "Chamorro Time",
		group: [
			"Pacific/Guam"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Guam",
		countryCode: "GU",
		mainCities: [
			"Dededo Village",
			"Yigo Village",
			"Tamuning-Tumon-Harmon Village",
			"Tamuning"
		],
		rawOffsetInMinutes: 600,
		abbreviation: "ChST",
		rawFormat: "+10:00 Chamorro Time - Dededo Village, Yigo Village, Tamuning-Tumon-Harmon Village, Tamuning"
	},
	{
		name: "Pacific/Saipan",
		alternativeName: "Chamorro Time",
		group: [
			"Pacific/Saipan"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Northern Mariana Islands",
		countryCode: "MP",
		mainCities: [
			"Saipan"
		],
		rawOffsetInMinutes: 600,
		abbreviation: "ChST",
		rawFormat: "+10:00 Chamorro Time - Saipan"
	},
	{
		name: "Pacific/Chuuk",
		alternativeName: "Chuuk Time",
		group: [
			"Pacific/Chuuk",
			"Pacific/Truk",
			"Pacific/Yap"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Micronesia",
		countryCode: "FM",
		mainCities: [
			"Chuuk"
		],
		rawOffsetInMinutes: 600,
		abbreviation: "CHUT",
		rawFormat: "+10:00 Chuuk Time - Chuuk"
	},
	{
		name: "Antarctica/DumontDUrville",
		alternativeName: "Dumont-d’Urville Time",
		group: [
			"Antarctica/DumontDUrville"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"DumontDUrville"
		],
		rawOffsetInMinutes: 600,
		abbreviation: "DDUT",
		rawFormat: "+10:00 Dumont-d’Urville Time - DumontDUrville"
	},
	{
		name: "Pacific/Port_Moresby",
		alternativeName: "Papua New Guinea Time",
		group: [
			"Pacific/Port_Moresby"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Papua New Guinea",
		countryCode: "PG",
		mainCities: [
			"Port Moresby",
			"Lae",
			"Mount Hagen",
			"Popondetta"
		],
		rawOffsetInMinutes: 600,
		abbreviation: "PGT",
		rawFormat: "+10:00 Papua New Guinea Time - Port Moresby, Lae, Mount Hagen, Popondetta"
	},
	{
		name: "Asia/Vladivostok",
		alternativeName: "Vladivostok Time",
		group: [
			"Asia/Ust-Nera",
			"Asia/Vladivostok"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Vladivostok",
			"Khabarovsk",
			"Khabarovsk Vtoroy",
			"Komsomolsk-on-Amur"
		],
		rawOffsetInMinutes: 600,
		abbreviation: "VLAT",
		rawFormat: "+10:00 Vladivostok Time - Vladivostok, Khabarovsk, Khabarovsk Vtoroy, Komsomolsk-on-Amur"
	},
	{
		name: "Australia/Lord_Howe",
		alternativeName: "Lord Howe Time",
		group: [
			"Australia/Lord_Howe",
			"Australia/LHI"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Australia",
		countryCode: "AU",
		mainCities: [
			"Lord Howe"
		],
		rawOffsetInMinutes: 630,
		abbreviation: "LHST",
		rawFormat: "+10:30 Lord Howe Time - Lord Howe"
	},
	{
		name: "Pacific/Bougainville",
		alternativeName: "Bougainville Time",
		group: [
			"Pacific/Bougainville"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Papua New Guinea",
		countryCode: "PG",
		mainCities: [
			"Arawa"
		],
		rawOffsetInMinutes: 660,
		abbreviation: "BST",
		rawFormat: "+11:00 Bougainville Time - Arawa"
	},
	{
		name: "Antarctica/Casey",
		alternativeName: "Casey Time",
		group: [
			"Antarctica/Casey"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"Casey"
		],
		rawOffsetInMinutes: 660,
		abbreviation: "CAST",
		rawFormat: "+11:00 Casey Time - Casey"
	},
	{
		name: "Pacific/Kosrae",
		alternativeName: "Kosrae Time",
		group: [
			"Pacific/Kosrae",
			"Pacific/Pohnpei",
			"Pacific/Ponape"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Micronesia",
		countryCode: "FM",
		mainCities: [
			"Kosrae",
			"Palikir - National Government Center"
		],
		rawOffsetInMinutes: 660,
		abbreviation: "KOST",
		rawFormat: "+11:00 Kosrae Time - Kosrae, Palikir - National Government Center"
	},
	{
		name: "Pacific/Noumea",
		alternativeName: "New Caledonia Time",
		group: [
			"Pacific/Noumea"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "New Caledonia",
		countryCode: "NC",
		mainCities: [
			"Nouméa",
			"Mont-Dore",
			"Dumbéa"
		],
		rawOffsetInMinutes: 660,
		abbreviation: "NCT",
		rawFormat: "+11:00 New Caledonia Time - Nouméa, Mont-Dore, Dumbéa"
	},
	{
		name: "Pacific/Norfolk",
		alternativeName: "Norfolk Island Time",
		group: [
			"Pacific/Norfolk"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Norfolk Island",
		countryCode: "NF",
		mainCities: [
			"Kingston"
		],
		rawOffsetInMinutes: 660,
		abbreviation: "NFT",
		rawFormat: "+11:00 Norfolk Island Time - Kingston"
	},
	{
		name: "Asia/Sakhalin",
		alternativeName: "Sakhalin Time",
		group: [
			"Asia/Magadan",
			"Asia/Sakhalin",
			"Asia/Srednekolymsk"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Yuzhno-Sakhalinsk",
			"Magadan",
			"Korsakov",
			"Kholmsk"
		],
		rawOffsetInMinutes: 660,
		abbreviation: "SAKT",
		rawFormat: "+11:00 Sakhalin Time - Yuzhno-Sakhalinsk, Magadan, Korsakov, Kholmsk"
	},
	{
		name: "Pacific/Guadalcanal",
		alternativeName: "Solomon Islands Time",
		group: [
			"Pacific/Guadalcanal"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Solomon Islands",
		countryCode: "SB",
		mainCities: [
			"Honiara"
		],
		rawOffsetInMinutes: 660,
		abbreviation: "SBT",
		rawFormat: "+11:00 Solomon Islands Time - Honiara"
	},
	{
		name: "Pacific/Efate",
		alternativeName: "Vanuatu Time",
		group: [
			"Pacific/Efate"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Vanuatu",
		countryCode: "VU",
		mainCities: [
			"Port-Vila"
		],
		rawOffsetInMinutes: 660,
		abbreviation: "VUT",
		rawFormat: "+11:00 Vanuatu Time - Port-Vila"
	},
	{
		name: "Pacific/Fiji",
		alternativeName: "Fiji Time",
		group: [
			"Pacific/Fiji"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Fiji",
		countryCode: "FJ",
		mainCities: [
			"Suva",
			"Lautoka",
			"Nadi",
			"Labasa"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "FJT",
		rawFormat: "+12:00 Fiji Time - Suva, Lautoka, Nadi, Labasa"
	},
	{
		name: "Pacific/Tarawa",
		alternativeName: "Gilbert Islands Time",
		group: [
			"Pacific/Tarawa"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Kiribati",
		countryCode: "KI",
		mainCities: [
			"Tarawa"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "GILT",
		rawFormat: "+12:00 Gilbert Islands Time - Tarawa"
	},
	{
		name: "Pacific/Majuro",
		alternativeName: "Marshall Islands Time",
		group: [
			"Pacific/Kwajalein",
			"Pacific/Majuro",
			"Kwajalein"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Marshall Islands",
		countryCode: "MH",
		mainCities: [
			"Majuro",
			"Kwajalein",
			"RMI Capitol"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "MHT",
		rawFormat: "+12:00 Marshall Islands Time - Majuro, Kwajalein, RMI Capitol"
	},
	{
		name: "Pacific/Nauru",
		alternativeName: "Nauru Time",
		group: [
			"Pacific/Nauru"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Nauru",
		countryCode: "NR",
		mainCities: [
			"Yaren"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "NRT",
		rawFormat: "+12:00 Nauru Time - Yaren"
	},
	{
		name: "Pacific/Auckland",
		alternativeName: "New Zealand Time",
		group: [
			"Pacific/Auckland",
			"Antarctica/South_Pole",
			"NZ"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "New Zealand",
		countryCode: "NZ",
		mainCities: [
			"Auckland",
			"Wellington",
			"Christchurch",
			"Manukau City"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "NZST",
		rawFormat: "+12:00 New Zealand Time - Auckland, Wellington, Christchurch, Manukau City"
	},
	{
		name: "Antarctica/McMurdo",
		alternativeName: "New Zealand Time",
		group: [
			"Antarctica/McMurdo"
		],
		continentCode: "AN",
		continentName: "Antarctica",
		countryName: "Antarctica",
		countryCode: "AQ",
		mainCities: [
			"McMurdo"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "NZST",
		rawFormat: "+12:00 New Zealand Time - McMurdo"
	},
	{
		name: "Asia/Kamchatka",
		alternativeName: "Petropavlovsk-Kamchatski Time",
		group: [
			"Asia/Anadyr",
			"Asia/Kamchatka"
		],
		continentCode: "EU",
		continentName: "Europe",
		countryName: "Russia",
		countryCode: "RU",
		mainCities: [
			"Petropavlovsk-Kamchatsky",
			"Yelizovo",
			"Vilyuchinsk",
			"Anadyr"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "PETT",
		rawFormat: "+12:00 Petropavlovsk-Kamchatski Time - Petropavlovsk-Kamchatsky, Yelizovo, Vilyuchinsk, Anadyr"
	},
	{
		name: "Pacific/Funafuti",
		alternativeName: "Tuvalu Time",
		group: [
			"Pacific/Funafuti"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Tuvalu",
		countryCode: "TV",
		mainCities: [
			"Funafuti"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "TVT",
		rawFormat: "+12:00 Tuvalu Time - Funafuti"
	},
	{
		name: "Pacific/Wake",
		alternativeName: "Wake Island Time",
		group: [
			"Pacific/Wake"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "United States Minor Outlying Islands",
		countryCode: "UM",
		mainCities: [
			"Wake"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "WAKT",
		rawFormat: "+12:00 Wake Island Time - Wake"
	},
	{
		name: "Pacific/Wallis",
		alternativeName: "Wallis & Futuna Time",
		group: [
			"Pacific/Wallis"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Wallis and Futuna",
		countryCode: "WF",
		mainCities: [
			"Mata-Utu"
		],
		rawOffsetInMinutes: 720,
		abbreviation: "WFT",
		rawFormat: "+12:00 Wallis & Futuna Time - Mata-Utu"
	},
	{
		name: "Pacific/Chatham",
		alternativeName: "Chatham Time",
		group: [
			"Pacific/Chatham",
			"NZ-CHAT"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "New Zealand",
		countryCode: "NZ",
		mainCities: [
			"Chatham"
		],
		rawOffsetInMinutes: 765,
		abbreviation: "CHAST",
		rawFormat: "+12:45 Chatham Time - Chatham"
	},
	{
		name: "Pacific/Apia",
		alternativeName: "Apia Time",
		group: [
			"Pacific/Apia"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Samoa",
		countryCode: "WS",
		mainCities: [
			"Apia"
		],
		rawOffsetInMinutes: 780,
		abbreviation: "WST",
		rawFormat: "+13:00 Apia Time - Apia"
	},
	{
		name: "Pacific/Kanton",
		alternativeName: "Phoenix Islands Time",
		group: [
			"Pacific/Kanton",
			"Pacific/Enderbury"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Kiribati",
		countryCode: "KI",
		mainCities: [
			"Kanton"
		],
		rawOffsetInMinutes: 780,
		abbreviation: "PHOT",
		rawFormat: "+13:00 Phoenix Islands Time - Kanton"
	},
	{
		name: "Pacific/Fakaofo",
		alternativeName: "Tokelau Time",
		group: [
			"Pacific/Fakaofo"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Tokelau",
		countryCode: "TK",
		mainCities: [
			"Fakaofo"
		],
		rawOffsetInMinutes: 780,
		abbreviation: "TKT",
		rawFormat: "+13:00 Tokelau Time - Fakaofo"
	},
	{
		name: "Pacific/Tongatapu",
		alternativeName: "Tonga Time",
		group: [
			"Pacific/Tongatapu"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Tonga",
		countryCode: "TO",
		mainCities: [
			"Nuku‘alofa"
		],
		rawOffsetInMinutes: 780,
		abbreviation: "TOT",
		rawFormat: "+13:00 Tonga Time - Nuku‘alofa"
	},
	{
		name: "Pacific/Kiritimati",
		alternativeName: "Line Islands Time",
		group: [
			"Pacific/Kiritimati"
		],
		continentCode: "OC",
		continentName: "Oceania",
		countryName: "Kiribati",
		countryCode: "KI",
		mainCities: [
			"Kiritimati"
		],
		rawOffsetInMinutes: 840,
		abbreviation: "LINT",
		rawFormat: "+14:00 Line Islands Time - Kiritimati"
	}
];

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function format(_ref) {
  var alternativeName = _ref.alternativeName,
      mainCities = _ref.mainCities,
      rawOffsetInMinutes = _ref.rawOffsetInMinutes,
      currentTimeOffsetInMinutes = _ref.currentTimeOffsetInMinutes;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$useCurrentOffse = _ref2.useCurrentOffset,
      useCurrentOffset = _ref2$useCurrentOffse === void 0 ? false : _ref2$useCurrentOffse;

  var offsetInHours = useCurrentOffset ? getOffsetString(currentTimeOffsetInMinutes) : getOffsetString(rawOffsetInMinutes);
  return "".concat(offsetInHours.padStart(6, "+"), " ").concat(alternativeName, " - ").concat(mainCities.join(", "));
}

function getOffsetString(offsetInMinutes) {
  var absOffsetInMinutes = Math.abs(offsetInMinutes);

  var _map = [Math.floor(absOffsetInMinutes / 60), absOffsetInMinutes % 60].map(function (v) {
    return v.toString().padStart(2, "0");
  }),
      _map2 = _slicedToArray(_map, 2),
      hours = _map2[0],
      minutes = _map2[1];

  var durationInHoursMinutes = "".concat(hours, ":").concat(minutes);
  return "".concat(offsetInMinutes >= 0 ? "+" : "-").concat(durationInHoursMinutes);
}

// Most of the code here is from Luxon
// Copyright 2019 JS Foundation and other contributors
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
var ianaRegex = /^[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?$/;
var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function isValidIanaSpecifier(s) {
  return !!(s && s.match(ianaRegex));
}

function hackyOffset(dtf, date) {
  var formatted = dtf.format(date).replace(/\u200E/g, "");
  var parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted);

  var _parsed = _slicedToArray(parsed, 7),
      fMonth = _parsed[1],
      fDay = _parsed[2],
      fYear = _parsed[3],
      fHour = _parsed[4],
      fMinute = _parsed[5],
      fSecond = _parsed[6];

  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
}

function partsOffset(dtf, date) {
  var formatted = dtf.formatToParts(date);
  var filled = [];

  for (var i = 0; i < formatted.length; i++) {
    var _formatted$i = formatted[i],
        type = _formatted$i.type,
        value = _formatted$i.value;
    var pos = typeToPos[type];

    if (typeof pos !== "undefined") {
      filled[pos] = parseInt(value, 10);
    }
  }

  return filled;
}

function makeDTF(zone) {
  return new Intl.DateTimeFormat("en-US", {
    hourCycle: "h23",
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
} // covert a calendar object to a local timestamp (epoch, but with the offset baked in)


function objToLocalTS(obj) {
  var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond); // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that

  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }

  return +d;
}

function getZoneOffset(timeZoneName) {
  if (!isValidIanaSpecifier(timeZoneName)) {
    return false;
  }

  var date = new Date(Date.now());
  var dtf;

  try {
    dtf = makeDTF(timeZoneName);
  } catch (_) {
    return false;
  }

  var _ref = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date),
      _ref2 = _slicedToArray(_ref, 6),
      year = _ref2[0],
      month = _ref2[1],
      day = _ref2[2],
      hour = _ref2[3],
      minute = _ref2[4],
      second = _ref2[5];

  var asUTC = objToLocalTS({
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second,
    millisecond: 0
  });
  var asTS = +date;
  var over = asTS % 1000;
  asTS -= over >= 0 ? over : 1000 + over;
  return (asUTC - asTS) / (60 * 1000);
}

function getTimeZones(opts) {
  var includeUtc = !!opts && opts.includeUtc;
  return rawTimeZones.reduce(function (acc, timeZone) {
    var timeZoneName = timeZone.name;
    var currentOffset = getZoneOffset(timeZoneName); // We build on the latest Node.js version, Node.js embed IANA databases
    // it might happen that the environment that will execute getTimeZones() will not know about some
    // timezones. So we ignore the timezone at runtim
    // See https://github.com/vvo/tzdb/issues/43

    if (currentOffset === false) {
      return acc;
    }

    var timeZoneWithCurrentTimeData = _objectSpread2(_objectSpread2({}, timeZone), {}, {
      currentTimeOffsetInMinutes: currentOffset
    });

    acc.push(_objectSpread2(_objectSpread2({}, timeZoneWithCurrentTimeData), {}, {
      currentTimeFormat: format(timeZoneWithCurrentTimeData, {
        useCurrentOffset: true
      })
    }));
    return acc;
  }, includeUtc ? [utcTimezone] : []).sort(function (a, b) {
    return compareNumbers(a, b) || compareStrings(a.alternativeName, b.alternativeName) || compareStrings(a.mainCities[0], b.mainCities[0]);
  });
}

function compareNumbers(x, y) {
  return x.currentTimeOffsetInMinutes - y.currentTimeOffsetInMinutes;
}

function compareStrings(x, y) {
  if (typeof x === "string" && typeof y === "string") {
    return x.localeCompare(y);
  }

  return 0;
}

var utcTimezone = {
  name: "UTC",
  alternativeName: "Coordinated Universal Time (UTC)",
  abbreviation: "UTC",
  group: ["UTC"],
  countryName: "",
  continentCode: "",
  continentName: "",
  mainCities: [""],
  rawOffsetInMinutes: 0,
  rawFormat: "+00:00 Coordinated Universal Time (UTC)",
  currentTimeOffsetInMinutes: 0,
  currentTimeFormat: "+00:00 Coordinated Universal Time (UTC)"
};

const ToastDescription = (props) => {
    const { body, title } = props;
    return (React__default["default"].createElement(ui.Stack, { paddingY: 1, space: 3 },
        React__default["default"].createElement(ui.Inline, { space: 2 },
            React__default["default"].createElement(icons.CalendarIcon, null),
            title && (React__default["default"].createElement(ui.Text, { size: 2, weight: "semibold" }, title))),
        body && React__default["default"].createElement(ui.Text, { size: 1 }, body)));
};

const LOCAL_STORAGE_TZ_KEY = 'scheduled-publishing::time-zone';
const SANITY_API_VERSION = '2022-02-02';
const SCHEDULE_ACTION_DICTIONARY = {
    publish: {
        actionName: 'Publishing',
        badgeColor: 'primary',
        badgeTone: 'positive',
    },
    unpublish: {
        actionName: 'Unpublishing',
        badgeColor: 'danger',
        badgeTone: 'critical',
    },
};
const SCHEDULE_STATE_DICTIONARY = {
    scheduled: {
        title: 'Upcoming',
    },
    succeeded: {
        title: 'Completed',
    },
    cancelled: {
        title: 'Failed',
    },
};
// Tool: denotes order of filter tags as well as accessible routes
const SCHEDULE_FILTERS = Object.keys(SCHEDULE_STATE_DICTIONARY).filter((f) => !!f);
const TOOL_HEADER_HEIGHT = 55; // px
const DOCUMENT_HAS_WARNINGS_TEXT = 'This document has validation warnings.';
const DOCUMENT_HAS_ERRORS_TEXT = 'This document has validation errors that should be resolved before its publish date.';
const FEATURE_NOT_SUPPORTED_TEXT = (React__default["default"].createElement(React__default["default"].Fragment, null,
    "Scheduled Publishing is only available on the",
    ' ',
    React__default["default"].createElement("a", { href: "https://sanity.io/pricing" }, "Team tier and above"),
    ". Please upgrade to enable access."));
const SCHEDULE_FAILED_TEXT = 'This schedule failed to run.';
// Text displayed in toasts on any 403 Forbidden request
// (usually if a project doesn't have access to the Scheduled Publishing feature)
const FORBIDDEN_RESPONSE_TEXT = 'Forbidden. Please check that your project has access to Scheduled Publishing.';
// date-fns compatible date formats
// https://date-fns.org/v2.28.0/docs/format
const DATE_FORMAT = {
    // 1 Oct 22, 10:00 PM
    SMALL: `d MMM yy',' p`,
    // 1 October 2022, 10:00 PM
    MEDIUM: `d MMMM yyyy',' p`,
    // Saturday, 1 October 2022, 10:00 PM
    LARGE: `iiii',' d MMMM yyyy',' p`,
};

const rootName = 'scheduled-publishing:';
debug__default["default"](rootName);
function debugWithName(name) {
    const namespace = `${rootName}${name}`;
    if (debug__default["default"] && debug__default["default"].enabled(namespace)) {
        return debug__default["default"](namespace);
    }
    return debug__default["default"](rootName);
}

// this is used in place of `instanceof` so the matching can be more robust and
// won't have any issues with dual packages etc
// https://nodejs.org/api/packages.html#dual-package-hazard
function isClientError(e) {
    if (typeof e !== 'object')
        return false;
    if (!e)
        return false;
    return 'statusCode' in e && 'response' in e;
}
function getErrorMessage(err) {
    let message;
    if (isClientError(err)) {
        // The request was made and the server responded with a status code
        if (err.response.statusCode === 403) {
            message = FORBIDDEN_RESPONSE_TEXT;
        }
        else {
            message = err.message;
        }
    }
    else {
        if (err instanceof Error) {
            message = err.message;
        }
        message = String(err);
    }
    return message;
}

var TimeZoneEvents;
(function (TimeZoneEvents) {
    TimeZoneEvents["update"] = "timeZoneEventUpdate";
})(TimeZoneEvents || (TimeZoneEvents = {}));
const debug$1 = debugWithName('useScheduleOperation');
// Map through only the values we care about
const allTimeZones = getTimeZones().map((tz) => {
    return {
        abbreviation: tz.abbreviation,
        alternativeName: tz.alternativeName,
        mainCities: tz.mainCities.join(', '),
        // Main time zone name 'Africa/Dar_es_Salaam'
        name: tz.name,
        // Time zone name with underscores removed
        namePretty: tz.name.replaceAll('_', ' '),
        offset: tz.currentTimeFormat.split(' ')[0],
        // all searchable text - this is transformed before being rendered in `<AutoComplete>`
        value: `${tz.currentTimeFormat} ${tz.abbreviation} ${tz.name}`,
    };
});
const localTimeZone = allTimeZones.find((tz) => tz.name === Intl.DateTimeFormat().resolvedOptions().timeZone) ||
    // Default to GMT-0 if no user timeZone is found
    allTimeZones.find((tz) => tz.abbreviation === 'GMT') ||
    // Return the first time zone as a fallback
    allTimeZones[0];
function getStoredTimeZone() {
    const storedTimeZone = localStorage.getItem(LOCAL_STORAGE_TZ_KEY);
    try {
        if (storedTimeZone) {
            return JSON.parse(storedTimeZone);
        }
    }
    catch (error) {
        // invalid value (non-JSON) - fallback to local timeZone
    }
    return localTimeZone;
}
const useTimeZone = () => {
    const [timeZone, setTimeZone] = React.useState(getStoredTimeZone());
    const toast = ui.useToast();
    React.useEffect(() => {
        const handler = () => {
            // When updated in another hook instance, just fetch from localStorage
            setTimeZone(getStoredTimeZone());
        };
        window.addEventListener(TimeZoneEvents.update, handler);
        return () => {
            window.removeEventListener(TimeZoneEvents.update, handler);
        };
    }, []);
    /**
     * Return time-zone adjusted date in a date-fns supported format
     */
    const formatDateTz = ({ date, format = DATE_FORMAT.LARGE, includeTimeZone, prefix, }) => {
        let dateFormat = format;
        if (prefix) {
            dateFormat = `'${prefix}'${format}`;
        }
        if (includeTimeZone) {
            dateFormat = `${format} (zzzz)`;
        }
        return dateFnsTz.formatInTimeZone(date, timeZone.name, dateFormat);
    };
    const getCurrentZoneDate = () => {
        return dateFnsTz.utcToZonedTime(new Date(), timeZone.name);
    };
    const handleNewValue = (tz) => {
        debug$1('handleNewValue:', tz);
        setTimeZone((prevTz) => {
            try {
                // If different from current state, update localStorage & notify other instances
                if (prevTz.name !== tz.name) {
                    localStorage.setItem(LOCAL_STORAGE_TZ_KEY, JSON.stringify(tz));
                    window.dispatchEvent(new Event(TimeZoneEvents.update));
                }
                toast.push({
                    closable: true,
                    description: (React__default["default"].createElement(ToastDescription, { body: `${tz.alternativeName} (${tz.namePretty})`, title: "Time zone updated" })),
                    duration: 15000,
                    status: 'info',
                });
            }
            catch (err) {
                console.error(err);
                toast.push({
                    closable: true,
                    description: (React__default["default"].createElement(ToastDescription, { body: getErrorMessage(err), title: "Unable to update time zone" })),
                    status: 'error',
                });
            }
            return tz;
        });
    };
    const utcToCurrentZoneDate = (date) => {
        return dateFnsTz.utcToZonedTime(date, timeZone.name);
    };
    const zoneDateToUtc = (date) => {
        return dateFnsTz.zonedTimeToUtc(date, timeZone.name);
    };
    return {
        formatDateTz,
        getCurrentZoneDate,
        setTimeZone: handleNewValue,
        timeZone,
        utcToCurrentZoneDate,
        zoneDateToUtc,
    };
};

// Returns as a function so the currently selected Space dataset + projectId are used
function getSanityClient() {
    return typeof sanityClient__default["default"].withConfig === 'function'
        ? sanityClient__default["default"].withConfig({ apiVersion: SANITY_API_VERSION })
        : sanityClient__default["default"];
}

function getScheduleBaseUrl() {
    const client = getSanityClient();
    const { dataset, projectId } = client.config();
    return `/schedules/${projectId}/${dataset}`;
}

/**
 * Return a schedule's `executedAt` date if it exists, otherwise just return `executeAt`.
 *
 * When dealing with schedules that may have differing values for `executeAt` and
 * `executedAt` (e.g. schedules force-published ahead of time), for the purposes of
 * rendering and sorting we only care about the _final_ date a schedule was executed.
 *
 * Note that it's possible for both `executedAt` and `executeAt` to be null
 * (if creating Schedules via the Scheduling API without dates).
 */
function getLastExecuteDate(schedule) {
    return (schedule === null || schedule === void 0 ? void 0 : schedule.executedAt) || (schedule === null || schedule === void 0 ? void 0 : schedule.executeAt);
}

function sortByExecuteDate({ reverseOrder } = { reverseOrder: false }) {
    return function (a, b) {
        const aExecuteDate = getLastExecuteDate(a);
        const bExecuteDate = getLastExecuteDate(b);
        if (aExecuteDate === bExecuteDate) {
            return 0;
        }
        if (aExecuteDate === null) {
            return 1;
        }
        if (bExecuteDate === null) {
            return -1;
        }
        return (aExecuteDate > bExecuteDate ? 1 : -1) * (reverseOrder ? -1 : 1);
    };
}

const debug = debugWithName('useScheduleOperation');
// Custom events
var ScheduleEvents;
(function (ScheduleEvents) {
    ScheduleEvents["create"] = "scheduleCreate";
    ScheduleEvents["delete"] = "scheduleDelete";
    ScheduleEvents["deleteMultiple"] = "scheduleDeleteMultiple";
    ScheduleEvents["publish"] = "schedulePublish";
    ScheduleEvents["update"] = "scheduleUpdate";
})(ScheduleEvents || (ScheduleEvents = {}));
// Proxy that generates type safe CustomEvents.
// We infer our CustomEvent's `detail` using `UnpackCustomEventPayload`
const scheduleCustomEvent = (name, 
// override `detail` in `CustomEventInit` with our own custom payload
payload) => new CustomEvent(name, payload);
function _create({ date, documentId, action, }) {
    debug('_create:', documentId);
    // Round date to nearest second (mutate)
    const roundedDate = new Date(date);
    roundedDate.setSeconds(0);
    roundedDate.setMilliseconds(0);
    return getSanityClient().request({
        body: {
            documents: [{ documentId }],
            executeAt: roundedDate,
            name: roundedDate,
            action,
        },
        method: 'POST',
        uri: getScheduleBaseUrl(),
    });
}
function _delete({ scheduleId }) {
    debug('_delete:', scheduleId);
    return getSanityClient().request({
        method: 'DELETE',
        uri: `${getScheduleBaseUrl()}/${scheduleId}`,
    });
}
function _deleteMultiple({ scheduleIds }) {
    debug('_deleteMultiple:', scheduleIds);
    const requests = scheduleIds.map((scheduleId) => _delete({ scheduleId }));
    return Promise.allSettled(requests);
}
function _publish({ scheduleId }) {
    debug('_publish:', scheduleId);
    return getSanityClient().request({
        method: 'POST',
        uri: `${getScheduleBaseUrl()}/${scheduleId}/publish`,
    });
}
function _update({ documentSchedule, scheduleId, }) {
    debug('_update:', scheduleId, documentSchedule);
    return getSanityClient().request({
        body: documentSchedule,
        method: 'PATCH',
        uri: `${getScheduleBaseUrl()}/${scheduleId}`,
    });
}
function useScheduleOperation() {
    const toast = ui.useToast();
    const { formatDateTz } = useTimeZone();
    function createSchedule({ date, displayToast = true, documentId, action = 'publish', }) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield _create({ date, documentId, action });
                window.dispatchEvent(scheduleCustomEvent(ScheduleEvents.create, {
                    detail: {
                        date,
                        documentId,
                    },
                }));
                if (displayToast && (data === null || data === void 0 ? void 0 : data.executeAt)) {
                    toast.push({
                        closable: true,
                        description: (React__default["default"].createElement(ToastDescription, { body: formatDateTz({
                                date: new Date(data.executeAt),
                                includeTimeZone: true,
                                prefix: 'Publishing on ',
                            }), title: "Schedule created" })),
                        duration: 15000,
                        status: 'success',
                    });
                }
            }
            catch (err) {
                if (displayToast) {
                    toast.push({
                        closable: true,
                        description: (React__default["default"].createElement(ToastDescription, { body: getErrorMessage(err), title: "Unable to create schedule" })),
                        duration: 15000,
                        status: 'error',
                    });
                }
            }
        });
    }
    function deleteSchedule({ displayToast = true, schedule, }) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                yield _delete({ scheduleId: schedule === null || schedule === void 0 ? void 0 : schedule.id });
                window.dispatchEvent(scheduleCustomEvent(ScheduleEvents.delete, {
                    detail: {
                        scheduleId: schedule === null || schedule === void 0 ? void 0 : schedule.id,
                    },
                }));
                if (displayToast) {
                    toast.push({
                        closable: true,
                        description: React__default["default"].createElement(ToastDescription, { title: "Schedule deleted" }),
                        status: 'success',
                    });
                }
            }
            catch (err) {
                if (displayToast) {
                    toast.push({
                        closable: true,
                        description: (React__default["default"].createElement(ToastDescription, { body: getErrorMessage(err), title: "Unable to delete schedule" })),
                        duration: 15000,
                        status: 'error',
                    });
                }
            }
        });
    }
    function deleteSchedules({ displayToast = true, schedules, }) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                const scheduleIds = schedules.map((schedule) => schedule.id);
                const response = yield _deleteMultiple({ scheduleIds });
                const { fulfilledIds, rejectedReasons } = response.reduce((acc, v, index) => {
                    if (v.status === 'fulfilled') {
                        acc.fulfilledIds.push(schedules[index].id);
                    }
                    if (v.status === 'rejected') {
                        acc.rejectedReasons.push(`[${schedules[index].id}]: ${v.reason}`);
                    }
                    return acc;
                }, { fulfilledIds: [], rejectedReasons: [] });
                const numFulfilledIds = fulfilledIds.length;
                const numRejectedReasons = rejectedReasons.length;
                if ((fulfilledIds === null || fulfilledIds === void 0 ? void 0 : fulfilledIds.length) > 0) {
                    window.dispatchEvent(scheduleCustomEvent(ScheduleEvents.deleteMultiple, {
                        detail: { scheduleIds: fulfilledIds },
                    }));
                }
                if (displayToast) {
                    if ((fulfilledIds === null || fulfilledIds === void 0 ? void 0 : fulfilledIds.length) > 0) {
                        toast.push({
                            closable: true,
                            description: (React__default["default"].createElement(ToastDescription, { title: `${pluralize__default["default"]('schedule', numFulfilledIds, true)} deleted` })),
                            status: 'success',
                        });
                    }
                    if ((rejectedReasons === null || rejectedReasons === void 0 ? void 0 : rejectedReasons.length) > 0) {
                        toast.push({
                            closable: true,
                            description: (React__default["default"].createElement(ToastDescription, { body: rejectedReasons === null || rejectedReasons === void 0 ? void 0 : rejectedReasons.toString(), title: `Unable to delete ${pluralize__default["default"]('schedule', numRejectedReasons, true)}` })),
                            duration: 15000,
                            status: 'error',
                        });
                    }
                }
            }
            catch (err) {
                if (displayToast) {
                    toast.push({
                        closable: true,
                        description: (React__default["default"].createElement(ToastDescription, { body: getErrorMessage(err), title: "Unable to delete schedules" })),
                        duration: 15000,
                        status: 'error',
                    });
                }
            }
        });
    }
    function publishSchedule({ displayToast = true, schedule, }) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                const scheduleId = schedule.id;
                yield _publish({ scheduleId });
                window.dispatchEvent(scheduleCustomEvent(ScheduleEvents.publish, { detail: { scheduleId } }));
                if (displayToast) {
                    toast.push({
                        closable: true,
                        description: React__default["default"].createElement(ToastDescription, { title: "Document published" }),
                        status: 'success',
                    });
                }
            }
            catch (err) {
                if (displayToast) {
                    toast.push({
                        closable: true,
                        description: (React__default["default"].createElement(ToastDescription, { body: getErrorMessage(err), title: "Unable to publish schedule" })),
                        duration: 15000,
                        status: 'error',
                    });
                }
            }
        });
    }
    function updateSchedule({ date, displayToast = true, scheduleId, }) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                yield _update({ documentSchedule: { executeAt: date }, scheduleId });
                window.dispatchEvent(scheduleCustomEvent(ScheduleEvents.update, { detail: { date, scheduleId } }));
                if (displayToast) {
                    toast.push({
                        closable: true,
                        description: (React__default["default"].createElement(ToastDescription, { body: formatDateTz({
                                date: new Date(date),
                                includeTimeZone: true,
                                prefix: 'Publishing on ',
                            }), title: "Schedule updated" })),
                        duration: 15000,
                        status: 'success',
                    });
                }
            }
            catch (err) {
                if (displayToast) {
                    toast.push({
                        closable: true,
                        description: (React__default["default"].createElement(ToastDescription, { body: getErrorMessage(err), title: "Unable to update schedule" })),
                        duration: 15000,
                        status: 'error',
                    });
                }
            }
        });
    }
    return {
        createSchedule,
        deleteSchedule,
        deleteSchedules,
        publishSchedule,
        updateSchedule,
    };
}

const fetcher = (queryKey) => getSanityClient().request({
    query: queryKey.params,
    method: 'GET',
    uri: queryKey.url,
});
const SWR_OPTIONS = {
    refreshInterval: 10000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    shouldRetryOnError: false,
};
const NO_SCHEDULES = [];
/**
 * Poll for all schedules
 */
function usePollSchedules({ documentId, state } = {}) {
    const queryKey = {
        params: {
            documentIds: documentId,
            state,
        },
        url: getScheduleBaseUrl(),
    };
    const { data, error, mutate } = useSWR__default["default"](queryKey, fetcher, SWR_OPTIONS);
    // Immediately remove schedule from SWR cache and revalidate
    const handleDelete = React.useCallback((event) => {
        mutate((currentData) => {
            var _a;
            return ({
                schedules: (_a = currentData === null || currentData === void 0 ? void 0 : currentData.schedules) === null || _a === void 0 ? void 0 : _a.filter((schedule) => schedule.id !== event.detail.scheduleId),
            });
        }, true // revalidate SWR
        );
    }, [mutate]);
    // Immediately remove schedules from SWR cache and revalidate
    const handleDeleteMultiple = React.useCallback((event) => {
        mutate((currentData) => {
            var _a;
            return ({
                schedules: (_a = currentData === null || currentData === void 0 ? void 0 : currentData.schedules) === null || _a === void 0 ? void 0 : _a.filter((schedule) => !event.detail.scheduleIds.includes(schedule.id)),
            });
        }, true // revalidate SWR
        );
    }, [mutate]);
    // Immediately publish schedule in SWR cache and revalidate
    const handlePublish = React.useCallback((event) => {
        mutate((currentData) => {
            const currentSchedules = (currentData === null || currentData === void 0 ? void 0 : currentData.schedules) || [];
            const index = currentSchedules.findIndex((schedule) => schedule.id === event.detail.scheduleId);
            return {
                schedules: [
                    ...currentSchedules === null || currentSchedules === void 0 ? void 0 : currentSchedules.slice(0, index),
                    Object.assign(Object.assign({}, currentSchedules[index]), { executeAt: new Date().toISOString(), state: 'succeeded' }),
                    ...currentSchedules === null || currentSchedules === void 0 ? void 0 : currentSchedules.slice(index + 1),
                ],
            };
        }, true // revalidate SWR
        );
    }, [mutate]);
    // Immediately update schedule in SWR cache and revalidate
    const handleUpdate = React.useCallback((event) => {
        mutate((currentData) => {
            const currentSchedules = (currentData === null || currentData === void 0 ? void 0 : currentData.schedules) || [];
            const index = currentSchedules.findIndex((schedule) => schedule.id === event.detail.scheduleId);
            return {
                schedules: [
                    ...currentSchedules === null || currentSchedules === void 0 ? void 0 : currentSchedules.slice(0, index),
                    Object.assign(Object.assign({}, currentSchedules[index]), { executeAt: event.detail.date }),
                    ...currentSchedules === null || currentSchedules === void 0 ? void 0 : currentSchedules.slice(index + 1),
                ],
            };
        }, true // revalidate SWR
        );
    }, [mutate]);
    // Listen to schedule events
    React.useEffect(() => {
        window.addEventListener(ScheduleEvents.delete, handleDelete);
        window.addEventListener(ScheduleEvents.deleteMultiple, handleDeleteMultiple);
        window.addEventListener(ScheduleEvents.publish, handlePublish);
        window.addEventListener(ScheduleEvents.update, handleUpdate);
        return () => {
            window.removeEventListener(ScheduleEvents.delete, handleDelete);
            window.removeEventListener(ScheduleEvents.deleteMultiple, handleDeleteMultiple);
            window.removeEventListener(ScheduleEvents.publish, handlePublish);
            window.removeEventListener(ScheduleEvents.update, handleUpdate);
        };
    }, [handleDelete, handleDeleteMultiple, handlePublish, handleUpdate]);
    // By default: sort schedules by last execute date (executedAt || executeAt)
    const sortedSchedules = React.useMemo(() => { var _a; return (_a = data === null || data === void 0 ? void 0 : data.schedules) === null || _a === void 0 ? void 0 : _a.sort(sortByExecuteDate()); }, [data === null || data === void 0 ? void 0 : data.schedules]);
    return {
        error,
        isInitialLoading: !error && !data,
        schedules: sortedSchedules || NO_SCHEDULES,
    };
}

exports.DATE_FORMAT = DATE_FORMAT;
exports.DOCUMENT_HAS_ERRORS_TEXT = DOCUMENT_HAS_ERRORS_TEXT;
exports.DOCUMENT_HAS_WARNINGS_TEXT = DOCUMENT_HAS_WARNINGS_TEXT;
exports.FEATURE_NOT_SUPPORTED_TEXT = FEATURE_NOT_SUPPORTED_TEXT;
exports.SCHEDULE_ACTION_DICTIONARY = SCHEDULE_ACTION_DICTIONARY;
exports.SCHEDULE_FAILED_TEXT = SCHEDULE_FAILED_TEXT;
exports.SCHEDULE_FILTERS = SCHEDULE_FILTERS;
exports.SCHEDULE_STATE_DICTIONARY = SCHEDULE_STATE_DICTIONARY;
exports.TOOL_HEADER_HEIGHT = TOOL_HEADER_HEIGHT;
exports.allTimeZones = allTimeZones;
exports.debugWithName = debugWithName;
exports.getLastExecuteDate = getLastExecuteDate;
exports.getSanityClient = getSanityClient;
exports.localTimeZone = localTimeZone;
exports.sortByExecuteDate = sortByExecuteDate;
exports.usePollSchedules = usePollSchedules;
exports.useScheduleOperation = useScheduleOperation;
exports.useTimeZone = useTimeZone;
