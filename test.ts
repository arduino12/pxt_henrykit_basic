henrykit.sonar.init()
basic.forever(function () {
    basic.pause(1000)
	serial.writeValue("distance", henrykit.sonar.distance());
})
