/**
 * HenryKit extension for MakeCode micro:bit.
 */
//% block="HenryKit" color=#ff7c00 icon="\uf281"
namespace henrykit {
	//% fixedInstances
	export class Sonar {
		private _init: boolean;
		private _trig: DigitalPin;
		private _echo: DigitalPin;
		private _maxCmDistance: number;

		constructor() {
			this._init = false;
		}

		/**
		 * Initialize the ultrasonic sonar module with the given pins.
		 * @param trig trigger pin
		 * @param echo echo pin
		 * @param maxDistance maximum distance in centimeters (default is 300)
		 * @param updateMs the update rate of events (default is 300)
		 */
		//% subcategory="Sonar" weight=90 expandableArgumentMode="toggle"
		//% block="init %this || trig %trig | echo %echo" inlineInputMode=inline
		//% trig.defl=DigitalPin.P2 echo.defl=DigitalPin.P1
		//% blockId=henrykit_sonar_init
		init(
			trig: DigitalPin=DigitalPin.P2,
			echo: DigitalPin=DigitalPin.P1,
			maxCmDistance: number=300,
			updateMs: number=300
		): void {
			if (this._init)
				return;
			this._init = true;
			this._trig = trig;
			this._echo = echo;
			this._maxCmDistance = maxCmDistance;
			pins.setPull(trig, PinPullMode.PullNone);
			pins.digitalWritePin(trig, 0);
		}

		/**
		 * Send an ultrasonic beep and wait for it to echo back,
		 * calculate and return the distance in centimeters.
		 */
		//% subcategory="Sonar" weight=80
		//% block="%this distance (cm)"
		//% blockId=henrykit_sonar_distance
		distance(): number {
			this.init()
			const UsToCm = 29;
			// send pulse
			pins.digitalWritePin(this._trig, 1);
			control.waitMicros(10);
			pins.digitalWritePin(this._trig, 0);
			// return pulse time
			const d = Math.idiv(pins.pulseIn(this._echo, PulseValue.High, this._maxCmDistance * UsToCm), UsToCm);
			return d ? d : this._maxCmDistance;
		}

		/**
		 * Do something when the sensor reading match the given range.
		 * @param inOut the key to be checked
		 * @param min the range start
		 * @param max the range end
		 * @param callback code to run when the event is raised
		 */
		//% subcategory="Sonar" weight=70
		//% block="on %this $distance (cm) | %inOut | range %min to %max"
		//% inOut.defl=InOut.GotIn min.defl=0 max.defl=20
		//% min.min=0 min.max=300 max.min=0 max.max=300
		//% draggableParameters="reporter"
		//% blockId=henrykit_sonar_on_distance_range
		onDistanceRange(
			inOut: InOut=InOut.GotIn,
			min: number=0,
			max: number=20,
			callback: (distance: number) => void
		): void {
			this.init();
			control.inBackground(function () {
				let inRange = 2;
				let lastInRange;
				while (true) {
					basic.pause(100);
					let d = this.distance();
					lastInRange = inRange;
					inRange = d >= min && d <= max ? 1 : 0;
					if ((inOut & 1) != inRange)
						continue;
					if ((inOut & 2) && (lastInRange & 1) == inRange)
						continue;
					callback(d);
				}
			})
		}
	}

	//% block="sonar" fixedInstance whenUsed
	export const sonar = new Sonar();
}
