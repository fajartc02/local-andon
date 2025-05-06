function sendWa(msg, receiverNo, res) {
    var data = qs.stringify({
        token: "nRRMT4Jomzf5vyn4DU1p4ywDuZ7pdYwDnULfGTlrAsVAMWcpeT",
        number: receiverNo,
        message: msg,
    });
    var config = {
        method: "post",
        url: "https://app.ruangwa.id/api/send_express",
        headers: {},
        data: data,
    };

    axios(config)
        .then(function(response) {
            console.log(JSON.stringify(response.data));
            res.status(200).json({
                message: 'notif success send',
                data: response.data
            })
        })
        .catch(function(error) {
            res.status(500).json({
                message: 'failed to send notif',
                err: error
            })
        });
}

export default configWa