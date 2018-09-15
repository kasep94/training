const dataList = [
  ['', '', '', '', '', '', '', ''],
  // ["8月", "周一13日", "周二14日", "周三15日", "周三15日", "周三15日", "周三15日", "周三15日"],
  ['上午', '', '', '', '', '', '', ''],
  ['下午', '', '', '', '', '', '', ''],
  ['晚上', '', '', '', '', '', '', '']
]

/* const apiData = [{
  "lessons": [{
    "merchant": {
      "service": "特色主题活动 零基础教学 咖啡甜点休闲 私人订制曲目 交通便利快捷 学习氛围轻松",
      "lola": "121.46697024649929,31.2094706851405",
      "has_hybrid_property": true,
      "addr": "肇嘉浜路288号鼎新大楼1001(9、12号线嘉善路地铁站5号口马路对面)",
      "certificate": 1,
      "phone": "4001764607",
      "delete_by_id": null,
      "teach_quality": "9.1",
      "the_effect": "9.1",
      "longitude": 121.46697024649929,
      "environment": "9.1",
      "detail_img": "/2018/08/31/22912047/1535686785142517.jpg$/2018/08/31/22912047/1535686785416867.jpg$/2018/08/31/22912047/1535686785573664.jpg$/2018/08/31/22912047/1535686785767358.jpg$/2018/08/31/22912047/1535686785899421.jpg$/2018/08/31/22912047/1535686786022503.jpg$/2018/08/31/22912047/1535686786152535.jpg$/2018/08/31/22912047/1535686786421384.jpg$/2018/08/31/22912047/1535686786664428.jpg",
      "create_time": "2018-08-31 11:39:46",
      "query_in": null,
      "latitude": 31.2094706851405,
      "update_time": "2018-08-31 11:39:46",
      "id": 1,
      "detail_img_more": ["http://img.weyoo-inc.com/2018/08/31/22912047/1535686785142517.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686785416867.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686785573664.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686785767358.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686785899421.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686786022503.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686786152535.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686786421384.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686786664428.jpg"],
      "dp_code": 22912047
    },
    "trainee_id": 2,
    "habit": null,
    "start_hour": "12:00",
    "end_hour": "13:00",
    "course": {
      "has_hybrid_property": true,
      "learning_objective": "可以视谱弹唱任意歌曲",
      "course_id": 153568678915897,
      "create_time": "2018-08-31 11:39:49",
      "id": 153568678928221,
      "refund_explain": "一个月内扣除课时费退还余下费用，一个月后不予以退费",
      "suit_crowds": "青少年、成人",
      "min_current_price": "3880.00",
      "class_change_explain": "自由与老师沟通",
      "soldout_total": "1",
      "head_pic": "/2018/08/31/22912047/1535686789316817.jpg",
      "class_catergory_name": "钢琴",
      "head_pic_more": "http://img.weyoo-inc.com/2018/08/31/22912047/1535686789316817.jpg",
      "product_name": "钢琴弹唱初级课程",
      "update_time": "2018-08-31 11:39:49",
      "suit_base": "零基础、初级",
      "other_info": "null",
      "class_num": "1对1",
      "max_current_price": "3880.00",
      "class_high_lights": "[上课时间自由, 短时间 高效率]",
      "delete_by_id": null,
      "booking_info": "需提前1天预约",
      "suit_targets": "[喜爱唱歌、钢琴的人, 想要驻唱、表演的人, 自娱自乐]",
      "period_of_validity": "2017.01.10至2018.11.26",
      "origin_price": "5180.00",
      "query_in": null
    },
    "schedule_id": 1,
    "week_day": 1,
    "lesson": {
      "update_time": "2018-08-31 11:39:49",
      "class_total_hours": "半年",
      "item_name": "钢琴弹唱初级课",
      "price": "3880.00",
      "class_content": "钢琴弹唱初级课$5000$6个月&咖啡$180$5杯",
      "course_details_id": "153568678928221",
      "class_law": "每天",
      "create_time": "2018-08-31 11:39:49",
      "class_start_time": "随到随学",
      "sub_info": "肇嘉浜路288号鼎新大楼1001(9、12号线嘉善路地铁站5号口马路对面)",
      "origin_price": "5180.00",
      "id": 4
    },
    "day": "2018-09-04"
  }, {
    "merchant": {
      "service": "特色主题活动 零基础教学 咖啡甜点休闲 私人订制曲目 交通便利快捷 学习氛围轻松",
      "lola": "121.46697024649929,31.2094706851405",
      "has_hybrid_property": true,
      "addr": "肇嘉浜路288号鼎新大楼1001(9、12号线嘉善路地铁站5号口马路对面)",
      "certificate": 1,
      "phone": "4001764607",
      "delete_by_id": null,
      "teach_quality": "9.1",
      "the_effect": "9.1",
      "longitude": 121.46697024649929,
      "environment": "9.1",
      "detail_img": "/2018/08/31/22912047/1535686785142517.jpg$/2018/08/31/22912047/1535686785416867.jpg$/2018/08/31/22912047/1535686785573664.jpg$/2018/08/31/22912047/1535686785767358.jpg$/2018/08/31/22912047/1535686785899421.jpg$/2018/08/31/22912047/1535686786022503.jpg$/2018/08/31/22912047/1535686786152535.jpg$/2018/08/31/22912047/1535686786421384.jpg$/2018/08/31/22912047/1535686786664428.jpg",
      "create_time": "2018-08-31 11:39:46",
      "query_in": null,
      "latitude": 31.2094706851405,
      "update_time": "2018-08-31 11:39:46",
      "id": 1,
      "detail_img_more": ["http://img.weyoo-inc.com/2018/08/31/22912047/1535686785142517.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686785416867.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686785573664.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686785767358.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686785899421.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686786022503.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686786152535.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686786421384.jpg", "http://img.weyoo-inc.com/2018/08/31/22912047/1535686786664428.jpg"],
      "dp_code": 22912047
    },
    "trainee_id": 2,
    "habit": null,
    "start_hour": "14:00",
    "end_hour": "15:00",
    "course": {
      "has_hybrid_property": true,
      "learning_objective": "可以视谱弹唱任意歌曲",
      "course_id": 153568678915897,
      "create_time": "2018-08-31 11:39:49",
      "id": 153568678928221,
      "refund_explain": "一个月内扣除课时费退还余下费用，一个月后不予以退费",
      "suit_crowds": "青少年、成人",
      "min_current_price": "3880.00",
      "class_change_explain": "自由与老师沟通",
      "soldout_total": "1",
      "head_pic": "/2018/08/31/22912047/1535686789316817.jpg",
      "class_catergory_name": "钢琴",
      "head_pic_more": "http://img.weyoo-inc.com/2018/08/31/22912047/1535686789316817.jpg",
      "product_name": "钢琴弹唱初级课程",
      "update_time": "2018-08-31 11:39:49",
      "suit_base": "零基础、初级",
      "other_info": "null",
      "class_num": "1对1",
      "max_current_price": "3880.00",
      "class_high_lights": "[上课时间自由, 短时间 高效率]",
      "delete_by_id": null,
      "booking_info": "需提前1天预约",
      "suit_targets": "[喜爱唱歌、钢琴的人, 想要驻唱、表演的人, 自娱自乐]",
      "period_of_validity": "2017.01.10至2018.11.26",
      "origin_price": "5180.00",
      "query_in": null
    },
    "schedule_id": 2,
    "week_day": 1,
    "lesson": {
      "update_time": "2018-08-31 11:39:49",
      "class_total_hours": "半年",
      "item_name": "钢琴弹唱初级课",
      "price": "3880.00",
      "class_content": "钢琴弹唱初级课$5000$6个月&咖啡$180$5杯",
      "course_details_id": "153568678928221",
      "class_law": "每天",
      "create_time": "2018-08-31 11:39:49",
      "class_start_time": "随到随学",
      "sub_info": "肇嘉浜路288号鼎新大楼1001(9、12号线嘉善路地铁站5号口马路对面)",
      "origin_price": "5180.00",
      "id": 4
    },
    "day": "2018-09-04"
  }, {
    "merchant": null,
    "trainee_id": 2,
    "habit": {
      "remark": {
        "icon": "https://okcdn.apiweixin.top/asserts/img/xgyc/1.png"
      },
      "name": "每天阅读绘本30分钟",
      "describe": null,
      "key": "reading.drawing.30min.day",
      "type": "leaning",
      "id": 1
    },
    "start_hour": "18:30",
    "end_hour": "19:30",
    "course": null,
    "schedule_id": 4,
    "week_day": 1,
    "lesson": {
      "item_name": "读书",
      "sub_info": "<时间简史>"
    },
    "day": "2018-09-04"
  }],
  "day": "2018-09-14"
}] */
/* 
[{"day":"2018-09-15","schedules":[{"start_hour":"20:00","end_hour":"20:30","weekday":5,"schedule":{"title":"每天阅读绘本30分钟","type":"habit","describe":"请填写详情","habit":{"trainee_id":2,"create_date":"2018-09-14 18:46:58","habit_id":1,"describe":"请填写详情","valid":1,"id":1},"id":1,"habit_lib":{"remark":{"icon":"https://okcdn.apiweixin.top/asserts/img/xgyc/1.png"},"name":"每天阅读绘本30分钟","describe":null,"key":"reading.drawing.30min.day","type":"leaning","id":1}},"day":"2018-09-15"}]},{"day":"2018-09-20","schedules":[{"start_hour":"20:00","end_hour":"20:30","weekday":3,"schedule":{"title":"每天阅读绘本30分钟","type":"habit","describe":"请填写详情","habit":{"trainee_id":2,"create_date":"2018-09-14 18:46:58","habit_id":1,"describe":"请填写详情","valid":1,"id":1},"id":1,"habit_lib":{"remark":{"icon":"https://okcdn.apiweixin.top/asserts/img/xgyc/1.png"},"name":"每天阅读绘本30分钟","describe":null,"key":"reading.drawing.30min.day","type":"leaning","id":1}},"day":"2018-09-20"},{"start_hour":"15:00","end_hour":"16:30","weekday":3,"schedule":{"merchant":{"service":"免费wifi 主题活动 1对1私教 0基础钢琴 音乐水平测评 送教材","lola":"121.52527751264265,31.23510158994609","has_hybrid_property":true,"addr":"南泉北路528号新大陆广场北楼3层(近第一八佰伴)","certificate":1,"phone":"4001762485","delete_by_id":null,"teach_quality":"8.9","the_effect":"8.9","longitude":121.52527751264265,"environment":"8.9","detail_img":"/2018/08/31/57133903/1535687484481872.jpg$/2018/08/31/57133903/1535687484656351.jpg$/2018/08/31/57133903/1535687484849891.jpg$/2018/08/31/57133903/1535687485198355.jpg$/2018/08/31/57133903/1535687485374089.jpg$/2018/08/31/57133903/1535687485752788.jpg$/2018/08/31/57133903/1535687486060071.jpg$/2018/08/31/57133903/1535687486268627.jpg$/2018/08/31/57133903/1535687486435918.jpg","create_time":"2018-08-31 11:51:26","query_in":null,"latitude":31.23510158994609,"update_time":"2018-08-31 11:51:26","id":46,"detail_img_more":["http://img.weyoo-inc.com/2018/08/31/57133903/1535687484481872.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687484656351.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687484849891.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485198355.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485374089.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485752788.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486060071.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486268627.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486435918.jpg"],"dp_code":57133903},"course":{"update_time":"2018-08-31 11:51:32","class_total_hours":"20","item_name":"古筝专业课","price":"3000.00","class_content":"1对1古筝课$4000$20","course_details_id":"153568749177981","class_law":"提前预约","create_time":"2018-08-31 11:51:32","class_start_time":"随到随学","origin_price":"4000.00","id":231},"title":"古筝专业课","describe":"南泉北路528号新大陆广场北楼3层(近第一八佰伴)","type":"lesson","id":1},"day":"2018-09-20"}]},{"day":"2018-09-21","schedules":[{"start_hour":"20:00","end_hour":"20:30","weekday":4,"schedule":{"title":"每天阅读绘本30分钟","type":"habit","describe":"请填写详情","habit":{"trainee_id":2,"create_date":"2018-09-14 18:46:58","habit_id":1,"describe":"请填写详情","valid":1,"id":1},"id":1,"habit_lib":{"remark":{"icon":"https://okcdn.apiweixin.top/asserts/img/xgyc/1.png"},"name":"每天阅读绘本30分钟","describe":null,"key":"reading.drawing.30min.day","type":"leaning","id":1}},"day":"2018-09-21"},{"start_hour":"14:30","end_hour":"16:00","weekday":4,"schedule":{"merchant":{"service":"免费wifi 主题活动 1对1私教 0基础钢琴 音乐水平测评 送教材","lola":"121.52527751264265,31.23510158994609","has_hybrid_property":true,"addr":"南泉北路528号新大陆广场北楼3层(近第一八佰伴)","certificate":1,"phone":"4001762485","delete_by_id":null,"teach_quality":"8.9","the_effect":"8.9","longitude":121.52527751264265,"environment":"8.9","detail_img":"/2018/08/31/57133903/1535687484481872.jpg$/2018/08/31/57133903/1535687484656351.jpg$/2018/08/31/57133903/1535687484849891.jpg$/2018/08/31/57133903/1535687485198355.jpg$/2018/08/31/57133903/1535687485374089.jpg$/2018/08/31/57133903/1535687485752788.jpg$/2018/08/31/57133903/1535687486060071.jpg$/2018/08/31/57133903/1535687486268627.jpg$/2018/08/31/57133903/1535687486435918.jpg","create_time":"2018-08-31 11:51:26","query_in":null,"latitude":31.23510158994609,"update_time":"2018-08-31 11:51:26","id":46,"detail_img_more":["http://img.weyoo-inc.com/2018/08/31/57133903/1535687484481872.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687484656351.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687484849891.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485198355.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485374089.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485752788.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486060071.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486268627.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486435918.jpg"],"dp_code":57133903},"course":{"update_time":"2018-08-31 11:51:32","class_total_hours":"20","item_name":"古筝专业课","price":"3000.00","class_content":"1对1古筝课$4000$20","course_details_id":"153568749177981","class_law":"提前预约","create_time":"2018-08-31 11:51:32","class_start_time":"随到随学","origin_price":"4000.00","id":231},"title":"古筝专业课","describe":"南泉北路528号新大陆广场北楼3层(近第一八佰伴)","type":"lesson","id":1},"day":"2018-09-21"}]},{"day":"2018-09-17","schedules":[{"start_hour":"20:00","end_hour":"20:30","weekday":0,"schedule":{"title":"每天阅读绘本30分钟","type":"habit","describe":"请填写详情","habit":{"trainee_id":2,"create_date":"2018-09-14 18:46:58","habit_id":1,"describe":"请填写详情","valid":1,"id":1},"id":1,"habit_lib":{"remark":{"icon":"https://okcdn.apiweixin.top/asserts/img/xgyc/1.png"},"name":"每天阅读绘本30分钟","describe":null,"key":"reading.drawing.30min.day","type":"leaning","id":1}},"day":"2018-09-17"}]},{"day":"2018-09-16","schedules":[{"start_hour":"20:00","end_hour":"20:30","weekday":6,"schedule":{"title":"每天阅读绘本30分钟","type":"habit","describe":"请填写详情","habit":{"trainee_id":2,"create_date":"2018-09-14 18:46:58","habit_id":1,"describe":"请填写详情","valid":1,"id":1},"id":1,"habit_lib":{"remark":{"icon":"https://okcdn.apiweixin.top/asserts/img/xgyc/1.png"},"name":"每天阅读绘本30分钟","describe":null,"key":"reading.drawing.30min.day","type":"leaning","id":1}},"day":"2018-09-16"}]},{"day":"2018-09-19","schedules":[{"start_hour":"20:00","end_hour":"20:30","weekday":2,"schedule":{"title":"每天阅读绘本30分钟","type":"habit","describe":"请填写详情","habit":{"trainee_id":2,"create_date":"2018-09-14 18:46:58","habit_id":1,"describe":"请填写详情","valid":1,"id":1},"id":1,"habit_lib":{"remark":{"icon":"https://okcdn.apiweixin.top/asserts/img/xgyc/1.png"},"name":"每天阅读绘本30分钟","describe":null,"key":"reading.drawing.30min.day","type":"leaning","id":1}},"day":"2018-09-19"}]},{"day":"2018-09-18","schedules":[{"start_hour":"20:00","end_hour":"20:30","weekday":1,"schedule":{"title":"每天阅读绘本30分钟","type":"habit","describe":"请填写详情","habit":{"trainee_id":2,"create_date":"2018-09-14 18:46:58","habit_id":1,"describe":"请填写详情","valid":1,"id":1},"id":1,"habit_lib":{"remark":{"icon":"https://okcdn.apiweixin.top/asserts/img/xgyc/1.png"},"name":"每天阅读绘本30分钟","describe":null,"key":"reading.drawing.30min.day","type":"leaning","id":1}},"day":"2018-09-18"},{"start_hour":"15:00","end_hour":"16:30","weekday":1,"schedule":{"merchant":{"service":"免费wifi 主题活动 1对1私教 0基础钢琴 音乐水平测评 送教材","lola":"121.52527751264265,31.23510158994609","has_hybrid_property":true,"addr":"南泉北路528号新大陆广场北楼3层(近第一八佰伴)","certificate":1,"phone":"4001762485","delete_by_id":null,"teach_quality":"8.9","the_effect":"8.9","longitude":121.52527751264265,"environment":"8.9","detail_img":"/2018/08/31/57133903/1535687484481872.jpg$/2018/08/31/57133903/1535687484656351.jpg$/2018/08/31/57133903/1535687484849891.jpg$/2018/08/31/57133903/1535687485198355.jpg$/2018/08/31/57133903/1535687485374089.jpg$/2018/08/31/57133903/1535687485752788.jpg$/2018/08/31/57133903/1535687486060071.jpg$/2018/08/31/57133903/1535687486268627.jpg$/2018/08/31/57133903/1535687486435918.jpg","create_time":"2018-08-31 11:51:26","query_in":null,"latitude":31.23510158994609,"update_time":"2018-08-31 11:51:26","id":46,"detail_img_more":["http://img.weyoo-inc.com/2018/08/31/57133903/1535687484481872.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687484656351.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687484849891.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485198355.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485374089.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687485752788.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486060071.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486268627.jpg","http://img.weyoo-inc.com/2018/08/31/57133903/1535687486435918.jpg"],"dp_code":57133903},"course":{"update_time":"2018-08-31 11:51:32","class_total_hours":"20","item_name":"古筝专业课","price":"3000.00","class_content":"1对1古筝课$4000$20","course_details_id":"153568749177981","class_law":"提前预约","create_time":"2018-08-31 11:51:32","class_start_time":"随到随学","origin_price":"4000.00","id":231},"title":"古筝专业课","describe":"南泉北路528号新大陆广场北楼3层(近第一八佰伴)","type":"lesson","id":1},"day":"2018-09-18"}]}] */



export default {
  dataList,
  // apiData
}
