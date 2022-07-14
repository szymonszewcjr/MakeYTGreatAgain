//configs


var cfg = {
    isEnabled : true,
    legacyLoading : false,
    oldViewsAndDate : true,
    removeCommentTeaser : true,
    oldDescription : true,
    seamlessSubBox : true,
    actionsUnderscore: true,
    moreActionbarItems: false //rarely works, experimental
}


//get settings from the store

chrome.storage.sync.get(null, function(result) {
    console.log(result.switch6)
    cfg.isEnabled = result.switch0;
    cfg.oldViewsAndDate = result.switch1;
    cfg.removeCommentTeaser = result.switch2;
    cfg.oldDescription = result.switch3;
    cfg.seamlessSubBox = result.switch4;
    cfg.actionsUnderscore= result.switch5;
    cfg.legacyLoading = result.switch6;
    onload();
    });

console.log(cfg);

const d = document;



//legacyloading



/*    

let didCheckerRun = false;

    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        loadChecker();
      }
    }).observe(document, {subtree: true, childList: true});
    
    

function loadChecker(){
checked = setInterval( () => {
if(document.querySelector("#header > ytd-comments-header-renderer") !== null && document.getElementById("comment-teaser") !== null){
    mainActivity();
    didCheckerRun = true;
}
}, 300)
}



setTimeout( () => { //if loadchecker wasnt run after 2 seconds from loading, run it now
    if(!didCheckerRun){
        loadChecker();
    }
}, 2000 )

*/

//new loading
var loadState = {
    headerHasLoaded : false,
    commentsHaveLoaded : false
}





function onload(){
    setInterval( //check every 300 ms if page is loaded
        () => {

            if(d.getElementById("comment-teaser") !== null && !loadState.headerHasLoaded){
                loadState.headerHasLoaded = true;
                headerHasBeenLoaded();
            }

            if(document.getElementById("comment-teaser") !== null && !loadState.commentsHaveLoaded){
                loadState.commentsHaveLoaded = true;
                commentsHaveBeenLoaded();
            }

        }, 300
    )
}


function headerHasBeenLoaded(){
//viewcount and upload date
if(cfg.oldViewsAndDate){
oldViewsAndDate();
}

//remove comment teaser
if(cfg.removeCommentTeaser){
    noCommentTeaser();
}

//seamless author and sub div

if(cfg.seamlessSubBox){
  seamlessSubscribeField();
}

//like,dislike,share buttons get an underscore
if(cfg.actionsUnderscore){
    underscoreActionButtons();
}

//this is supposed to move action buttons from context menu to action bar, 
//haven't figured out how to do it properly yet tho, and current solution is unreliable and kinda sucks.
if(cfg.moreActionbarItems || true){ 
        moreActionbarItems();
}





}

//headers related stuffs

function oldViewsAndDate(){
    /////////----------viewcount and upload date ---------//////   
    
    
            var danePodTytulem = d.getElementById("formatted-snippet-text").innerHTML
            .replaceAll(` style-target="`, "")
            .replaceAll(`">`, ">")
            .replaceAll(/bold/ig, "");
            
            const crapArray = [];
            let iterator = 0;
            
            while (danePodTytulem !== "") {
                if(iterator > 10){
                break;
                }
            
                let stringForPushing = danePodTytulem
                .slice(danePodTytulem.indexOf("<span"), danePodTytulem.indexOf("</span>") + 7)
                    crapArray[iterator] = stringForPushing;
                   danePodTytulem = danePodTytulem.replace(stringForPushing, "");
                    iterator++;
            }
            
            crapArray.pop();
            let out = crapArray.join(" ");
            d.querySelector("#description-inline-expander").remove();
            document.querySelectorAll("#description")[1].innerHTML = out;
            console.log(out);
    }
    function noCommentTeaser(){
    
    
    
        d.getElementById("comment-teaser").style = "display:none";
        //d.getElementById("expand-sizer").style = "display:none";
        //d.getElementById("expand").style = "display:none";
        //d.getElementById("ellipsis").style = "display:none";
        
    }
    function seamlessSubscribeField(){
        document.querySelector("ytd-watch-metadata:not([modern-metapanel]) #owner.ytd-watch-metadata").style = "border:0; padding: 0 0 0 0; margin-top: 0px;";
    }
    function underscoreActionButtons(){
        document.querySelector("#top-level-buttons-computed").style = "border-bottom: 1px solid; border-style: ridge; border-color:rgb(48, 48, 48);";
    }
    function moreActionbarItems(){


let xpathForContextButton = `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/ytd-watch-metadata/div/div[2]/div[2]/div/div/ytd-menu-renderer/yt-icon-button`;
let xpathForSaveButton = `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-menu-popup-renderer/tp-yt-paper-listbox/ytd-menu-service-item-renderer[1]`

let contextButton = document.evaluate(xpathForContextButton, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue

        contextButton.click();

        d.querySelector("body > ytd-app > ytd-popup-container > tp-yt-iron-dropdown").style = "display:none";

        contextButton.click();

let saveButton = document.evaluate(xpathForSaveButton, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

let doOnceSaveButton = false;

setInterval(() => {
    if(saveButton == null && !doOnceSaveButton){
    saveButton = document.evaluate(xpathForSaveButton, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
    if(saveButton != null && !doOnceSaveButton){
        rectifySaveButtonElement();
        d.querySelector("#top-level-buttons-computed").appendChild(saveButton);
        doOnceSaveButton = true;
    }
},
100

)

function rectifySaveButtonElement(){

    console.log(saveButton);
}

}



      

function commentsHaveBeenLoaded(){
}

//comment related stuffs



