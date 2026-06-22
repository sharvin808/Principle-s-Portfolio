const fs = require('fs');

const latLonData = {
  "Afghanistan": { lat: 33, lon: 65, code: "af" },
  "Albania": { lat: 41, lon: 20, code: "al" },
  "Algeria": { lat: 28, lon: 3, code: "dz" },
  "Andorra": { lat: 42.5, lon: 1.5, code: "ad" },
  "Angola": { lat: -12.5, lon: 18.5, code: "ao" },
  "Argentina": { lat: -34, lon: -64, code: "ar" },
  "Armenia": { lat: 40, lon: 45, code: "am" },
  "Australia": { lat: -25, lon: 133, code: "au" },
  "Austria": { lat: 47.3, lon: 13.3, code: "at" },
  "Azerbaijan": { lat: 40.5, lon: 47.5, code: "az" },
  "Bahrain": { lat: 26, lon: 50.5, code: "bh" },
  "Bangladesh": { lat: 24, lon: 90, code: "bd" },
  "Belarus": { lat: 53, lon: 28, code: "by" },
  "Belgium": { lat: 50.8, lon: 4.6, code: "be" },
  "Bolivia": { lat: -17, lon: -65, code: "bo" },
  "Bosnia and Herzegovina": { lat: 44, lon: 18, code: "ba" },
  "Brazil": { lat: -10, lon: -55, code: "br" },
  "Bulgaria": { lat: 43, lon: 25, code: "bg" },
  "Cambodia": { lat: 13, lon: 105, code: "kh" },
  "Cameroon": { lat: 6, lon: 12, code: "cm" },
  "Canada": { lat: 60, lon: -95, code: "ca" },
  "Chile": { lat: -30, lon: -71, code: "cl" },
  "China": { lat: 35, lon: 105, code: "cn" },
  "Colombia": { lat: 4, lon: -73, code: "co" },
  "Costa Rica": { lat: 10, lon: -84, code: "cr" },
  "Croatia": { lat: 45, lon: 15.5, code: "hr" },
  "Cuba": { lat: 21.5, lon: -80, code: "cu" },
  "Cyprus": { lat: 35, lon: 33, code: "cy" },
  "Czech Republic": { lat: 49.7, lon: 15, code: "cz" },
  "Denmark": { lat: 56, lon: 10, code: "dk" },
  "Dominican Republic": { lat: 19, lon: -70.5, code: "do" },
  "Ecuador": { lat: -2, lon: -77.5, code: "ec" },
  "Egypt": { lat: 27, lon: 30, code: "eg" },
  "El Salvador": { lat: 13.8, lon: -88.9, code: "sv" },
  "Estonia": { lat: 59, lon: 26, code: "ee" },
  "Ethiopia": { lat: 8, lon: 38, code: "et" },
  "Finland": { lat: 64, lon: 26, code: "fi" },
  "France": { lat: 46, lon: 2, code: "fr" },
  "Georgia": { lat: 42, lon: 43.5, code: "ge" },
  "Germany": { lat: 51, lon: 9, code: "de" },
  "Ghana": { lat: 8, lon: -2, code: "gh" },
  "Greece": { lat: 39, lon: 22, code: "gr" },
  "Guatemala": { lat: 15.5, lon: -90.2, code: "gt" },
  "Honduras": { lat: 15, lon: -86.5, code: "hn" },
  "Hong Kong": { lat: 22.3, lon: 114.2, code: "hk" },
  "Hungary": { lat: 47, lon: 20, code: "hu" },
  "Iceland": { lat: 65, lon: -18, code: "is" },
  "India": { lat: 20, lon: 77, code: "in" },
  "Indonesia": { lat: -5, lon: 120, code: "id" },
  "Iran": { lat: 32, lon: 53, code: "ir" },
  "Iraq": { lat: 33, lon: 44, code: "iq" },
  "Ireland": { lat: 53, lon: -8, code: "ie" },
  "Israel": { lat: 31.5, lon: 34.7, code: "il" },
  "Italy": { lat: 42.8, lon: 12.8, code: "it" },
  "Jamaica": { lat: 18.1, lon: -77.2, code: "jm" },
  "Japan": { lat: 36, lon: 138, code: "jp" },
  "Jordan": { lat: 31, lon: 36, code: "jo" },
  "Kazakhstan": { lat: 48, lon: 68, code: "kz" },
  "Kenya": { lat: 1, lon: 38, code: "ke" },
  "Kuwait": { lat: 29.3, lon: 47.4, code: "kw" },
  "Latvia": { lat: 57, lon: 25, code: "lv" },
  "Lebanon": { lat: 33.8, lon: 35.8, code: "lb" },
  "Lithuania": { lat: 55, lon: 24, code: "lt" },
  "Luxembourg": { lat: 49.7, lon: 6.1, code: "lu" },
  "Madagascar": { lat: -20, lon: 47, code: "mg" },
  "Malaysia": { lat: 2.5, lon: 112.5, code: "my" },
  "Malta": { lat: 35.8, lon: 14.5, code: "mt" },
  "Mexico": { lat: 23, lon: -102, code: "mx" },
  "Monaco": { lat: 43.7, lon: 7.4, code: "mc" },
  "Mongolia": { lat: 46, lon: 105, code: "mn" },
  "Montenegro": { lat: 42.5, lon: 19.3, code: "me" },
  "Morocco": { lat: 32, lon: -5, code: "ma" },
  "Myanmar": { lat: 21, lon: 96, code: "mm" },
  "Nepal": { lat: 28, lon: 84, code: "np" },
  "Netherlands": { lat: 52.1, lon: 5.2, code: "nl" },
  "New Zealand": { lat: -41, lon: 174, code: "nz" },
  "Nicaragua": { lat: 13, lon: -85, code: "ni" },
  "Nigeria": { lat: 10, lon: 8, code: "ng" },
  "North Korea": { lat: 40, lon: 127, code: "kp" },
  "Norway": { lat: 62, lon: 10, code: "no" },
  "Oman": { lat: 21, lon: 57, code: "om" },
  "Pakistan": { lat: 30, lon: 70, code: "pk" },
  "Panama": { lat: 9, lon: -80, code: "pa" },
  "Paraguay": { lat: -23, lon: -58, code: "py" },
  "Peru": { lat: -10, lon: -76, code: "pe" },
  "Philippines": { lat: 13, lon: 122, code: "ph" },
  "Poland": { lat: 52, lon: 20, code: "pl" },
  "Portugal": { lat: 39.5, lon: -8, code: "pt" },
  "Qatar": { lat: 25.3, lon: 51.5, code: "qa" },
  "Romania": { lat: 46, lon: 25, code: "ro" },
  "Russia": { lat: 60, lon: 100, code: "ru" },
  "Saudi Arabia": { lat: 25, lon: 45, code: "sa" },
  "Senegal": { lat: 14, lon: -14, code: "sn" },
  "Serbia": { lat: 44, lon: 21, code: "rs" },
  "Singapore": { lat: 1.3, lon: 103.8, code: "sg" },
  "Slovakia": { lat: 48.6, lon: 19.5, code: "sk" },
  "Slovenia": { lat: 46, lon: 15, code: "si" },
  "South Africa": { lat: -29, lon: 24, code: "za" },
  "South Korea": { lat: 36, lon: 127.5, code: "kr" },
  "Spain": { lat: 40, lon: -4, code: "es" },
  "Sri Lanka": { lat: 7, lon: 81, code: "lk" },
  "Sweden": { lat: 62, lon: 15, code: "se" },
  "Switzerland": { lat: 47, lon: 8, code: "ch" },
  "Syria": { lat: 35, lon: 38, code: "sy" },
  "Taiwan": { lat: 23.5, lon: 121, code: "tw" },
  "Tanzania": { lat: -6, lon: 35, code: "tz" },
  "Thailand": { lat: 15, lon: 100, code: "th" },
  "Tunisia": { lat: 34, lon: 9, code: "tn" },
  "Turkey": { lat: 39, lon: 35, code: "tr" },
  "Uganda": { lat: 1, lon: 32, code: "ug" },
  "Ukraine": { lat: 49, lon: 32, code: "ua" },
  "United Arab Emirates": { lat: 24, lon: 54, code: "ae" },
  "United Kingdom": { lat: 55, lon: -3, code: "gb" },
  "United States": { lat: 38, lon: -97, code: "us" },
  "Uruguay": { lat: -33, lon: -56, code: "uy" },
  "Uzbekistan": { lat: 41, lon: 64, code: "uz" },
  "Venezuela": { lat: 8, lon: -66, code: "ve" },
  "Vietnam": { lat: 16, lon: 106, code: "vn" },
  "Zambia": { lat: -15, lon: 30, code: "zm" },
  "Zimbabwe": { lat: -20, lon: 30, code: "zw" },
  "UAE": { lat: 24, lon: 54, code: "ae" },
  "USA": { lat: 38, lon: -97, code: "us" },
  "UK": { lat: 55, lon: -3, code: "gb" }
};

// Map lat/lon to X, Y
// Let's use a manual mercator bounding fit based on existing map coords
// US: x:155, y:130
// UK: x:295, y:110
// IN: x:446, y:215
// HK: x:508, y:180
// AU: x:556, y:292

function latLonToXY(lat, lon) {
  // Simple linear for longitude
  let x = (lon + 180) * (640 / 360) - 10;
  
  // Custom non-linear fit for latitude because the map is heavily cropped/stylized
  let y;
  if (lat > 50) y = 110 - (lat - 50) * 1.5;
  else if (lat > 30) y = 130 - (lat - 30) * 1.0;
  else if (lat > 0) y = 200 - (lat - 0) * 2.3;
  else if (lat > -20) y = 250 - (lat + 20) * 2.5;
  else y = 290 - (lat + 20) * 1.5;

  return { x: Math.round(x), y: Math.round(y) };
}

const out = {};
for (const [name, data] of Object.entries(latLonData)) {
  const { x, y } = latLonToXY(data.lat, data.lon);
  out[name.toLowerCase()] = { code: data.code, x, y };
}

fs.writeFileSync('country_data.json', JSON.stringify(out, null, 2));
