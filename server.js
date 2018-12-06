const express = require('express')
const app = express()

const SunCalc = require('suncalc');
const moment = require('moment')

app.use(express.json())
app.use(express.static('public'))

app.post('/gettime', (req, res) => {
    var times = SunCalc.getTimes(new Date(), req.body.lat, req.body.long);

    var midday = new Date((times.sunrise.getTime() + times.sunset.getTime()) / 2)
    // console.log(midday)

    res.json({
        sunriseStart: moment(times.sunrise).subtract(24, 'minutes').format('h:mma'),
        sunriseEnd: moment(times.sunrise).add(24, 'minutes').format('h:mma'),
        middayStart: moment(midday).subtract(24, 'minutes').format('h:mma'),
        middayEnd: moment(midday).add(24, 'minutes').format('h:mma'),
        sunsetStart: moment(times.sunset).subtract(24, 'minutes').format('h:mma'),
        sunsetEnd: moment(times.sunset).add(24, 'minutes').format('h:mma')

    })
})

app.listen(3000)