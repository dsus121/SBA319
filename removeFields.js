// public/js/removeFields.js

const mongoose = require('mongoose');
const Trail = require('./models/trail'); 

// remove fields from all documents in the trails_testing_data collection
const removeFields = () => {
    Trail.updateMany({}, {
      $unset: {
        "place_id_1": "",
        "name_1": "",
        "place_id_2": "",
        "name_2": "",
        "place_id_3": "",
        "name_3": "",
        "trail_num": "",
        "trail_num_": "",
        "trail_num1": "",
        "trail_nu_1": "",
        "snowmobile": "",
        "ski": "",
        "snowshoe": "",
        "plowed": "",
        "groomed": "",
        "groomer_ur": "",
        "seasonalit": "",
        "seasonal_1": "",
        "seasonal_2": "",
        "seasonal_3": ""
      }
    })
      .then((result) => {
        console.log("Fields removed:", result);
      })
      .catch((error) => {
        console.error("Error removing fields:", error);
      });
  };