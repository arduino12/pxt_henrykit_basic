/**
 * HenryKit extension for MakeCode micro:bit.
 */
//% block="HenryKit" color=#ff7c00 icon="\uf281"
namespace henrykit {
	//% fixedInstances
	export class Probe {
		private _init: boolean;
		private _pin: AnalogPin;
		private _type: ProbeType;

		constructor() {
			this._init = false;
		}

		/**
		 * Initialize the probe module with the given pin.
		 * @param pin analog pin
		 * @param type probe type
		 * @param updateMs the update rate of events (default is 300)
		 */
		//% subcategory="Probe" weight=90 expandableArgumentMode="toggle"
		//% block="init %this || pin %pin | type %probeType" inlineInputMode=inline
		//% pin.defl=AnalogPin.P2 probeType.defl=ProbeType.Capacitive
		//% blockId=henrykit_probe_init
		init(
			pin: AnalogPin=AnalogPin.P2,
			probeType: ProbeType=ProbeType.Capacitive,
			updateMs: number=300
		): void {
			if (this._init)
				return;
			this._init = true;
			this._pin = pin;
			this._type = probeType;
		}

		/**
		 * Read the probe wetness (0-100).
		 */
		//% subcategory="Probe" weight=80
		//% block="%this wetness (\\%)"
		//% blockId=henrykit_probe_wetness
		wetness(): number {
			this.init();
			return Math.map(pins.analogReadPin(this._pin), 0, 1023, 0, 100);
		}

		/**
		 * Do something when the sensor reading match the given range.
		 * @param inOut the key to be checked
		 * @param min the range start
		 * @param max the range end
		 * @param callback code to run when the event is raised
		 */
		//% subcategory="Probe" weight=70
		//% block="on %this wetness (\\%)|%inOut|range %min to %max"
		//% inOut.defl=InOut.GotIn min.defl=30 max.defl=100
		//% min.min=0 min.max=100 max.min=0 max.max=100
		//% blockId=henrykit_probe_on_wetness_range
		onDistanceRange(
			inOut: InOut=InOut.GotIn,
			min: number=30,
			max: number=100,
			callback: () => void
		): void {
			this.init();
			// TBD...
		}
	}

	//% block="probe" fixedInstance whenUsed
	export const probe = new Probe();
}
