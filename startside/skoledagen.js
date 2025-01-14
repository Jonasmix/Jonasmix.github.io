const EVEN = 'EVEN'
const ODD = 'ODD'

var ukeNum = ''

const minFromTo = (start, end) => {
    const min = Math.floor((end - start) / (60 * 1000));
    return min
}

function isEven(num) {
  return (num % 2 == 0);
}

const ukedager = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']

const timeTider = {
    'søndag': [[0, 0, 23, 59]],
    mandag: [[8, 15, 8, 30], [8, 30, 9, 40], [9, 40, 9, 50], [9, 50, 11, 00], [11, 00, 11, 30], [11, 30, 12, 35], [12, 35, 12, 45], [12, 45, 13, 50], [14, 0, 15, 5]],
    tirsdag: [[8, 15, 8, 30], [8, 30, 9, 40], [9, 40, 9, 50], [9, 50, 10, 55], [10, 55, 11, 25], [11, 25, 12, 35], [12, 35, 12, 45], [12, 45, 13, 55]],
    onsdag: [[8, 15, 8, 30], [8, 30, 9, 35], [9, 35, 9, 50], [9, 50, 10, 50], [10, 50, 11, 00], [11, 00, 12, 5]],
    torsdag: [[8, 15, 8, 30], [8, 30, 9, 40], [9, 40, 9, 50], [9, 50, 10, 55], [10, 55, 11, 25], [11, 25, 12, 35], [12, 35, 12, 45], [12, 45, 13, 55]],
    fredag: [[8, 15, 8, 30], [8, 30, 9, 40], [9, 40, 9, 50], [9, 50, 10, 55], [10, 55, 11, 25], [11, 25, 12, 35], [12, 35, 12, 45], [12, 45, 13, 55]],
    'lørdag': [[00, 00, 23, 59]],
};

const timeFagU1 = {
    'søndag': ['HELG'],
    mandag: ['Frokost', 'Kroppsøving', '', 'Norsk', 'FRI', 'MAF', '', 'Matte', '', 'Mat og Helse'],
    tirsdag: ['Frokost', 'Kroppsøving', '', 'Matte', 'FRI', 'Programmering', '', 'Programmering', '', ''],
    onsdag: ['Frokost', 'Engelsk', '', 'MAF', 'FRI', 'Norsk'],
    torsdag: ['Frokost', 'Norsk', '', 'Samfunn', 'FRI', 'Naturfag', '', 'Timen livet'],
    fredag: ['Frokost', 'Uteskole', '', 'Uteskole', 'Uteskole', 'Uteskole', '', 'Uteskole'],
    'lørdag': ['HELG'],
}

const timeFagU2 = {
     'søndag': ['HELG'],
    mandag: ['Frokost', 'Samfunn', '', 'Programmering', 'FRI', 'Matte', '', 'MAF', '', 'KRLE'],
    tirsdag: ['Frokost', 'Timen livet', '', 'Samfunn', 'FRI', 'Kroppsøving', '', 'Naturfag',],
    onsdag: ['Frokost', 'Norsk', '', 'KRLE', 'FRI', 'Engelsk'],
    torsdag: ['Frokost', 'Engelsk', '', 'Matte', 'FRI', 'Naturfag', '', 'MAF'],
    fredag: ['Frokost', 'Mat og Helse', '', 'Mat og Helse', 'FRI', 'Matte', '', 'Norsk'],
    'lørdag': ['HELG'],
}

const currentSkoledagDate = new Date();
const startSkoledagenDate = new Date(currentSkoledagDate.getFullYear(), 0, 1);
const daysSkoledagen = Math.floor((currentSkoledagDate - startSkoledagenDate) /
    (24 * 60 * 60 * 1000));
    
var weekNumber = Math.ceil(daysSkoledagen / 7);

if (isEven(weekNumber)) {
    ukeNum = timeFagU2
}
else {
    ukeNum = timeFagU1
}

const timestampNow = (minuttOffset = 0) => {
    const now = new Date();
    const timeOffset = minuttOffset / 60;
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + timeOffset, now.getMinutes() + minuttOffset % 60);
}
const skoledagenNow = new Date();
// let offset = 0;
// const skoledagenNow = timestampNow(offset)
const ukedag = skoledagenNow.getDay()

const skoledagenDiv = document.getElementById('skoledagen')
const skoledagenTimerDiv = document.createElement('div')
skoledagenTimerDiv.className = 'skoledagen'
skoledagenDiv.appendChild(skoledagenTimerDiv)

console.log('skoledagenDiv getClientRects', skoledagenDiv.getClientRects())

const timeTiderIDag = timeTider[ukedager[ukedag]];
const skoleDagEndDate = new Date(skoledagenNow.getFullYear(), skoledagenNow.getMonth(), skoledagenNow.getDate(), timeTiderIDag.at(-1).at(2), timeTiderIDag.at(-1).at(3))
const minutterSkoledag = minFromTo(
    new Date(skoledagenNow.getFullYear(), skoledagenNow.getMonth(), skoledagenNow.getDate(), timeTiderIDag.at(0).at(0), timeTiderIDag.at(0).at(1)),
    skoleDagEndDate)

const renderSkoletimer = (containerDiv, renderTimestamp) => {
    containerDiv.innerHTML = '';
    timeTiderIDag.forEach((tt, index) => {
        const skoletimeStartDate = new Date(renderTimestamp.getFullYear(), renderTimestamp.getMonth(), renderTimestamp.getDate(), tt[0], tt[1]);
        const skoletimeEndDate = new Date(renderTimestamp.getFullYear(), renderTimestamp.getMonth(), renderTimestamp.getDate(), tt[2], tt[3]);
        const minutterSkoletime = minFromTo(skoletimeStartDate, skoletimeEndDate,)
        const restMinAvSkoletime = minFromTo(renderTimestamp, skoletimeEndDate)
        const prosentTimeTid = (minutterSkoletime / minutterSkoledag) * 100
        const skoletimeDiv = document.createElement('div')
        const klokkeDiv = document.createElement('div')
        const fagDiv = document.createElement('div')
        skoletimeDiv.className = 'skoletime'
        klokkeDiv.className = 'skoletimetid'
        fagDiv.className = 'skoletimefag'
        if (restMinAvSkoletime < 0) {
            skoletimeDiv.className = 'skoletime ferdig'
        }
        const contentKlokke = document.createTextNode(`${tt[0]}:${tt[1]}-${tt[2]}:${tt[3]}`)
        const contentFag = document.createTextNode(`${ukeNum[ukedager[ukedag]][index]}`)
        fagDiv.appendChild(contentFag)
        if (ukeNum[ukedager[ukedag]][index] !== '') {
            klokkeDiv.appendChild(contentKlokke)
        }
        skoletimeDiv.appendChild(fagDiv)
        skoletimeDiv.appendChild(klokkeDiv)
        containerDiv.appendChild(skoletimeDiv)
        skoletimeDiv.style.width = prosentTimeTid + '%'
    });
}

const minLeft = document.createElement('div')

skoledagenDiv.appendChild(minLeft)

const progressInterval = 1;
window.setInterval(() => {
    // offset = offset + (progressInterval / 60)
    const restMinAvSkoledag = minFromTo(timestampNow(), skoleDagEndDate)
    if (restMinAvSkoledag > 0) {
        minLeft.style.width = `${82.5 / minutterSkoledag * (minutterSkoledag - restMinAvSkoledag)}vw`;
    } else {
        minLeft.style.width = `82.5vw`;
    }
    renderSkoletimer(skoledagenTimerDiv, timestampNow())
}, progressInterval * 1000)

skoledagenTimerDiv.style.width = '82.5vw'
// minLeft.style.width = `${82.5 / minutterSkoledag * (minutterSkoledag - restMinAvSkoledag)}vw`;
minLeft.style.borderBottom = 'solid 5px rgb(160,160,160)'
