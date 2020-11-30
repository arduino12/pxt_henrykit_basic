henrykit.sonar.init()
basic.forever(function () {
	serial.writeValue("distance", henrykit.sonar.distance());
    basic.pause(300)
})
