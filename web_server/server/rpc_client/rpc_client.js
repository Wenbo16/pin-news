var jayson = require('jayson');

var client = jayson.client.http({
  port: 4040,
  hostname: 'localhost'
});

// Get news summaries for a user
function getNewsSummariesForUser(user_id, page_num, callback) {
  client.request('getNewsSummariesForUser', [user_id, page_num], function(err, error, response) {
    if (err) throw err;
    callback(response);
  });
}

// Log a news click event for a user
function logNewsClickForUser(user_id, news_id) {
  client.request('logNewsClickForUser', [user_id, news_id], function(err, error, response) {
    if (err) throw err;
  });
}

module.exports = {
  getNewsSummariesForUser: getNewsSummariesForUser,
  logNewsClickForUser: logNewsClickForUser
};
