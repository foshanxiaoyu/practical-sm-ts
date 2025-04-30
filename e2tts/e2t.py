'''
# python -m venv ts                           // 建虚拟环境
cd ts/scripts
activate                                      // 启动虚拟环境
pip list                                      // 如果出现提示pip版本过旧,升级它
PATH\ python.exe -m pip install --upgrade pip // 升级pip 

'''
# 虚拟环境中 安装 edgs-tts 文字转语音模块
# pip install edge-tts  如果开代理没设置 PS1 proxy会报错
 
"""
edge-tts --list-voices // 列出语音模板

Name: zh-CN-XiaoxiaoNeural
Gender: Female

Name: zh-CN-XiaoyiNeural
Gender: Female

Name: zh-CN-YunjianNeural
Gender: Male

Name: zh-CN-YunxiNeural
Gender: Male

Name: zh-CN-YunxiaNeural
Gender: Male

Name: zh-CN-YunyangNeural
Gender: Male

Name: zh-CN-liaoning-XiaobeiNeural
Gender: Female

Name: zh-CN-shaanxi-XiaoniNeural
Gender: Female

edge-tts --voice zh-CN-YunxiNeural --text "在本章中，我们将构建一个财务仪表板：" --write-media test.mp3 

edge-tts --rate=-50% --text "Hello, world!" --write-media hello_with_rate_halved.mp3       // 语速
edge-tts --volume=-50% --text "Hello, world!" --write-media hello_with_volume_halved.mp3   // 音量

"""
import edge_tts
import asyncio
import os

TEXT = ''
with open('t2v.txt','rb') as f:
    data = f.read()
    TEXT = data.decode('utf-8')
print(TEXT)
voice = 'zh-CN-XiaoyiNeural'
# voice = 'zh-CN-YunxiNeural'
# output = os.getcwd()+'test.mp3'
output = 'test.mp3'
rate = '-5%'
volume = '+1%'

async def cover():
    tts = edge_tts.Communicate(text=TEXT,voice=voice,rate=rate,volume=volume)
    await tts.save(output)

if __name__ == '__main__':
    asyncio.run(cover())