# thbgm-titles-generator

東方原作(一部)の曲目リストを(ある程度)自動生成します

[TouhouSuperExtracter](https://resemblances.click3.org/product_list/index.cgi/detail/61) を使用しています

## 動作環境
- Windows10 64bit
- node.jsがインストールされている
- yarnがインストールされている

## 対応表
|No.|作品名|対応|
|---|---|:-:|
|th06|紅魔郷|X|
|th07|妖々夢|X|
|th08|永夜抄|X|
|th09|花映塚|X|
|th095|文花帖|X|
|th10|風神録|O|
|th11|地霊殿|O|
|th12|星蓮船|O|
|th125|ダブルスポイラー|O|
|th128|妖精大戦争|O|
|th13|神霊廟|O|
|th14|輝針城|O|
|th145|弾幕アマノジャク|O|
|th15|紺珠伝|O|
|th16|天空璋|O|
|th165|秘封ナイトメアダイアリー|O|
|th17|鬼形獣|?|

上記は実際に生成してみて確認したもの  
鬼形獣は未所持のため不明  
仕様上黄昏作品は全て不可です

## 使い方
`setup.bat` を実行   
原作のインストールフォルダにある `thxx.dat` を `run.bat` にD&Dすると `titles_thxx.txt` が生成されます

曲名も取得できたものは出力されますが、不明なものは内部で使用されているファイル名がそのまま出力されるので、手動で書き直してください

## ライセンス
[MIT](/LICENSE)

[TouhouSuperExtracter](/LICENSE_touhouSE)