# 开源机械臂

## 机械臂开发工具

- [URDFly](https://github.com/Democratizing-Dexterous/URDFly.git) - URDFly 是一个基于 Python 的 URDF 机器人工具包.可视化功能：支持 STL/OBJ 显示、透明渲染、多坐标系（原始轴/MDH 轴）可视化、高亮连杆、关节转动以及URDF文件实时编辑显示；MDH 参数转换：自动从 URDF 提取修正 DH 参数，支持多Chain机器人，用于运动学计算与动力学回归；动力学代码生成：通过符号计算生成动力学回归器，助力参数辨识。

## 机械臂项目

- [PAROL6桌面机械臂](https://github.com/xiongy25/PAROL6-Desktop-robot-arm) - 桌面型开源机械臂
- [CompactRoboticArm机械臂](https://github.com/mvgjorge/CompactRoboticArm?tab=readme-ov-file) - 紧凑型机器人手臂
- [lerobot机械臂](https://github.com/huggingface/lerobot) - HuggingFace开源机械臂
- [RoboManipBaselines](https://github.com/isri-aist/RoboManipBaselines) - 集成各种模仿学习方法和基准任务环境的软件，为机器人操作提供基线
- [UR5 拾取和放置模拟](https://github.com/pietrolechthaler/UR5-Pick-and-Place-Simulation) - Ros/Gazebo 中的 UR5 拾取和放置模拟
- [双手操作模仿学习算法的比较](https://bimanual-imitation.github.io/) - 论文《双臂操作模仿学习算法的比较》（Drolet 等人，2024 年）的代码
- [OpenArm](https://github.com/enactic/openarm.git) - 一款开源的 7DOF 人形手臂，专为物理 AI 研究和在接触密集环境中的部署而设计。它拥有出色的反向驱动能力和柔顺性，在安全的人机交互方面表现出色，同时为实际应用提供实用的有效载荷能力。
  <img width="5216" height="2810" alt="image" src="https://github.com/user-attachments/assets/5f70c9ae-9cdc-4323-997b-d9f761b44835" />
- [kinova_isaaclab_sim2real](https://github.com/louislelay/kinova_isaaclab_sim2real.git) - 该存储库提供了一个模块化框架，用于使用Isaac Lab在Kinova Gen3机器人上训练强化学习 (RL) 代理，并在Isaac Sim中或通过 ROS2在真实机器人上部署训练有素的模型。

## lerobot相关工具

- [STL 文件和固件GUI](https://github.com/TheRobotStudio/SO-ARM100) - SO-ARM100的STL文件和固件GUI
- [磁编码器虚拟舵机](https://github.com/avenhaus/SO-ARM100-Encoders) - 探索使用更便宜的磁编码器来代替目前使用的伺服器作为引导臂
- [mg2hfbot](https://github.com/kywch/mg2hfbot) - 将MimicGen数据集转换为LeRobot格式，以训练和评估ACT、BC和扩散策略
- [ROS2 SO-ARM100](https://github.com/JafarAbdi/ros2_so_arm100) - 使用moveit进行运动规划
- [simpleautomation](https://github.com/1g0rrr/simpleautomation) - 使用多个ACT模型来解决复杂的机器人任务
- [dot_policy](https://github.com/IliaLarchenko/dot_policy?tab=readme-ov-file) - Decoder Only Transformer Policy for Behavior Cloning
- [bambot](https://github.com/timqian/bambot.git) - 低成本（约 300 美元）人形机器人🌱
- [LeRobotDepot](https://github.com/maximilienroberti/lerobotdepot.git) - 一个由社区驱动的仓库，列出了与 LeRobot 库兼容的开源硬件、组件和 3D 打印项目
- [一个基于 Web 的 so-arm100 游乐场。它允许用户通过网站和键盘直接控制真实的和模拟的 so-arm100](https://so-arm100.bambot.org/) - 
- [IsaacLab-SO_100](https://github.com/MuammerBay/IsaacLab-SO_100.git) - 该项目/仓库可用作基于 Isaac Lab 构建项目或扩展的模板。它允许您在核心 Isaac Lab 仓库之外的独立环境中进行开发。
- [phosphobot](https://github.com/phospho-app/phosphobot.git) - phosphoticbot是一个社区驱动的平台，使您能够训练和使用 VLA（视觉语言动作模型）来控制真实的机器人。
- [SmolVLA](https://huggingface.co/blog/smolvla) - 基于 Lerobot 社区数据训练的高效视觉-语言-动作模型
- [MCP server to let any LLM control your robot](https://www.youtube.com/watch?v=EmpQQd7jRqs) - 用于 SO-ARM100 控制的简单 MCP 服务器
- [SmolVLA](https://x.com/danaaubakir/status/1933546314731507982) - SmolVLA 是 Hugging Face 为机器人技术开发的轻量级基础模型。它专为在 LeRobot 数据集上轻松微调而设计，有助于加速您的开发！
- [LeRobot Sim2Real](https://github.com/StoneT2000/lerobot-sim2real.git) - LeRobot Sim2real 提供代码，用于通过ManiSkill在快速 GPU 并行模拟和渲染中使用强化学习进行训练，并部署到现实世界。
- [so101_sim](https://github.com/tuul-ai/so101_sim.git) - Mujoco 模拟环境，用于使用 so101 和 so100 机器人进行模仿学习和强化学习(从gemini-robotics 🦾移植)
- [AB-SO-BOT](https://github.com/Mr-C4T/AB-SO-BOT.git) - AB-SO-BOT 采用3D 打印部件和标准4040 T 型槽铝挤压件组合而成，为 LeRobotStudio 和 HuggingFace 设计的SO-ARM100机械臂打造可定制的模块化机身。❤️这种模块化设计使其能够轻松扩展并适应不同的机器人应用。从安装在摄像机三脚架上的紧凑型车间助手，到使用VR控制器进行远程操作的完全人形式双手设置。
  ![image](https://github.com/user-attachments/assets/6cde69a9-d4b4-469d-a618-d5c0fd2a421f)

  
## 教育资源

- [现代机器人课程](https://github.com/madibabaiasl/modern-robotics-course) - 机器人学的现代教育资源
