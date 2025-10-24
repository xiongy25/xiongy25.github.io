# 大模型与机器人操作

## 机械臂操作

- [RDT-1B](https://rdt-robotics.github.io/rdt-robotics/) - 双手操作的扩散基础模型
- [ReflectVLM](https://github.com/yunhaif/reflect-vlm) - 多阶段长视界机器人操作的视觉语言模型
- [AnyPlace](https://any-place.github.io/) - 学习机器人操作的广义物体放置
- [RoboPoint](https://robo-point.github.io/) - 用于机器人空间可供性预测的视觉语言模型
- [ROSA](https://github.com/nasa-jpl/rosa) - ROS1 和 ROS2 系统的 AI 助手
- [RAI](https://github.com/RobotecAI/rai) - 一个用于机器人的多供应商代理框架
- [VLABench](https://github.com/OpenMOSS/VLABench) - 具有长期推理任务的语言条件机器人操作的大规模基准
- [RoCo](https://github.com/MandiZhao/robot-collab.git) - 具有大型语言模型的辩证多机器人协作
- [RoboFactory](https://iranqin.github.io/robofactory/) - 探索具有组合约束的具身代理协作
- [Human2Sim2Robot](https://github.com/tylerlum/human2sim2robot.git) - 通过单次人类演示，利用模拟到真实的强化学习跨越人机体现差距
- [wall-x](https://github.com/X-Square-Robot/wall-x.git) - 基于具身基础模型构建通用机器人
- [MoMaGen](https://momagen.github.io/) - 一种用于多步骤双臂移动机械手操作数据生成的方法，它通过将数据生成问题视为带有硬性和软性约束的优化问题来解决实际的数据收集挑战，并且能够在仿真环境中生成多样化的数据集，进而用于成功的模仿学习策略训练。
  <img width="1080" height="540" alt="image" src="https://github.com/user-attachments/assets/73149314-7036-4478-a285-b76ecc0d575d" />


## 人机交互与操作

- [PhysHOI](https://github.com/wyhuai/PhysHOI) - 基于物理的动态人机交互模拟
- [CooHOI](https://github.com/Winston-Gu/CooHOI) - 通过操纵物体动力学学习人与物体的协同交互
- [HOIFHLI](https://hoifhli.github.io/) - 通过人类层面的指令实现人与物体的交互
- [InterMimic](https://sirui-xu.github.io/InterMimic/) - 面向基于物理的人与物体交互的通用全身控制
- [BiGym](https://github.com/chernyadev/bigym) - 移动双手演示驱动机器人操作的新基准和学习环境
  - [Aloha Bigym](https://github.com/AlmondGod/aloha-bigym.git) - ALOHA 演示驱动的移动双手操作基准测试
- [Open-TeleVision](https://github.com/OpenTeleVision/TeleVision) - 具有沉浸式主动视觉反馈的远程操作

## 生成式机器人学习

- [RoboGen](https://github.com/Genesis-Embodied-AI/RoboGen) - 通过生成模拟释放无限数据，实现机器人自动学习
- [Genesis](https://genesis-embodied-ai.github.io/) - 用于机器人及其他领域的生成式通用物理引擎
- [RL Zero](https://hari-sikchi.github.io/rlzero/) - 无需任何监督的零样本语言到行为
- [GVHMR](https://github.com/zju3dv/GVHMR) - 从普通视频中还原出人物真实3D动作
- [Body Transformer](https://github.com/carlosferrazza/BodyTransformer) - 利用机器人化身进行策略学习
- [CLoSD](https://github.com/GuyTevet/CLoSD) - 通过结合文本驱动的扩散生成和强化学习实现人物动作的生成和执行
- [Unified World Models](https://weirdlabuw.github.io/uwm/) - 结合视频和动作扩散在大型机器人数据集上的预训练
- [Policy Decorator](https://github.com/tongzhoumu/policy_decorator.git) - “策略装饰器：大型策略模型的模型无关在线细化”代码

## 开源机械臂

- [open_manipulator](https://github.com/ROBOTIS-GIT/open_manipulator.git) -  提供了控制机器人、集成其传感器以及开发物理 AI 应用所需的接口和工具，包括使用 LeRobot 等框架的应用

## 开源VLA

- [X-VLA](https://thu-air-dream.github.io/X-VLA/) - 用于跨具体化操作的轻量级 VLA 模型，仅使用 1.5K 个演示进行训练，即可自主折叠衣物超过 2 小时
- [OpenVLA](https://openvla.github.io/) - 一个开源的视觉-语言-动作模型
- [OpenVLA](https://github.com/junnannie/OpenVLA.git) - 多模态具身智能大模型 OpenVLA 的复现以及在 LIBERO 数据集上的微调改进
- [isaacsim_openvla](https://github.com/RiccardoBianco/isaacsim_openvla.git) - 该项目演示了如何使用 NVIDIA Isaac Sim 生成的模拟数据对 OpenVLA（一种 VLA 机器人操作模型）进行微调
- [panda_robot_learning](https://github.com/Prithvijai/panda_robot_learning.git) - 在 Mujoco 仿真中将 OpenVLA 与 Panda Arm 连接起来 [模仿学习] [强化学习] [VLA]
- [PickAgent](https://github.com/miladfa7/PickAgent.git) - OpenVLA 驱动的拾取和放置代理（模拟）
  <img width="1528" height="831" alt="image" src="https://github.com/user-attachments/assets/341511ff-e55d-462e-bd37-45429db15bac" />
- [dexbotic](https://github.com/Dexmal/dexbotic.git) - 一个开源项目，旨在提供一个统一的框架，支持多种主流的视觉 - 语言 - 行动（VLA）策略，并提供强大的预训练基础模型。该框架支持云端和本地的训练需求，适用于多种主流机器人，包括 UR5、Franka 和 ALOHA。Dexbotic 采用了实验中心的开发框架，支持修改配置、更换模型或添加任务。


