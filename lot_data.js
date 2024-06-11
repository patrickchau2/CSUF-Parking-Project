import axios from "axios"
import cheerio from "cheerio"

const spans = []
let lotCounts = [0,0,0,0,0]
let updateTime = [0]
let ind = 3

axios.get('https://parking.fullerton.edu/ParkingLotCounts/mobile.aspx')
.then(res => {
    const htmlData = res.data
    const $ = cheerio.load(htmlData)
    const span = []

    $('span', htmlData).each((index, element) => {
        const span = $(element).text();
        spans.push(span);
    })
    getCounts(spans)
    return [updateTime, lotCounts]})
.catch(err => console.error(err))


function getCounts(spans){
    updateTime[0] = spans[2]
    let i = 0 
    while(ind <= 20){
        lotCounts[i] = spans[ind]
        ind = ind+4
        i++
    } 
    console.log(updateTime)
    console.log(lotCounts)
}





