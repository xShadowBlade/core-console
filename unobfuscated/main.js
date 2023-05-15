(async function () {
const core = {
    variables: {
        consoleOutputs: "",
        version: "v-db#1.0",
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
                cconsoleOut.style.top = "0";
                cconsoleOut.style.right = "0";
                cconsoleOut.style.width = "30%";
                cconsoleOut.style.height = "70%";
                cconsoleOut.style.background = "white";
                cconsoleOut.style.zIndex = "9999";
                cconsoleOut.style.border = "1px solid";

                // Add the div element to the document
                document.body.appendChild(cconsoleOut);

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
            getCurrentRelease: () => {
                fetch(`https://api.github.com/repos/xShadowBlade/core-console/releases/latest`)
                    .then(response => response.json())
                    .then(data => {
                        const latestVersion = data.tag_name;
                        console.log("Latest release version:", latestVersion);
                        if (core.variables.version != latestVersion) {
                            console.log(`Your current version of Core Console is outdated. (${core.variables.version}) Please update to ${latestVersion} by visiting https://github.com/xShadowBlade/core-console and going to the releases page.`);
                        } else {
                            console.log("Welcome to Core Console. Detailed instructions coming soon™");
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