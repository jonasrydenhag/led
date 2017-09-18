#!/usr/bin/python

import sys
import time
import RPi.GPIO as GPIO

PIR_PIN = 27

def run():
	on()
	time.sleep(15)
	off()

def on():
	GPIO.setmode(GPIO.BCM)

	GPIO.setup(PIR_PIN, GPIO.OUT)

	GPIO.output(PIR_PIN, True)

def off():
	GPIO.setmode(GPIO.BCM)

	GPIO.setup(PIR_PIN, GPIO.OUT)

	GPIO.output(PIR_PIN, False)

	GPIO.cleanup()

if len(sys.argv) > 1:
	if sys.argv[1] == "run":
		run()
	elif sys.argv[1] == "on":
		on()
	elif sys.argv[1] == "off":
		off()
