import os
import requests
from PIL import Image
from io import BytesIO

def download_and_save_image(url, save_path, size):
    """下载图片并保存为指定尺寸"""
    try:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        img = img.resize(size)
        img.save(save_path)
        print(f"Saved image to {save_path}")
    except Exception as e:
        print(f"Error processing {url}: {e}")

def setup_images():
    """设置项目所需的所有图片"""
    # 创建图片目录
    os.makedirs("images/team", exist_ok=True)
    
    # 定义需要的图片
    images = [
        {
            "url": "https://picsum.photos/200/200?random=1",
            "path": "images/team/qin.jpg",
            "size": (200, 200)
        },
        {
            "url": "https://picsum.photos/300/300?random=2",
            "path": "images/team/member2.jpg",
            "size": (300, 300)
        },
        {
            "url": "https://picsum.photos/300/300?random=3",
            "path": "images/team/member3.jpg",
            "size": (300, 300)
        }
    ]
    
    # 下载并保存每张图片
    for img in images:
        download_and_save_image(img["url"], img["path"], img["size"])

if __name__ == "__main__":
    setup_images() 