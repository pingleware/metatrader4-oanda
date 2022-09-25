"use strict"

const request = require('request');

function Login(email, password, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/login.json?email=${email}&password=${password}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', session: data.session});
            }
        }
    });      
}
function Logout(session, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/logout.json?session=${session}`,
        'headers': {
          'Cookie': 'locale=en'
        }
      };
      request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', accounts: data.message});
            }
        }
      });
      
}
function GetMyAccounts(session, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-my-accounts.json?session=${session}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', accounts: data.accounts});
            }
        }
    });    
}
function GetWatchedAccounts(session, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-watched-accounts.json?session=${session}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', accounts: data.accounts});
            }
        }
    });
}
function GetOpenOrders(session, id, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-open-orders.json?session=${session}&id=${id}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', openOrders: data.openOrders});
            }
        }
    });
}
function GetOpenTrades(session, id, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-open-trades.json?session=${session}&id=${id}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', openTrades: data.openTrades});
            }
        }
    });    
}
function GetHistory(session, id, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-history.json?session=${session}&id=${id}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', history: data.history});
            }
        }
    });    
}
function GetDailyGain(session, id, start_date, end_date, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-daily-gain.json?session=${session}&id=${id}&start=${start_date}&end=${end_date}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', dailyGain: data.dailyGain});
            }
        }
    });    
}
function GetGain(session, id, start_date, end_date, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-gain.json?session=${session}&id=${id}&start=${start_date}&end=${end_date}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', gain: data.value});
            }
        }
    });    
}
function GetCustomWidget(session, id, width=300, height=200, bart=1, linet=0, bgColor='000000', gridColor=BDBDBD, lineColor='00CB05', barColor=FF8D0A, fontColor=FFFFFF, title='', titles=20, chartbgc=474747) {
    var options = {
        'method': 'GET',
        'url': `https://widgets.myfxbook.com/api/get-custom-widget.png?session=${session}&id=${id}&width=${width}&height=${height}&bart=${bart}&linet=${linet}&bgColor=${bgColor}&gridColor=${gridColor}&lineColor=${lineColor}&barColor=${barColor}&fontColor=${fontColor}&title=${title}&titles=${titles}&chartbgc=${chartbgc}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            callback({status: 'success', widget: data.response.body});
        }
    });    
}
function GetCommunitySentiment(session, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-community-outlook.json?session=${session}`,
        'headers': {
          'Cookie': 'locale=en'
        }
    };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', symbols: data.symbols});
            }
        }
   });    
}
function GetCommunitySentimentByCountry(session, symbol, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-community-outlook-by-country.json?session=${session}&symbol=${symbol.toLowerCase()}`,
        'headers': {
          'Cookie': 'locale=en'
        }
      };
    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', countries: data.countries});
            }
        }
    });    
}
function GetDataDaily(session, id, start_date, end_date, callback) {
    var options = {
        'method': 'GET',
        'url': `https://www.myfxbook.com/api/get-data-daily.json?session=${session}&id=${id}&start=${start_date}&end=${end_date}`,
        'headers': {
          'Cookie': 'locale=en'
        }
      };

    request(options, function (error, response) {
        if (error) {
            callback({status: 'error', meessage: error});
        } else {
            var data = JSON.parse(response.body);
            if (data.error) {
                callback({status: 'error', meessage: data.message});
            } else {
                callback({status: 'success', dataDaily: data.dataDaily});
            }
        }
    });    
}


module.exports = {
    Login,
    Logout,
    GetMyAccounts,
    GetWatchedAccounts,
    GetOpenOrders,
    GetOpenTrades,
    GetHistory,
    GetDailyGain,
    GetGain,
    GetCustomWidget,
    GetCommunitySentiment,
    GetCommunitySentimentByCountry,
    GetDataDaily
};