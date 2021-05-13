const scriptName = "날씨";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");

    if (cmd == "/날씨") {
        var result = getNaverWeather(data);
        if (result == null) replier.reply("날씨 정보 불러오기 실패");
        else replier.reply(data + "의 날씨 정보입니다\n\n" + result.shift() + "\u200b".repeat(500) + "\n\n" + result.join("\n\n"));
    }
}

function getNaverWeather(loc) {
    try {
        var url = Utils.parse("https://m.search.naver.com/search.naver?query=" + loc.replace(/ /g, "+") + "+날씨")
            .select("a.csm_more").attr("href");
        var data = Utils.parse(url).select("ul.week_list > li");
        var result = [];
        var days = ["오늘", "내일", "모래", "글피"];
        for (var n = 0; n < days.length; n++) {
            var info = data.get(n).select("span");
            result[n] = "[" + days[n] + " 날씨]\n";
            result[n] += "상태 : " + info.get(2).attr("data-wetr-txt") + " -> ";
            result[n] += info.get(7).attr("data-wetr-txt") + "\n";
            result[n] += "강수확률 : " + info.get(4).ownText() + " -> ";
            result[n] += info.get(9).ownText() + "\n";
            var tmp = data.get(n).select("strong.temperature").select("span");
            tmp = (tmp.get(0).ownText() + " ~ " + tmp.get(3).ownText()).replace(/°/g, "℃");
            result[n] += "온도 : " + tmp;
            return result;
        }
    } catch (e) {
        Log.error(loc + "날씨 정보 뜯어오기 실패\n" + e);
        return null;
    }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
