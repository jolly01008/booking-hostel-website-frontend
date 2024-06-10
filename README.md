# 旅館訂房網站 hostel-booking-web

![image](https://github.com/jolly01008/booking-hostel-website-frontend/blob/main/public/readmeImage/image01.png)
![image](https://github.com/jolly01008/booking-hostel-website-frontend/blob/main/public/readmeImage/image02.png)
![image](https://github.com/jolly01008/booking-hostel-website-frontend/blob/main/public/readmeImage/image03.png)
![image](https://github.com/jolly01008/booking-hostel-website-frontend/blob/main/public/readmeImage/image04.png)
![image](https://github.com/jolly01008/booking-hostel-website-frontend/blob/main/public/readmeImage/image05.png)
![image](https://github.com/jolly01008/booking-hostel-website-frontend/blob/main/public/readmeImage/image06.png)
![image](https://github.com/jolly01008/booking-hostel-website-frontend/blob/main/public/readmeImage/image07.png)
![image](https://github.com/jolly01008/booking-hostel-website-frontend/blob/main/public/readmeImage/image08.png)

## 相關環境框架

調用後端提供的 API 進行串接，將資料與畫面做串接的前端部分。

採用 React 框架
JSX 語法撰寫。善用 props 的特性來傳遞數據資料。
重要邏輯元件，模組化成 Components，在不同部分重用它，避免重複代碼。
Authcontext 管理狀態，提供全局的認證狀態，將認證邏輯集中在一個地方，以提高維護性。

用 localstorage 存取當前使用者 token 來確認每次的 request 做身分驗證與授權，
以及當前使用者輸入的關鍵字、日期、人數條件。

處理整體商業邏輯，資料庫設計與溝通的後端部分。
包含身分驗證、角色權限、篩選可預約日期、創建、刪除資料、預約房間..等等的訂房核心功能。
資料庫符合正規化和 ACID 特性，實現一對一、一對多、多對多之關聯資料。
操作資料庫，運用 JavaScript 的 async/await 處理異步操作，減少 callback hell。

採用 MVC 架構，以 Node.js 及 express 框架製作，搭配 MySQL 關聯式資料庫，
提供符合 RESTful 規範的 Web API，執行 CRUD 操作。供前端調用。

## 專案介紹

這是一個可提供旅遊客、背包客預約訂房的網站。
也讓擁有房源的房東，能在平台上創建並管理自己的旅館與房間。

- 一般使用者身分
  使用者可以註冊、登入，成為使用者身分。
  查看、編輯個人資料，瀏覽所有旅館與房間。
  藉由輸入想要的條件來搜尋房間，篩選出使用者輸入的日期中，尚有空房、床位，並且人數足夠的結果，讓使用者進行預約。
  預約完成，可瀏覽新的訂房紀錄，包括住宿日期、總金額、混合房的床位分配。過去的訂房紀錄也能查看。
  若有房源，想提供住宿，可申請成房東身分，切換身分。

- 房東身分
  需從一般使用者身分，填寫表單申請，才得到房東相關功能權限，可切換回使用者身分。
  房東個人頁面，可瀏覽來自使用者的訂房紀錄，包括租客姓名、電話、預約日期。
  能創建多家旅館、編輯旅館。適用於多間房產的房東。
  為了讓房東方便分類，房間可分成獨立套房、混合住宿。
  同個旅館內，能創建多個房間，亦可編輯、刪除房間。

## 功能

- 未登入

  - 一般使用者可以註冊及登入帳號

- 登入後

  - 一般使用者身分

    - 在首頁瀏覽所有旅館，各家旅館以各自最低的房間價格，顯示起價
    - 瀏覽單一旅館資訊
    - 瀏覽單一房間資訊
    - 使用搜尋列，輸入關鍵字、日期、訂房人數(分成大人、孩童)等條件，搜尋適合的房間
    - 透過輸入條件搜尋房間，並進行預約
    - 瀏覽個人資訊
    - 編輯個人資訊
    - 瀏覽未來、過去的訂房紀錄。若預定的是混合房型，也會顯示被分配到的床位 (多對多)
    - 填寫表單申請變成房東身分
    - 切換成房東身分
    - 使用者登出

  - 房東身分

    - 可創建多家旅館
    - 在特定旅館中，可創建多個房間。房間分為獨立套房、混合房型
    - 瀏覽自己創建的所有旅館、單一旅館資訊
    - 編輯單一旅館資訊
    - 瀏覽自己創建的所有房間、單一房間資訊
    - 編輯單一房間資訊
    - 刪除單一房間
    - 瀏覽個人的房東資訊
    - 編輯個人的房東資訊
    - 瀏覽未來、過去來自使用者的訂房紀錄
    - 切換成一般使用者身分

## 共用帳號

- 第一組 user 帳號 (只有一般使用者身分)

  - email: user1@example.com
  - password: 12345678

- 第二組 user 帳號 (已申請好房東身分)

  - email: user2@example.com
  - password: 12345678

# 安裝及使用

## 本地基礎設置

- 確認本地端已安裝 Node.js 、 npm

- 搭配以下後端網址，作為伺服器

  ```
  https://github.com/jolly01008/booking-hostel-website
  ```

## 開始使用

1. 將專案 clone 到本地

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```

cd booking-hostel-website-frontend

```

3. 安裝所需套件

```

npm install

```

4. 安裝完畢，執行程式

```

npm start

```

5. 打開瀏覽器進入到以下網址：
   http://localhost:3000/signin，共用帳號進行登入
   http://localhost:3000/signup，或註冊其他帳號再登入

   成功登入後即可開始使用功能

6. 若要暫停使用可以按下鍵盤

```

ctrl + c

```

## 開發工具

包含以下但不限於

- Node.js 14.16.0
- react 18.2.0
- react-bootstrap 2.10.1
- react-dom 18.2.0
- react-router-dom 6.4.1
- react-scripts: 4.0.3
- axios 1.4.0
- bootstrap 5.3.3
- clsx 1.2.1
- json-server 0.17.0
- jsonwebtoken 8.5.1
- sass 1.56.2
- styled-components 6.1.8
- sweetalert2 11.10.5
- web-vitals 2.1.4
  其餘詳見檔案 package.json
