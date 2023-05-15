javascript:(function () {
const core = {
    variables: {
        consoleOutputs: "",
        version: "v-db#1.1",
    },
    html: {},
    functions: {
        init: {
            container: () => {
                // Create a new div element for the white rectangle
                core.html.container = document.createElement("div");

                const container = core.html.container;
                // Set the CSS styles for the white rectangle
                container.style.position = "fixed";
                container.style.top = "0";
                container.style.right = "0";
                container.style.width = "30%";
                container.style.height = "100%";
                container.style.background = "white";
                container.style.zIndex = "9999";
                container.style.border = "3px solid";

                // Add the div element to the document
                document.body.appendChild(container);
                
                // Set the zoom of the page
                document.body.style.zoom = "80%";
                document.body.style.transformOrigin = "50% 20%";
                // document.body.style.transform = "scale(1.5) translate(50px, 50px)";
                // document.body.style.transformOrigin = "top left";
            },
            consoleInit: () => {
                core.html.cconsole = {};
            },
            consoleOut: () => {
                // Create output element
                core.html.cconsole.consoleOut = document.createElement("div");

                const cconsoleOut = core.html.cconsole.consoleOut;
                // Set the CSS styles for the white rectangle
                cconsoleOut.style.position = "fixed";
                cconsoleOut.style.height = "70%";
                cconsoleOut.style.background = "white";
                cconsoleOut.style.zIndex = "90999";
                cconsoleOut.style.border = "2px solid";
                cconsoleOut.style.width = "100%";
                cconsoleOut.style["overflow-y"] = "auto";

                // Add the div element to the document
                core.html.container.appendChild(cconsoleOut);

                cconsoleOut.innerHTML = "Core Console by xShadowBlade";
            },
            consoleBind: () => {
                const config = {
                    type: true,
                    timeStamp: false,
                    value: true,
                }
                if (console.everything === undefined) {
                    console.everything = [];
                    function TS(){
                        return (new Date).toLocaleString("sv", { timeZone: 'UTC' }) + "Z";
                    };
                    window.onerror = function (error, url, line) {
                        let output = {};
                        config.type ? output["type"] = "exception": undefined;
                        config.timeStamp ? output["timestamp"] = TS(): undefined;
                        config.value ? output["value"] = { error, url, line }: undefined;
                        console.everything.push(output);
                        return false;
                    };
                    window.onunhandledrejection = function (e) {
                        let output = {};
                        config.type ? output["type"] = "promiseRejection": undefined;
                        config.timeStamp ? output["timestamp"] = TS(): undefined;
                        config.value ? output["value"] = e.reason: undefined;
                        console.everything.push(output);
                    };
                  
                    function hookLogType(logType) {
                        const original= console[logType].bind(console);
                        return function(){
                            let output = {};
                            config.type ? output["type"] = logType: undefined;
                            config.timeStamp ? output["timestamp"] = TS(): undefined;
                            config.value ? output["value"] = Array.from(arguments): undefined;
                            console.everything.push(output);
                            original.apply(console, arguments);
                            // Update output
                            let a = "";
                            for (let x of console.everything) a += `${JSON.stringify(x)} <br>`;
                            core.html.cconsole.consoleOut.innerHTML = a;
                        };
                    };
                  
                    ['log', 'error', 'warn', 'debug'].forEach(logType=>{
                        console[logType] = hookLogType(logType)
                    })
                };
            },
            consoleExecute: () => {
                // Create execute element
                core.html.cconsole.cconsoleExe = document.createElement("div");

                const cconsoleExe = core.html.cconsole.cconsoleExe;
                // Set the CSS styles for the white rectangle
                cconsoleExe.style.position = "fixed";
                cconsoleExe.style.height = "30%";
                cconsoleExe.style.bottom = "0";
                cconsoleExe.style.background = "white";
                cconsoleExe.style.zIndex = "99999";
                cconsoleExe.style.border = "2px solid";
                cconsoleExe.style.width = "100%";
                cconsoleExe.style["overflow-y"] = "auto";

                cconsoleExe.contentEditable = "true";
                cconsoleExe.innerHTML = "Enter code here and press `enter` to execute! <br> Note: If you want a new line, press `shift + enter`";

                // Add the div element to the document
                core.html.container.appendChild(cconsoleExe);

                function cspEval(js) {
                    var script = document.createElement("script");
                
                    // No Blob ? No CSP !
                    if (Blob) {
                        var blob = new Blob([js], {"type": "application/javascript"});
                        script.src = URL.createObjectURL(blob);
                    } else {
                        var dataUri = "data:application/javascript," + js;
                        script.src = dataUri;
                    }
                
                    var callback = function() { document.body.appendChild(script) };
                    document.readyState === "complete" ? callback() : window.onload = callback;
                }

                cconsoleExe.addEventListener("keypress", function (event) {
                    if (!(event.shiftKey) && event.key == "Enter") {
                        event.preventDefault(); // prevent enter from being pressed
                        const input = cconsoleExe.innerHTML;
                        console.log(input);
                        cspEval(input);
                    }
                });

            },
            getCurrentRelease: () => {
                fetch(`https://api.github.com/repos/xShadowBlade/core-console/releases/latest`)
                    .then(response => response.json())
                    .then(data => {
                        const latestVersion = data.tag_name;
                        console.log("Latest release version:", latestVersion);
                        if (core.variables.version != latestVersion) {
                            console.log(`Your current version of Core Console is outdated. (${core.variables.version}) Please update to ${latestVersion} by visiting <a>${data.html_url}</a>`);
                        } else {
                            console.log(`Welcome to Core Console ${core.variables.version} ${data.name}. Detailed instructions coming soon™`);
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching release version:", error);
                        console.log("Maybe this website is blocking external requests. Try going to a different website to check for updates.")
                    });
            },
        },
        loop: {}
    },
};
// Init functions
for (let func in core.functions.init) {
    core.functions.init[func]();
}
})();