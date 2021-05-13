const scriptName = "먼지";
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

    if (cmd == "/먼지" || cmd == "/미세먼지") {
        data = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?query=" + data.replace(/ /g, "+") + "+날씨")
            .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36")
            .get().select("dl.indicator").get(0).select("dd");
        var dust = data.get(0).text().replace("㎍/㎥", "μg/m³ (") + ")";
        var dust2 = data.get(1).text().replace("㎍/㎥", "μg/m³ (") + ")";
        var ozone = data.get(2).text().replace("ppm", "ppm (") + ")";
        replier.reply("미세먼지: " + dust + "\n초미세먼지: " + dust2 + "\n오존: " + ozone);
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
