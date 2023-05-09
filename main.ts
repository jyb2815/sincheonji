input.onButtonPressed(Button.A, function () {
    빛_감지 = smarthome.ReadLightIntensity(AnalogPin.P3)
    온도_감지 = smarthome.ReadTemperature(TMP36Type.TMP36_temperature_C, AnalogPin.P1)
    if (빛_감지 < 50) {
        OLED.writeString("It's a bright day around right now.")
        basic.pause(100)
    } else {
        OLED.writeString("It's a dark night around right now.")
    }
    basic.pause(100)
    OLED.writeString("Temperature :")
    OLED.writeNum(온도_감지)
})
let 소음도 = 0
let 온도_감지 = 0
let 빛_감지 = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
OLED.init(128, 64)
basic.forever(function () {
    huskylens.request()
    소음도 = smarthome.ReadLightIntensity(AnalogPin.P2)
    if (소음도 > 70) {
        music.setVolume(255)
    } else if (소음도 > 50) {
        music.setVolume(200)
    } else {
        music.setVolume(160)
    }
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        OLED.clear()
        OLED.writeString("Red Color( STOP IT )")
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        basic.pause(100)
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Forever)
    } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        OLED.clear()
        OLED.writeString("Green Color (Let's Go)")
        basic.showLeds(`
            . # # # .
            # . . . #
            # . . . #
            # . . . #
            . # # # .
            `)
        basic.pause(100)
        music.startMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Forever)
    } else {
    	
    }
})
