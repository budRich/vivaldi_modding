/*
Move Extensions to Panel
https://forum.vivaldi.net/topic/17879/moving-extension-icons-next-to-the-panel-toggles/16
Moves the extension action buttons to the panel.
*/

function csse() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
    #switch .extensions-wrapper {
        display: flex;
        flex-flow: row wrap;
    }
    #switch .extensions-wrapper {
        -webkit-app-region: no-drag;
    }
    #switch .button-toolbar.browserAction-button img {
        height: auto;
        width: 19px;
    }
    #switch .button-toolbar.toggle-extensions-group svg  {
        height: 16px;
        width: 4px;
    }
    #switch .extensions-wrapper .dragging-cancelled, #switch .toggle-extensions-group {
        background-color: transparent !important;
    }
    #switch .extensions-wrapper span:hover, #switch .toggle-extensions-group:hover {
        background-color: var(--colorBgDarker) !important;
    }
    
    /* popup */
    #switch {
        contain: initial;
    }
    #switch .extensionaction .popup.top::before, #switch .extensionaction .popup.top::after {
        display: none !important;
    }
    #panels-container.left #switch .extensionaction {
        position: absolute !important;
        top: 1px !important;
        left: 35px !important;
    }
    #panels-container.right #switch .extensionaction {
        position: absolute !important;
        top: 1px !important;
            left: unset !important;
        right: 35px;
    }    
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
};

function extPanel() {
    csse();
    const wrapper = document.querySelector('.toolbar-addressbar.toolbar > .extensions-wrapper');
    const pref = document.getElementById('overlay');
    const panel = document.getElementById('switch');
    panel.insertBefore(wrapper, pref);
};

// The code below is a loop waiting for the browser to load the UI. Something like this has to be used in all similar javascript mods, to ensure the interface has loaded before running dependent functions. You can call all functions you might use from just one instance.

let adr = {};
setTimeout(function wait() {
    adr = document.querySelector('.toolbar-addressbar.toolbar');
    if (adr) {
        extPanel();
    }
    else {
        setTimeout(wait, 300);
    }
}, 300);
