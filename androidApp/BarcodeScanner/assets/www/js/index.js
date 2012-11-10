/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    onDeviceReady: function() {
        console.log("We got to device ready");
    },
    // Scan a barcode
    //
    scan: function() {
        window.plugins.barcodeScanner.scan( function(result) {
			errorCode.innerText = result.text;
            var url = "http://ashabarcode.appspot.com/submitBarcode.html",
            params = "barcode="+result.text,
            result;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST",url,true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {
                    result = xmlhttp.responseText;
                    console.log(result);
                    if(result==0) {
                        errorCode.innerText="VALID. ADMIT ONE";
                    } else if(result==1) {
                        errorCode.innerText="TICKET INVALID. TICKET DOES NOT EXIST IN DATABASE";
                    } else {
                        errorCode.innerText="TICKET INVALID. TICKET HAS BEEN USED at "+result;
                    }
                }
            };
            xmlhttp.send(params);
            var xmlHttpTimeout=setTimeout(ajaxTimeout,10000);
            function ajaxTimeout() {
                xmlhttp.abort();
                //errorCode.innerText="Could not reach the server.";
            }
        }, function(error) {
        });
    },
    // Encode text into QR code
    //
    encode: function() {
        window.plugins.barcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
            alert("encode success: " + success);
        }, function(fail) {
            alert("encoding failed: " + fail);
        }); 
    }
};