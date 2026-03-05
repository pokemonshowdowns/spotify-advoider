const targetNode = document.body; 
console.log("active")
const config = { 
    childList: true, 
    subtree: true ,
    attributes: true, 
     attributeFilter: ['class']
};
// if(localStorage.getItem('lastsong')==null){
//     localStorage.setItem('lastSong', 2);
// }
console.log(localStorage.getItem('lastSong'))

activesong = 2
const callback = (mutationList) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            
            mutation.addedNodes.forEach(node => {
                if (node.nodeName === 'A') {
                    console.log('New link detected:', node.href);
                } 
                else if (node.querySelectorAll) {
                    const links = node.querySelectorAll('a');
                    links.forEach(link => {
                        if (link.dataset && link.dataset.testid === "ad-companion-card") {
                            console.log('Ad companion card link detected:', link.href);
                            location.reload();
                            localStorage.setItem('lastSong', activesong);
                            
                        }
                    });
                    
                }
            });
        }
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const currentClass = mutation.target.className;
            //console.log('Class changed to:', currentClass);
            if (currentClass.includes('TiaWL1ubrITBXdmD')) {
                console.log('found active song');
                activesong  = mutation.target.parentNode.getAttribute('aria-rowindex')
                console.log(activesong)
            }
        }
    }
};
//window.addEventListener('load', function(){
    const checkExist = setInterval(() => {
        const playbuttons = document.getElementsByClassName('qrR_ZslfmF07R7Kb');
            if (playbuttons.length >= 1) {
                console.log("ready");
                button = playbuttons.item(this.localStorage.getItem('lastSong')-1)
                console.log(button)
                button.click()
                clearInterval(checkExist); 
            }

        }, 50); 
//)}
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
