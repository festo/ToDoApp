var oServer = (function(){
    var server = "http://localhost",
        port = 3000,
        path = "/api";

    function request(sMethod, sUrl, fCallback, oData) {
        var oXMLHttp = new XMLHttpRequest();

        oXMLHttp.onreadystatechange = function() {
            if (oXMLHttp.readyState == 4 ) {
                if(oXMLHttp.status === 200) {
                    fCallback(JSON.parse(oXMLHttp.response));
                } else {
                    var oError = {
                        status: oXMLHttp.status,
                        text: oXMLHttp.statusText
                    };

                    fCallback(oError,oXMLHttp);
                }
            }
        };

        oXMLHttp.open(sMethod, sUrl, true);
        if(oData == undefined) {
            oXMLHttp.send();
        } else {
            oXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            oXMLHttp.send(oData);
        }
    }

    function getServerURL() {
        return server + ":" + port + path;
    }

    return {
        getTasks: function(fCallback) {
            return request("GET", getServerURL()+"/tasks", fCallback);
        },
        addTask: function(sText, fCallback) {
            return request("POST", getServerURL()+"/tasks", fCallback, "text="+sText);
        },
        getTask: function(nId) {
            return request("GET", getServerURL()+"/tasks/"+nId, fCallback);
        }
    }
})();