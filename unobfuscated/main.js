(async function () {
const core = {
    functions: {
        init: {
            container: () => {
                // Create a new div element for the white rectangle
                const container = document.createElement("div");

                // Set the CSS styles for the white rectangle
                container.style.position = "fixed";
                container.style.top = "0";
                container.style.right = "0";
                container.style.width = "20%";
                container.style.height = "100%";
                container.style.background = "white";
                container.style.zIndex = "9999";

                // Add the div element to the document
                document.body.appendChild(container);
                
                // Set the zoom of the page
                document.body.style.zoom = "80%";
                document.body.style.transformOrigin = "50% 20%";
                // document.body.style.transform = "scale(1.5) translate(50px, 50px)";
                // document.body.style.transformOrigin = "top left";
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