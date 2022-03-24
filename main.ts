radio.setGroup(1)
radio.setTransmitPower(7)
radio.onReceivedValue(function data_received(name: string, value: number) {
    
    let remote_serial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (learn == 1 && name == "learn" && value == 1) {
        if (data_list.indexOf(remote_serial) < 0) {
            data_list.push(remote_serial)
            console.log(data_list)
        }
        
    }
    
    if (learn == 1 && name == "learn" && value == 0) {
        if (data_list.indexOf(remote_serial) >= 0) {
            data_list.removeElement(remote_serial)
            console.log(data_list)
        }
        
    }
    
    if (data_list.indexOf(remote_serial) >= 0 && name == "alarm" && value == 1) {
        music.playTone(Note.C, 0)
    }
    
    if (data_list.indexOf(remote_serial) >= 0 && name == "alarm" && value == 0) {
        music.stopAllSounds()
    }
    
})
radio.setTransmitSerialNumber(true)
let learn = 0
let alarm = 0
let data_list = [0]
let send_learn = 0
//  FOREVER
function on_forever() {
    
}

//  Main
//  LEARN
input.onLogoEvent(TouchButtonEvent.LongPressed, function on_logo_event_longpressed() {
    
    if (learn == 0) {
        learn = 1
    } else {
        learn = 0
    }
    
    console.log(learn)
})
//  SEND_LEARN
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
    radio.sendValue("learn", 1)
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    radio.sendValue("learn", 0)
})
//  ALARM ON
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    radio.sendValue("alarm", 1)
    music.playTone(Note.C, 0)
})
//  ALARM OFF
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    alarm = 0
    radio.sendValue("alarm", 0)
    music.stopAllSounds()
})
