#!/bin/bash

# 创建主要目录
mkdir -p qteam-hub
cd qteam-hub

# 创建必要的子目录
mkdir -p css js images/team

# 创建必要的文件
touch css/style.css
touch {index,data,methods,team}.html

# 下载示例图片
curl -o images/team/qin.jpg https://picsum.photos/200/200
curl -o images/team/member2.jpg https://picsum.photos/300/300
curl -o images/team/member3.jpg https://picsum.photos/300/300

echo "项目结构创建完成！" 