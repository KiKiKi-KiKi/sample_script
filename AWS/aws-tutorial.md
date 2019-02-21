# Linux 仮想マシンの起動
https://aws.amazon.com/jp/getting-started/tutorials/launch-a-virtual-machine/

- **EC2** ... Amazon Elastic Compute Cloud
- **インスタンス** ... クラウドサーバー  
  ref. https://aws.amazon.com/jp/ec2/instance-types/


## 新規インスタンスの作成

1. EC2 「Launch Instance」 を選択
1. インスタンスの設定  
  *Amazon Linux AMI* ... 標準的なLinux web server
1. インスタンスタイプの選択 ... CPUやメモリサイズの選択
1. 「Launch」クリック
1. キーペア ... SSHアクセスするためのキーペア  
  新規作成  
  - 「Create a new key pair」を選択 Key pair name を付ける
  - 「Download Key Pair」ボタンで `key_pair_name.pem`がダウンロードされる
  - `./ssh`内にDLした`.pem`を移動
  - `chmod 400 ~./ssh/<key_pair_name>.pem`
  「Launch Instance」をクリックしてサーバーを起動

## global IPの設定

1. インスタンスが起動させておく
1. メニューから「Elastic IP」を選択
1. 「新しいアドレスを割り当て」
1. モーダル > 「割り当て」 新規 Elastic IP が作成される

インスタンスとの関連付け
1. アクション > アドレスの関連付け
1.   
  - リソースタイプ: インスタンス
  - インスタンス: インスタンスのID
  - プライベート IP: *デフォルト*
1. 「関連付け」クリック
1. メニュー「インスタンス」
1. インスタンス一覧から選択したインスタンスのパブリックIPアドレスに Elastic IP が表示されていればOK

## HTTPでのアクセスを許可

1. メニュー「インスタンス」インスタンス一覧から対象インスタンスを選択
1. リストの「セキュリティーグループ」欄のリンクをクリック
1. アクション > インバウンドルールの編集
1. ルールの追加 「タイプ: HTTP」を選択し保存

## sshアクセス

default user: `ec2-user`

```sh
$ ssh -i ~/.ssh/<key_pair_name>.pem <USER>@<IP_ADDRESS>
```

## Apacheのインストール

sshでインスタンスにログイン

yumパッケージのアップデート
```sh
$ sudo yum -y update
```
Apacheのインストール
```sh
$ sudo yum -y install httpd
```
Apacheの起動
```sh
$ sudo service httpd start
```
Apacheを自動的に起動させる
```sh
$ sudo chkconfig httpd on
```

public dir
```sh
$ ls /var/www/html/
```

## `/var/www` へのアクセス権を設定

SSHでインスタンスにログイン

### ユーザー権限を作成
`ec2-user`に`www`というユーザーグループを作成
```sh
$ sudo groupadd www
$ sudo usermod -a -G www ec2-user
$ exit
```
再度SSHでログインし権限の確認
```sh
$ groups
ec2-user wheel www
```
`www`がついていればOK

### `/var/www` への書き込み権限を設定
```sh
$ sudo chown -R root:www /var/www
$ sudo chmod 2775 /var/www
$ find /var/www -type d -exec sudo chomd 2775 {} \;
$ find /var/www -type f -exec sudo chmod 0664 {} \;
```

### EC2 とのファイル転送

DL
```sh
$ scp -i ~/.ssh/<key_pair_name>.pem <USER>@<IP_ADDRESS>:<dir>/index.html ./
```
upload
```sh
$ scp -i ~/.ssh/<key_pair_name>.pem ./index.html <USER>@<IP_ADDRESS>:/var/www/html
```

ファイルの移動
```sh
$ sudo mv ~/index.html /var/www/html/
```
