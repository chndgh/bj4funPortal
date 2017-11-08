const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}
module.exports = {
  json2Form: json2Form,
  formatTime: formatTime,
  //Hou tai
  // BASE_URL: "http://localhost:8080",
  BASE_URL: "https://bj4fun.club/dream-0.0.1-SNAPSHOT",
  //activity type
  ACTIVITYTYPE: ['运动', '聚餐', '休闲娱乐', '旅游', '学习','会议'],
  ACTIVITYSTATUS: { '1001': '已创建', '1002': '投票中', '1003': '投票结束', '1004': '正在进行中', '1005': '活动结束' }
}
