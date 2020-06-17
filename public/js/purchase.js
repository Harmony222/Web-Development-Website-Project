// Add event listener to "Read More" button
var readmore = Array.from(document.querySelectorAll('#morebutton'));
var moreinfo = Array.from(document.querySelectorAll('.moreinfo'));
var moretextArray = Array.from(document.querySelectorAll('.moretext'));
var moreiconArray = Array.from(document.querySelectorAll('.moreicon i'));

for (i = 0; i < readmore.length; i++) {
    let index = i;
    readmore[i].addEventListener('click', () => hidetext(index))
}

function hidetext(i) {
    moreinfo[i].classList.toggle('hidden');
    let moretext = moretextArray[i];
    let moreicon = moreiconArray[i];
    if (moreinfo[i].classList.contains('hidden')) {
        moretext.textContent = "Read More";
        moreicon.classList.remove('left');
        moreicon.classList.add('right');
    } else {
        moretext.textContent = "Read Less";
        moreicon.classList.remove('right');
        moreicon.classList.add('left');
    }
}
