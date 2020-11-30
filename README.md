# pxt_henrykit_basic
HenryKit basic extension for MakeCode micro:bit!

## Add Extension
This repository can be added as an **extension** in MakeCode:
* open **https://makecode.microbit.org**
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/arduino12/pxt_henrykit_basic** and import

## Usage
### Sonar
``||init [trig] [echo]||``  
Initialize the **``sonar``** object, can be called this from **``on start``** and set different pinout.  
```sig
henrykit.sonar.init(
    trig: DigitalPin=DigitalPin.P2,
    echo: DigitalPin=DigitalPin.P1,
    maxCmDistance: number=300,
    updateMs: number=300
);
```
``||distance (cm)||``  
Read the distance in centimeters.  
```sig
henrykit.sonar.distance();
```
``||on distance [range] [min] to [max] (cm)||``  
Do something when the sensor reading match the given range.  
```sig
henrykit.onDistanceRange(
    inOut: InOut=InOut.GotIn,
    min: number=0,
    max: number=20,
    callback: () => void
);
```

## Example
Use the **``plot bar graph``** block to visualize the distance reported by a sonar sensor.

```blocks
basic.forever(function () {
    led.plotBarGraph(henrykit.sonar.distance(), 0);
	basic.pause(300);
})
```

## License
MIT

## Enjoy!
A.E. Tech

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
