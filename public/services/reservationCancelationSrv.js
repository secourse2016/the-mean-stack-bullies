
app.factory('cancelationReservation',function(){
   return {
       getReservation : function(fl,cb) {

          var req = {
              method: 'GET',
              url: '/api/getReservation/' + fl[0].refNum;
          };

                  return $http(req).then(function mySucces(response) {
               cb(response.data);
            }, function myError(response) {
                 cb(response.statusText);
            });
         }

];
  return reservation;
       },

       getFlights : function(){
           var flights = [


    {
        "flightNumber": { "type": "International","unique": "Ae345" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2015-06-26",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "4LugW" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-07-03",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "rT67I" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-08-03",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "Egji8" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-09-03",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "E3E3r" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-10-03",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "t4512" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-10-04",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "Ae346" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-10-05",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "gTol1" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-10-06",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "f3rtT" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-10-07",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "ZXC34" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-10-08",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "DE321" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-10-09",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "JFK",
        "destinationCity":"NewYork",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "freaq" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-06-26",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "BEU",
        "destinationCity":"Beirut",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "FLuv2" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-06-26",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "YKS",
        "destinationCity":"Tokyo",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "Cer32" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2017-06-26",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "CHR",
        "destinationCity":"Paris",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "National","unique": true },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2017-06-26",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "SHK",
        "destinationCity":"SharmELSheikh",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    },
    {
        "flightNumber": { "type": "International","unique": "Xze12" },
        "aircraft": "AirBus",
        "capacity": 707,
        "date": "2016-06-27",
        "duration": "2:00",
        "originIata": "CAI",
        "originCity": "Cairo",
        "destinationIata": "LDN",
        "destinationCity":"London",
        "seatMap": [{"reserved": true,"seatWindow":true,"aisle":true,"cost":"230.4","cabin": "1","reservationID":"321efr434"}],
        "url":"",
        "size": "medium"
    }

];
  return flights;
       }
   }
});