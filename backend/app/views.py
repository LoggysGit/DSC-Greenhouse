from django.shortcuts import render

from django.http import StreamingHttpResponse
from django.http import JsonResponse

from datetime import datetime, timedelta

import time
import cv2

import serial
import json
import os

class VideoCamera(object):
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(VideoCamera, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized: return
        
        # ГАРАНТИРОВАННО получаем путь к USB устройству
        device_path = self.get_only_usb_camera_path()
        
        if device_path is None:
            print("CRITICAL ERROR: No USB camera found!")
            self.video = None
            return

        # Передаем СТРОКУ (путь), а не число. Это исключает автовыбор вебки.
        self.video = cv2.VideoCapture(device_path)
        
        # Green-remover
        self.video.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        self.video.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        if not self.video.isOpened():
            print(f"Error: Could not open USB camera at {device_path}")
        else:
            print(f"Successfully LOCKED to USB camera: {device_path}")
            self._initialized = True

    def get_only_usb_camera_path(self):
        """Look for the first USB camera, ignoring PCI"""
        base_path = "/dev/v4l/by-path/"
        if not os.path.exists(base_path):
            print("Error: /dev/v4l/by-path/ not found. Is v4l-utils installed?")
            return None
        
        # Список всех устройств по их физическому пути
        devices = os.listdir(base_path)
        
        # Фильтруем: берем только те, где есть 'usb', и ПЕРВЫЙ интерфейс (index0)
        # index1 и прочие — это обычно метаданные, они не открываются как видео
        usb_devices = [
            os.path.join(base_path, d) 
            for d in devices 
            if "usb" in d.lower() and "index0" in d.lower()
        ]
        
        if usb_devices:
            # Сортируем, чтобы всегда брать одно и то же устройство
            return sorted(usb_devices)[0]
        
        return None

    def get_frame(self):
        if not self.video or not self.video.isOpened():
            return None
        
        success, image = self.video.read()
        if not success or image is None:
            return None 

        ret, jpeg = cv2.imencode('.jpg', image, [int(cv2.IMWRITE_JPEG_QUALITY), 85])
        return jpeg.tobytes()

# Инициализация
global_camera = VideoCamera()

def gen(camera):
    while True:
        if not camera.video:
            time.sleep(1)
            continue
        frame = camera.get_frame()
        if frame is not None:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            time.sleep(0.05)

def video_feed(request):
    return StreamingHttpResponse(
        gen(global_camera),
        content_type='multipart/x-mixed-replace; boundary=frame'
    )
    
# ===========================================================

last_timestamp = datetime.min 
def save_params(path, data):
    global last_timestamp

    period_min = 60

    #"Report-2025-01-01-14_00.json"
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

last_string_buffer = ""

def readCOM(
    port=None,
    baudrate=115200,
    timeout=1
):
    port = port or os.getenv("SERIAL_PORT", "/dev/ttyUSB0")

    ser = None
    try:
        ser = serial.Serial(port, baudrate, timeout=timeout)
        time.sleep(1)
        serial_data = ser.readline().strip().decode("utf-8")
        return serial_data

    except Exception:
        return last_string_buffer

    finally:
        if ser:
            ser.close()


def send_env_params(request):
    """Send params on URL"""
    port = "/dev/ttyUSB0"
    save_path = "./reports/"

    data_string = readCOM(port)

    #save_params(save_path, data_string)

    #if not data_string: return JsonResponse({"error": "No data"}, status=500)

    try:
        last_string_buffer = data_string
    
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
