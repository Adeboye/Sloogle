exports.create = function (response) {

    var code = response.query.code;
    var oauthurl = "https://unsplash.com/oauth/authorize?";
    var path = encodeURIComponent('client_id=f15c06db461eaa225299c47c8eb564901b1b55f770050e6d7d1e5213b365b538&redirect_uri=http://localhost:8080/photo/callback&code=' + code + '&grant_type=authorization_code'); 

    var options = {
        host: url,
        path: path,
        method: 'POST',
        port: 80
    }

    http.request(options, function (res) {
         console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();

}

//"https://unsplash.com/oauth/authorize?client_id=f15c06db461eaa225299c47c8eb564901b1b55f770050e6d7d1e5213b365b538&redirect_uri=&response_type=code&scope=public+read_user+write_user+read_photos+write_photos"
