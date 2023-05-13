(async function () {
const core = {
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
            console: () => {
                core.html.cconsole = {};

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

                cconsoleOut.innerHTML = "test";
            }
        },
        loop: {}
    },
};
// Init functions
for (let func in core.functions.init) {
    core.functions.init[func]();
}
})();