const scriptName = "주식";
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
  if (cmd == "/주식") {
      try {
          var data = org.jsoup.Jsoup.connect("https://www.google.com/search?q=주식%20" + data.replace(/ /g, "%20")).get();
          data = data.select("g-card-section").get(0);
          var result = "[" + data.select("div.oPhL2e").text() + " 주식 정보]\n";
          result += "현재 주가 : " + data.select("span[jsname=vWLAgc]").text() + " ";
          result += data.select("span.knFDje").text() + "\n";
          result += "변동 : " + data.select("span[jsname=qRSVye]").text();
          replier.reply(result);
      } catch (e) {
          replier.reply("주식 정보 불러오기 실패");
      }
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
