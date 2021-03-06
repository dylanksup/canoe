// ADD LYFT FACTORY
angular.module('canoe.lyftServices', [])

.factory('LyftAuth', function($http, $window) {

  var postman = 'Basic T1RheS12M2RjMFJmOmYwZlFfYlBwbTFYV0M2N0k0Yzg2TldvazRVN2pDaXpj';

  var getLyftToken = function() {
    return $http({
      url: 'https://api.lyft.com/oauth/token',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: postman
      },
      data: {
        grant_type: 'client_credentials',
        scope: 'public'
      }
    }).then(function(res) {
      // console.log('TOKEN: ', res.data.access_token);
      return res.data;
    });
  };  

  var getUserLyftToken = function(authCode) {
    return $http({
      url: 'https://api.lyft.com/oauth/token',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic ' + btoa('XYarc8030gYN:SANDBOX-9hjc6Jle563hgeSRCCSOuo993fy7EXFL')
      }, // USE SANDBOX!!!!!!!!
      data: {
        grant_type: 'authorization_code',
        code: authCode
      }
    }).then(function(res) {
      console.log('TOKEN: ', res.data.access_token);
      return res.data;
    });
  };


  return {
    getLyftToken: getLyftToken,
    getUserLyftToken: getUserLyftToken
  };
})

.factory('LyftDetails', function($http) {
  var getLyftDriversNearBy = function(userData, token) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/drivers',
      headers: {
        authorization: 'bearer ' + token
      },
      params: {
        lat: 37.783708,
        lng: -122.4177484
      }
    }).then(function(response){
      return response.data;
    });
  };

  var getLyftEstimates = function(startData, endpointData, token) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/cost',
      headers: {
        authorization: 'bearer ' + token
      },
      params: {
        start_lat: startData.lat,
        start_lng: startData.lng,
        end_lat: endpointData.lat,
        end_lng: endpointData.lng
      }
    }).then(function(response) {
      return response.data;
    });
  };

  var getLyftEta = function(startData, token) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/eta',
      headers: {
        authorization: 'bearer ' + token
      },
      params: {
        lat: startData.lat,
        lng: startData.lng
      }
    }).then(function(response) {
      return response.data;
    });
  };

  var requestLyft = function(startData, endpointData, product, bearer) {
    return $http({
      method: 'POST',
      url: 'https://api.lyft.com/v1/rides',
      headers: {
        Authorization: 'Bearer ' + bearer,
        'Content-Type': 'application/json'
      },
      data: {
        'ride_type': product,
        origin: {
          lat: startData.lat,
          lng: startData.lng
        },
        destination: {
          lat: endpointData.lat,
          lng: endpointData.lng
        }
      }
    }).then(function(response) {
      console.log(response.status + ' LYFT REQUESTED');
      console.log(JSON.stringify(response));
    });
  };

  return {
    getLyftDriversNearBy: getLyftDriversNearBy,
    getLyftEta: getLyftEta,
    getLyftEstimates: getLyftEstimates,
    requestLyft: requestLyft
  };
});

