/**
 * Blocks for driving MotorLR connected to ports M1&M2 */
//% weight=100 color=#FF69B4 icon="\uf005"

namespace QuadRoboMov {

    export enum MotorDirection {
        //% block="Forward ↑"
        Forward,
        //% block="Backward ↓"
        Backward
    }

    export enum Motors {
        //%blockId=qr_motordriver_motor_two
        //% block="motor L+R"
        MotorLR
    }


    /**
         * Turns on motor specified by eMotors in the direction specified
         * by eDirection, at the requested speed 
         *
         * @param motor which motor to turn on
         * @param dir   which direction to go
         * @param speed how fast to spin the motor
         */
    //% blockId=quadrobotics_motordriver_motor_on
    //% block="%motor|on direction %dir|speed %speed"
    //% speed.min=0 speed.max=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        /*first convert 0-100 to 0-1024 (approx) We wont worry about the lsat 24 to make life simpler*/
        let OutputVal = Math.clamp(0, 100, speed) * 10;

        switch (motor) {
            case Motors.MotorLR: /*Motor 1 uses Pins 8 and 12 & Motor 2 uses Pins 0 and 16*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P8, OutputVal);
                        pins.digitalWritePin(DigitalPin.P12, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        pins.analogWritePin(AnalogPin.P12, OutputVal);
                        pins.digitalWritePin(DigitalPin.P8, 0);
                        break
                    case MotorDirection.Backward:
                        pins.analogWritePin(AnalogPin.P0, OutputVal);
                        pins.digitalWritePin(DigitalPin.P16, 0);
                        pins.analogWritePin(AnalogPin.P16, OutputVal);
                        pins.digitalWritePin(DigitalPin.P0, 0);
                        break
                }
        }


    }
}