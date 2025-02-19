# 双舵机位置反馈控制系统

## 开发环境
- IDE: VSCode + PlatformIO
- 框架: Arduino Framework
- 开发板: Arduino Uno
- Python: 3.8+（用于数据可视化）

## 项目设置
1. 创建PlatformIO项目：
   - Board: Arduino Uno
   - Framework: Arduino

2. 配置文件 `platformio.ini`：
```ini
[env:uno]
platform = atmelavr
board = uno
framework = arduino
lib_deps = 
    arduino-libraries/Servo@^1.1.8
    adafruit/Adafruit ADS1X15@^2.4.0
```

## 硬件要求
- Arduino Uno
- 2个带位置反馈的舵机
- ADS1115 16位ADC模块

## 硬件连接
### 舵机连接
| 舵机引脚 | Arduino引脚 | 说明 |
|---------|------------|------|
| 舵机1信号 | D9 | PWM控制信号 |
| 舵机2信号 | D10 | PWM控制信号 |
| 舵机VCC | 外部电源 | 建议5V独立供电 |
| 舵机GND | 外部电源GND |
| 舵机1反馈 | ADS1115 A0 | 位置反馈信号 |
| 舵机2反馈 | ADS1115 A1 | 位置反馈信号 |

### ADS1115连接
| ADS1115引脚 | Arduino引脚 | 说明 |
|------------|------------|------|
| VDD | 5V | 电源正极 |
| GND | GND | 电源地 |
| SCL | A5 | I2C时钟线 |
| SDA | A4 | I2C数据线 |
| ADDR | GND | 地址设置为0x48 |
| A0 | 舵机1反馈 | 模拟输入通道0 |
| A1 | 舵机2反馈 | 模拟输入通道1 |

## 使用说明
### 运行模式
1. 正常运行模式：实时显示舵机位置反馈
   - 运行`plot_angles.py`查看运行数据
2. 校准模式：获取舵机反馈信号范围
   - 运行`plot_servo.py`获取校准数据

### 校准流程
1. 修改代码参数：`CALIBRATION_MODE = true`
2. 上传代码并运行
3. 运行`plot_servo.py`获取ADC值范围
4. 更新代码中的ADC映射范围：
   - `ADC_MIN`：0度时的ADC值
   - `ADC_MAX`：180度时的ADC值
5. 切换到正常模式：`CALIBRATION_MODE = false`
6. 重新上传代码

### 参数调整
| 参数 | 范围 | 说明 |
|-----|------|------|
| ALPHA | 0.1-1.0 | 滤波系数，越小越平滑 |
| DEADBAND | 1-3度 | 死区范围，抑制抖动 |
| MOVE_INTERVAL | 毫秒 | 舵机移动间隔时间 |

## 注意事项
1. 舵机必须使用独立电源供电
2. 避免舵机线缆缠绕
3. 首次使用必须进行校准
4. 如果数据读取异常，可以尝试将各模块GND连接

## 故障排除
1. ADC读数不稳定
   - 检查接线是否牢固
   - 可以尝试将模块GND连接
   - 调整ALPHA值增加平滑度

2. 舵机反应迟缓
   - 检查电源是否足够
   - 减小ALPHA值提高响应速度
   - 减小DEADBAND值提高精度

3. 位置反馈不准确
   - 重新进行校准
   - 检查ADC_MIN和ADC_MAX值是否正确
   - 确保舵机机械结构无阻滞