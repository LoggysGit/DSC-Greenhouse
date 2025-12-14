from django.shortcuts import render

from django.http import StreamingHttpResponse
from django.http import JsonResponse

import cv2
import time

import serial
from datetime import datetime, timedelta
import json
import os

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(1) 
        if not self.video.isOpened():
            raise IOError("Cannot open USB camera with index 1")

    def __del__(self):
        self.video.release()

    def get_frame(self):
        success, image = self.video.read()
        if not success:
            return None 

        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

def gen(camera):
    """Get camera frames"""
    while True:
        frame = camera.get_frame()
        if frame is not None:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            time.sleep(0.1) 

def video_feed(request):
    """Transmit video"""
    try:
        cam = VideoCamera()
        return StreamingHttpResponse(
            gen(cam),
            content_type='multipart/x-mixed-replace; boundary=frame'
        )
    except IOError as e:
        return StreamingHttpResponse(f"Error: {e}", status=500)
    
# ===========================================================

last_timestamp = datetime.min 
def save_params(path, data):
    global last_timestamp

    period_min = 60

    # Имя файла: "Report-2025-01-01-14_00.json"
    timestamp = datetime.now().strftime("Report-%Y-%m-%d-%H_%M")
    file_name = f"{timestamp}.json"
    full_path = os.path.join(path, file_name)

    try:
        now = datetime.now()

        if now - last_timestamp >= timedelta(minutes=period_min):

            with open(full_path, 'w', encoding="utf-8") as f:
                json.dump(data, f, indent=4, ensure_ascii=False)

            last_timestamp = now

    except IOError as e:
        raise IOError(f"Error saving file on server to {full_path}: {e}")

    except Exception as e:
        raise IOError(f"An unexpected error occurred: {e}")

def readCOM(port="COM4", baudrate=115200, timeout=1):
    """Read COM Port"""
    ser = None
    try:
        ser = serial.Serial(port=port, baudrate=baudrate, timeout=timeout)
        time.sleep(1)

        serial_data = ser.readline().strip().decode("utf-8")
        return serial_data

    except Exception as e:
        return None

    finally:
        if ser is not None:
            try:
                ser.close()
            except:
                pass


def send_env_params(request):
    """Send params on URL"""
    port = "COM4"
    save_path = "app/reports/"

    data_string = readCOM(port)

    #save_params(save_path, data_string)

    if not data_string:
        return JsonResponse({"error": "No data"}, status=500)

    try:
        import json
        parsed = json.loads(data_string)
        return JsonResponse(parsed)

    except Exception:
        return JsonResponse({"raw": data_string})
    
# ================================================

def blank(request):
    """Blank backend page"""
    return StreamingHttpResponse(
        "DSC-Greenhouse Backend URL",
        content_type="text/plain"
    )