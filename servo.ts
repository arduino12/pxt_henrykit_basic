/**
 * HenryKit extension for MakeCode micro:bit.
 */
//% block="HenryKit" color=#ff7c00 icon="\uf281"
namespace henrykit {
	//% fixedInstances
	export class Servo {
		private _init: boolean;
		private _wait: boolean;
		private _pin: AnalogPin;
		private _angle: number;
		private _targetAngle: number;
		private _speed: number;

		constructor(pin: AnalogPin) {
			this._pin = pin;
			this._init = false;
		}

		/**
		 * Initialize the servo motor with the given pin.
		 * @param pin PWM pin
		 * @param speed movement speed (0-100)
		 * @param wait whether to wait for a movement to complete
		 */
		//% subcategory="Servo" weight=90 expandableArgumentMode="toggle"
		//% block="init %this || pin %pin | speed %speed | wait %wait" inlineInputMode=inline
		//% pin.defl=AnalogPin.P0 speed.min=0 speed.max=100 speed.defl=100 wait.shadow=toggleOnOff
		//% blockId=henrykit_servo_init
		init(
			pin: AnalogPin=AnalogPin.P0,
			speed: number=100,
			wait: boolean=false
		): void {
			if (this._init)
				return;
			this._init = true;
			this._pin = pin;
			this._wait = wait;
			this._speed = speed;
		}

		/**
		 * Move the servo axis to the given angle with the given speed.
		 * @param angle absolute target angle(0-270)°
		 * @param speed movement speed (0-100)
		 * @param wait whether to wait for a movement to complete
		 */
		//% subcategory="Servo" weight=80
		//% block="move %this to %angle° || speed %speed | wait %wait"
		//% angle.min=0 angle.max=270 speed.min=0 speed.max=100
		//% angle.defl=90 speed.defl=100 wait.shadow=toggleOnOff
		//% blockId=henrykit_servo_move
		move(
			angle: number=90,
			speed: number=100,
			wait: boolean=false
		): void {
			this.init(this._pin);
			this._targetAngle = angle;
			pins.servoWritePin(this._pin, angle);
		}

		/**
		 * Move the servo axis to the given angle with the given speed.
		 * @param hold whether to hold the motor axis in place
		 */
		//% subcategory="Servo" weight=70
		//% block="stop %this | hold %hold"
		//% hold.defl=true hold.shadow=toggleOnOff
		//% blockId=henrykit_servo_stop
		stop(hold: boolean=true): void {
			this.init(this._pin)
			this._targetAngle = this._angle;
			if (!hold) {
				pins.analogWritePin(this._pin, 0);
				pins.analogReadPin(this._pin);
			}
		}
	}

	//% block="servo0" fixedInstance whenUsed
	export const servo0 = new Servo(AnalogPin.P0);
	//% block="servo1" fixedInstance whenUsed
	export const servo1 = new Servo(AnalogPin.P1);
	//% block="servo2" fixedInstance whenUsed
	export const servo2 = new Servo(AnalogPin.P2);
}
